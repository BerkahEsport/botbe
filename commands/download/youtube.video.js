import { youtubedl, youtubedlv2 } from "@bochilteam/scraper";
export default {
    name: "ytv",
    command: ["ytv"],
    tags: "download",
    desc: "Download video file with link youtube...",
    customPrefix: "",
    example: "https://youtu.be/jySbH-dLrYA",
    limit: 10,
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
        name,
        user,
        settings,
        stats,
        isOwner,
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
        if (!functions.isUrl(text, "youtu")) throw ("Enter the YouTube URL correctly!")
        const { thumbnail, video: _video, title } = await youtubedl(functions.isUrl(text)[0]).catch(async _ => await youtubedlv2(functions.isUrl(text)[0]))
        const limitedSize = (isPremium || isOwner ? 200 : 80) * 1024
        let isLimit = limitedSize < _video.fileSize
        let dl_url = await _video["360p"].download()
        if (isLimit) throw ("The file you downloaded exceeds the maximum limit. If you want the maximum, please become a Premium member.")
        if (!isLimit) sock.sendFile(m.from, dl_url,  title, `
*⭓─❖『 YOUTUBE 』❖─⭓*

*✣ Title:* ${title}
*✣ Type:* mp4
*✣ URL:* ${text || "-"}
`.trim(), m, { thumb: thumbnail, font: true}) 
        }
    }