export default {
    name: "profile",
    command: ["profile"],
    tags: "main",
    desc: "View your or other users' profile status.",
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
        functions
    }) => {
        let who = m.mentions && m.mentions[0] ? m.mentions[0] : m.fromMe ? sock.user.jid : m.sender
        let username = sock.getName(who)
        let str = `❏───❏ *ᴘʀᴏꜰɪʟᴇ* ❏───❏
💌 • *Nickname:* ${username || `@${who.split`@`[0]}`} 
🎐 • *Username:* ${global.db.users[who].registered ? global.db.users[who].name : username}
📧 • *Tag:* @${who.replace(/@.+/, "")}
📞 • *Number:* ${who.replace("@s.whatsapp.net", "")}
🔗 • *Link:* https://wa.me/${who.split`@`[0]}
🎨 • *Age:* ${global.db.users[who].registered ? global.db.users[who].age : "-"}
🌟 • *Premium:* ${global.db.users[who].premium ? "✅" :"❌"} ${global.db.users[who].premium ? 
`\n⏰ • *PremiumTime:* ${functions.runtime(global.db.users[who].premiumTime)}` : ""} 
📑 • *Registered:* ${global.db.users[who].registered ? "✅": "❌"}`.trim()
        sock.sendFile(m.from, await sock.profilePictureUrl(who, "image").catch(_ => "./src/avatar_contact.png"), `Profile_`, str, m, {font: true})
    }
}