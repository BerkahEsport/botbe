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
    before: async (m, {
        sock,
        isOwner,
        isPremium,
        isQuoted,
        user,
        config,
        functions,
        api
    }) => {
        sock.yts = sock.yts ? sock.yts : {}
        if (m.from in sock.yts) {
            if (isQuoted) {
                if (sock.yts[m.from][0].id === m.quoted.id) {
                    if (!m.arg[0]) return m.reply("Silahkan balas pesan, masukkan angka sesuai nomor!")
                    if (parseInt(m.arg[0]) > sock.yts[m.from][1].length) return m.reply("Pilihan angka tidak ada!")
                    let choice = sock.yts[m.from][1][parseInt(m.arg[0])-1]
                    if (user.limit <= 8) {
                        m.reply(`[❗] Your limit has been exhausted.\nPlease upgrade to a premium user to enjoy unlimited access without any limits.`)
                    } else {
                        m.react("⏳");
                        await sock.sendFile(m.from, choice.thumbnail, choice.title, `
📌 *ᴊᴜᴅᴜʟ:* ${choice.title}
⏲️ *ᴘᴜʙʟɪꜱʜ:* ${choice.ago}
⌚ *ᴅᴜʀᴀꜱɪ:* ${choice.timestamp}
👁️ *ᴅɪʟɪʜᴀᴛ:* ${choice.views}
🔗 *ᴜʀʟ:* ${choice.url}

${config.text.ty}`.trim(), m);

            const response = await functions.fetchJson(`${api}api/ytmp3?url=${choice.url}&apikey=${config.setting.apikey}`);
            const dl = response.result.link;
            await sock.sendFile(m.from, dl, choice.title, "", m, {thumbnail: choice.thumbnail});
                        if (!(isOwner || isPremium)) {
                            m.react("📥");
                            user.limit -= 8;
                            m.reply(`8 𝐿𝒾𝓂𝒾𝓉 𝓉𝑒𝓇𝓅𝒶𝓀𝒶𝒾 ✔️ \n _ꜱɪꜱᴀ ʟɪᴍɪᴛ ᴀɴᴅᴀ:_ ${user.limit}`);
                        }
                    }
                }
            }
        }
    }
}