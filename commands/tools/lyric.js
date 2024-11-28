export default {
    name: "lyric",
    command: ["lyric"],
    tags: "tools",
    desc: "Looking for song lyrics...",
    customPrefix: "",
    example: "https://genius.com/Noah-band-andaikan-kau-datang-lyrics",
    limit: 1,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        sock,
        functions,
        axios,
        cheerio
    }) => {
        // Scrape lyric.
        async function scrapeLyrics(url) {
            try {
                const response = await axios.get(url);
                const data = await response.data;
                const $ = cheerio.load(data);
                const result = $('.Lyrics__Container-sc-1ynbvzw-1').text();
                const lyric = result.replace(/(\[[A-Za-z\s0-9\-]+\])/g, '\n\n$1\n');
                return lyric.trim();
            } catch (error) {
                throw error;
            }
        }
        async function searchLyric(query, page = "1") {
        const data = await functions.fetchJson(`https://genius.com/api/search/song?q=${query}&page=${page}`);
                    const results = data.response.sections[0].hits.map((x) => x.result);
                    const res = []
                    for (const result of results)
                        res.push({
                            title: result.title,
                            fullTitle: result.full_title,
                            artist: result.artist_names,
                            image: result.header_image_url,
                            url: result.url
                        })
            return res;
        }

        try {
            if (text.startsWith("https://genius.com/")) {
                const data = await scrapeLyrics(text);
                sock.reply(m.from, `${data}`.trim(), m, {thumbnail: data.image});
            } else {
                const result = await searchLyric(text);
                m.reply(functions.mapList(result, "LYRIC RESULTS"));
            }
        } catch(e) { 
            await m.report(e);
            throw (`Lyrics not found... :(`);
        }
    }
}