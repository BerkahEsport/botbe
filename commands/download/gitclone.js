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
<============== CREDITS ==============> */

export default {
    name: "gitclone",
    command: ["gitclone"],
    tags: "download",
    desc: "Download the script file from GitHub in zip file format.",
    customPrefix: "",
    example: "https://github.com/BerkahEsport/botbe",
    limit: 5,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        args,
        sock,
        axios,
        functions
    }) => {
        try {
            const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
            let [_, username, repo] = args[0].match(regex) || [];
            repo = repo.replace(/.git$/, '');
            let url = `https://api.github.com/repos/${username}/${repo}/zipball`;
            let response = await axios.head(url);
            let contentDisposition = response.headers['content-disposition'];
            let filename = contentDisposition.match(/attachment; filename=(.*)/)[1];
            sock.sendFile(m.from, url, filename, null, m, {asDocument: true, mime: "application"})
        } catch (e) {
            console.log(e);
            const data = await functions.api("api/github", args[0]);
            await sock.sendFile(m.from, data.result.link, `Github`, "", m);
        }
    }
}