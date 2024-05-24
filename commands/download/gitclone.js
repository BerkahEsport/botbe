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
        prefix,
        noPrefix,
        command,
        arg,
        args,
        text,
        sock,
        commands,
        cmd,
        name,
        user,
        settings,
        stats,
        isGroup,
        isAdmin,
        isBotAdmin,
        admin,
        metadata,
        participants,
        store,
        config,
        functions,
        axios,
        cheerio
    }) => {
    const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    let [_, username, repo] = args[0].match(regex) || [];
    repo = repo.replace(/.git$/, '');
    let url = `https://api.github.com/repos/${username}/${repo}/zipball`;
    let response = await axios.head(url);
    let contentDisposition = response.headers['content-disposition'];
    let filename = contentDisposition.match(/attachment; filename=(.*)/)[1];
    // m.reply(await( await axios.get(url)).data)
    sock.sendFile(m.from, url, filename, null, m, {asDocument: true, mime: "application"})
    }
}