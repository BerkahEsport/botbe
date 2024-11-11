import axios from "axios";
import cheerio from "cheerio";
export default async function message_upsert(sock, m, store, commands, config, functions) {
	// Self mode on if you want.
	// if (m.sender.split("@")[0] === config.number.owner) return;
	// Setup for DB
	await (await import(`../lib/database.js?update=${Date.now()}`)).default(sock, m, config, functions);
	m.limit = false;
	let user = global.db.users[m.sender];
  	let settings = global.db.settings[sock.user.jid || config.number.bot+"@s.whatsapp.net"];
	let stats = global.db.stats;
	let isCommand, commandResult = undefined;
try {
	// Calling COMMANDS
	for (let name in commands) {
		let cmd = commands[name];
		if (!cmd) continue;

	// Starting
	const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
	let prefix = !!cmd.customPrefix ? cmd.customPrefix : config.settings.prefix;
	let noPrefix = m?.body.replace(prefix, "");
	let arg = noPrefix.trim().split` `.slice(1);
	let text = arg.join` `;
	let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
	command = (command || "").toLowerCase();
	args = args || [];
	let isPrefix = (prefix instanceof RegExp ? [[prefix.exec(m.body), prefix]]
          : Array.isArray(prefix) ? prefix.map((p) => {
              let re = p instanceof RegExp ? p
                : new RegExp(str2Regex(p));
              	return [re.exec(m.body), re];
            })
            : typeof prefix === "string" ? [[new RegExp(str2Regex(prefix)).exec(m.body), new RegExp(str2Regex(prefix)),],]
            : [[[], new RegExp()]]).find((p) => p[1]);

	if (cmd.customPrefix === "" || !cmd.customPrefix) {
		isCommand = cmd.command instanceof RegExp ? cmd.command.test(command)
					: Array.isArray(cmd.command) ? cmd.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command)
					: typeof cmd.command === "string" ? cmd.command === command
					: false;
	} else {
		isCommand = cmd.customPrefix instanceof RegExp ? cmd.customPrefix.test(m.body.split(" ")[0])
					: Array.isArray(cmd.customPrefix) ? cmd.customPrefix.some(cmd => cmd instanceof RegExp ? cmd.test(m.body.split(" ")[0]) : cmd === m.body.split(" ")[0])
					: typeof cmd.customPrefix === "string" ? cmd.customPrefix === m.body.split(" ")[0]
					: false;
	}
			
	let _arguments = {
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
		isQuoted: m.isQuoted,
		isGroup: m.isGroup,
		isAdmin: m.isAdmin,
		isBotAdmin: m.isBotAdmin,
		admin: m.admin,
		metadata: m.metadata,
		participants: m.participants,
		store,
		config,
		functions,
		axios,
		cheerio
	}

	if (cmd.before && typeof cmd.before === "function" && m.sender in global.db.users) {
		await cmd.before(m, _arguments);
	}

	// Execution code
    if (!isCommand) continue;
	if ((isPrefix[0] || "")[0]) {
		if (!user.registered && !(name == "register.js") && !(m.body.startsWith(prefix+"register") || m.body.startsWith(prefix+"reg"))) {
			m.react("🚫");
			m.reply(`Please register first to be able to access the bot!!
Command: ${prefix}register name.age
Example: ${prefix}register ${m.pushName || "userBE"}.18`, {font: true});
			break;
		}
		if (cmd.isQuoted && !m.isQuoted) {
			m.react("🚫");
			m.reply(`Please reply / quote the message!!`, {font: true});
			continue;
		}
		if (cmd.isOwner && !m.isOwner) {
			m.react("🚫");
			m.reply("This feature is only for owners!!", {font: true});
			continue;
		}
		if (cmd.isPremium && !m.isPremium) {
			await m.react("🌟");
			m.reply("This feature is only for premium user!!", {font: true});
			continue;
		}
		if (cmd.isGroup && !m.isGroup) {
			m.react("🚫");
			m.reply("This feature is for groups only!!", {font: true});
			continue;
		}
		if (cmd.isPrivate && m.isGroup) {
			m.react("🚫");
			m.reply("This feature can only be used in private chat!!", {font: true});
			continue;
		}
		if (cmd.isBotAdmin && !m.isBotAdmin) {
			m.react("🚫");
			m.reply("So that this feature can work. bot must be admin!!", {font: true});
			continue;
		}
		if (cmd.isAdmin && !m.isAdmin) {
			m.react("🚫");
			m.reply("This feature can only be used by group admins!!", {font: true});
			continue;
		}
		if (cmd.isBot && !m.fromMe) {
			m.react("🚫");
			m.reply("This feature is only for bot!!", {font: true});
			continue;
		}
		if (!m.isPremium && cmd.limit && user.limit < +cmd.limit) {
			m.react("🚫");
			m.reply(`Feature access denied, ${+cmd.limit} limits required for feature to be accessed!!`, {font: true});
			continue;
		}
		if (!!cmd.example && !text) {
			m.react("❓");
			m.reply(`*⭓─❖『 USAGE INFO 』❖─⭓*

*Command*: ${prefix+cmd.command[0]} ${cmd.example.startsWith("https://") ? "[url]" : cmd.example.includes(".") || cmd.example.includes("args") ? cmd.example.replace(prefix+command, "").trim().split('.').map((part, index) => `args[${index}]`).join('.') : "[text]"}
*Example*: ${prefix+cmd.command[0]} ${cmd.example.includes("args") ? cmd.example.replace("args", "") : cmd.example}`, {font: true});
			continue;
		}
		try {
			m.react("⏳");
			await cmd.run(m, _arguments);
			if (!m.isPremium) m.limit = m.limit || cmd.limit || false;
			commandResult = true
		} catch(e) {
			m.limit = false;
			if (e) {
			m.log(e)
              if (typeof e == "string") {
                    m.reply(e, {font: true});
                } else {
					commandResult = false;
                  if (e.name) {
					let err = functions.format(e)
                  	m.report(`*🗂️ Name:* ${fileName}
👤 *Sender:* ${m.sender}
💬 *Chat:* https://wa.me/${m.sender.replace("@s.whatsapp.net","")}
💻 *Command:* ${prefix+command} ${text}
📄 *Error Logs:*
\`\`\`${err}\`\`\``.trim());
    };
m.reply(`> *<==== 404 ᴇʀʀᴏʀ ====>*

_Problematic features please report the owner!_
*Chat:* _https://wa.me/${config.number.owner}_
\n> Or repeat a few more times!`);
            		};
				};
			} break;
		} continue;
	};
} catch(e) {
		m.report(e);
		m.log("Error a messages.upsert: ", e);
} finally {
		try {
			await (await import(`../lib/print.js?v=${Date.now()}`)).default(sock, m, config, functions);
			} catch (e) {
				m.log("Error a print: ", e);
			};
		if (user) { 
			if (m.isUser) {
				if (m.limit && !m.isPremium) {
					user.limit -= +m.limit
					m.reply(+m.limit == 1 ? `${+m.limit} limit are used.` : `${+m.limit} limits are used.`, {font: true});
				};
		  	};
		if (isCommand) {
				stats.today += 1
				stats.total += 1
			if (commandResult) {
			  	stats.success += 1
			} else {
			  	stats.failed += 1
			};
		};
	};
};
	if (isCommand) {
		if (commandResult) {
			m.react("✅");
		} else {
			m.react("❌");
		};
	};
};