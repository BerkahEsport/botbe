export default {
	name: "hercai",
	command: ["hercai"],
    tags: "ai",
    desc: "Q&A with Herc.AI",
	customPrefix: "",
	example: "what is nodejs?",
	limit: true,
	isOwner: false,
	isPremium: false,
	isBotAdmin: false,
	isAdmin: false,
	isGroup: false,
	isPrivate: false,
	run: async (m, {
        functions,
        quoted
    }) => {
        let response = await functions.fetchJson(`https://hercai.onrender.com/v3/hercai?question=${quoted.text}`)
		m.reply(functions.list(response, "Herc.AI"));
	}
}