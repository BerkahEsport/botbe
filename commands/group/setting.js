export default {
name: ["group"],
command: ["group"],
tags: "group",
desc: "Mengatur grup di buka atau ditutup.",
customPrefix: "",
example: "",
limit: false,
isOwner: false,
isPremium: false,
isBotAdmin: true,
isAdmin: true,
isGroup: true,
isPrivate: false,
run: async(m, {
    prefix,
    command,
    args,
    sock
}) => {
    let isClose = {
        "open": "not_announcement",
        "close": "announcement",
    }[(args[0] || "")];
    if (isClose === undefined) throw (`*ꜰᴏʀᴍᴀᴛ ꜱᴀʟᴀʜ! ᴄᴏɴᴛᴏʜ :*
*○ ${prefix + command} close*
*○ ${prefix + command} open*`.trim());
    await sock.groupSettingUpdate(m.from, isClose);
    }
}