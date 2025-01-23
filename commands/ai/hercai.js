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
        quoted,
		api
    }) => {
        let response = await functions.fetchJson(`${api}/api/hercai?text=${quoted.text}`)
		m.reply(response.result);
	}
}