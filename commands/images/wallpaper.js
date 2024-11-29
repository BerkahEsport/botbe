export default {
    name: "wallpaper",
    command: ["wallpaper", "wall"],
    tags: "images",
    desc: "Looking for images from the wallaperflare site...",
    customPrefix: "",
    example: "naruto",
    limit: 3,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        prefix: usedPrefix,
        text,
        sock,
        config,
        axios,
        cheerio,
        functions
    }) => {
        async function wallpaper(query) {
            try {
                const { data } = await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query, {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
                    }
                });
                const $ = cheerio.load(data);
                const result = [];
                $('#gallery > li > figure > a').each(function (a, b) {
                    result.push($(b).find('img').attr('data-src'));
                });
                return result;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        let data = await wallpaper(text);
        if (data.length === 0) throw (`Image search results ${text} not found!`);
        let card = data.map((data) => ({
                                header: data.split('/').pop().split('.jpg')[0].split('-').join(' ').toUpperCase(),
                                url: data,
                                title: data,
                                description: config.name.bot
                            }))
        let cards = functions.card(card, "url", "header", config.text.ty )
        sock.sendCarousel(m.from, `*List of found wallpapers: ${data.length} image*`, config.name.bot, cards);
    }
}