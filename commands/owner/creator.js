export default {
    name: "owner",
    command: ["owner"],
    tags: "owner",
    desc: "View this bot's owner information.",
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
        functions
    }) => { 
        m.reply(functions.list({
            name: "berkahesport",
            address: "Boyolali",
            ig: "@berkahesport.id",
            github: "https://github.com/BerkahEsport"
        }, "Info Owner"), {font: true});
    }
}