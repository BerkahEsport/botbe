export default {
    name: "nontonanime",
    command: ["nontonanime"],
    tags: "anime",
    desc: "",
    customPrefix: "",
    example: "%prefix%commamd naruto",
    limit: false,
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
async function animeIdSr(t) {
    return new Promise((i, e) => {
        axios
            .get(`https://nontonanimeid.cyou/?s=${t}`)
            .then(async ({
                data: t
            }) => {
                const e = cheerio.load(t);
                let n = [];
                e(".result > ul > li")
                    .get()
                    .map((t) => {
                        let i = e(t).find("a").attr("href"),
                            a = e(t).find("h2").text(),
                            s = e(t).find("img").attr("src"),
                            d = e(t).find(".descs").text(),
                            r = e(t).find(".nilaiseries").text(),
                            o = e(t).find(".typeseries").text(),
                            l = [];
                        e(t)
                            .find('span[class="genre"]')
                            .get()
                            .map((t) => {
                                l.push(e(t).text());
                            }),
                            n.push({
                                name: a,
                                thumb: s,
                                stars: r,
                                type: o,
                                desc: d,
                                genre: l.toString(),
                                url: i,
                            });
                    }),
                    i(n);
            })
            .catch(e);
    });
}
m.reply(functions.mapList(await animeIdSr(text), "NONTON ANIME"), {font: true})
}
}