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
        functions,
        users
    }) => {
        const who = m.mentions && m.mentions[0] ? m.mentions[0] : m.fromMe ? sock.user.jid : m.sender;
        const username = sock.getName(who);
        const pp = await sock.profilePictureUrl(who, "image").catch(_ => "./src/avatar_contact.png");
        const str = `❏───❏ *ᴘʀᴏꜰɪʟᴇ* ❏───❏
💌 • *Nickname:* ${username || `@${who.split`@`[0]}`} 
🎐 • *Username:* ${users[who].registered ? users[who].name : username}
📧 • *Tag:* @${who.replace(/@.+/, "")}
📞 • *Number:* ${who.replace("@s.whatsapp.net", "")}
🔗 • *Link:* https://wa.me/${who.split`@`[0]}
🎨 • *Age:* ${users[who].registered ? users[who].age : "-"}
🌟 • *Premium:* ${users[who].premium ? "✅" :"❌"} ${users[who].premium ? 
`\n⏰ • *PremiumTime:* ${functions.runtime(users[who].premiumTime)}` : ""} 
📑 • *Registered:* ${users[who].registered ? "✅": "❌"}`.trim()
        sock.sendFile(m.from, pp, `Profile_`, str, m, {font: true})
    }
}