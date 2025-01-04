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
        text,
        sock,
        config,
        axios,
        cheerio,
        functions,
        api
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
        try {
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
        } catch (e) {
            const data = await functions.fetchJson(`${api}api/wallpaper?text=${text}&apikey=${config.setting.apikey}`);
            let images = data.result.slice(0, 5);
            for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [images[i], images[j]] = [images[j], images[i]];
            }
            for (let i = 0; i < 3; i++) {
                let imageUrl = images[i];
                await sock.sendFile(m.from, imageUrl, "Wallpaper", imageUrl, m);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
}