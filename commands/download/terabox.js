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
	name: "terabox",
	command: ["terabox"],
    tags: "download",
    desc: "Download file with link terabox.",
    customPrefix: "",
    example: "https://www.teraboxs.net/@nasehatbatam/post/DE2BtEPTaw9?xmt=AQGzWrPUOpaz55Gk7oCSQBEIbFg5hDM25D4dqfumuMgE3A",
    limit: 2,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
	run: async(m, {
        sock,
        functions,
        args
    }) => {
        let terabox = await functions.api("api/terabox", args[0]);
        await sock.sendFile(m.from, terabox.result[0].download, "", functions.list(terabox.result[0], "TERABOX"));
    }
}