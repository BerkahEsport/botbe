/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 6289654279897

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
        const data = await functions.fetchJson(api+"play?text="+text);

        let caption = functions.list(data.result, "YOUTUBE PLAY")
        sock.sendFile(m.from, data.result.thumbnail_formats[0].url, "", caption, m);
        try {
            await sock.sendFile(m.from, data.result.link, data.result.title, "", m, {mime: "audio/mpeg"});
        } catch(e) {
            m.log(e);
            const dl = await youtube.download(data.result.videoUrl);
            await sock.sendFile(m.from, dl.audio.dlurl, data.result[0].title, "", m, {mime: "audio/mpeg"});
        }
        }
}