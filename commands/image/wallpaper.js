export default {
    name: "wallpaper",
    command: ["wallpaper", "wall"],
    tags: "image",
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
    
let data = await wallpaper(text)
if (data.length === 0) throw (`Image search results ${text} not found!`)
sock.sendButton(m.from, "*List of found wallpapers:*", config.name.bot, data[0],
            [['Next', `${usedPrefix}get ${data[1]}`]],
            [[config.name.bot, "https://tinyurl.com/berkahesport"]], // Link
            [["Result Here", [{
                title: "Top",
                highlight_label: "Top match",
                rows: [{
                    header: data[0].split('/').pop().split('.jpg')[0].split('-').join(' ').toUpperCase(),
                    id: `${usedPrefix}get ${data[0]}`,
                    title: data[0],
                    description: data[0].split('/').pop().split('.jpg')[0].split('-').join(' ').toUpperCase()
                }]
            },
            {
                title: "More",
                rows: data.map((data) => ({
                    header: data.split('/').pop().split('.jpg')[0].split('-').join(' ').toUpperCase(),
                    id: `${usedPrefix}get ${data}`,
                    title: data,
                    description: config.name.bot
                }))
            }
        ]]], // List
            m);
    }
}