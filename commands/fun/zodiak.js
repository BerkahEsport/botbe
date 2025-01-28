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
    name: "zodiak",
    command: ["zodiak"],
    tags: "fun",
    desc: "To see zodiac information from your date of birth.",
    customPrefix: "",
    example: "13 10 1996",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        prefix,
        command,
        args,
        functions
    }) => {
        if (!args[0] || !args[1] || !args[2]) throw (`Please enter the command correctly. Contains only numbers example ${prefix+command} 13 10 1996`);
        const zodiak = await functions.api("api/zodiak", { day: args[0], month: args[1], year: args[2]});
        m.reply(zodiak.result);
    }
}