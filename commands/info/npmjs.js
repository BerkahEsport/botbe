export default {
    name: "npmjs",
    command: ["npmjs"],
    tags: "info",
    desc: "Look for module information from npmjs.",
    customPrefix: "",
    example: "axios",
    limit: false,
    isOwner: false,
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
    let result = await functions.fetchJson(`http://registry.npmjs.com/-/v1/search?text=${text}`)
    if (!result.objects.length) throw (`Query "${text}" not found :/`)
	m.reply(functions.mapList(result.objects, "NPMJS INFO"), { font: true})
    }
}