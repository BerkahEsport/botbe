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
    name: "on",
    command: ["on", "off"],
    tags: "owner",
    desc: "Menyalakan atau mematikan fitur.",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: true,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        prefix,
        noPrefix,
        command,
        arg,
        args,
        text,
        sock,
        commands,
        cmd,
        name,
        user,
        settings,
        stats,
        isQuoted,
        isGroup,
        isAdmin,
        isBotAdmin,
        admin,
        metadata,
        participants,
        store,
        config,
        functions,
        axios,
        cheerio
    }) => {
        switch (command) {
            case "on":
                switch (args[0]) {
                    case "autoai":
                        settings.autoai = true;
                        m.reply(`Fitur auto ai berhasil dinyalakan!`)
                        break;
                
                    default:
                        break;
                }
                break;
            case "off":
                switch (args[0]) {
                    case "autoai":
                        settings.autoai = false;
                        m.reply(`Fitur auto ai berhasil dimatikan!`)
                        break;
                
                    default:
                        break;
                }
            break
        
            default:
                m.reply(`Fitur switch yang dapat digunakan:\n\n1. autoai\nBot dapat merespon otomatis di private chat dan merespon otomatis di group jika di tag.`)
                break;
        }
    }
}