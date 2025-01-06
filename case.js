/*<============== CREDITS ==============>
	Author: @berkahesport
	Contact me: 62895375950107
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
export default async function switchcase(sock, m, config, functions, usedCommandRecently) {
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
    let commandResult = undefined ;
    const registered = user?.registered;
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
                user.limit = 10;
                user.name = name;
                user.age = parseInt( age );
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

    if (settings.self && !m.isOwner) return;
    if (m.from && global.db.groups[m.from]?.isBanned && !m.isOwner) return;
    if (isCommand && isFiltered(m.sender)) {
        m.reply('「 ❗ 」 Give a 5 second delay per command bro!');
        return;
    }
    if (isCommand) {
        await m.react("⏳");
        commandResult = true;
    }

// Answer from command yts
sock.yts = sock.yts ? sock.yts : {}
if (m.from in sock.yts) {
    if (m.isQuoted) {
        if (sock.yts[m.from][0].id === quoted.id) {
            if (!arg[1]) return m.reply("Silahkan balas pesan, masukkan angka dan tipe! \nContoh: 1 mp3 ");
            if (Number(arg[0]) > sock.yts[m.from][1].length) return m.reply("Pilihan angka tidak ada! \nContoh: 1 mp3 ");
            if (arg[1] == "mp3" || arg[1] == "audio") {
                let data = (await functions.fetchJson(`${config.settings.restapi}ytmp3?url=${sock.yts[m.from][1][Number(arg[0])].url}&apikey=${config.settings.apikey}`)).result;
                await sock.sendFile(m.from, data.link, data.title, "", m);
            }
            if (arg[1] == "mp4" || arg[1] == "video") {
                let data = (await functions.fetchJson(`${config.settings.restapi}ytmp4?url=${sock.yts[m.from][1][Number(arg[0])].url}&apikey=${config.settings.apikey}`)).result;
                let datas = await functions.getFile(data.link);
                m.reply(datas.data, {asDocument: true, fileName: data.title});
            }
        }
    }
}
        // Setiap case baru yang dibuat wajib isi komentar untuk mengisi kategori perintah .menu
        // Every new case that is created must fill in comments to fill the .menu command category
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
                if (!args[0]) return m.reply(`Masukkan pencarian youtube!`)
                if ( global.db.users[m.sender].limit < 1) return m.reply("limit")
                if (functions.limit(m, 1)) {
                let data = (await functions.fetchJson(`${config.settings.restapi}ytsearch?text=${text}&apikey=${config.settings.apikey}`)).result
                const id = await m.reply(functions.mapList(data, "*★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★*", "ᴮᵃˡᵃˢ ᵈᵃⁿ ᵏⁱʳⁱᵐ ˢᵉˢᵘᵃⁱ ᵃⁿᵍᵏᵃ!"));
                sock.yts = sock.yts ? sock.yts : {}
                sock.yts[m.from] = [
                    {
                        id: id.key.id
                    },
                    data,
                    setTimeout(() => {
                        delete sock.yts[m.from]
                        data = null
                    },  120000)]
                }
            }
            break;
        }
        if (["*"].some(v => m.body?.toLowerCase()?.startsWith(v)) && isOwner) {
            m.reply(functions.format(message));
        }
        if ([">", "eval", "=>"].some(v => m.body?.toLowerCase()?.startsWith(v))) {
            if (!isOwner) return m.reply("owner");
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
            if (!m.isOwner) return m.reply("owner")
            try {
                exec(m.text, async (err, stdout) => {
                    if (err) return m.reply(functions.format(err))
                    if (stdout) return m.reply(functions.format(stdout))
                })
            } catch (e) {
                m.reply(functions.format(e));
            }
        }
        if (/^bot|Bot|Boti|Botbe/i.test(m.body)) {
            m.reply(`ɪʏᴀ "${m.pushName}" ᴀᴅᴀ ᴀᴘᴀ?\n\n${config.name.bot}`)
        }
        if ( !m.fromMe && m.body.match( /(bot|berkahesport|berkahesportbot|botberkah|berkahesport.id|botbe)/gi ) ) {
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