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
                  if (!("self" in settings)) settings.self = false;
                  if (!functions.isNumber(settings.hittime)) settings.hittime = 0;
                } else
                  global.db.settings[sock.user.jid] = {
                    self: false,
                    hittime: 0
                  };
              } catch (e) {
                console.log(config.name.bot, "DATABASE ERROR!!", e);
              }
            }

import fs from "fs";
import stable from "json-stable-stringify";

export class Localdb {
  constructor(db) {
    this.file = db || "database";
  }

  fetch = async () => {
    if (!fs.existsSync("./lib/json/database.json")) return {};
    const json = JSON.parse(fs.readFileSync("./lib/json/database.json", "utf-8"));
    return json;
  };

  save = async (data) => {
    const database = data ? data : global.db;
    fs.writeFileSync("./lib/json/database.json", stable(database, {space: 4}));
    fs.writeFileSync("./lib/json/database.bak", stable(database, {space: 4}));
  };
}