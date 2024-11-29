import ytSearch from "yt-search";
import {youtube} from "../../lib/js/ytdl.js";
export default {
    name: "play",
    command: ["play"],
    tags: "tools",
    desc: "Looking for a list of YouTube videos...",
    run: async(m, {
        sock,
        text
    }) => {
        if (!text) throw "✳️ What do you want me to search for on YouTube?";
        const { all: [bestItem, ...moreItems] } = await ytSearch(text);
        const videoItems = moreItems.filter(item => item.type === 'video');
        const populerItem = bestItem.type === 'video' ? bestItem : videoItems[0];
        const dl = await youtube.download(populerItem.url);
        let caption = `
👤 Pemilik: _${populerItem.author.name}_
🎥 Tipe: _${populerItem.type}_
🆔 ID: _${populerItem.videoId}_
📺 Judul: _${populerItem.title}_
⏱️ Durasi: _${populerItem.duration.seconds} detik_
⏰ Waktu: _${populerItem.timestamp} menit_
⌚ Tahun: _${populerItem.ago}_
👀 Dilihat: _${populerItem.views}x_
📝 Deskripsi: _${populerItem.description}_
🖼️ Gambar: _${populerItem.image}_
🖼️ Icon: _${populerItem.thumbnail}_
🔗 URL: _${populerItem.url}_`.trim()
        sock.sendFile(m.from, populerItem.thumbnail, "", caption, m);
        await sock.sendFile(m.from, dl.audio.dlurl, populerItem.title, "", m, {mime: "audio/mpeg"});
    }
}