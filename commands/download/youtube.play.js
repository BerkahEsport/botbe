import ytSearch from "yt-search";
export default {
    name: "play",
    command: ["play"],
    tags: "tools",
    desc: "Looking for a list of YouTube videos...",
    run: async(m, {sock, args, text, prefix: usedPrefix, functions, config}) => {
        const gh = m.github
        if (!text) throw "✳️ What do you want me to search for on YouTube?";
        const { all: [bestItem, ...moreItems] } = await ytSearch(text);
        const videoItems = moreItems.filter(item => item.type === 'video');
        const formattedData = {
            title: "                *[ Youtube Search ]*\n>                 BEST MATCH\n\n",
            rows: [{
                    title: "Best",
                    highlight_label: "Best match",
                    rows: [{
                        header: bestItem.title,
                        id: `${usedPrefix}ytmp3 ${bestItem.url}`,
                        title: bestItem.description,
                        description: ""
                    }]
                },
                {
                    title: "More",
                    rows: videoItems.map(({
                        title,
                        url,
                        description
                    }) => ({
                        header: title,
                        id: `${usedPrefix}ytmp3 ${url}`,
                        title: description,
                        description: ""
                    }))
                }
            ]
        };

        const emojiMap = {
            type: "🎥",
            videoId: "🆔",
            url: "🔗",
            title: "📺",
            description: "📝",
            image: "🖼️",
            thumbnail: "🖼️",
            seconds: "⏱️",
            timestamp: "⏰",
            ago: "⌚",
            views: "👀",
            author: "👤"
        };

        const caption = Object.entries(bestItem)
            .map(([key, value]) => {
                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
                const valueToDisplay = key === 'views' ? new Intl.NumberFormat('en', {
                    notation: 'compact'
                }).format(value) : key === 'author' ? `Name: ${value.name || 'Unknown'}\nURL: ${value.url || 'Unknown'}` : value || 'Unknown';
                return ` ${emojiMap[key] || '🔹'} *${formattedKey}:* ${valueToDisplay}`;
            })
            .join('\n');
            await sock.sendButton(m.from, formattedData.title + caption, config.name.bot, bestItem.image || bestItem.thumbnail,
            [['Menu List', `${usedPrefix}menu`]], // Button
            [[config.name.bot, "https://tinyurl.com/berkahesport"]], // Link
            [["Result Here", formattedData.rows]], // List
            m);
}
}