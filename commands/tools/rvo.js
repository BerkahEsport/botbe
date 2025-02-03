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

import { downloadContentFromMessage } from "baileys";
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
        sock,
        isQuoted,
        quoted
    }) => {
        // If error please update on terminal: $ npm install baileysBaileys#fix/missing-messages
        // Source: https://github.com/WhiskeySockets/Baileys/pull/732#issuecomment-2058128554
        if (isQuoted) {
            let media = await sock.downloadMediaMessage(quoted);
        if (/video/.test(quoted.type)) {
            return await sock.sendFile(m.from, media, "media.mp4", quoted.body || "", m);
        } else if (/image/.test(quoted.type)) {
            return await sock.sendFile(m.from, media, "media.jpg", quoted.body || "", m);
        }
        } else throw ("Reply viewonce message!");
    }
}