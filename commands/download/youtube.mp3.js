import { youtubedl, youtubedlv2 } from "@bochilteam/scraper";
export default {
    name: "ytmp3",
    command: ["ytmp3"],
    tags: "download",
    desc: "Download file mp3 with link youtube...",
    run: async(m, {sock, args, text, command, prefix, functions, config, isPremium, isOwner}) => {
        const { thumbnail, audio: _audio, title } = await youtubedl(functions.isUrl(text)[0]).catch(async _ => await youtubedlv2(functions.isUrl(text)[0]))
        const limitedSize = (isPremium || isOwner ? 200 : 80) * 1024
        let isLimit = limitedSize < _audio.fileSize
        let dl_url = await _audio["128kbps"].download()
        if (isLimit) throw ("File yang anda unduh melebihi batas maksimal. Jika ingin maksimal silahkan menjadi member Premium.")
        if (!isLimit) sock.sendFile(m.from, dl_url,  title, `
*⭓─❖『 YOUTUBE 』❖─⭓*

*✣ Title:* ${title}
*✣ Type:* mp3
*✣ URL:* ${text || "-"}
`.trim(), m, { asDocument: true, thumb: thumbnail, font: true})
    },
    customPrefix: "",
    example: "%prefix%command https://youtu.be/jySbH-dLrYA",
    limit: 2,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false
}