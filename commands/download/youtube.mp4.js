export default {
    name: "ytmp4",
    command: ["ytmp4"],
    tags: "download",
    desc: "Download file mp4 with link youtube...",
    customPrefix: "",
    example: "%prefix%command https://youtu.be/jySbH-dLrYA",
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
        const { thumbnail, video: _video, title } = await youtubedl(functions.isUrl(text)[0]).catch(async _ => await youtubedlv2(functions.isUrl(text)[0]))
        const limitedSize = (isPremium || isOwner ? 200 : 80) * 1024
        let isLimit = limitedSize < _video.fileSize
        let dl_url = await _video["128kbps"].download()
        if (isLimit) throw ("File yang anda unduh melebihi batas maksimal. Jika ingin maksimal silahkan menjadi member Premium.")
        if (!isLimit) sock.sendFile(m.from, dl_url,  title, `
*⭓─❖『 YOUTUBE 』❖─⭓*

*✣ Title:* ${title}
*✣ Type:* mp4
*✣ URL:* ${text || "-"}
`.trim(), m, { asDocument: true, thumb: thumbnail, font: true}) 
        }
    }