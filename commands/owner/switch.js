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
            settings,
        } = context;

        if (command === "on") {
            switch (args[0]) {
                case "autoai":
                    settings.autoai = true;
                    m.reply("Fitur auto AI berhasil dinyalakan!");
                    break;

                default:
                    m.reply(`Fitur switch yang dapat digunakan:\n\n*${prefix + command} autoai*\nJika .on, bot dapat merespon otomatis di private chat dan merespon otomatis di grup jika ditandai.`);
            }
        } else if (command === "off") {
            switch (args[0]) {
                case "autoai":
                    settings.autoai = false;
                    m.reply("Fitur auto AI berhasil dimatikan!");
                    break;

                default:
                    m.reply(`Fitur switch yang dapat digunakan:\n\n*${prefix + command} autoai*\nJika .off, bot tidak akan merespon otomatis.`);
            }
        }
    }
};
