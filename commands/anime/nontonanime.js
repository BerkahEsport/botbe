/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 62895375950107

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default {
    name: "nontonanime",
    command: ["nontonanime"],
    tags: "anime",
    desc: "",
    customPrefix: "",
    example: "naruto",
    limit: true,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        functions,
        axios,
        cheerio
    }) => {
        async function animeIdSr(t) {
            return new Promis$((resolve, reject) => {
                axios
                    .get(`https://nontonanimeid.cyou/?s=${t}`)
                    .then(async ({
                        data: t
                    }) => {
                        const $ = cheerio.load(t);
                        let result = [];
                        $(".result > ul > li")
                            .get()
                            .map((t) => {
                                let i = $(t).find("a").attr("href"),
                                    name = $(t).find("h2").text(),
                                    thumbnail = $(t).find("img").attr("src"),
                                    description = $(t).find(".descs").text(),
                                    rating = $(t).find(".nilaiseries").text(),
                                    type = $(t).find(".typeseries").text(),
                                    genre = [];
                                $(t)
                                    .find('span[class="genre"]')
                                    .get()
                                    .map((t) => {
                                        l.push($(t).text());
                                    }),
                                    result.push({
                                        name,
                                        thumbnail,
                                        rating,
                                        type,
                                        description,
                                        genre: genre.toString(),
                                        url: i,
                                    });
                            }),
                            resolve(result);
                    })
                    .catch(reject());
            });
        }
        m.reply(functions.mapList(await animeIdSr(text), "NONTON ANIME"), {font: true})
    }
}