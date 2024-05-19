import baileys, { extractMessageContent } from "baileys";
import fs from "fs";
import axios from "axios";
export default async function serialize(sock, m, store, config, functions) {
	m.github = "https://github.com/BerkahEsport/botbe " // source code
	if (m.message) {
		m.type = Object.keys(m.message)[0];
		m.msg = extractMessageContent(m.message[m.type]);
		m.body = m.type === "conversation" ? m.message?.conversation
		: m.type == "imageMessage" ? m.message?.imageMessage?.caption
		: m.type == "videoMessage" ? m.message?.videoMessage?.caption
		: m.type == "extendedTextMessage" ? m.message?.extendedTextMessage?.text
		: m.type == "buttonsResponseMessage" ? m.message?.buttonsResponseMessage?.selectedButtonId
		: m.type == "listResponseMessage" ? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId
		: m.type == "templateButtonReplyMessage" ? m.message?.templateButtonReplyMessage?.selectedId
		: m.type === "messageContextInfo" ? (m.message?.listResponseMessage?.singleSelectReply?.selectedRowId 
			|| m.message?.buttonsResponseMessage?.selectedButtonId 
			|| (() => {
				const paramsJson = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson;
				if (paramsJson) {
					try {
						const parsed = JSON.parse(paramsJson);
						return parsed.id;
					} catch (error) {
						console.error("Error parsing JSON:", error);
						return "";
					}
				}
				return "";
			})())
		: "";
		m.mentions = m.msg?.contextInfo?.mentionedJid || [];
		m.expiration = m.msg?.contextInfo?.expiration || 0;
		m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 1000
		m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath || m.msg?.header?.hasMediaAttachment;
		if (m.key) {
			m.id = m.key.id;
			m.isBaileys = m.id.startsWith("BAE5");
			m.from = m.key.remoteJid;
			m.sender = m.key.fromMe ? sock.user.jid : (m.key.participant || m.from);
			m.isUser = m.from.endsWith("@s.whatsapp.net");
			m.isGroup = m.from.endsWith("@g.us");
			m.isROwner = m.sender === config.number.owner + "@s.whatsapp.net";
			m.isOwner = config.number.mods.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.isGroup ? m.sender : m.from);// || m.isROwner || m.fromMe;
			m.isPremium = global.db.users[m.sender]?.premium || m.isOwner;
			m.isQuoted = !!m.msg?.contextInfo?.quotedMessage;
			if (m.isGroup) {
				if (!(m.from in store.groupMetadata)) store.groupMetadata[m.from] = await sock.groupMetadata(m.from);
				const groupMetadata = store.groupMetadata[m.from];
				m.metadata = groupMetadata;
				m.participants = groupMetadata ? groupMetadata.participants : [];
				m.admins = (m.participants.reduce((memberAdmin, memberNow) => (memberNow.admin ? memberAdmin.push({ id: memberNow.id, admin: memberNow.admin }) : [...memberAdmin]) && memberAdmin, []));
				m.isAdmin = !!m.admins.find((member) => member.id === m.sender);
				m.isBotAdmin = !!m.admins.find((member) => member.id === sock.user.jid);
			}
		}
		if (m.isMedia) {
			m.viewOnce = m.msg?.viewOnce
			m.mime = m.msg?.mimetype
			m.size = m.msg?.fileLength
			m.height = m.msg?.height || ""
			m.width = m.msg?.width || ""
			if (/webp/i.test(m.mime)) {
				m.isAnimated = m.msg?.isAnimated
			}
		}
		if (m.isQuoted) {
			let quoted = baileys.proto.WebMessageInfo.fromObject({
				key: {
					remoteJid: m.from,
					fromMe: (m.msg.contextInfo.participant === sock.decodeJid(sock.user.id)),
					id: m.msg.contextInfo.stanzaId,
					participant: m.isGroup ? m.msg.contextInfo.participant : []
				},
				message: m.msg.contextInfo.quotedMessage
			})
			m.quoted = await serialize(sock, quoted, store, config, functions);
		}
	}
	m.delete = async() => await sock.sendMessage(m.from, { delete: m.key });
	m.download = async() => await sock.downloadMediaMessage(m);
	
	//Reply message
	m.reply = async (text = "", options = {}) => {
		const caption = options?.caption ? options.caption : ""
		const jid = options?.from ? options.from : m.from
		const quoted = options?.quoted ? options.quoted : m
		const fileName = options?.fileName ? options.fileName : "Reply"
		  if (/^https?:\/\//.test(text)) {
			 if (text.match(/chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i)) {
				return sock.reply(jid, text, quoted, {...options});
			 }
			const response = await axios.get(text, { responseType: 'arraybuffer' });
			const contentType = response.headers['content-type'];
			if (contentType.includes('application/json')) {
				return sock.reply(jid, JSON.parse(response.data.toString('utf-8')), m, {...options});
			} else if (contentType.includes('text')) {
				return sock.reply(jid, response.data.toString('utf-8'), m, {...options});
			} else {
				return sock.sendFile(jid, Buffer.from(response.data), fileName, caption, quoted, { ...options });
			}
		} else if ((Buffer.isBuffer(text) || /^data:.?\/.*?;base64,/i.test(text) || fs.existsSync(text))) {
		  return sock.sendFile(jid, text, fileName, caption, quoted, { ...options })
		} else {
		  return sock.reply(jid, text, m, {...options})
		}
	}

	//React message
    m.react = async (emot) => await sock.sendMessage(m.from, { react: { text: emot, key: m.key }})
    
	//Reply Owner Bot if there is an error
    m.report = async (text, options = {}) => {
      if (typeof text == "object") {
         return sock.reply(config.number.owner+"@s.whatsapp.net", functions.format(text), m, { mentions: [config.number.owner+"@s.whatsapp.net", ...sock.parseMentions(functions.format(text))], ...options});
       } else {
		return sock.reply(config.number.owner+"@s.whatsapp.net", text,  m, ...options );
    }
}
	return m;
}

/*<============== CREDITS ==============>
	Author: @berkahesport.id
	Contact me: 62895375950107
	
	Do not delete the source code.
	It is prohibited to sell and buy
	WhatsApp BOT scripts
	without the knowledge
	of the script owner.
	
	Selling = Sin 
	
	Thank you to Allah S.W.T
<============== CREDITS ==============>*/