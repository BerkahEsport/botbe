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
        const caption = `*★彡[ꜱᴄʀɪᴘᴛ ${config.name.bot}]彡★*

*Link SC:* _${config.settings.script}_

_Gunakan dengan bijak, jangan lupa kasih bintang. Terima kasih._

*Contact Owner:* _https://wa.me/${config.number.owner}_`.trim();
        await sock.sendFile(m.from, "./src/qrbe.jpg", "", caption, m);
    }
}