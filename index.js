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
import Pino from "pino";
import path from "path";
import fs from "node:fs";
import chalk from "chalk";
import stable from "json-stable-stringify";
import { Localdb } from "./lib/database.js";
import { fullCommands } from "./lib/commands.js";
import { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, makeInMemoryStore, jidNormalizedUser, PHONENUMBER_MCC } from "baileys";
let config = (await import("./config.js")).default;
let functions = (await import("./lib/functions.js")).default;
const logger = Pino({ level: "silent" }).child({ level: "silent" });
const { state, saveCreds } = await useMultiFileAuthState(config.settings.session);
let store = makeInMemoryStore({logger})

// <===== Config STORE =====>
const database = new Localdb(global.database);
const pathStore = "./lib/json/store.json"
const pathContacts = "./lib/json/contacts.json";
const pathMetadata = "./lib/json/groupMetadata.json";
store.readFromFile(pathStore);

// <===== Config COMMANDS =====>
let commandsFolder = path.join(functions._dirname(import.meta.url, true), "commands");
let commands = await fullCommands(commandsFolder).catch(e => console.error(`Failed to watch commands: ${e}`));

// <===== Config DATABASE =====>
async function loadDatabase() {
	global.db = {
		users: {},
		groups: {},
		stats: {},
		settings: {},
		...((await database.fetch()) || {}),
	};
}

// <===== Connect to Whatsapp =====>
async function connectToWhatsApp() {
	let sock = makeWASocket({
		version: [2, 2413, 1],
		printQRInTerminal: !config.number.bot,
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

			return msg?.message || '';
		},
		shouldSyncHistoryMessage: msg => {
			console.log(`\x1b[32mLoading Chat [${msg.progress}%]\x1b[39m`);
			return !!msg.syncType;
		}
	})

	store.bind(sock.ev)
	if (config.number.bot && !sock.authState.creds.registered) {
        let phoneNumber = config.number.bot.replace(/[^0-9]/g, '')
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) throw "Start with your country's WhatsApp code, Example : 62xxx";
        await functions.delay(5000);
        let code = await sock.requestPairingCode(phoneNumber);
        console.log("Pairing Code : " + `\x1b[32m${code?.match(/.{1,4}/g)?.join("-") || code}\x1b[39m`);
    }
	sock.ev.on("creds.update", saveCreds);
	sock.ev.on("connection.update", async ({ qr, connection, lastDisconnect }) => {
		if (qr) console.log("Scan this QR Code!");
		if (connection === "close") {
			if (lastDisconnect?.error?.output?.statusCode !== 401) {
				connectToWhatsApp();
			} else {
				console.log("Session is corrupted! Write a new session...");
				fs.rmSync(config.settings.session, { recursive: true });
				connectToWhatsApp();
			}
		} else if (connection === "open") {
			if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp")
			sock.sendMessage(config.number.owner + "@s.whatsapp.net", {
				text: `${sock?.user?.name || "Bot"} has Connected...`,
			 }, { ephemeralExpiration: 86400})
		}
	})
	// contacts load
	if (fs.existsSync(pathContacts)) {
		store.contacts = JSON.parse(fs.readFileSync(pathContacts, 'utf-8'));
	} else {
		fs.writeFileSync(pathContacts, JSON.stringify({}));
	}
	// group metadata load
	if (fs.existsSync(pathMetadata)) {
		store.groupMetadata = JSON.parse(fs.readFileSync(pathMetadata, 'utf-8'));
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
	sock.ev.on('contacts.upsert', (upsert) => {
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
	sock.ev.on('groups.update', async (updates) => {
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
			config = await (await import(`./config.js?update=${Date.now()}`)).default
			functions = await (await import(`./lib/functions.js?update=${Date.now()}`)).default;
			await (await import(`./messages/group_update.js?v=${Date.now()}`)).default(sock, updates, config, functions);
		} catch (e) {
			console.log(chalk.bgRed(chalk.yellow(`Error groups update: ${e}`)))
		}
	});
	// messages response
	sock.ev.on("messages.upsert", async ({ type, messages }) => {
		await (await import(`./lib/simplification.js?update=${Date.now()}`)).default(sock, store, config, functions)
		config = await (await import(`./config.js?update=${Date.now()}`)).default;
		functions = await (await import(`./lib/functions.js?update=${Date.now()}`)).default;// nambah semua metadata ke store
		if (store.groupMetadata && Object.keys(store.groupMetadata).length === 0) store.groupMetadata = await sock.groupFetchAllParticipating();
		if (type === "notify") {
			let msg = messages[0];
			if (msg.key.remoteJid === "status@broadcast") return;
			if (msg.message) {
				msg.message = msg.message?.ephemeralMessage ? msg.message.ephemeralMessage.message : msg.message;
				let m = await (await import(`./lib/serialize.js?v=${Date.now()}`)).default(sock, msg, store, config, functions);
				await (await import(`./messages/message_upsert.js?v=${Date.now()}`)).default(sock, m, store, commands, config, functions);
			}
		}
	})

	// group participants update
	sock.ev.on("group-participants.update", async (message) => {
		config = await (await import(`./config.js?update=${Date.now()}`)).default
		functions = await (await import(`./lib/functions.js?update=${Date.now()}`)).default;
		await (await import(`./messages/group_participants.js?v=${Date.now()}`)).default(sock, message, config, functions)
	 })
}
// For loading database
loadDatabase()
// Start to connect whatsapp
await connectToWhatsApp()
// Save Database every 30 second
setInterval(async () => {
	// write database bot
	if (global.db) await database.save(global.db);
	// write contacts and metadata
	if (store.groupMetadata) fs.writeFileSync(pathMetadata, stable(store.groupMetadata, {space: 4}));
	if (store.contacts) fs.writeFileSync(pathContacts, stable(store.contacts, {space: 4}));
	// write store
	if (config.settings.store) store.writeToFile(pathStore);

}, 15 * 1000)
