import { youtube } from "../../lib/js/ytdl.js";
export default {
    name: "ytmp3",
    command: ["ytmp3"],
    tags: "download",
    desc: "Download file mp3 with link youtube...",
    customPrefix: "",
    example: "https://youtu.be/jySbH-dLrYA",
    limit: 8,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {sock, args, text, command, prefix, functions, config, isPremium, isOwner}) => {
        if (!functions.isUrl(text, "youtu")) throw ("Enter the YouTube URL correctly!");
        const data = await youtube.download(text);
        await sock.sendFile(m.from, data.audio.dlurl, data.title, "", m, { asDocument: true});
    }
}