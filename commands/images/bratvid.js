/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 62895375950107

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default {
    name: "bratvideo",
    command: ["bratvideo", "bratvid"],
    tags: "images",
    desc: "Convert text to sticker video Brat.",
    customPrefix: "",
    example: "Botbe is the best 🏆",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        quoted,
        functions
    }) => {
        const result = await functions.api("api/bratvideo", quoted.text);
        m.reply(result.result, {asSticker: true});
    }
}