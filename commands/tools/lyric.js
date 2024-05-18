export default {
    name: "lyric",
    command: ["lyric"],
    tags: "tools",
    desc: "Searching lyric song....",
    customPrefix: "",
    example: "%prefix%command menghapus jejakmu",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        prefix: usedPrefix,
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
    async function searchLyric(query, page = "1") {
    const data = await functions.fetchJson(`https://genius.com/api/search/song?q=${query}&page=${page}`)
                const results = data.response.sections[0].hits.map((x) => x.result)
                const res = []
                for (const result of results)
                    res.push({
                        title: result.title,
                        fullTitle: result.full_title,
                        artist: result.artist_names,
                        image: result.header_image_url,
                        url: result.url
                    })
                return res
    }
    try {
        if (text.startsWith("https://genius.com/")) {
            const data = await functions.fetchJson(`https://dikaardnt.com/api/search/lyrics/genius?url=${text}`)
            sock.reply(m.from, `<=== *[ ${data.title} ]* ===>
    
- ARTIS: _${data.artist}_
- UPDATE: _${data.uploadDate}_

*${data.lyric}

> ${config.name.bot}`.trim(), m, {thumb: data.image})
        } else {
        const result = await searchLyric(text)
        sock.sendButton(m.from, "LIST of LYRICS", config.name.bot, result[0].image,
            [['Menu List', `${usedPrefix}menu`]],
            [[config.name.bot, "https://tinyurl.com/berkahesport"]], // Link
            [["Result Here", [{
                title: "Best",
                highlight_label: "Best match",
                rows: [{
                    header: result[0].title,
                    id: `${usedPrefix+command} ${result[0].url}`,
                    title: result[0].artist,
                    description: result[0].fullTitle
                }]
            },
            {
                title: "More",
                rows: result.map(({
                    title,
                    url,
                    artist,
                    fullTitle
                }) => ({
                    header: title,
                    id: `${usedPrefix+command} ${url}`,
                    title: artist,
                    description: fullTitle
                }))
            }
        ]]], // List
            m);
//         m.reply(`*<==== [ Hasil Lirik ] ====>*

// Silahkan ketik ${prefix+command} [url]
// Contoh: _${prefix+command} https://genius.com/Peterpan-semua-tentang-kita-lyrics_


// ` + result.map((v, i) => `
// *[${i+1}]* *${v.title}*

// - *Judul:* ${v.fullTitle}
// - *Artis:* ${v.artist}
// - *URL:* _${v.url}_
// `.trim()).filter( v => v).join("\n\n> *<==== 「"+config.name.bot+"」 ====>*\n\n"), {thumb: result[0].image})
        }
        } catch(e) { 
        await m.report(e)
        throw (`Lirik tidak ditemukan... :(`)
        }
    }
}