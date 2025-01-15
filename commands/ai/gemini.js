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
    name: "gemini",
    command: ["gemini"],
    tags: "ai",
    desc: "Q&A with gemini.",
    customPrefix: "",
    example: "Who are you?",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        quoted,
        functions,
        api,
        config
    }) => {
        const result = await functions.fetchJson(`${api}api/gemini?text=${quoted.text}&apikey=${config.settings.apikey}`);
        m.reply(result.result);
    }
}