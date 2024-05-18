import axios from "axios";
import cheerio from "cheerio";
export default async function message_upsert(sock, m, store, commands, config, functions) {
	// Setup for DB
	await (await import("../lib/database.js")).default(sock, m, config, functions);
	m.limit = false;
	let user = global.db.users[m.sender]
  	let settings = global.db.settings[sock.user.jid || config.number.bot+"@s.whatsapp.net"]
	let stats = global.db.stats
	let isPrefix, isCommand, commandResult = undefined;
try {
	// Calling COMMANDS
	for (let name in commands) {
		let cmd = commands[name];
		if (!cmd) continue;

	// Starting
	const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
	let prefix = !!cmd.customPrefix ? cmd.customPrefix : config.settings.prefix
	let noPrefix = m?.body.replace(prefix, "")
	let arg = noPrefix.trim().split` `.slice(1);
	let text = arg.join` `;
	let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
	command = (command || "").toLowerCase();
	args = args || [];
	let match = (prefix instanceof RegExp ? [[prefix.exec(m.body), prefix]]
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
		isGroup: m.isGroup ? true : false,
		isAdmin: m.isAdmin ? true : false,
		isBotAdmin: m.isBotAdmin ? true : false,
		admin: m.admin,
		metadata: m.metadata,
		participants: m.participants,
		store,
		config,
		functions,
		axios,
		cheerio
	}

	if (cmd.before && typeof cmd.before === "function" ) {
		await cmd.before(m, _arguments);
	}
	// Execution code
    if (!isCommand) continue;
	if (isPrefix = (match[0] || "")[0]) {
		if (!user.registered && !(name == "register.js") && !(m.body.startsWith(prefix+"register") || m.body.startsWith(prefix+"reg"))) {
			m.react("🚫")
			m.reply(`Please register first to be able to access the bot!!
Command: ${prefix}register name.age
Example: ${prefix}register ${m.pushName || "userBE"}.18`);
			break
		}
		if (cmd.isQuoted && !m.isQuoted) {
			m.react("🚫")
			m.reply(`Please reply / quote the message!!`);
			continue
		}
		if (cmd.isOwner && !m.isOwner) {
			m.react("🚫")
			m.reply("This feature is only for owners!!");
			continue
		}
		if (cmd.isPremium && !m.isPremium) {
			await m.react("🌟");
			m.reply("This feature is only for premium user!!");
			continue
		}
		if (cmd.isGroup && !m.isGroup) {
			m.react("🚫")
			m.reply("This feature is for groups only!!");
			continue
		}
		if (cmd.isPrivate && m.isGroup) {
			m.react("🚫")
			m.reply("This feature can only be used in private chat!!");
			continue
		}
		if (cmd.isBotAdmin && !m.isBotAdmin) {
			m.react("🚫")
			m.reply("So that this feature can work. bot must be admin!!");
			continue
		}
		if (cmd.isAdmin && !m.isAdmin) {
			m.react("🚫")
			m.reply("This feature can only be used by group admins!!");
			continue
		}
		if (cmd.isBot && m.fromMe) {
			m.react("🚫")
			m.reply("This feature is only for bot!!");
			continue
		}
		if (!m.isPremium && cmd.limit && user.limit < +cmd.limit) {
			m.react("🚫")
			m.reply(`Feature access denied, ${+cmd.limit} limits required for feature to be accessed!!`)
			continue
		}
		if (!!cmd.example && !text) {
			m.reply(cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, command).replace(/%text/gi, text))
			continue
		}

		try {
			await m.react("⏳")
			await cmd.run(m, _arguments);
			if (!m.isPrems) m.limit = m.limit || cmd.limit || false;
			commandResult = true
		} catch(e) {
			m.limit = false;
			commandResult = false
              if (typeof e == "string") {
                    m.reply(e, {font: true})
                } else {
				  let text = functions.format(e)
                  if (e?.name) {
                  m.report(`*🗂️ Name:* ${name}
👤 *Sender:* ${m.sender}
💬 *Chat:* https://wa.me/${m.sender.replace("@s.whatsapp.net","")}
💻 *Command:* ${config.settings.prefix+command} ${m.text}
📄 *Error Logs:*
\`\`\`${text}\`\`\``.trim())
    };
m.reply(`> *<==== 404 ᴇʀʀᴏʀ ====>*

_Problematic features please report the owner!_
*Chat:* _https://wa.me/${config.number.owner}_
\n> Or repeat a few more times!`)
            	};
        console.log("Reply a command: ", e);
			} break;
		} continue;
	};
} catch(e) {
		m.report(e);
		console.log("Error a messages.upsert: ", e);
} finally {
		try {
			await (await import(`../lib/print.js?v=${Date.now()}`)).default(sock, m, config, functions);
			} catch (e) {
				console.log("Error a print: ", e);
			};
		if (user) { 
			if (m.isUser) {
				if (m.limit) {
					user.limit -= +m.limit
					m.reply(+m.limit == 1 ? `${+m.limit} limit are used.` : `${+m.limit} limits are used.`, {font: true});
				}
		  	}
		if (isCommand) {
				stats.today += 1
				stats.total += 1
			if (commandResult == true) {
			  	stats.success += 1
			} else {
			  	stats.failed += 1
			}
		}
		}
	};
	if (isCommand && commandResult) {
		m.react("✅");
	} else if (isCommand && commandResult == false) {
		m.react("❌");
	}
};