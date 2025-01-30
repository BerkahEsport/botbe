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
    name: ["halah", "heleh", "hilih", "holoh", "huluh"],
    command: ["halah", "heleh", "hilih", "holoh", "huluh"],
    tags: "fun",
    desc: "Changing the alphabet to something weird.",
    customPrefix: "",
    example: "Apaan tuh!",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        command,
        text
    }) => {
        let ter = command[1].toLowerCase()
        await m.reply(text.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
    
    }
}