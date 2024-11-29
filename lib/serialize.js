import fs from "fs";
import axios from "axios";
import chalk from "chalk";
import errorNumber from "./js/errorNumber.js";
import baileys from "@whiskeysockets/baileys";
const { areJidsSameUser, extractMessageContent, getDevice } = baileys;
export default async function serialize(sock, m, store, config, functions) {
	// console.log(m)
	m.github = "https://github.com/BerkahEsport/botbe " // source code
	if (m.message) {
			m.type = sock.getContentType(m.message) || Object.keys(m.message)[0];
			m.msg = extractMessageContent(m.message[m.type]);
			m.body = m.type === "conversation" ? m.message?.conversation
			: m.type == "imageMessage" ? m.message?.imageMessage?.caption
			: m.type == "videoMessage" ? m.message?.videoMessage?.caption
			: m.type == "extendedTextMessage" ? m.message?.extendedTextMessage?.text
			: m.type == "buttonsResponseMessage" ? m.message?.buttonsResponseMessage?.selectedButtonId
			: m.type == "listResponseMessage" ? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId
			: m.type == "templateButtonReplyMessage" ? m.message?.templateButtonReplyMessage?.selectedId
			: m.type == "messageContextInfo" ? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.message?.buttonsResponseMessage?.selectedButtonId
			: m.type == "interactiveResponseMessage" ? (JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)).id : ""
			m.cmd = m.body.trim().replace(config.settings.prefix || ".", "").split(/ +/)[0];
			m.arg = m.body.trim().split(/ +/) || [];
			m.args = m.body.trim().split(/ +/).slice(1) || [];
			m.text = m.args.join` `.replace(/\[|\]/g, "");
			m.mentions = m.msg?.contextInfo?.mentionedJid || [];
			m.expiration = m.msg?.contextInfo?.expiration || 0;
			m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 1000 || 0;
			if (m.key) {
				m.id = m.key.id;
				m.fromMe = m.key.fromMe;
				m.device = getDevice(m.id);
				m.from = m.key.remoteJid;
				m.isBaileys = m.device === "web" ? true : false;
				m.isUser = m.from.endsWith("@s.whatsapp.net") || false;
				m.isGroup = m.from.endsWith("@g.us") || false;
				m.sender = m.isGroup ? m.key.participant : m.key.remoteJid;
				m.isROwner = m.sender === config.number.owner + "@s.whatsapp.net" || false;
				m.isOwner = config.number.mods.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.isGroup ? m.sender : m.from) || false;// || m.isROwner || m.fromMe;
				m.isPremium = global.db.users[m.sender]?.premium || m.isOwner || false;
				m.isQuoted = !!m.msg?.contextInfo?.quotedMessage;
				m.isMentions = m.mentions.length > 0 ? true : false;
				m.isReact = !!m.reactions?.length;
				m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath || m.msg?.header?.hasMediaAttachment || false;
			if (m.isGroup) {
				try {
				if (!(m.from in store.groupMetadata)) store.groupMetadata[m.from] = await sock.groupMetadata(m.from);
					const groupMetadata = store.groupMetadata[m.from];
					m.metadata = groupMetadata;
					m.participants = groupMetadata ? groupMetadata.participants : [];
					m.admins = (m.participants.reduce((memberAdmin, memberNow) => (memberNow.admin ? memberAdmin.push({ id: memberNow.id, admin: memberNow.admin }) : [...memberAdmin]) && memberAdmin, []));
					m.isAdmin = !!m.admins.find((member) => member.id === m.sender);
					m.isBotAdmin = !!m.admins.find((member) => member.id === sock.user.jid);
				} catch(e) {
					m.metadata = {};
					m.participants = [{admin: false, id: ""}];
					m.admins = [{admin: false, id: ""}];
					m.isAdmin = false;
					m.isBotAdmin = false;
				}
			}
		}
			if (m.isMedia) {
				m.viewOnce = m.msg?.viewOnce;
				m.mime = m.msg?.mimetype;
				m.size = m.msg?.fileLength;
				m.height = m.msg?.height || "";
				m.width = m.msg?.width || "";
				if (/webp/i.test(m.mime)) {
					m.isAnimated = m.msg?.isAnimated;
				}
			}
	//Reply message
	m.reply = async function replyMessage(text = "", options = {}) {
		let errNumber = ["100","101","102","103","200","201","202","203","204","205","206","207","208","226","300","301","302","303","304","305","306","307","308","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","421","422","423","424","425","426","428","429","431","451","500","501","502","503","504","505","506","507","508","510","511"];
		let caption = options?.caption ? options.caption : "";
		let jid = options?.from ? options.from : m.from;
		let quoted = options?.quoted ? options.quoted : m;
		let fileName = options?.fileName ? options.fileName : "Reply";
		if (/^https?:\/\//.test(text)) {
			let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
			let code = text.match(linkRegex);
			if (code) {
			return sock.reply(jid, text, quoted, { ...options});
			}
			const response = await axios.get(text, { responseType: 'arraybuffer'});
			const contentType = response.headers['content-type'];
			if (contentType.includes('application/json')) {
			return sock.reply(jid, JSON.parse(response.data.toString('utf-8')), m, {...options});
			} else if (contentType.includes('text')) {
			return sock.reply(jid, response.data.toString('utf-8'), m, {...options});
			} else {
			return sock.sendFile(jid, Buffer.from(response.data), fileName, caption, quoted, { ...options });
			}
		} else if (!!config.text[text]) {
			return sock.reply(jid, config.text[text], quoted, { ...options });
		} else if (errNumber.includes(text)) {
			return sock.reply(jid, await errorNumber(text), quoted, { ...options });
		} else if ((Buffer.isBuffer(text) || /^data:.?\/.*?;base64,/i.test(text) || fs.existsSync(text))) {
			return sock.sendFile(jid, text, fileName, caption, quoted, { ...options });
		} else {
			return sock.reply(jid, text, m, { ...options});
		}
	}
}
	//Delete message
	m.delete = async function deleteMessage() {
		await sock.sendMessage(m.from, { delete: m.key });
	};
	//Download message
	m.download = async function downloadMessage() {
		await sock.downloadMediaMessage(m);
	}
	//React message
	m.react = async function reactionMessage(emoji) {
		await sock.sendMessage(m.from, { react: { text: emoji, key: m.key }});
	}
	//Reply Owner Bot if there is an error
	m.report = function reportMessage(text, options = {}) {
		if (typeof text == "object") {
					sock.reply(config.number.owner+"@s.whatsapp.net", functions.format(text), m, {...options});
				} else {
					sock.reply(config.number.owner+"@s.whatsapp.net", text,  m, {...options} );
				}
			}
	//Log message
	m.log = function logMessage(...data) {
			const colors = [chalk.redBright, chalk.greenBright, chalk.yellowBright, chalk.blueBright, chalk.magentaBright, chalk.cyanBright];
			data.forEach((item, index) => {
			const color = colors[index % colors.length];
			console.log(color(typeof item  === "object" ? functions.format(item) : item));
			});
		}
	// Quoted message
	if (m.isQuoted) {
		m.quoted = {};
		m.quoted.message = extractMessageContent(m.msg?.contextInfo?.quotedMessage);
		if (m.quoted.message) {
				m.quoted.type = sock.getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0];
				m.quoted.msg = extractMessageContent(m.quoted.message[m.quoted.type]) || m.quoted.message[m.quoted.type];
				m.quoted.key = {
				remoteJid: m.msg?.contextInfo?.remoteJid || m.from,
				participant: m.msg?.contextInfo?.remoteJid?.endsWith("g.us") ? sock.decodeJid(m.msg?.contextInfo?.participant) : false,
				fromMe: areJidsSameUser(sock.decodeJid(m.msg?.contextInfo?.participant), sock.decodeJid(sock?.user?.id)),
				id: m.msg?.contextInfo?.stanzaId
				}
				m.quoted.from = m.quoted.key.remoteJid;
				m.quoted.fromMe = m.quoted.key.fromMe;
				m.quoted.id = m.msg?.contextInfo?.stanzaId;
				m.quoted.device = getDevice(m.quoted.id);
				m.quoted.isBaileys = m.quoted.device === "web" ? true : false;
				m.quoted.isGroup = m.quoted.from?.endsWith("@g.us");
				m.quoted.participant = m.quoted.key?.participant;
				m.quoted.sender = sock.decodeJid(m.msg?.contextInfo?.participant);
				m.quoted.pushName = sock.getName(m.quoted.sender);
				m.quoted.mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
				m.quoted.isMentions = m.quoted.mentions.length > 0 ? true : false;
				m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || "";
				m.quoted.arg = m.quoted.body.trim().split(/ +/).filter(a => a) || [];
				m.quoted.text = m.quoted.body.replace(/^\.\S+\s+/, '');
				m.expiration = m.msg?.contextInfo?.expiration || 0;
				m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 1000;
				m.quoted.isReact = !!m.quoted.reactions?.length;
				m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath;
				if (m.quoted.isMedia) {
				m.quoted.viewOnce = m.quoted.msg?.viewOnce;
				m.quoted.mime = m.quoted.msg?.mimetype;
				m.quoted.size = m.quoted.msg?.fileLength;
				m.quoted.height = m.quoted.msg?.height || "";
				m.quoted.width = m.quoted.msg?.width || "";
				if (/webp/i.test(m.quoted.mime)) {
					m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false;
				}
				}
				m.quoted.reply = (text, options = {}) => {
				return sock.reply(options.from ? options.from : m.quoted.sender, text, m.quoted, {...options});
			}
			m.quoted.delete = async() => await sock.sendMessage(m.from, { delete: m.key });
			m.quoted.download = async() => await sock.downloadMediaMessage(m);
			let q = await store.loadMessage(m.isQuoted ? m.quoted.from : m.from, m.quoted.id, sock);
			if (q) m.quoted = await serialize(sock, q, store, config, functions) || false;
			}
		}
	return m;
}