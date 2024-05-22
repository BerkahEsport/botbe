export default {
	name: "instagram",
	command: ["instagram", "ig"],
    tags: "download",
    desc: "Download file with link instagram...",
    customPrefix: "",
    example: "https://www.instagram.com/p/CVhEXCTPwrl",
    limit: 2,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
	run: async(m, { sock, config, functions, text, args}) => {
        let ig = await functions.fetchJson(`https://aemt.me/download/igdl?url=${args[0]}`)
        m.reply(ig.result[0].url, {caption: functions.mapList(ig.result, "Instagram DL"), font: true})
    }
}