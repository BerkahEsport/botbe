export default {
    name: "screenshot",
    command: ["screenshot", "ss"],
    tags: "tools",
    desc: "To see screenshots of certain sites.",
    customPrefix: "",
    example: "https://moexti.jw.lt/",
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
let ss = await (await functions.fetchBuffer(`https://image.thum.io/get/fullpage/${args[0].startsWith("http") ? args[0] : "https://"+args[0]}`)).data
sock.sendFile(m.from, ss, "screenshot.png", args[0], m, { font: true})
    }
    }