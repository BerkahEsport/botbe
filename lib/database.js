/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 62895375950107

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default async (sock, m, config, functions) => {
  try { 
    // <========== Barrier USER ==========>
    if (m.isUser) {
    let user = global.db.users[m.sender];
    if (typeof user !== "object") global.db.users[m.sender] = {};
    if (user) { //Add if you are
      if (!("registered" in user)) user.registered = false;
      if (!functions.isNumber(user.regTime)) user.registeredTime = 0;
      if (!("premium" in user)) user.premium = false;
      if (!functions.isNumber(user.premiumTime)) user.premiumTime = 0;
      if (!functions.isNumber(user.limit)) user.limit = 10;
      if (!("name" in user)) user.name = m.pushName || "";
      if (!functions.isNumber(user.age)) user.age = 0;
      if (!functions.isNumber(user.afk)) user.afk = -1;
      if (!("afkReason" in user)) user.afkReason = "";
    } else
      global.db.users[m.sender] = {
        registered: false,
        registeredTime: 0,
        premium: false,
        premiumTime: 0,
        limit: 10,
        name: m.pushName || "",
        age: 0,
        afk: -1,
        afkReason: ""
      }
    };
// <========== Barrier GROUP ==========>
  if (m.isGroup) {
    let group = global.db.groups[m.from];
    if (typeof group !== "object") global.db.groups[m.from] = {};
    if (group) {
      if (!("registered" in group)) group.registered = false;
      if (!functions.isNumber(group.expired)) group.expired = 0;
      if (!("antiLink" in group)) group.antiLink = false;
      if (!("antiBot" in group)) group.antiBot = false;
      if (!("isBanned" in group)) group.isBanned = false;
      if (!("welcome" in group)) group.welcome = false;
      if (!("sWelcome" in group)) group.sWelcome = "";
      if (!("sBye" in group)) group.sBye = "";
    } else
      global.db.groups[m.from] = {
        registered: false,
        expired: 0,
        isBanned: false,
        antiLink: false,
        antiBot: false,
        welcome: false,
        sWelcome: "",
        sBye: "",
      }
    };
// <========== Barrier STATS ==========>
    let stats = global.db.stats
    if (typeof stats !== "object") global.db.stats = {};
    if (stats) {
    if (!functions.isNumber(stats.total)) stats.total = 0;
    if (!functions.isNumber(stats.success)) stats.success = 0;
    if (!functions.isNumber(stats.failed)) stats.failed = 0;
    if (!functions.isNumber(stats.today)) stats.today = 0;
      } else {
        global.db.stats = {
        total: 0,
        success: 0,
        failed: 0,
        today: 0 
    } }
// <========== Barrier SETTINGS ==========>
    let settings = global.db.settings[sock.user.jid];
    if (typeof settings !== "object") global.db.settings[sock.user.jid] = {};
    if (settings) {
      if (!("autoai" in settings)) settings.autoai = true;
      if (!("self" in settings)) settings.self = false;
      if (!functions.isNumber(settings.hittime)) settings.hittime = 0;
    } else
      global.db.settings[sock.user.jid] = {
        autoai: true,
        self: false,
        hittime: 0
      };
  } catch (e) {
    console.log(config.name.bot, "DATABASE ERROR!!", e);
  }
}

// <========== Barrier LOCALDB ==========>
import stable from "json-stable-stringify";
import { promises as fs } from 'fs';
import path from 'path';

export class Localdb {
  constructor(db) {
    this.file = db || "database";
    this.baseDir = "./lib/json";
    this.files = [
      "contacts.json",
      "groupMetadata.json",
      "database.json"
    ];
  }

  ensureDirectory = async () => {
    try {
      await fs.access(this.baseDir);
    } catch {
      await fs.mkdir(this.baseDir, { recursive: true });
    }
  };

  ensureFile = async (fileName) => {
    const filePath = path.join(this.baseDir, fileName);
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify({}), "utf-8");
    }
  };

  fetch = async () => {
    await this.ensureDirectory();
    for (const file of this.files) {
      await this.ensureFile(file);
    }

    try {
      const filePath = path.join(this.baseDir, "database.json");
      const jsonData = await fs.readFile(filePath, "utf-8");
      return JSON.parse(jsonData || "{}");
    } catch (error) {
      console.error("Error reading database.json:", error);
      return {};
    }
  };

  save = async (data) => {
    const database = data || global.db;
    const filePath = path.join(this.baseDir, "database.json");
    const backupPath = path.join(this.baseDir, "database.bak");

    try {
      const jsonContent = stable(database, {space: 4})
      await fs.writeFile(filePath, jsonContent, "utf-8");
      await fs.writeFile(backupPath, jsonContent, "utf-8");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
}
