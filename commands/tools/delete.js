export default {
    name: "delete",
    command: ["delete", "del"],
    tags: "tools",
    desc: "To delete messages via bot.",
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
        isGroup
    }) => {
        if (isGroup && m.isQuoted) {
            if (!m.isQuoted) throw ("_Cannot delete the message, because the bot is not a group admin._")
            sock.sendMessage(m.quoted.from, { delete: m.quoted.key })
        } else if (m.isQuoted) {
            if (!m.quoted.fromMe) throw ("_Cannot delete the message, because the message was not sent by a bot._")
        sock.sendMessage(m.quoted.from, { delete: m.quoted.key })
        } else throw ("_Reply to messages to be deleted by bot!_")
    }
}