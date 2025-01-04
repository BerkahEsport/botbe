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
    name: "distance",
    command: ["distance"],
    tags: "tools",
    desc: "To see the distance traveled between regions.",
    customPrefix: "",
    example: "Boyolali.Solo",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        sock,
        axios,
        cheerio
    }) => {
        async function jarak(from, to) {
            let html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + from + ' ke ' + to)}&hl=id`)).data;
            let $ = cheerio.load(html), obj = {};
            let img = html.split("var s=\'")?.[1]?.split("\'")?.[0];
            obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : '';
            obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim();
            return obj;
        }
        let [from, to] = text.split`.`;
        let data = await jarak(from, to);
        if (data.img) return sock.sendFile(m.from, data.img, "Distance", data.desc, m, { font: true});
        else m.reply(data.desc, { font: true});
    }
}