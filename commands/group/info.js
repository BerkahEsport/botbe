export default {
    name: "infogroup",
    command: ["infogroup"],
    tags: "group",
    desc: "To view group information.",
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
    const { sWelcome, sBye, isBanned, welcome, antiBot, antiLink} = global.db.groups[m.from]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split("@")[0]}`).join("\n")
    const owner = metadata.owner || groupAdmins.find(p => p.admin === "superadmin")?.id || m.from.split`-`[0] + "@s.whatsapp.net"
    let now = +new Date() * 1
    let caption = `*「 Group Information 」*\n
*ID:* 
${metadata.id}
*Name:* 
${metadata.subject}
*Description:* 
${metadata.desc?.toString() || "-"}
*Total Members:*
${participants.length} Members
*Group Owner:* 
@${owner.split("@")[0]}
*Group Admins:*
${listAdmin}
*Group Settings:*
${isBanned ? "✅" : "❌"} Banned
${welcome ? "✅" : "❌"} Welcome
${antiLink ? "✅" : "❌"} Anti Link
${antiBot ? "✅" : "❌"} Anti Bot

*Rental period* : ${now < global.db.groups[m.from].expired ? msToDate(global.db.groups[m.from].expired - now) : "-"}
*Message Settings:*
Welcome: ${sWelcome || "-"}
Bye: ${sBye || "-"}
`.trim()
    sock.sendFile(m.from, await sock.profilePictureUrl(m.from, "image").catch(_ => "./src/avatar_contact.png"), "infogroup.jpg", caption, m, 
    { mentions: [...groupAdmins.map(v => v.id), owner], font: true})
    }
}