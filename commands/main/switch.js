/* <============== CREDITS ==============>
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
    name: "on",
    command: ["on", "off"],
    tags: "owner",
    desc: "Menyalakan atau mematikan fitur.",
    customPrefix: "",
    example: "",
    run: async (m, context) => {
        const {
            prefix,
            command,
            args,
            config,
            user,
            settings,
            functions,
            isOwner
        } = context;

        if (command === "on") {
            switch (args[0]) {
                case "ai":
                    user.ai = true;
                    await m.reply("Auto AI feature successfully turned on your chat!");
                break;
                case "autoai":
                    if (!isOwner) throw ("owner");
                    settings.autoai = true;
                    await m.reply("Auto AI feature successfully turned on!");
                break;
                case "self":
                    if (!isOwner) throw ("owner");
                    settings.self = true;
                    await m.reply(`Self bot successfully turned on!
                        
${functions.list([...config.number.mods], "List can access bot:")}`);
                break;
    
                default:
                    m.reply(`Switch features that can be used:\n\n*${prefix + command} autoai*\nIf .on, the bot can auto-respond in private chat and auto-respond in groups if marked.\n\n*${prefix + command} self*`);
            }
        } else if (command === "off") {
            switch (args[0]) {
                case "ai":
                    user.ai = false;
                    await m.reply("Auto AI feature successfully turned off your chat!");
                break;
                case "autoai":
                    if (!isOwner) throw ("owner");
                    settings.autoai = false;
                    m.reply("The auto AI feature has been successfully turned off!");
                    break;
                case "self":
                    if (!isOwner) throw ("owner");
                    settings.self = false;
                    await m.reply(`Self bot successfully turned off!`);
                    break;

                default:
                    m.reply(`Switch features that can be used:\n\n*${prefix + command} autoai*\n\nIf .off, the bot will not respond automatically.\n\n*${prefix + command} self*`);
            }
        }
    }
};
