export default {
	name: "instagram",
	command: ["instagram", "ig"],
    tags: "download",
    desc: "Download file with link instagram...",
	run: async(m, { sock, config, functions, text, args}) => {
        let ig = await (await functions.getFile(`https://aemt.me/download/igdl?url=${args[0]}`)).data
        m.reply(ig.result[0].url)
    },
    customPrefix: "",
    example: "%prefix%command https://www.instagram.com/p/CVhEXCTPwrl",
    limit: 2,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false
}