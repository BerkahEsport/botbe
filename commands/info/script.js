export default {
    name: "script",
    command: ["script", "sc"],
    tags: "main",
    desc: "LOOK at this bot's script code.",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        sock,
        config
    }) => {
        const caption = `*★彡[ꜱᴄʀɪᴘᴛ ʙᴏᴛʙᴇ]彡★*

*Link SC:* _https://github.com/BerkahEsport/botbe_

_Gunakan dengan bijak, jangan lupa kasih bintang. Terima kasih._

*Contact Owner:* _https://wa.me/${config.number.owner}_`.trim();
        await sock.sendFile(m.from, "./src/qrbe.jpg", "", caption, m);
    }
}