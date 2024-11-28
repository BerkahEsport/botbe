import { downloadContentFromMessage } from "@whiskeysockets/baileys";
export default {
name: ["readviewonce"],
command: ["readviewonce", "rvo"],
tags: "tools",
desc: "Melihat pesan rvo menjadi terlihat!",
customPrefix: "",
example: "",
limit: true,
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
    fileName,
    user,
    settings,
    stats,
    isQuoted,
    quoted,
    isPremium,
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
        if (isQuoted) {
            let msg = m.quoted.message.viewOnceMessageV2.message;
            let type = Object.keys(msg)[0];
            let media = await downloadContentFromMessage(msg[type], type === "imageMessage" ? "image" : "video");
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
            }
            if (/video/.test(type)) {
            return await sock.sendFile(m.from, buffer, "media.mp4", msg[type].caption || "", m);
            } else if (/image/.test(type)) {
            return await sock.sendFile(m.from, buffer, "media.jpg", msg[type].caption || "", m);
            }
        } else throw ("Balas pesan readviewonce!")
    }
}