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

import {youtube} from "../../lib/js/ytdl.js";
export default {
    name: "play",
    command: ["play"],
    tags: "tools",
    desc: "Looking for a list of YouTube videos...",
    run: async(m, {
        sock,
        text,
        functions,
        api
    }) => {
        if (!text) throw "✳️ What do you want me to search for on YouTube?";
        const data = await functions.fetchJson(api+"ytsearch?text="+encodeURIComponent(text));
        const dl = await youtube.download(data.result[0].url);
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