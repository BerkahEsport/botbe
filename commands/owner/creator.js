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
        sock,
        functions,
        config
    }) => {
        sock.sendContact(m.from, config.number.owner);
        m.reply(functions.list({
            name: config.name.bot,
            address: config.settings.address,
            ig: config.settings.ig,
            github: config.settings.github,
            email: config.settings.email
        }, "Info Owner"), {font: true});
    }
}