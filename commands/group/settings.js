export default {
    name: "sWelcome",
    command: ["sWelcome", "sBye"],
    tags: "group",
    desc: "Useful for providing group member information.",
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
        switch(command) {
            case "sWelcome": {
                if (isQuoted) {
                    m.reply(`Welcome for users who have entered the group have been successfully changed
Become:

${m.quoted.body}`)
    global.db.groups[m.from].sWelcome = m.quoted.body || "-"
                } else {
                    m.reply(`Welcome for users who have entered the group have been successfully changed
Become:

${text}`)
    global.db.groups[m.from].sWelcome = text || "-"
                }
            }
            break
            case "sBye": {
                if (isQuoted) {
                    m.reply(`The Goodbye message to group users who left was successfully set.
Become:

${m.quoted.body}`)
    global.db.groups[m.from].sBye = m.quoted.body || "-"
                } else {
                    m.reply(`The Goodbye message to group users who left was successfully set.
    Become:

    ${text}`)
    global.db.groups[m.from].sBye = text || "-"
                }

            }
            break
        }
    }
}