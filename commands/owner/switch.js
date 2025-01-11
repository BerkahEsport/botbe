/* <============== CREDITS ==============>
   Author: berkahesport
   Github: https://github.com/BerkahEsport/
   Contact me: 62895375950107

   Do not delete the source code.
   It is prohibited to
   sell and buy scripts
   without the knowledge
   of the script owner.

   Thank you to Allah S.W.T
<============== CREDITS ==============> */

export default {
    name: "on",
    command: ["on", "off"],
    tags: "owner",
    desc: "Menyalakan atau mematikan fitur.",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: true,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async (m, context) => {
        const {
            prefix,
            command,
            args,
            config,
            settings,
            functions
        } = context;

        if (command === "on") {
            switch (args[0]) {
                case "autoai":
                    settings.autoai = true;
                    await m.reply("Auto AI feature successfully turned on!");
                break;
                case "self":
                    settings.self = true;
                    await m.reply(`Self bot successfully turned on!
                        
${functions.list([...config.number.mods], "List can access bot:")}`);
                break;
    
                default:
                    m.reply(`Switch features that can be used:\n\n*${prefix + command} autoai*\nIf .on, the bot can auto-respond in private chat and auto-respond in groups if marked.\n\n*${prefix + command} self*`);
            }
        } else if (command === "off") {
            switch (args[0]) {
                case "autoai":
                    settings.autoai = false;
                    m.reply("The auto AI feature has been successfully turned off!");
                    break;
                case "self":
                    settings.self = false;
                    await m.reply(`Self bot successfully turned off!`);
                    break;

                default:
                    m.reply(`Switch features that can be used:\n\n*${prefix + command} autoai*\n\nIf .off, the bot will not respond automatically.\n\n*${prefix + command} self*`);
            }
        }
    }
};
