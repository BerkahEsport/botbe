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
	name: "twitter",
	command: ["twitter", "xtw"],
    tags: "download",
    desc: "Download file with link twitter...",
    customPrefix: "",
    example: "https://x.com/Eminem/status/943590594491772928",
    limit: 2,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
	run: async(m, {
        functions,
        args
    }) => {
        let twitter = await functions.api("api/tx2twitter", args[0]);
        m.reply(twitter.result?.[0]?.image || twitter.result?.[0]?.video, {caption: functions.list(twitter.result, "Twitter DL"), font: true});
    }
}