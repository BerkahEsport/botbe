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
import fs from "fs";
export default {
	name: "menu",
	command: ["menu"],
    tags: "main",
    desc: "Menu command...",
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
        sock,
        commands,
        text,
        args,
        prefix,
        stats,
        user,
        config,
        functions,
        isGroup
    }) => {
        const pp = await sock.profilePictureUrl(m.from, "image").catch(() => fs.readFileSync("./src/avatar_contact.png"));
        const tagList = Object.values(commands);
        const totalCmd = tagList.length;
        const list = {};
        tagList.forEach((command) => {
            if (!command?.tags) return;
            if (!(command.tags in list)) list[command.tags] = [];
            list[command.tags].push(command);
        });
        
        let teks = `Hello @${m.sender.split("@")[0]}!

- *${config.name.bot || sock.user.name}*

┌──⭓ *COMMAND Stats*
│➣ Total: ${stats.total} hits.
│➣ Success: ${stats.success} hits.
│➣ Failed: ${stats.failed} hits.
│➣ Today: ${stats.today} hits.
└───────⭓

This is a List of Available Commands:\nTotal full commands: ${totalCmd}\n\n`
        if (args[0] in list) {
            Object.entries(list).forEach(([type, commandArray]) => {
              if (type !== args[0]) return; // Only process commands with the selected tag
                teks += `┌──⭓ *${type.toUpperCase()} Menu*\n`;
                teks += `│\n`;
                teks += `${commandArray.map((command, index) => {
                if (!command.name || (Array.isArray(command.name) && command.name.every(name => name === ""))) return ""; // Check if command.name is empty
                const commandNames = Array.isArray(command.name) ? command.name : [command.name];
                const prefixedNames = commandNames.filter(name => name !== "").map(name => command.customPrefix ? `${command.customPrefix}${name}` : `${prefix}${name}`);
                if (prefixedNames.length === 0) return ""; // Check if prefixedNames is empty after filter
                const limitText = command.limit ? `[ ${command.limit === true || command.limit === 1 ? "" : +command.limit}Ⓛ ]` : command.isPremium ? `[ Ⓟ ]` : "";
                return `${index === 0 ? "│" : "│"}⛥ ${prefixedNames.map(name => `${name} ${limitText}`).join('\n│⛥ ')}`;
              }).filter(Boolean).join("\n")}\n`; // Remove empty lines from final result
                teks += `│\n`;
                teks += `└───────⭓\n\n`;
            });
            await sock.reply(m.from, teks, m, {thumbnail: fs.readFileSync("./src/thumbnail.jpg")});
        } else {
            Object.entries(list).forEach(([type, commandArray]) => {
                teks += `┌──⭓ *${type.toUpperCase()} Menu*\n`;
                teks += `│➣ Total: ${commandArray.length}\n`;
                teks += `│\n`;
                teks += `${commandArray.map((command, index) => {
                    if (!command.name || (Array.isArray(command.name) && command.name.every(name => name === ""))) return "";
                    const commandNames = Array.isArray(command.name) ? command.name : [command.name];
                    const prefixedNames = commandNames.filter(name => name !== "").map(name => command.customPrefix ? `${command.customPrefix}_¿${name}¿_` : `${prefix}_¿${name}¿_`);
                    if (prefixedNames.length === 0) return "";
                    const limitText = command.limit ? `[ ${command.limit === true ? "" : +command.limit}Ⓛ ]` : "";
                    return `${index === 0 ? "│" : "│"}➣ ${prefixedNames.map(name => `${name} ${limitText}`).join('\n│➣ ')}`;
                }).filter(Boolean).join("\n")}\n`;
                teks += `│\n`;
                teks += `└───────⭓\n\n`;
            });
            if (isGroup) {
                await sock.reply(m.from, teks, m, {font: true, thumbnail: fs.readFileSync("./src/thumbnail.jpg")});
            } else {
                const cards = functions.card([{
                    url: pp,
                    title: functions.greeting(m.pushName)
                }], "", "", "",
            [{
                title: "Profile",
                text: "Check your profile.",
                id: `${prefix}profile`
            },
            {
                title: user.ai ? "OFF AI" : "ON AI",
                text: user.ai ? "Deactivated ai response." : "Activated ai response.",
                id: user.ai ? `${prefix}off ai` : `${prefix}on ai`
            },
            ]);
                const body = teks.replaceAll("¿", "");
                const footer = config.name.bot;
                await sock.sendCarousel(m.from, body, footer, cards);
            }
        }
    }
}