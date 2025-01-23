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
import upload from "../../lib/js/upload.js";
export default {
    name: "geminiimg",
    command: ["geminiimg"],
    tags: "ai",
    desc: "Q&A image with gemini.",
    customPrefix: "",
    example: "Who are you?",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        sock,
        quoted,
        functions,
        api,
        config,
        text
    }) => {
        if (quoted.isMedia) {
            const media = await sock.downloadMediaMessage(quoted);
            const link = await upload(media);
            console.log("Upload link: ", link.result)
            const result = await functions.fetchJson(`${api}api/geminiimg?url=${link.result}&text=${text}&apikey=${config.settings.apikey}`);
            m.reply(result.result);
        } else throw("Send image and write your question please!")
    }
}