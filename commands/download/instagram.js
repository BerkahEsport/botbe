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
	run: async(m, {
        functions,
        args
    }) => {
        let ig = await functions.api("api/instagram", args[0]);
        m.reply(ig.result[0].url, {caption: functions.mapList(ig.result, "Instagram DL"), font: true});
    }
}