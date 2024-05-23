import { youtubedl, youtubedlv2 } from "@bochilteam/scraper";
export default {
    name: "yta",
    command: ["yta"],
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
        if (!functions.isUrl(text, "youtu")) throw ("Enter the YouTube URL correctly!")
        const { thumbnail, audio: _audio, title } = await youtubedl(functions.isUrl(text)[0]).catch(async _ => await youtubedlv2(functions.isUrl(text)[0]))
        const limitedSize = (isPremium || isOwner ? 200 : 80) * 1024
        let isLimit = limitedSize < _audio.fileSize
        let dl_url = await _audio["128kbps"].download()
        if (isLimit) throw ("The file you downloaded exceeds the maximum limit. If you want the maximum, please become a Premium member.")
        if (!isLimit) sock.sendFile(m.from, dl_url,  title, `
*⭓─❖『 YOUTUBE 』❖─⭓*

*✣ Title:* ${title}
*✣ Type:* mp3
*✣ URL:* ${text || "-"}
`.trim(), m, { thumb: thumbnail, font: true})
    }
}