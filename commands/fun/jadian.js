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
    name: "jadian",
    command: ["jadian"],
    tags: "fun",
    desc: "Watching bots randomly search for partners.",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: true,
    isPrivate: false,
    run: async(m, {
        participants,
        functions
    }) => {
        let toM = a => "@" + a.split("@")[0];;
        let ps = participants.map(v => v.id);
        let a = functions.random(ps);
        let b;
        do b = functions.random(ps);
        while (b === a)
        m.reply(`   *★彡[^_^ ᴊᴀᴅɪᴀɴ ^_^]彡★* \n\n${toM(a)} ❤️ ${toM(b)}`, {
            mentions: [a, b]
        })
    }
}