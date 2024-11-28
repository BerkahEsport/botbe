export default {
    name: "get",
    command: ["get", "fetch"],
    tags: "tools",
    desc: "Download data from url...",
    customPrefix: "",
    example: "https://google.com",
    limit: 5,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        axios,
        functions
    }) => {
        async function checkHeader(url) {
            let response = await axios.get(url, { "headers": { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.3752 Safari/537.36" } })
            const headers = response.headers['content-type']
            return { headers: headers, data: response.data }
            }
        function addProtocol(url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                return `https://${url}`;
            } else {
                return url;
            }
        }
        const list_headers = ['audio/mpeg', 'audio/ogg', 'audio/mp4', 'image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'video/mpeg', 'video/mp4'];
        let newUrl = addProtocol(text);
        let res = await checkHeader(newUrl);
        if (list_headers.includes(res.headers)) {
            await m.reply(await (await functions.fetchBuffer(text)).data);
        } else if (res.headers.includes('text/html')) {
            m.reply(res.data);
        } else {
            m.reply(JSON.stringify(res.data, null, 2));
        }
    }
}