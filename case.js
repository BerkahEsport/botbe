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
export default async function switchcase(sock, m, config, functions, usedCommandRecently, usedAIRecently, temp) {
    const isFiltered = (from) => !!usedCommandRecently.has(from);
	const addFilter = (from) => {
		usedCommandRecently.add(from);
		setTimeout(() => usedCommandRecently.delete(from), 5000) // 5 second.
	}
    if (m.fromMe) return; // Don't remove it or you'll get a backdoor attack crying >_<
    await (await import(`./lib/database.js?update=${Date.now()}`)).default(sock, m, config, functions);

    // Variabel setup
	m.limit = false;
	const user = global.db.users[m.sender];
	const settings = global.db.settings[sock.user.jid || config.number.bot+"@s.whatsapp.net"];
	const stats = global.db.stats;
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
        if (!registered) { // Dont delete this code becase will error.
            const regTime = Date.now();
            let [ name, age ] = text.split(".");
            if ( user?.registered === true ) throw (`You are already registered in the bot database!`);
            if ( !text) throw (`Please enter the command correctly. \nExample: ${prefix+command} ${m.pushName || "userBE"}.18`);
            if ( !name ) throw ("Name cannot be empty (Alphanumeric)!");
            if ( !age ) throw ("Age cannot be empty (Number)!");
            if ( parseInt( age ) > 30 ) throw ("Age must not be more than 30!");
            if ( parseInt( age ) < 7 ) throw ("Age must not be less than 7!");
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
            m.reply(`*「 REGISTERED 」*

┏─• *USER BOT*
│▸ *STATUS:* ☑️ SUCCESS
│▸ *NAME:* ${ name }
│▸ *AGE:* ${ age } year
│▸ *LIMIT:* 10
│▸ *DATE:* ${functions.msToDate(regTime)}
┗────···

> ${config.name.bot || sock.user.name}`, {font: true});
        }

    if (settings.self && !isWhitelist) return;
    if (m.from && global.db.groups[m.from]?.isBanned && !isWhitelist) return;
    if (isCommand && isFiltered(m.sender)) {
        m.reply('「 ❗ 」 Give a 5 second delay per command bro!');
        return;
    }
    if (isCommand) {
        await m.react("⏳");
        commandResult = true;
    }

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
                let data = (await functions.fetchJson(`${api}ytmp3?url=${result[Number(arg[0])].url}&apikey=${config.settings.apikey}`)).result;
                await sock.sendFile(m.from, data.link, data.title, "", m);
            }
            if (arg[1] == "mp4" || arg[1] == "video") {
                let data = (await functions.fetchJson(`${api}ytmp4?url=${result[Number(arg[0])].url}&apikey=${config.settings.apikey}`)).result;
                let datas = await functions.getFile(data.link);
                m.reply(datas.data, {asDocument: true, fileName: data.title});
            }
            temp.delete(id);
        }
    }
}
        /*  Setiap case baru yang dibuat wajib isi komentar untuk mengisi kategori perintah .menu
            Every new case that is created must fill in comments to fill the .menu command category

            case "menu": {
                // main -> This comment will become the category of command
                const categorizedCases...
            }
            break
        
            Important: Comments are mandatory!
        */
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
                let sender = global.db.users[who]
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
                if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
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
        }
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
                ?.then((res) => m.reply(format(res)))
                ?.catch((err) => m.reply(format(err)))
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
			if (isCommand) {
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