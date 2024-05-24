import { facebookdl, facebookdlv2 } from "@bochilteam/scraper"
export default {
    name: "facebook",
    command: ["facebook", "fb"],
    tags: "download",
    desc: "Download facebook with link...",
    customPrefix: "",
    example: "https://www.facebook.com/DramaFacbook21/videos/1775049149358700/?app=fbl",
    limit: 3,
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
    let data =  await facebookdl(text).catch(async _ => await facebookdlv2(text))
    sock.sendFile(m.from, data.result[0].url, `FB`, config.name.bot, m)
  }
}