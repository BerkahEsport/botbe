import yts from "yt-search";
export default {
    name: "ytsearch",
    command: ["ytsearch", "yts"],
    tags: "tools",
    desc: "Looking for a list of YouTube videos...",
    run: async(m, {
        sock,
        text,
        config
    }) => {
        if (!text) throw "✳️ What do you want me to search for on YouTube?";
        let results = await yts(text);
        let data = results.all.filter(item => item.type === "video");
        let teks = data.map((v, i) => `\n▶️ *ɴᴏᴍᴏʀ:* ${i+1}\n📌 *ᴊᴜᴅᴜʟ:* ${v.title}\n🔗 *ᴜʀʟ:* ${v.url}\n⏲️ *ᴘᴜʙʟɪꜱʜ:* ${v.ago}\n⌚ *ᴅᴜʀᴀꜱɪ:* ${v.timestamp}\n👁️ *ᴅɪʟɪʜᴀᴛ:* ${v.views}`.trim()).filter( v => v).join("\n\n*<==== 「"+config.name.bot+"」 ====>*\n\n");
        let id = await sock.sendFile(m.from, data[0].image, "", "*─「 ★彡[ʏᴏᴜᴛᴜʙᴇ ꜱᴇᴀʀᴄʜ]彡★ 」─*\n\nᴮᵃˡᵃˢ ᵈᵃⁿ ᵏⁱʳⁱᵐ ˢᵉˢᵘᵃⁱ ᵃⁿᵍᵏᵃ!\n\n" + teks, m);
        sock.yts = sock.yts ? sock.yts : {};
        sock.yts[m.from] = [{id: id.key.id}, data, setTimeout(() => {
            delete sock.yts[m.from];
            data = null;
        },  120000)];
    }
}