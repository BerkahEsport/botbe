export default {
	name: "menu",
	command: ["menu"],
    tags: "main",
    desc: "Menu command...",
	run: async(m, { sock, commands, text, args, prefix, stats, config, functions}) => {
if (args.length >= 1) {
            let data = []
            function findCommand(text) {
                const nama = text.toLowerCase();
                const commandArray = Object.values(commands);
                let cmd = commandArray.find(cmd => cmd.name.toLowerCase() === nama || (cmd.tags && cmd.tags.toLowerCase() === nama));
                return cmd;
              }
              const cmd = findCommand(text);
            if (!cmd) throw ("Command Not Found!")
            if (cmd.name) data.push(`*- Command :* ${cmd.name}`)
            if (cmd.tags) data.push(`*- Tags :* ${cmd.tags}`)
            if (cmd.desc) data.push(`*- Desc :* ${cmd.desc.replace(/%prefix/g, prefix).replace(/%command/g, cmd.name)}`)
            if (cmd.example) data.push(`*- Exm :* ${cmd.example.replace(/%prefix/g, prefix).replace(/%command/g, command)}`)
            if (cmd.limit) data.push(`*- Amount of Limit :* ${+cmd.limit}`)
            if (cmd.isPremium) data.push(`*Fiture Only User Premium*`)
            if (cmd.isPrivate) data.push(`*Fiture Only on Private Chat*`)
            if (cmd.isGroup) data.push(`*Fiture Only on Group*`)
            if (cmd.isBotAdmin) data.push(`*Fiture Only on Group & bot is admin there.*`)
            if (cmd.isAdmin) data.push(`*Fiture Only on Group & you is admin there.*`)

            m.reply(`*Command Info :*\n\n${data.join("\n")}`)
        } else {
            let teks = `Hello @${m.sender.split("@")[0]}!

- *${config.name.bot || sock.user.name}*

┌──⭓ *COMMAND Stats*
│➣ Total: ${stats.total} hits.
│➣ Success: ${stats.success} hits.
│➣ Failed: ${stats.failed} hits.
│➣ Today: ${stats.today} hits.
└───────⭓

This is a List of Available Commands:\n\n`
const tagList = Object.values(commands);
const list = {};
tagList.forEach((command) => {
    if (!command.tags) return;
    if (!(command.tags in list)) list[command.tags] = [];
    list[command.tags].push(command);
});
Object.entries(list).forEach(([type, commandArray]) => {
    teks += `┌──⭓ *${type.toUpperCase()} Menu*\n`;
    teks += `│\n`;
    teks += `│➣ ${commandArray.map((command) => {
        const commandName = command.customPrefix ? `${command.customPrefix+command.name}` : `${prefix+command.name}`;
        const limitText = command.limit ? `[ ${command.limit === true ? "" : +command.limit}Ⓛ ]` : "";
        return `${commandName} ${limitText}`;
    }).join("\n│➣ ")}\n`;
    teks += `│\n`;
    teks += `└───────⭓\n\n`;
});

            sock.reply(m.from, teks, m, {font: true}) //, {thumb: "https://telegra.ph/file/47b3652155f158b931bda.jpg"})
        }
	},
customPrefix: "",
example: "",
limit: false,
isOwner: false,
isPremium: false,
isBotAdmin: false,
isAdmin: false,
isGroup: false,
isPrivate: false
}