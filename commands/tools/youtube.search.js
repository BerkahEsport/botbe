/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 6289654279897

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default {
    name: "ytsearch",
    command: ["ytsearch", "yts"],
    tags: "tools",
    desc: "Looking for a list of YouTube videos...",
    before: async (m, {
        sock,
        isOwner,
        isPremium,
        isQuoted,
        user,
        config,
        functions,
        temp
    }) => {
        temp = temp || new Map();
        let id = "yts-" + m.from;
        if (temp.has(id)) {
            let getID = temp.get(id);
            let [key, result, timer] = getID;
            if (isQuoted) {
                if (key === m.quoted.id) {
                    if (!m.arg[0]) return m.reply("Silahkan balas pesan, masukkan angka sesuai nomor!")
                    if (parseInt(m.arg[0]) > result.length) return m.reply("Pilihan angka tidak ada!")
                    let choice = result[parseInt(m.arg[0])-1]
                    if (user.limit <= 8) {
                        m.reply(`[❗] Your limit has been exhausted.\nPlease upgrade to a premium user to enjoy unlimited access without any limits.`)
                    } else {
                        m.react("⏳");
                        await sock.sendFile(m.from, choice.thumbnail, choice.title, `
📌 *ᴊᴜᴅᴜʟ:* ${choice.title}
⏲️ *ᴘᴜʙʟɪꜱʜ:* ${choice.published_at}
⌚ *ᴅᴜʀᴀꜱɪ:* ${choice.duration}
👁️ *ᴅɪʟɪʜᴀᴛ:* ${choice.views}
🔗 *ᴜʀʟ:* ${choice.url}

${config.text.ty}`.trim(), m);

            const response = await functions.api("api/ytmp3", choice.url);
            const dl = response.result.link;
            await sock.sendFile(m.from, dl, choice.title, "", m, {thumbnail: choice.thumbnail});
            temp.delete(id);
                        if (!(isOwner || isPremium)) {
                            m.react("📥");
                            user.limit -= 8;
                            m.reply(`8 𝐿𝒾𝓂𝒾𝓉 𝓉𝑒𝓇𝓅𝒶𝓀𝒶𝒾 ✔️ \n _ꜱɪꜱᴀ ʟɪᴍɪᴛ ᴀɴᴅᴀ:_ ${user.limit}`);
                        }
                    }
                }
            }
        }
    },
    run: async(m, {
        sock,
        text,
        config,
        functions,
        temp
    }) => {
        temp = temp || new Map();
        const id = "yts-"+m.from;
        if (!text) throw "✳️ What do you want me to search for on YouTube?";
        let data = await functions.api("api/ytsearch", text);
        let teks = data.result.map((v, i) => `\n▶️ *ɴᴏᴍᴏʀ:* ${i+1}\n📌 *ᴊᴜᴅᴜʟ:* ${v.title}\n🔗 *ᴜʀʟ:* ${v.url}\n⏲️ *ᴘᴜʙʟɪꜱʜ:* ${v.published_at}\n⌚ *ᴅᴜʀᴀꜱɪ:* ${v.duration}\n👁️ *ᴅɪʟɪʜᴀᴛ:* ${v.views}`.trim()).filter( v => v).join("\n\n*<==== 「"+config.name.bot+"」 ====>*\n\n");
        let key = await sock.sendFile(m.from, data.result[0].thumbnail, "", "*─「 ★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★ 」─*\n\nᴮᵃˡᵃˢ ᵈᵃⁿ ᵏⁱʳⁱᵐ ˢᵉˢᵘᵃⁱ ᵃⁿᵍᵏᵃ!\n\n" + teks, m);
        const timer = setTimeout(() => {
            temp.delete(id);;
            data = null;
        },  120000)
        temp.set(id, [key.key.id, data.result, timer]);
    }
}