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
    name: ["howgay", "howpintar", "howcantik", "howganteng", "howgabut", "howgila", "howlesbi", "howstress", "howbucin", "howjones", "howsadboy"],
    command: ["howgay", "howpintar", "howcantik", "howganteng", "howgabut", "howgila", "howlesbi", "howstress", "howbucin", "howjones", "howsadboy"],
    tags: "fun",
    desc: "View random physical values ​​from bots.",
    customPrefix: "",
    example: "diriku?",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        command,
        text,
        sock,
        functions
    }) => {
        const how = `★彡[ *${command.toUpperCase()}* ]彡★

*${text}* is *${functions.randomInt(1, 100)}*% ${command.replace("how", "").toUpperCase()}`.trim();
        sock.reply(m.from, how, m, { mentions : m.mentions });
    }
}