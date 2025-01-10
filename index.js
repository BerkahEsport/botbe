/*<============== CREDITS ==============>
	Author: @berkahesport
	Contact me: 62895375950107
    Website: https://berkahesport.my.id/
	
	Do not delete the source code.
	It is prohibited to sell and buy
	WhatsApp BOT scripts
	without the knowledge
	of the script owner.
	
	Selling = Sin 
	
	Thank you to Allah S.W.T
<============== CREDITS ==============>*/

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

// <===== Config Build =====>
import path from "path";
import fs from "node:fs";

// <===== Config Setup =====>
const config = (await import("./config.js")).default;
const functions = (await import("./lib/functions.js")).default;
const dirname = functions.dirname(import.meta.url, true);
if (config.settings.case) {
    functions.log("Bots use case models.", "green", "bold");
} else {
    functions.log("Bots use plugin models.", "green", "bold");
}

// <===== Config COMMANDS =====>
import { loadAllCommands } from "./lib/commands.js";
const commandsFolder = path.join(dirname, "commands");
let commands = await loadAllCommands(commandsFolder, config.settings.case).catch(e => functions.log(`Failed to watch commands: ${e}`, "yellow", "italic"));
let usedCommandRecently = new Set();
let usedAIRecently = new Set();

// <===== Config Choice =====>
import readline from "readline";
const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};

// <===== Config Whatsapp =====>
import Pino from "pino";
import baileys  from "@whiskeysockets/baileys";
const { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, makeInMemoryStore, jidNormalizedUser, fetchLatestBaileysVersion} = baileys;
const logger = Pino({ level: "silent" }).child({ level: "silent" });
const { version } = await fetchLatestBaileysVersion();
let store = makeInMemoryStore({logger});

// <===== Config STORE =====>
import stable from "json-stable-stringify";
import { Localdb, MongoDB } from "./lib/database.js";
const database = !!config.settings.mongodb ? new MongoDB(config.settings.mongodb, "botbe") : new Localdb();
const pathStore = "./lib/json/store.json";
const pathContacts = "./lib/json/contacts.json";
const pathMetadata = "./lib/json/groupMetadata.json";
store.readFromFile(pathStore);

// <===== Config DATABASE =====>
async function loadDatabase() {
	global.db = {
		users: {},
		groups: {},
		stats: {},
		settings: {},
		...((await database.read()) || {})
	};
}

const handlePhoneNumberPairing = async (useQR, sock, functions) => {
	if (useQR) {
		functions.log("Waiting for generate QR Code...", "yellow", "italic");
	} else {
	let phoneNumber;
	if (!sock.authState.creds.registered) {
			phoneNumber = await question("Please type your WhatsApp number: ");
			phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
		if (!functions.PHONENUMBER_MCC(phoneNumber)) {
			functions.log("Start with your country's WhatsApp code, Example: 62xxx", "green", "bold");
			phoneNumber = await question("Please type your WhatsApp number: ");
			phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
		}
	}
	await functions.delay(3000);
	let code;
	try {
		code = await sock.requestPairingCode(phoneNumber);
	} catch (error) {
		functions.log("Error requesting pairing code: "+error, "red", "bold");
		return;
	}
	functions.log("Pairing Code: " + `\x1b[32m${code?.match(/.{1,4}/g)?.join("-") || code}\x1b[39m`, "cyan", "bold");
	}
};

// <===== Connect to Whatsapp =====>
async function connectToWhatsApp() {
	const sessionDir = path.join(dirname, 'tmp', 'sessions');
	const credsPath = path.join(sessionDir, 'creds.json');
    const isCredsAvailable = fs.existsSync(credsPath);
	const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
	let useQR = true;
    if (!isCredsAvailable) {
        const answer = await question("Please type the number for the type of device link you want:\n[1] Scan QR in Terminal\n[2] Send code to Pairing\nYour choice: ");
        useQR = answer === '1';
    }
	let sock = makeWASocket({
		version,
		printQRInTerminal: useQR,
		logger,
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, logger)
		},
		generateHighQualityLinkPreview: true,
		browser: [ "Ubuntu", "Edge", "20.0.04" ],
		markOnlineOnConnect: false,
		generateHighQualityLinkPreview: true,
		syncFullHistory: true,
		retryRequestDelayMs: 10,
		transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 10 },
		defaultQueryTimeoutMs: undefined,
		maxMsgRetryCount: 15,
		appStateMacVerification: {
			patch: true,
			snapshot: true,
		},
		getMessage: async key => {
			const jid = jidNormalizedUser(key.remoteJid);
			const msg = await store.loadMessage(jid, key.id);

			return msg?.message || "";
		},
		shouldSyncHistoryMessage: msg => {
			functions.log(`Loading Chat [${msg.progress}]`, "yellow", "italic");
			return !!msg.syncType;
		}
	});

	if (!sock.authState.creds.registered && !useQR) {
		if (sock.authState.creds?.me?.id) return;
		await handlePhoneNumberPairing(useQR, sock, functions);
	}
	
	store.bind(sock.ev);
	sock.ev.on("creds.update", saveCreds);
	sock.ev.on("connection.update", async ({ qr, connection, lastDisconnect }) => {
		if (connection === "close") {
			const reason = lastDisconnect?.error?.output?.statusCode;
			switch (reason) {
                case 408:
                    functions.log("[+] Connection timed out. restarting...", "red");
                    await connectToWhatsApp();
                    break;
                case 503:
                    functions.log("[+] Unavailable service. restarting...", "yellow");
                    await connectToWhatsApp();
                    break;
                case 428:
                    functions.log("[+] Connection closed, restarting...", "cyan");
                    await connectToWhatsApp();
                    break;
                case 515:
                    functions.log("[+] Need to restart, restarting...", "blue");
                    await connectToWhatsApp();
                    break;
                case 401:
                    try {
                        functions.log("[+] Session Logged Out.. Recreate session...", "red");
                        fs.rmSync(sessionDir, { recursive: true });
						if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);
                        functions.log("[+] Session removed!!", "yellow");
						process.exit();
                    } catch {
                        functions.log("[+] Session not found!!", "red");
						process.exit();
                    }
                    break

                case 403:
						functions.log(`[+] Your WhatsApp Has Been Baned :D`, "red");
						fs.rmSync(sessionDir, { recursive: true });
						if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);
						process.exit();
                    break;
                case 405:
                    try {
                        functions.log("[+] Session Not Logged In.. Recreate session...", "cyan");
						fs.rmSync(sessionDir, { recursive: true });
						if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);
						process.exit();
                    } catch {
                        functions.log("[+] Session not found!!", "red", "bold");
                    }
                    break;
                default:
            }
		}
		if (connection === "open") {
			try	{
				if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp");
				sock.sendMessage(config.number.owner + "@s.whatsapp.net", {
					text: `${sock?.user?.name || "Bot"} has Connected...`,
				}, { ephemeralExpiration: 86400000});
				// sock.newsletterFollow(String.fromCharCode(49, 50, 48, 51, 54, 51, 51, 49, 50, 49, 50, 56, 51, 52, 53, 50, 55, 57, 64, 110, 101, 119, 115, 108, 101, 116, 116, 101, 114));
			} catch (e) {
				functions.log(e, "red");
			}
		}
	})
	// contacts load
	if (fs.existsSync(pathContacts)) {
		store.contacts = JSON.parse(fs.readFileSync(pathContacts, "utf-8"));
	} else {
		fs.writeFileSync(pathContacts, JSON.stringify({}));
	}
	// group metadata load
	if (fs.existsSync(pathMetadata)) {
		store.groupMetadata = JSON.parse(fs.readFileSync(pathMetadata, "utf-8"));
	} else {
		fs.writeFileSync(pathMetadata, JSON.stringify({}));
	}
	// add contact changes to the store
	sock.ev.on("contacts.update", (update) => {
		try {
			for (let contact of update) {
				let id = jidNormalizedUser(contact.id)
				if (store && store.contacts) store.contacts[id] = {
					...(store.contacts?.[id] || {}),
					...(contact || {})
				}
			}
		} catch (e) {
			functions.log(`Error contact update: ${e}`, "red");
		}
	});

	// add contacts upsert to store
	sock.ev.on("contacts.upsert", (upsert) => {
		try {
			for (let contact of upsert) {
				let id = jidNormalizedUser(contact.id);
				if (store && store.contacts) store.contacts[id] = {
					...(contact || {}),
					isContact: true
				};
			}
		} catch (e) {
			functions.log(`Error contact upsert: ${e}`, "red");
		}
	});

	// add group changes to the store
	sock.ev.on("groups.update", async (updates) => {
		try {
			for (const update of updates) {
				const id = update.id;
				if (store.groupMetadata[id]) {
					store.groupMetadata[id] = {
						...(store.groupMetadata[id] || {}),
						...(update || {})
						};
					}
				}
			} catch (e) {
			functions.log(`Error groups update: ${e}`, "red");
		}
	});
	// messages response
	sock.ev.on("messages.upsert", async ({ type, messages }) => {
		const config = await (await import(`./config.js?update=${Date.now()}`)).default;
		const functions = await (await import(`./lib/functions.js?update=${Date.now()}`)).default;
		await (await import(`./lib/simplification.js?update=${Date.now()}`)).default(sock, store, config, functions);
		if (store.groupMetadata && Object.keys(store.groupMetadata).length === 0) store.groupMetadata = await sock.groupFetchAllParticipating();
		if (type === "notify" || type === "append") {
			let msg = messages[0];
			if (msg.message) {
				let type = Object.keys(msg.message)[0];
				if (type === "protocolMessage") return;
				if (msg.key.remoteJid === "status@broadcast" || msg.key.remoteJid.endsWith("@newsletter")) return;
				msg.message = msg.message?.ephemeralMessage ? msg.message.ephemeralMessage.message : msg.message;
				let m = await (await import(`./lib/serialize.js?v=${Date.now()}`)).default(sock, msg, store, config, functions);
				if (config.settings.case) {
					await (await import(`./case.js?update=${Date.now()}`)).default(sock, m, config, functions, usedCommandRecently, usedAIRecently);
					return;
				}
				await (await import(`./messages/message_upsert.js?v=${Date.now()}`)).default(sock, m, store, commands, config, functions, usedCommandRecently, usedAIRecently);
			}
		}
	})

	// group participants update
	sock.ev.on("group-participants.update", async (message) => {
		const config = await (await import(`./config.js?update=${Date.now()}`)).default;
		const functions = await (await import(`./lib/functions.js?update=${Date.now()}`)).default;
		await (await import(`./messages/group_participants.js?v=${Date.now()}`)).default(sock, message, config, functions);
	})
}
// For loading database
await loadDatabase();
// Start to connect whatsapp
connectToWhatsApp();
// Save Database every 30 second
setInterval(async () => {
	// write database bot
	if (global.db) await database.save(global.db);
	// write contacts and metadata
	if (store.groupMetadata) {
		fs.writeFileSync(pathMetadata, stable(store.groupMetadata, {space: 4}));
	}
	if (store.contacts) {
		fs.writeFileSync(pathContacts, stable(store.contacts, {space: 4}));
	}
	// write store
	if (config.settings.store) {
		store.writeToFile(pathStore);
	}

}, 60 * 1000);