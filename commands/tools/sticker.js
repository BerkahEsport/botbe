export default {
	name: "sticker",
	command: ["sticker", "s"],
    tags: "tools",
    desc: "Converting media to sticker...",
    customPrefix: "",
    example: "",
    limit: true,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
	run: async(m, {
        sock,
        functions,
        text
    }) => {
        let hasQuoted = m.isQuoted ? m.quoted : m;
        if (hasQuoted.isMedia) {
                if (/image|video|sticker/.test(hasQuoted.mime)) {
                    if (hasQuoted?.duration > 10) throw (`Max video 9 second!`);
                        let media = await sock.downloadMediaMessage(hasQuoted);
                        m.reply(media, { asSticker: true, quoted: m })
                }
        } else if (m.mentions.length != 0) {
            let url;
            for (let a = 0; a < (m.mentions.length < 4 ? m.mentions.length : 4); a++) {
                url = await sock.profilePictureUrl(m.mentions[a], "image").then(_ => _).catch(_ => 'https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu');
            }
            m.reply(url, { asSticker: true, quoted: m});
        } else if (/(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm))/i.test(text)) {
            m.reply(functions.isUrl(text)[0], { quoted: m, asSticker: true});
        } else throw (`Reply media or send command with url media / tags !`);
    }
}