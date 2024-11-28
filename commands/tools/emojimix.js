export default {
    name: "emojimix",
    command: ["emojimix"],
    tags: "tools",
    desc: "Converts emojis to emoji images on each platform.",
    customPrefix: "",
    example: "😁.🤣",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        config,
        functions
    }) => {
        let [emo1, emo2] = text.split(".")
        let emoji = await functions.fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1)}_${encodeURIComponent(emo2)}`)
        m.reply(emoji.results[0].url, {asSticker: true, caption: config.text.ty})
    }
}