/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 62895375950107

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

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
    // If error please update on terminal: $ npm install @whiskeysockets/baileys@WhiskeySockets/Baileys#fix/missing-messages
    // Source: https://github.com/WhiskeySockets/Baileys/pull/732#issuecomment-2058128554
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