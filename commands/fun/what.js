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
    name: ["apakah", "kapan"],
    command: ["apakah", "kapan"],
    tags: "fun",
    desc: "",
    customPrefix: "",
    example: "Aku pintar?",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        noPrefix,
        functions
    }) => {
        switch (command) {
            case "apakah":
                m.reply(`*ℙ𝕖𝕣𝕥𝕒𝕟𝕪𝕒𝕒𝕟:* ${noPrefix}\n*𝕁𝕒𝕨𝕒𝕓𝕒𝕟:* ${functions.random(["𝐘𝐚", "𝐌𝐮𝐧𝐠𝐤𝐢𝐧 𝐢𝐲𝐚", "𝐌𝐮𝐧𝐠𝐤𝐢𝐧", "𝐌𝐮𝐧𝐠𝐤𝐢𝐧 𝐭𝐢𝐝𝐚𝐤", "𝐓𝐢𝐝𝐚𝐤", "𝐓𝐢𝐝𝐚𝐤 𝐦𝐮𝐧𝐠𝐤𝐢𝐧"])}`.trim());
            break;
            case "kapankah":
                m.reply(`*ℙ𝕖𝕣𝕥𝕒𝕟𝕪𝕒𝕒𝕟:* ${noPrefix}\n*𝕁𝕒𝕨𝕒𝕓𝕒𝕟:* ${functions.randomInt(1, 100)} ${functions.random(["ᴅᴇᴛɪᴋ", "ᴍᴇɴɪᴛ", "ᴊᴀᴍ", "ʜᴀʀɪ", "ᴍɪɴɢɢᴜ", "ʙᴜʟᴀɴ", "ᴛᴀʜᴜɴ", "ᴅᴇᴋᴀᴅᴇ", "ᴀʙᴀᴅ"])} ʟᴀɢɪ ...`.trim(), { mentions: m.mentions});
            break;
            default:
            break;
        }
    }
}