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
    name: "kerangajaib",
    command: ["kerangajaib"],
    tags: "fun",
    desc: "",
    customPrefix: "",
    example: "Apakah dia cinta sama aku?",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        functions
    }) => {
        m.reply(`${functions.random(["ᴍᴜɴɢᴋɪɴ ꜱᴜᴀᴛᴜ ʜᴀʀɪ", "ᴛɪᴅᴀᴋ ᴊᴜɢᴀ", "ᴛɪᴅᴀᴋ ᴋᴇᴅᴜᴀɴʏᴀ", "ᴋᴜʀᴀꜱᴀ ᴛɪᴅᴀᴋ", "ʏᴀ", "ᴄᴏʙᴀ ᴛᴀɴʏᴀ ʟᴀɢɪ", "ᴛɪᴅᴀᴋ ᴀᴅᴀ"])}.`);
    }
}