/*<============== CREDITS ==============>
	Author: @berkahesport
	Contact me: 6289654279897
    Website: https://berkahesport.my.id/
	
	Do not delete the source code.
	It is prohibited to sell and buy
	WhatsApp BOT scripts
	without the knowledge
	of the script owner.
	
	Selling = Sin 
	
	Thank you to Allah S.W.T
<============== CREDITS ==============>*/

import fs from "fs";
import { delay, jidNormalizedUser } from "baileys";
export default async function switchcase(sock, m, db, store, config, functions, usedCommandRecently, usedAIRecently, temp) {
    const isFiltered = (from) => !!usedCommandRecently.has(from);
	const addFilter = (from) => {
		usedCommandRecently.add(from);
		setTimeout(() => usedCommandRecently.delete(from), 5000); // 5 second.
	}
    if (m.fromMe) return; // Don't remove it or you'll get a backdoor attack crying >_<
    if (m.key.remoteJid === "status@broadcast") return; // This is for story whatsapp, if you delete error;
    await (await import(`./lib/database.js?update=${Date.now()}`)).default(sock, m, config, functions);

    // Variabel setup
	m.limit = false;
	const users = db.users
	const user = users[m.sender];
	const settings = db.settings[sock.user.jid || config.number.bot+"@s.whatsapp.net"];
	const stats = db.stats;
	const prefix = config.settings.prefix;
    const isCommand = m.body.startsWith(prefix);
    const command = m.cmd;
    const arg = m.arg;
    const args = m.args;
    const text = m.text;
	const quoted = m.isQuoted && /http/i.test(m.body) ? m : m.isQuoted ? m.quoted : m;
    const isReaction = m.body.match(/(bot|berkahesport|berkahesportbot|botberkah|berkahesport.id|botbe)/gi);
    const isCallingBot = /^bot|Bot|Boti|Botbe/i.test(m.body);
    const registered = user?.registered || false;
    const isCreator = (functions.wa([config.number.owner])).includes(m.sender);
    const isWhitelist = (functions.wa([config.number.owner, ...config.number.mods, ...settings.mods])).includes(m.sender);
    const api = config.settings.restapi;
    let task = usedAIRecently;
    let commandResult = undefined;
    try {
        const register = [".register", ".reg", ".daftar"] // add f you want command to register
        if (!registered) { // Dont delete this code becase will error.
            if (register.some(cmd => m.body.startsWith(cmd))) {
                m.react("⚠️");
                const regTime = Date.now();
                const [ name, age ] = text.split(".");
                if ( user?.registered === true ) return m.reply(`You are already registered in the bot database!`);
                if ( !text) return m.reply(`Please enter the command correctly. \nExample: ${prefix+command} ${m.pushName || "userBE"}.18`);
                if ( !name ) return m.reply("Name cannot be empty (Alphanumeric)!");
                if ( !age ) return m.reply("Age cannot be empty (Number)!");
                if ( parseInt( age ) > 30 ) return m.reply("Age must not be more than 30!");
                if ( parseInt( age ) < 7 ) return m.reply("Age must not be less than 7!");
                    //  Add if you are
                    user.registered = true;
                    user.registeredTime = +regTime;
                    user.premium = false;
                    user.premiumTime = 0;
                    user.banned = false;
                    user.limit = 10;
                    user.name = name;
                    user.age = parseInt( age );
                    user.afk = -1;
                    user.afkReason = "";
                    user.ai = false;
                    m.reply(`*「 REGISTERED 」*

┏─• *USER BOT*
│▸ *STATUS:* ☑️ SUCCESS
│▸ *NAME:* ${ name }
│▸ *AGE:* ${ age } year
│▸ *LIMIT:* 10
│▸ *DATE:* ${functions.msToDate(regTime)}
┗────···

> ${config.name.bot || sock.user.name}
> This bot using RestAPI from:
_¿${api}¿_`, {font: true});
            return m.react("🆗");;
            } else {
                m.react("🆕");
				m.reply(`Please register first to be able to access the bot!!
Command: ¿${prefix}register name.age¿
Example: ¿${prefix}register ${m.pushName || "userBE"}.18¿`, {font: true});
            return;
            }
        }

    if (settings.self && !isWhitelist) return;
    if (m.from && db.groups[m.from]?.isBanned && !isWhitelist) return;
    if (isCommand && isFiltered(m.sender)) {
        m.reply('「 ❗ 」 Give a 5 second delay per command bro!');
        return;
    }
    if (isCommand) {
        await m.react("⏳");
        commandResult = true;
    }

// <==== Barrier Auto Response ====>
// Answer from command yts
const id = "yts-" + m.from;
if (temp.has(id)) {
    let getID = temp.get(id);
    let [key, result, timer] = getID;
    if (m.isQuoted) {
        if (key === quoted.id) {
            if (!arg[1]) return m.reply("Silahkan balas pesan, masukkan angka dan tipe! \nContoh: 1 mp3 ");
            if (Number(arg[0]) > result.length) return m.reply("Pilihan angka tidak ada! \nContoh: 1 mp3 ");
            if (arg[1] == "mp3" || arg[1] == "audio") {
                let data = await (await functions.api("api/ytmp3", result[Number(arg[0])].url)).result;
                await sock.sendFile(m.from, data.link, data.title, "", m);
            }
            if (arg[1] == "mp4" || arg[1] == "video") {
                let data = await (await functions.api("api/ytmp4", result[Number(arg[0])].url)).result;
                await sock.sendFile(m.from, data.link[0].link, data.title, "", m);
            }
            clearTimeout(timer);
            temp.delete(id);
        }
    }
}
// <==== Barrier Auto Response ====>


        /*  
            Setiap case baru yang dibuat wajib isi komentar untuk mengisi kategori perintah .menu
            Every new case that is created must fill in comments to fill the .menu command category.

            case "menu": {
                // main -> This comment will become the category of command. (Wajib diisi contoh: //main, //game, //downloader)
                const categorizedCases... -> Your codes here!
            }
            break;
        
            Important: Comments are mandatory!
        */

// <==== Your Case Code Here ====>
        switch (command) {
            case "menu": {
                // main
                const categorizedCases = functions.extractCategoriesFromSwitch(switchcase);
                let text = `
┏━━〔 ${sock.user.name || "*BOTBE*"} 〕━▣
┃❒ *Hai, @${m.sender.split`@`[0]}!*
┃❒ *Total CMD:* ${categorizedCases.reduce((total, cat) => total + cat.values.length, 0)}
┗━━━━━━▣\n`.trimStart();
categorizedCases.forEach(({ category, values }) => {
    text += `╔═  *ᴍᴇɴᴜ ${category.toUpperCase()}*\n`;
    text += `┃\n`;
    text += `┃➠ ${values.map(cmd => `_${prefix + cmd}_`).join("\n┃➠ ")}\n`;
    text += `┃\n`;
    text += `╚══════▣\n`;
});
text += `
┏━━〔 ${sock.user.name || "*BOTBE*"} 〕━▣
┃❒ ʙᴏᴛ ꜰᴜʟʟ ꜰɪᴛᴜʀ: 
┃❒ _https://wa.me/6289649672623?text=.daftar%20UserBE.20_
┃❒ RestAPI:
┃❒ _${api}_
┗━━━━━━▣\n`.trimStart();
                sock.sendMessage(m.from, {
                    text, contextInfo: {
                        mentions: sock.parseMentions(text),
                        externalAdReply: {
                            title: sock?.user?.name,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnail: fs.readFileSync("./src/qrbe.jpg"),
                            sourceUrl: config.Exif.packWebsite
                        }
                    }
                }, { quoted: m, ephemeralExpiration: 8640000 })
            }
            break;
            case "profile": {
                // main
                let who = m.mentions && m.mentions[0] ? m.mentions[0] : m.sender;
                let pp = await sock.profilePictureUrl(who, "image").catch(() => fs.readFileSync("./src/qrbe.jpg"))
                let sender = db.users[who]
                let text = `
┏━━〔 ${config.name.bot} 〕━▣
┃❒ *ɴᴀᴍᴀ:* ${"@"+m.sender.split`@`[0] || sender.name}
┃❒ *ʟɪᴍɪᴛ:* ${sender.limit}
┃❒ *ᴘʀᴇᴍɪᴜᴍ:* ${sender.premium ? "ɪʏᴀ" : "ᴛɪᴅᴀᴋ"}
┃❒ *ʙᴀɴɴᴇᴅ:* ${sender.banned ? "ɪʏᴀ" : "ᴛɪᴅᴀᴋ"}
┗━━━━━━▣

┏━━〔 *OTHER* 〕━▣
┃❒ ʙᴏᴛ ꜰᴜʟʟ ꜰɪᴛᴜʀ: 
┃❒ _https://wa.me/6289649672623?text=.daftar%20UserBE.20_
┗━━━━━━▣\n`.trimStart()
                sock.sendMessage(m.from, {
                    text, contextInfo: {
                        mentions: sock.parseMentions(text),
                        externalAdReply: {
                            title: sock?.user?.name,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnail: (await functions.getFile(pp)).data,
                            sourceUrl: config.Exif.packWebsite
                        }
                    }
                }, { quoted: m, ephemeralExpiration: 8640000 })
            }
            break;
            case "yts": case "play": {
                // downloader
                if (!text) return m.reply(`Masukkan pencarian youtube!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const id = "yts-" + m.from;
                    let data = await functions.api("api/ytsearch", text);
                    let teks = data.result.map((v, i) => `\n▶️ *ɴᴏᴍᴏʀ:* ${i+1}\n📌 *ᴊᴜᴅᴜʟ:* ${v.title}\n🔗 *ᴜʀʟ:* ${v.url}\n⏲️ *ᴘᴜʙʟɪꜱʜ:* ${v.published_at}\n⌚ *ᴅᴜʀᴀꜱɪ:* ${v.duration}\n👁️ *ᴅɪʟɪʜᴀᴛ:* ${v.views}`.trim()).filter( v => v).join("\n\n*<==== 「"+config.name.bot+"」 ====>*\n\n");
                    let key = await sock.sendFile(m.from, data.result[0].thumbnail, "", "*─「 ★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★ 」─*\n\nᴮᵃˡᵃˢ ᵈᵃⁿ ᵏⁱʳⁱᵐ ˢᵉˢᵘᵃⁱ ᵃⁿᵍᵏᵃ!\n\n" + teks, m);
                    const timer = setTimeout(() => {
                        temp.delete(id);
                        data = null;
                    },  120000);
                    temp.set(id, [key.key.id, data.result, timer]);
                }
            }
            break;
            case "tiktok": case "tt": {
                // downloader
                if (!text) return m.reply(`Enter the Tiktok URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/tiktok", args[0]);
                    await m.reply(data.result.link);
                }
            }
            break;
            case "facebook": {
                // downloader
                if (!text) return m.reply(`Enter the Facebook URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/facebook", args[0]);
                    await m.reply(data.result.hd);
                }
            }
            break;
            case "gdrive": {
                // downloader
                if (!text) return m.reply(`Enter the GDrive URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/gdrive", args[0]);
                    await m.reply(data.result.link);
                }
            }
            break;
            case "github": {
                // downloader
                if (!text) return m.reply(`Enter the Github URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/github", args[0]);
                    await m.reply(data.result.link);
                }
            }
            break;
            case "instagram": {
                // downloader
                if (!text) return m.reply(`Enter the instagram URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/instagram", args[0]);
                    m.reply(data.result[0].url, {caption: functions.mapList(data.result, "Instagram DL")});
                }
            }
            break;
            case "soundcloud": {
                // downloader
                if (!text) return m.reply(`Enter the Soundcloud URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/soundcloud", args[0]);
                    await m.reply(data.result.link);
                }
            }
            break;
            case "thread": {
                // downloader
                if (!text) return m.reply(`Enter the thread URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/thread", args[0]);
                    await m.reply(data.result?.image_urls[0]?.download_url || data.result?.video_urls[0]?.download_url);
                }
            }
            break;
            case "tx2twitter": {
                // downloader
                if (!text) return m.reply(`Enter the Tx2twitter URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/tx2twitter", args[0]);
                    await m.reply(data.result?.[0]?.image || data.result?.[0]?.video, {caption: functions.list(data.result, "Twitter DL")});
                }
            }
            break;
            case "yta": {
                // downloader
                if (!text) return m.reply(`Enter the youtube URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/ytmp3", args[0]);
                    await sock.sendFile(m.from, data.result.link, data.result.title, "", m);
                }
            }
            break;
            case "ytmp3": {
                // downloader
                if (!text) return m.reply(`Enter the youtube URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/ytmp3", args[0]);
                    await sock.sendFile(m.from, data.result.link, data.result.title, "", m, {asDocument: true});
                }
            }
            break;
            case "ytv": {
                // downloader
                if (!text) return m.reply(`Enter the youtube URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/ytmp4", args[0]);
                    await sock.sendFile(m.from, data.result.link, data.result.title, "", m);
                }
            }
            break;
            case "ytmp4": {
                // downloader
                if (!text) return m.reply(`Enter the youtube URL correctly!`)
                if (db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                    const data = await functions.api("api/ytmp4", args[0]);
                    await sock.sendFile(m.from, data.result.link, data.result.title, "", m, {asDocument: true});
                }
            }
            break;
            case "getsw": {
                // owner
                if (!store.messages["status@broadcast"].array.length === 0) return m.reply("Not a single WhatsApp status!");
                const contacts = Object.values(store.contacts);
                let [who, value] = m.text.split(/[,|\-+&]/);
                value = value?.replace(/\D+/g, "");
                let sender;
                if (m.mentions.length !== 0) sender = m.mentions[0];
                else if (m.text) sender = contacts.find(v => [v.name, v.verifiedName, v.notify].some(name => name && name.toLowerCase().includes(who.toLowerCase())))?.id;
                const stories = store.messages["status@broadcast"].array;
                const story = stories.filter(v => (v.key && v.key.participant === sender) || v.participant === sender).filter(v => v.message && v.message.protocolMessage?.type !== 0);
                if (story.length === 0) return m.reply("No whatsapp status!");
                if (value) {
                    if (story.length < value) return m.reply("The amount you want is not that much.\nStatus lengh: "+story.length);
                    await m.reply({ forward: story[value - 1], force: true });
                } else {
                    for (const msg of story) {
                        await delay(1500);
                        await sock.sendMessage(m.from, { forward: msg, force: true });
                    }
                }
            }
            break;
            case "listsw": {
                // owner
                if (!("status@broadcast" in store.messages)) return m.reply("Activate store in config.js to true so that WhatsApp status in your contacts can be saved! Apparently not a single WhatsApp status!")
                if (!store.messages["status@broadcast"].array.length === 0) return m.reply("Not a single WhatsApp status!");
                const stories = store.messages["status@broadcast"].array;
                const story = stories.filter(v => v.message && v.message.protocolMessage?.type !== 0);
                if (story.length === 0) return m.reply("No whatsapp status!");
                const result = {};
                story.forEach(obj => {
                    let participant = obj.key.participant || obj.participant;
                    participant = jidNormalizedUser(participant === "status_me" ? sock.user.id : participant);
                    if (!result[participant]) {
                        result[participant] = [];
                    }
                    result[participant].push(obj);
                });
                const type = mType => (sock.getContentType(mType) === "extendedTextMessage" ? "text" : sock.getContentType(mType).replace("Message", ""));
                let text = "";
                for (const id of Object.keys(result)) {
                    if (!id) return;
                    text += `*- ${sock.getName(id)}*\n`;
                    text += `${result[id].map((v, i) => `${i + 1}. ${type(v.message)}`).join("\n")}\n\n`;
                }
                await m.reply(text.trim(), { mentions: Object.keys(result) });
            }
            break;
            case "upsw": {
                // owner
                if (isCreator) {
                    const statusJidList = [
                        jidNormalizedUser(sock.user.id),
                        ...Object.values(store.contacts)
                            .filter(v => v.isContact)
                            .map(v => v.id)
                    ];
                    const colors = ["#7ACAA7", "#6E257E", "#5796FF", "#7E90A4", "#736769", "#57C9FF", "#25C3DC", "#FF7B6C", "#55C265", "#FF898B", "#8C6991", "#C69FCC", "#B8B226", "#EFB32F", "#AD8774", "#792139", "#C1A03F", "#8FA842", "#A52C71", "#8394CA", "#243640"];
                    const color = functions.random(colors);
                    const fonts = [0, 1, 2, 6, 7, 8, 9, 10];
                    if (!quoted.isMedia) {
                        const text = quoted.text || "";
                        if (!text) return m.reply("Please enter text to be used as WhatsApp status!");
                        await sock.sendMessage(
                            "status@broadcast",
                            { text },
                            {
                                backgroundColor: color,
                                textArgb: 0xffffffff,
                                font: fonts[Math.floor(Math.random() * colors.length)],
                                statusJidList
                            }
                        );
                    } else if (/audio/.test(quoted.msg.mimetype)) {
                        await sock.sendMessage(
                            "status@broadcast",
                            {
                                audio: await downloadM(),
                                mimetype: "audio/mp4",
                                ptt: true,
                                waveform: [100, 0, 100, 0, 100, 0, 100]
                            },
                            { backgroundColor: color, statusJidList }
                        );
                    } else {
                        const type = /image/.test(quoted.msg.mimetype) ? "image" : /video/.test(quoted.msg.mimetype) ? "video" : false;
                        if (!type) return m.reply("The file type you want to use as WhatsApp status is not supported!");
                        await sock.sendMessage(
                            "status@broadcast",
                            {
                                [type]: await downloadM(),
                                caption: m.text || m.quoted?.body || ""
                            },
                            { statusJidList }
                        );
                    }
                    await m.reply(`Up status whatsapp to : ${statusJidList.length} Contact`);
                } else return m.reply("owner");
            }
            break;
        }
// <==== End Case Code ====>

// <==== For Other Code ====>
        if (["*"].some(v => m.body?.toLowerCase()?.startsWith(v)) && isCreator) {
            m.reply(functions.format(quoted));
        }
        if ([">", "eval", "=>"].some(v => m.body?.toLowerCase()?.startsWith(v))) {
            if (!isCreator) return m.reply("owner");
            let evalCmd = "";
            try {
                evalCmd = /await/i.test(text) ? eval("(async() => { " + text + " })()") : eval(text);
            } catch (e) {
                evalCmd = e;
            }
            new Promise(async (resolve, reject) => {
                try {
                    resolve(evalCmd);
                } catch (err) {
                    reject(err);
                }
            })
                ?.then((res) => m.reply(functions.format(res)))
                ?.catch((err) => m.reply(functions.format(err)))
        }
        if (["$", "exec"].some(a => m.body?.toLowerCase()?.startsWith(a))) {
            if (!isCreator) return m.reply("owner");
            try {
                exec(m.text, async (err, stdout) => {
                    if (err) return m.reply(functions.format(err))
                    if (stdout) return m.reply(functions.format(stdout))
                })
            } catch (e) {
                m.reply(functions.format(e));
            }
        }
        if (isCallingBot) {
            m.reply(`ɪʏᴀ "${m.pushName}" ᴀᴅᴀ ᴀᴘᴀ?\n\n${config.name.bot}`);
        }
        if ( !m.fromMe && isReaction) {
            let res = JSON.parse(fs.readFileSync('./lib/emoji.json'));
            let em = res.emoji;
            let emot = functions.random(em);
            m.react(`${emot}`);
        }
// <==== End Other Code ====>

    } catch(e) {
            commandResult = false;
			m.report(e);
			m.log("Error a messages.upsert: ", e);
	} finally {
			try {
				await (await import(`./lib/print.js?v=${Date.now()}`)).default(sock, m, user, config, functions, isCommand, command);
				} catch (e) {
					m.log("Error a print: ", e);
				};
			if (user) { 
				if (m.isUser) {
					if (m.limit && !m.isPremium) {
						user.limit -= +m.limit
						m.reply(+m.limit == 1 ? `${+m.limit} limit are used.` : `${+m.limit} limits are used.`, {font: true});
					}
				}
			if (isCommand && registered) {
					stats.today += 1;
					stats.total += 1;
				if (commandResult) {
					stats.success += 1;
					m.react("✅");
				} else {
					stats.failed += 1;
					m.react("❌");
				}
				if (!m.isPremium) {
					addFilter(m.sender)
				}
			}
		}
	}
}