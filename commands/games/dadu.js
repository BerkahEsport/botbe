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
    name: "dadu",
    command: ["dadu", "helpao"],
    tags: "games",
    desc: "Guess game dadu.",
    customPrefix: "",
    example: "",
    limit: false,
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
        const result = await functions.api("api/dadu");
        m.log(result)
        const choice = parseInt(args[0]);
        const reward = functions.randomInt(1, 100);
        const fine = functions.randomInt(1, 100);
        if (result.result.no === choice) {
            await m.reply(result.result.url);
            m.reply(`✅ *That's great*, your answer is correct.!\n\n🎉 *Reward*: ${reward} exp.`);
        } else {
            m.reply(`❌ *You are not lucky*, you get a fine of _${fine}_ exp.`)
        }
    }
}