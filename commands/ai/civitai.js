export default {
    name: "civitai",
    command: ["civitai"],
    tags: "ai",
    desc: "Search for images with civit ai.",
    customPrefix: "",
    example: "",
    limit: 5,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        sock,
        functions,
        args,
        config
    }) => {
            if (args[0]) {
                let json = await functions.fetchJson(`https://civitai.com/api/v1/models?sortBy=models_v9&query=${args[0]}`);
                let results = json.items[0].modelVersions[0].images;
                const cards = functions.card(results, "url");
                const jid = m.from;
                const body = "*CIVIT AI*";
                const footer = config.name.bot;
                sock.sendCarousel(jid, body, footer, cards);
            } else {
            let json = await functions.fetchJson('https://civitai.com/api/v1/models?limit=51&nsfw=true&modelType=LORA');
            let images = json.items[functions.randomInt(0, 50)].modelVersions[0].images;
            const limit = Math.min(images.length, 10);
            for (let i = 0; i < limit; i++) {
                m.reply(images[i].url);
                await functions.delay(3000);
            }
        }
    }
}