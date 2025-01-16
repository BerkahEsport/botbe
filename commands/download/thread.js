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
	name: "thread",
	command: ["thread"],
    tags: "download",
    desc: "Download file with link thread...",
    customPrefix: "",
    example: "https://www.threads.net/@nasehatbatam/post/DE2BtEPTaw9?xmt=AQGzWrPUOpaz55Gk7oCSQBEIbFg5hDM25D4dqfumuMgE3A",
    limit: 2,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
	run: async(m, {
        functions,
        args,
        config
    }) => {
        let thread = await functions.fetchJson(`${api}api/thread?url=${args[0]}&apikey=${config.settings.apikey}`);
        m.reply(thread.result?.image_urls[0]?.download_url || thread.result?.video_urls[0]?.download_url);
    }
}