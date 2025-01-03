/*<============== CREDITS ==============>
	Author: @berkahesport.id
	Contact me: 62895375950107
	
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
import chalk from "chalk";
import qrcode from "qrcode-terminal";

// <===== Config Setup =====>
const config = (await import("./config.js")).default;
const functions = (await import("./lib/functions.js")).default;


// <===== Config COMMANDS =====>
import { loadAllCommands } from "./lib/commands.js";
let commandsFolder = path.join(functions._dirname(import.meta.url, true), "commands");
let commands = await loadAllCommands(commandsFolder).catch(e => console.error(`Failed to watch commands: ${e}`));

// <===== Config Choice =====>
import readline from "readline";

// <===== Config Whatsapp =====>
import Pino from "pino";
import baileys  from "@whiskeysockets/baileys";
const { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, makeInMemoryStore, jidNormalizedUser, fetchLatestBaileysVersion} = baileys;
const logger = Pino({ level: "silent" }).child({ level: "silent" });
const { state, saveCreds } = await useMultiFileAuthState(config.settings.session);
const { version } = await fetchLatestBaileysVersion();
let store = makeInMemoryStore({logger});

// <===== Config STORE =====>
import stable from "json-stable-stringify";
import { Localdb } from "./lib/database.js";
const database = new Localdb(global.db);
const pathStore = "./lib/json/store.json"
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
		...((await database.fetch()) || {})
	};
}


const handlePhoneNumberPairing = async (sock, functions) => {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	const question = (text) => new Promise((resolve) => rl.question(text, resolve));
	const choice = await question("Please type the number for the type of device link you want:\n[1] Scan QR in Terminal\n[2] Send code to Pairing\nYour choice: ");
	if (choice == 1) {
		rl.close();
		console.log(chalk.yellow("Waiting for generate QR Code..."));
	} else if (choice == 2) {
	let phoneNumber;
	if (!sock.authState.creds.registered) {
			phoneNumber = await question("Please type your WhatsApp number: ");
			phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
		if (!functions.PHONENUMBER_MCC(phoneNumber)) {
			console.log("Start with your country's WhatsApp code, Example: 62xxx");
			phoneNumber = await question("Please type your WhatsApp number: ");
			phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
		}
		rl.close();
	}
	await functions.delay(3000);
	let code;
	try {
		code = await sock.requestPairingCode(phoneNumber);
	} catch (error) {
		console.error("Error requesting pairing code: ", error);
		return;
	}
	console.log("Pairing Code: " + `\x1b[32m${code?.match(/.{1,4}/g)?.join("-") || code}\x1b[39m`);
	} else {
		console.log("Invalid choice, please try again!\n\n");
		return await handlePhoneNumberPairing(sock, functions);
	}
	
};

// <===== Connect to Whatsapp =====>
async function connectToWhatsApp() {
	let sock = makeWASocket({
		version,
		printQRInTerminal: false,
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
			console.log(`\x1b[32mLoading Chat [${msg.progress}%]\x1b[39m`);
			return !!msg.syncType;
		}
	});

	if (!state.creds.registered) {
		if (sock.authState.creds?.me?.id) return;
		await handlePhoneNumberPairing(sock, functions);
	}
	
	store.bind(sock.ev);
	sock.ev.on("creds.update", saveCreds);
	sock.ev.on("connection.update", async ({ qr, connection, lastDisconnect }) => {
		if (connection === "close") {
			const reason = lastDisconnect?.error?.output?.statusCode;
			switch (reason) {
                case 408:
                    console.log(chalk.red("[+] Connection timed out. restarting..."));
                    await connectToWhatsApp();
                    break;
                case 503:
                    console.log(chalk.red("[+] Unavailable service. restarting..."));
                    await connectToWhatsApp();
                    break;
                case 428:
                    console.log(chalk.cyan("[+] Connection closed, restarting..."));
                    await connectToWhatsApp();
                    break;
                case 515:
                    console.log(chalk.cyan("[+] Need to restart, restarting..."));
                    await connectToWhatsApp();
                    break;
                case 401:
                    try {
                        console.log(chalk.cyan("[+] Session Logged Out.. Recreate session..."));
                        fs.rmSync(config.settings.session, { recursive: true });
						if (!fs.existsSync(config.settings.session)) fs.mkdirSync(config.settings.session);
						await connectToWhatsApp();
                        console.log(chalk.green("[+] Session removed!!"));
                    } catch {
                        console.log(chalk.cyan("[+] Session not found!!"));
						await connectToWhatsApp();
                    }
                    break

                case 403:
						console.log(chalk.red(`[+] Your WhatsApp Has Been Baned :D`));
						fs.rmSync(config.settings.session, { recursive: true });
						if (!fs.existsSync(config.settings.session)) fs.mkdirSync(config.settings.session);
						await connectToWhatsApp();
                    break;
                case 405:
                    try {
                        console.log("[+] Session Not Logged In.. Recreate session...");
						fs.rmSync(config.settings.session, { recursive: true });
						if (!fs.existsSync(config.settings.session)) fs.mkdirSync(config.settings.session);
						await connectToWhatsApp();
                    } catch {
                        console.log(chalk.cyan("[+] Session not found!!"));
                    }
                    break
                default:

            }
		} else if (connection === "open") {
			if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp");
			sock.sendMessage(config.number.owner + "@s.whatsapp.net", {
				text: `${sock?.user?.name || "Bot"} has Connected...`,
			}, { ephemeralExpiration: undefined})
		} else if (qr) {
			console.log("Scan this QR Code!\n");
			qrcode.generate(qr, {small: true});
		};
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
			console.log(chalk.bgRed(chalk.yellow(`Error contact update: ${e}`)))
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
			console.log(chalk.bgRed(chalk.yellow(`Error contact upsert: ${e}`)))
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
			console.log(chalk.bgRed(chalk.yellow(`Error groups update: ${e}`)))
		}
	});
	// messages response
	sock.ev.on("messages.upsert", async ({ type, messages }) => {
		const config = await (await import(`./config.js?update=${Date.now()}`)).default;
		const functions = await (await import(`./lib/functions.js?update=${Date.now()}`)).default;// nambah semua metadata ke store
		await (await import(`./lib/simplification.js?update=${Date.now()}`)).default(sock, store, config, functions)
		if (store.groupMetadata && Object.keys(store.groupMetadata).length === 0) store.groupMetadata = await sock.groupFetchAllParticipating();
		if (type === "notify" || type === "append") {
			let msg = messages[0];
			if (msg.message) {
				let type = Object.keys(msg.message)[0];
				if (type === "protocolMessage") return;
				if (msg.key.remoteJid === "status@broadcast") return;
				msg.message = msg.message?.ephemeralMessage ? msg.message.ephemeralMessage.message : msg.message;
				let m = await (await import(`./lib/serialize.js?v=${Date.now()}`)).default(sock, msg, store, config, functions);
				await (await import(`./messages/message_upsert.js?v=${Date.now()}`)).default(sock, m, store, commands, config, functions);
			}
		}
	})

	// group participants update
	sock.ev.on("group-participants.update", async (message) => {
		const config = await (await import(`./config.js?update=${Date.now()}`)).default
		const functions = await (await import(`./lib/functions.js?update=${Date.now()}`)).default;
		await (await import(`./messages/group_participants.js?v=${Date.now()}`)).default(sock, message, config, functions)
	})
}
// For loading database
loadDatabase()
// Start to connect whatsapp
connectToWhatsApp()
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

}, 60 * 1000)