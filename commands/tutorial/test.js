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
	run: async(m) => {
		m.reply(`Iya @${m.pushName}, bot active!`)
	}
}