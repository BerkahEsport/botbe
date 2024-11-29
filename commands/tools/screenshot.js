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
        args,
        sock,
        functions
    }) => {
        let ss = await (await functions.fetchBuffer(`https://image.thum.io/get/fullpage/${args[0].startsWith("http") ? args[0] : "https://"+args[0]}`)).data
        sock.sendFile(m.from, ss, "screenshot.png", args[0], m, { font: true})
    }
}