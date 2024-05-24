export default {
    name: "capcut",
    command: ["capcut"],
    tags: "download",
    desc: "Search or Download videos from capcut.",
    customPrefix: "",
    example: "",
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
async function downloadCapcut(Url) {
    try {
        const token = Url.match(/\d+/)[0];
        const response = await axios.get(`https://ssscapcut.com/api/download/${token}`, {
        headers: {
            "Accept": "/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 13; CPH2217 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36",
            "X-Requested-With": "acr.browser.barebones",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://ssscapcut.com/",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": "sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515"
        }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        m.log(error);
        throw error;
    }
}

async function searchTemplates(s) {
    try {
        const response = await axios.get("https://capcut-templates.com/?s=" + s);
        const html = response.data;
        const $ = cheerio.load(html);
        const elements = $("main#main div.ct-container section div.entries article");

        const detailPromises = elements.map(async (index, element) => {
            const link = $(element).find("a.ct-image-container").attr("href");
            const detail = await detailTemplates(link);
            const imageSrc = $(element).find("img").attr("src");
            const title = $(element).find("h2.entry-title a").text().trim();

            return {
                id: $(element).attr("id"),
                link,
                detail,
                imageSrc,
                title
            };
        }).get();

        return Promise.all(detailPromises);
    } catch (error) {
        m.log(error);
        throw error;
    }
}

async function detailTemplates(link) {
    try {
        const response = await axios.get(link);
        const html = response.data;
        const $ = cheerio.load(html);
        const elements = $("main#main div.ct-container-full article");

        return elements.map((index, element) => ({
            id: $(element).attr("id"),
            time: $("main#main").find("time.ct-meta-element-date").text().trim(),
            template: $(element).find(".wp-block-buttons .wp-block-button a").attr("data-template-id"),
            link: $(element).find("a.wp-block-button__link").attr("href"),
            imageSrc: $(element).find("video").attr("poster"),
            title: $(element).find("h2").text().trim(),
            videoSrc: $(element).find("video source").attr("src"),
            description: $(element).find(".entry-content p").text().trim()
        })).get();
    } catch (error) {
        m.log(error);
        throw error;
    }
}

let lister = [ "search", "down"]
let [feature, inputs] = text.split(".")
if (!lister.includes(feature)) throw ("*Example:*\n.capcut search.query\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
if (lister.includes(feature)) {

    if (feature == "search") {
        if (!inputs) throw (`Input query link\nExample: .capcut search.link`);
        try {
            let res = searchTemplates(inputs);
            let teks = res.map((item, index) => {
                return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *url:* ${item.link}
🖼️ *image:* ${item.detail[0].imageSrc}
🔖 *name:* ${item.detail[0].link}
📅 *time:* ${item.detail[0].time}
📄 *template:* ${item.detail[0].template}
🎥 *video:* ${item.detail[0].videoSrc}
📝 *description:* ${item.detail[0].description}
`

            }).filter(v => v).join("\n\n________________________\n\n")
            m.reply(teks, { font: true});
        } catch (e) {
            m.reply(eror, { font: true});
        }
    }

    if (feature == "down") {
        if (!inputs) throw (`Input query url link!\nExample: .capcut down.link`)
        try {
            let item = await downloadCapcut(inputs)
            let cap = `🔍 *[ RESULT ]*

📢 *title:* ${item.title}
📝 *description:* ${item.description}
💡 *usage:* ${item.usage}
🎥 *original video URL:* ${item.originalVideoUrl}
`

            sock.sendFile(m.from, item.originalVideoUrl || logo, "", cap || "Not know.", m, { font: true});
        } catch (e) {
            m.reply(eror)
        }
    }
}
    }
    }