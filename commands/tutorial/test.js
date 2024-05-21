export default {
	name: "test",
	command: ["test", "testing"],
    tags: "main",
    desc: "Testing command...",
	customPrefix: "",
	example: "",
	limit: false,
	isOwner: false,
	isPremium: false,
	isBotAdmin: false,
	isAdmin: false,
	isGroup: false,
	isPrivate: false,
	run: async(m, { text, sock, config, functions}) => {
	m.reply(`Iya @${m.pushName}, bot active!`)
}
}