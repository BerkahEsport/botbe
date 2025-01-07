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

import path from "path";
import util from "util";
import moment from "moment-timezone";
import { toBuffer } from "@whiskeysockets/baileys";
import { platform, arch } from "process";
import { fileURLToPath, pathToFileURL } from "url";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import axios from "axios";
import config from "../config.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  filename(pathURL = import.meta.url, rmPrefix = platform !== "win32") { 
    const isFileURL = pathURL.startsWith('file:///');
    return rmPrefix ? (isFileURL ? fileURLToPath(pathURL) : pathURL.replace(/^file:(\/+)/, '')) : (isFileURL ? pathURL : pathToFileURL(pathURL).toString());
  },
  dirname(pathURL, rmPrefix = platform !== "win32") { 
    return path.dirname(this.filename(pathURL, rmPrefix));
  },
  log(message, color = "reset", style = "reset") {
    const styles = {
      reset: "\x1b[0m",
      bold: "\x1b[1m",
      italic: "\x1b[3m",
      underline: "\x1b[4m",
    };
    const colors = {
      reset: "\x1b[0m",
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
      gray: "\x1b[90m",
      brightRed: "\x1b[91m",
      brightGreen: "\x1b[92m",
      brightYellow: "\x1b[93m",
      brightBlue: "\x1b[94m",
      brightMagenta: "\x1b[95m",
      brightCyan: "\x1b[96m",
      brightWhite: "\x1b[97m",
    };
    const colorCode = colors[color.toLowerCase()] || colors.reset;
    const styleCode = styles[style.toLowerCase()] || styles.reset;
    const regex = /(\x1b\[[0-9;]*m)(.*?)\1/g;
    const formattedMessage = message.replace(regex, (match, delimiter, text) => {
      return `${delimiter}${text}${styles.reset}`;
    });
    console.log(`${styleCode}${colorCode}%s${styles.reset}`, formattedMessage);
  },
  splitString(input, barrier = "/") {
    const parts = input.split(barrier);
    const lastPart = parts.pop();
    const firstPart = parts.join(barrier);
    return [firstPart, lastPart];
  },
  toUpper(query) {
    const arr = query.split(" ")
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join(" ")
  },
  list(data, top) {
    const symbol = this.random(["⟰", "♕", "♔", "✪", "✽", "✦", "★", "⁂", "✇", "✡", "≛", "☀"]);
    const header = `*<===[ ${top ? `${symbol} ${top} ${symbol}` : `${symbol} SEARCH RESULT ${symbol}`} ]===>*`;
    const generateField = (obj) => {
      return Object.entries(obj).map(([key, value]) => `*${key.toUpperCase()}:* _${value}_`).join('\n');
    };
    const body = generateField(data);
    return `${header}\n\n${body}`;
  },
  listObj(data, top) {
    const symbol = this.random(["⟰", "♕", "♔", "✪", "✽", "✦", "★", "⁂", "✇", "✡", "≛", "☀"]);
    const header = `*<===[ ${top ? `${symbol} ${top} ${symbol}` : `${symbol} SEARCH RESULT ${symbol}`} ]===>*`;
    const generateField = (obj, prefix = '') => {
      return Object.entries(obj).map(([key, value]) => {
        if (typeof value === 'object') {
          return generateField(value, `${(prefix+key).toUpperCase()}.`);
        } else {
          return `*${(prefix+key).toUpperCase()}:* _${value}_`;
        }
      }).join('\n');
    };
    const body = generateField(data);
    return `${header}\n\n${body}`;
  },
  mapList(data, top) {
    const symbol = this.random(["⟰", "♕", "♔", "✪", "✽", "✦", "★", "⁂", "✇", "✡", "≛", "☀"]);
    const header = `*<===[ ${top ? `${symbol} ${top} ${symbol}` : `${symbol} SEARCH RESULT ${symbol}`} ]===>*`;
    const stringifyValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        return Object.entries(value).map(([key, val]) => `*${key.toUpperCase()}:* ${stringifyValue(val)}`).join('\n');
      }
      return `_${typeof value === "string" ? value.trim() : value}_`;
    };
    const generateField = (v, index) => {
      const fields = Object.entries(v).map(([key, value]) => `*${key.toUpperCase()}:* ${stringifyValue(value)}`).join('\n');
      return `*[${index + 1}]* ${fields}`;
    };
    const body = data.map((v, i) => generateField(v, i)).join(`\n<==== ${config.name.bot} ====>\n\n`);
    return `${header}\n\n${body}`;
  },
  transformText(input) {
    const charMap = {
      "A": "ᴀ", "B": "ʙ", "C": "ᴄ", "D": "ᴅ", "E": "ᴇ", "F": "ꜰ", "G": "ɢ", "H": "ʜ", "I": "ɪ", "J": "ᴊ", 
      "K": "ᴋ", "L": "ʟ", "M": "ᴍ", "N": "ɴ", "O": "ᴏ", "P": "ᴘ", "Q": "Q", "R": "ʀ", "S": "ꜱ", "T": "ᴛ", 
      "U": "ᴜ", "V": "ᴠ", "W": "ᴡ", "X": "x", "Y": "ʏ", "Z": "ᴢ",
      "a": "ᴀ", "b": "ʙ", "c": "ᴄ", "d": "ᴅ", "e": "ᴇ", "f": "ꜰ", "g": "ɢ", "h": "ʜ", "i": "ɪ", "j": "ᴊ", 
      "k": "ᴋ", "l": "ʟ", "m": "ᴍ", "n": "ɴ", "o": "ᴏ", "p": "ᴘ", "q": "Q", "r": "ʀ", "s": "ꜱ", "t": "ᴛ", 
      "u": "ᴜ", "v": "ᴠ", "w": "ᴡ", "x": "x", "y": "ʏ", "z": "ᴢ",
      "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉"
    };

    const linkPattern = /(https?:\/\/[^\s]+)/g;
    const atNumberPattern = /@[\d]+(?:\s|$)/g;

    return input.split(linkPattern).map(part => {
      if (linkPattern.test(part)) {
        return part;
      } else {
        return part.split(/(¿[^¿]*¿)/g).map(segment => {
          if (segment.startsWith('¿') && segment.endsWith('¿')) {
            return segment;
          } else {
            return segment.split(atNumberPattern).map((subpart, index, arr) => {
              if (index < arr.length - 1) {
                let match = part.match(atNumberPattern)[index];
                return subpart.split("").map(char => charMap[char] || char).join("") + match;
              } else {
                return subpart.split("").map(char => charMap[char] || char).join("");
              }
            }).join("");
          }
        }).join("");
      }
    }).join("").replace(/¿/g, '');
  },
  // Don't delete the code below because it will cause an error.
  extractCategoriesFromSwitch(switchCode) {
    const regex = /case\s+["']([^"']+)["'](?:\s*:\s*case\s+["']([^"']+)["'])*\s*:\s*{[^]*?\/\/\s*(\w+)/g;
    const categories = {};
    let match;
    while ((match = regex.exec(switchCode)) !== null) {
      const category = match[3];
      const firstCommand = match[1];
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(firstCommand);
    }
    return Object.entries(categories).map(([category, values]) => ({
      category,
      values,
    }));
  },
  truncateText(text, wordLimit) {
      const words = text.split(' ');
      if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...';
      } else {
          return text;
      }
  },
  limit(m, need) {
    const user = global.db.users[m.sender];
    if (!user) {
      console.log("User tidak ditemukan!");
      return false;
    }
    if (m.isPremium) {
      return true;
    }
    if (user.limit < need) {
      m.reply(`Limit anda tidak mencukupi untuk mengakses fitur!\n\nDibutuhkan ${need} limit.\nLimit anda: ${user.limit}`);
      return false;
    }
    user.limit -= need;
    m.reply(`Limit anda terpakai: ${need}.\n\nSisa limit: ${user.limit}`);
    return true;
  },
  numbersOnly(inputString) {
    return inputString.replace(/[^0-9]/g, "");
  },
  isNumber(x) {
    return typeof x === "number" && !isNaN(x);
  },
  isBoolean(x) {
    return typeof x === "boolean" && Boolean(x)
  },
  sleep(ms) {
    return new Promise(a => setTimeout(a, ms))
  },
  delay(time) {
    return new Promise(res => setTimeout(res, time))
  },
  str(obj) {
    return JSON.stringify(obj, null, 2)
  },
  format(obj) {
    return util.format(obj)
  },
  msToDate(dateString, timeZone = "") {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(dateString);
    timeZone ? date.toLocaleString("en", { timeZone }) : "";
    let day = date.getDate();
    let month = date.getMonth();
    let weekday = date.getDay();
    let thisDay = days[weekday];
    let year = date.getFullYear();
    return `${thisDay}, ${day} ${months[month]} ${year}`;
  },
  tanggal(numer, timeZone = "") {
    const myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
    let tgl = new Date(numer);
    if (timeZone) {
      tgl = new Date(tgl.toLocaleString("en-US", { timeZone }));
    }
    let day = tgl.getDate();
    let bulan = tgl.getMonth();
    let hari = tgl.getDay();
    let thisDay = myDays[hari];
    let yy = tgl.getFullYear();
    let hours = tgl.getHours();
    let minutes = tgl.getMinutes();
    let seconds = tgl.getSeconds();
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${thisDay}, ${day} ${myMonths[bulan]} ${yy} pukul ${formattedTime}`;
  },
  isAllowedText(text, allowedWords) {
    if (allowedWords instanceof RegExp) {
      return allowedWords.test(text.trim());
    }
    if (typeof allowedWords === 'string') {
      return text.trim() === allowedWords;
    }
    if (Array.isArray(allowedWords)) {
      const escapedWords = allowedWords.map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      const regex = new RegExp(`^(${escapedWords.join('|')})$`, 'i');
      return regex.test(text.trim());
    }
    return false;
  },
  isUrl(url, pattern) {
    if (typeof pattern === 'string') {
      return url.includes(pattern) ? url : false;
    }
    if (Array.isArray(pattern)) {
      return pattern.some(word => url.includes(word)) ? url : false;
    }
    if (pattern instanceof RegExp) {
      return pattern.test(url) ? url : false;
    }
    return false;
  },
  card(options, url, body, footer, button, name, text, id) {
    return options.map((item, index) => {
        const itemUrl = item?.[url] ? String(item[url]) : (item?.url ? item.url : config.logo.thumb);
        const itemBody = item?.[body] ? String(item[body]) : (item?.title ? item.title : `*Hasil ke: ${index + 1}*`);
        const itemFooter = item?.[footer] ? String(item[footer]) : (item?.id ? String(item.id) : (item.desc ? item.desc : config.name.bot));
        const buttons = Array.isArray(button) ? button.map(v => {
            const buttonName = name ? v[name] : v.name;
            const buttonText = text ? v[text] : v.text;
            const buttonId = id ? v[id] : v.id;
            if (buttonName && buttonText && buttonId) {
                return {
                    name: String(buttonName),
                    buttonParamsJson: JSON.stringify({ display_text: String(buttonText), id: String(buttonId) })
                };
            } else {
                console.warn(`Invalid button data: ${JSON.stringify(v)}`);
                return null;
            }
        }).filter(Boolean) : [];
        return {
            url: itemUrl,
            body: itemBody,
            footer: itemFooter,
            buttons: buttons
        };
    });
  },
  wa(input) {
    if (!Array.isArray(input)) {
        input = input.split(".");
    }
    const transformed = input.map(item => {
        if (item.startsWith("085")) {
            return item.replace(/^085/g, '6285');
        } else {
            return item;
        }
    });
    return transformed.map(item => {
        return item.replace(/[^\d.]+/g, '')
                  .split('.')
                  .map(str => str + "@s.whatsapp.net");
    }).flat();
  },
  random(list) {
    return list[Math.floor(Math.random() * list.length)]
  },
  randomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  getRandom(ext = "", length = "10") {
    let result = ""
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    let characterLength = character.length
    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLength))
    }
    return `${result}${ext ? `.${ext}` : ""}`
  },
  getRandomStringsFromArray(arr, count) {
    const length = Math.min(count, arr.length);
    const originalCopy = arr.slice();
    const result = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * originalCopy.length);
        result.push(originalCopy.splice(randomIndex, 1)[0]);
    }
    return result;
  },
  generateIntegerArray(maxValue) {
    const parsedValue = parseInt(maxValue);
    if (isNaN(parsedValue) || parsedValue < 1) {
        parsedValue = 100;
    }
    const arrayInteger = Array.from({ length: parsedValue }, (_, index) => index + 1);
    return arrayInteger;
  },
  generateArray(...args) {
    let combinedArray = [];
      for (let i = 0; i < args.length; i++) {
          const value = !isNaN(args[i]) ? parseInt(args[i]) : 0;
          const newArray = Array(args.length - i).fill(value);
          combinedArray = combinedArray.concat(newArray);
      }
    combinedArray = shuffleArray(combinedArray);
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    return this.random(combinedArray);
  },
  readMore() {
    return String.fromCharCode(8206).repeat(4001)
  },
  isBase64(string) {
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    return regex.test(string)
  },
  formatSize(bytes) {
    if (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + " GB"; }
    else if (bytes >= 1000000) { bytes = (bytes / 1000000).toFixed(2) + " MB"; }
    else if (bytes >= 1000) { bytes = (bytes / 1000).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes == 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
  },
  clockString(ms) {
    if (isNaN(ms)) {
      return "-- Tahun -- Bulan -- Hari -- Jam -- Menit -- Detik";
    }
    const y = Math.floor(ms / 31536000000); // Tahun
    const mo = Math.floor(ms / 2592000000) % 12; // Bulan
    const d = Math.floor(ms / 86400000) % 30; // Hari
    const h = Math.floor(ms / 3600000) % 24; // Jam
    const m = Math.floor(ms / 60000) % 60; // Menit
    const s = Math.floor(ms / 1000) % 60; // Detik
    const timeParts = [
      { value: y, unit: " Tahun " },
      { value: mo, unit: " Bulan " },
      { value: d, unit: " Hari " },
      { value: h, unit: " Jam " },
      { value: m, unit: " Menit " },
      { value: s, unit: " Detik" }
    ];
    const formattedTime = timeParts
      .filter((part, index) => part.value > 0 || index >= 3)
      .map(part => part.value.toString().padStart(2, "0") + part.unit)
      .join("");
    return formattedTime;
  },
  runtime(time) {
    if (time > 1000) {
    time = time / 1000;
  }
    let seconds = parseInt(time);
    let d = Math.floor(seconds / (3600 * 24))
    let h = Math.floor(seconds % (3600 * 24) / 3600)
    let m = Math.floor(seconds % 3600 / 60)
    let s = Math.floor(seconds % 60)
    let dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
    let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
    let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
    return dDisplay + hDisplay + mDisplay + sDisplay
  },
  greeting(name) {
    const time = parseInt(moment.tz("Asia/Jakarta").format("HH"), 10);
    let message = "Good early morning 🌌";
    if (time >= 4 && time < 10) {
      message = "Good morning 🌄";
    } else if (time >= 10 && time < 15) {
      message = "Good afternoon ☀️";
    } else if (time >= 15 && time < 18) {
      message = "Good evening 🌇";
    } else if (time >= 18) {
      message = "Good night 🌙";
    }
    const displayName = name.includes("@") ? name.split("@")[0] : typeof name === "string" ? name : "there";
    return `${message}, @${displayName}!`;
  },
  async shortUrl(url) {
    try {
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
        return response.data;
    } catch (error) {
        console.error('Error occurred while shortening URL:', error);
        throw error;
    }
  },
  async fetchBuffer(url, options = {}, responseType = 'arraybuffer') {
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Upgrade-Insecure-Requests": "1",
          "User-Agent": this.randomUA(),
          ...options.headers,
        },
        responseType, // Default to 'arraybuffer' if not provided
        ...options,
      });

      let buffer;
      if (responseType === 'stream') {
        buffer = await toBuffer(response.data);
      } else {
        buffer = response.data;
      }
      const headers = response.headers;
      const contentDisposition = headers['content-disposition'];
      const filenameMatch = contentDisposition?.match(/filename=(?:(?:"|')(.*?)(?:"|')|([^""\s]+))/);
      const filename = filenameMatch ? decodeURIComponent(filenameMatch[1] || filenameMatch[2]) : null;
      const fileType = await fileTypeFromBuffer(buffer);
      const mimetype = fileType?.mime || 'application/octet-stream';
      const ext = fileType?.ext || 'bin';
      return { data: buffer, filename, mimetype, ext};
    } catch (error) {
      throw new Error(`Failed to fetch buffer: ${error.message}`);
    }
  },
  async fetchJson(url, options = {}) {
    try {
      const {data} = await axios.get(url, {
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
          ...(options.headers ? options.headers : {}),
        },
        responseType: "json",
        ...(options && delete options.headers && options),
      });
      return data;
    } catch (error) {
      console.log(error)
      throw "error";
    }
  },
  async fetchText(url, options = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
            ...(options.headers ? options.headers : {}),
          },
          responseType: "text",
          ...(options && delete options.headers && options),
        })
        .then(({ data }) => resolve(data))
        .catch(reject("Failed to fetch text!"));
    });
  },
  async fetchData(url) {
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const contentType = response.headers['content-type'];
      if (contentType.includes('application/json')) {
        let json = '';
        response.data.on('data', (chunk) => {
          json += chunk.toString('utf-8');
        });
        return new Promise((resolve, reject) => {
          response.data.on('end', () => resolve(JSON.parse(json)));
          response.data.on('error', reject);
        });
      } else if (contentType.includes('text')) {
        let text = '';
        response.data.on('data', (chunk) => {
          text += chunk.toString('utf-8');
        });
        return new Promise((resolve, reject) => {
          response.data.on('end', () => resolve(text));
          response.data.on('error', reject);
        });
      } else {
        const chunks = [];
        response.data.on('data', (chunk) => {
          chunks.push(chunk);
        });
        return new Promise((resolve, reject) => {
          response.data.on('end', () => resolve(Buffer.concat(chunks)));
          response.data.on('error', reject);
        });
      }
    } catch (error) {
      throw error;
    }
  },
  async getFile(PATH, text = "") {
    const tmpFolder = path.join(__dirname, `../tmp/`);
    const imageFolder = path.join(__dirname, `../tmp/image/`);
    const audioFolder = path.join(__dirname, `../tmp/audio/`); 
    const videoFolder = path.join(__dirname, `../tmp/video/`);
    const stickerFolder = path.join(__dirname, `../tmp/sticker/`);
    const binFolder = path.join(__dirname, `../tmp/bin/`);
    if (!fs.existsSync(tmpFolder)) {
      fs.mkdirSync(tmpFolder);
    } else {
      if (!fs.existsSync(imageFolder)) fs.mkdirSync(imageFolder);
      if (!fs.existsSync(audioFolder)) fs.mkdirSync(audioFolder);
      if (!fs.existsSync(videoFolder)) fs.mkdirSync(videoFolder);
      if (!fs.existsSync(stickerFolder)) fs.mkdirSync(stickerFolder);
        if (!fs.existsSync(binFolder)) fs.mkdirSync(binFolder);
    }
    let data;
    if (/^https?:\/\//.test(PATH)) {
        data = (await this.fetchBuffer(PATH)).data;
    } else if (/^data:.*?\/.*?;base64,/i.test(PATH) || this.isBase64(PATH)) {
        data = Buffer.from(PATH?.split(",")[1] ? PATH?.split(",")[1] : PATH, "base64");
    } else if (fs.existsSync(PATH) && (fs.statSync(PATH)).isFile()) {
        data = fs.readFileSync(PATH);
    } else if (Buffer.isBuffer(PATH)) {
        data = PATH;
    } else {
        data = Buffer.alloc(20);
    }
    const type = await fileTypeFromBuffer(data) || {
        mime: "application/octet-stream",
        ext: ".bin"
    }
    let name = !text ? `BOTBE_${this.getRandom("", "5")}` : `${text.replace(/[\\/:*?"<>| ]/g, "_")}_${this.getRandom("", "3")}`;
    let size = Buffer.byteLength(data);
    let mime = /image/.test(type.mime) ? "image/" : /audio/.test(type.mime) ? "audio/" : /video/.test(type.mime) ? "video/" : "bin/";
    const filename = tmpFolder+mime+name + "." + type.ext;
    await fs.promises.writeFile(filename, data);
    return {
        filename, 
        ...type, 
        data, 
        size, 
        sizeH: this.formatSize(size)
    }
  },
  async pushToJson(filePath, newObjects) {
    if (!fs.existsSync(filePath)) {
      await saveJsonFile(filePath, []);
      return [];
    }
    const data = await loadJsonFile(filePath);
    newObjects.forEach(newObject => {
      if (!isDuplicate(newObject, data)) {
        data.push(newObject);
      }
    });
    await saveJsonFile(filePath, data);
    console.log('Non-duplicate objects added to the file.');
  async function loadJsonFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }
  async function saveJsonFile(filePath, data) {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 4), 'utf-8');
  }
  function isDuplicate(newObject, existingObjects) {
    return existingObjects.some(obj => JSON.stringify(obj) === JSON.stringify(newObject));
  }
  },
  xpRange(level, multiplier = 38) {
    level = Math.max(Math.floor(level), 0);
    const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75;
    const min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1;
    const max = Math.round(Math.pow(level + 1, growth) * multiplier);
    return {
        min,
        max,
        exp: max - min
    };
  },
  findLevel(xp, multiplier = 38) {
    if (!isFinite(xp) || isNaN(xp) || xp <= 0) return 1;
    let level = 0;
    while (this.xpRange(level, multiplier).min <= xp) level++;
    return level - 1;
  },
  canLevelUp(level, xp, multiplier = 38) {
    if (level < 0 || !isFinite(xp) || isNaN(xp) || xp <= 0) return false;
    return level < this.findLevel(xp, multiplier);
  },
  PHONENUMBER_MCC(phoneNumber) {
    const countryNumber = [
      "93", "355", "213", "1-684", "376", "244", "1-264", "1-268", "54", "374",
      "297", "61", "43", "994", "1-242", "973", "880", "1-246", "375", "32", "501",
      "229", "1-441", "975", "591", "387", "267", "55", "1-284", "673", "359", "226",
      "257", "855", "237", "238", "1-345", "236", "235", "56", "86", "57", "269", "682",
      "506", "385", "53", "357", "420", "243", "45", "253", "1-767", "1-809", "1-849", 
      "1-829", "593", "20", "503", "240", "291", "372", "251", "500", "298", "679", "358", 
      "33", "689", "241", "220", "995", "49", "233", "350", "30", "299", "1-473", "1-671", 
      "502", "224", "592", "509", "504", "852", "36", "354", "91", "62", "98", "964", "353",
      "972", "39", "225", "1-876", "81", "962", "254", "686", "383", "965", "371", "961", 
      "266", "231", "218", "423", "370", "352", "389", "261", "265", "60", "960", "223", 
      "356", "692", "222", "230", "52", "691", "373", "377", "976", "382", "1-664", "212", 
      "258", "95", "264", "674", "977", "31", "687", "64", "505", "227", "234", "683", 
      "1-670", "47", "968", "92", "680", "970", "507", "675", "595", "51", "63", "48", 
      "351", "1-787", "1-939", "974", "242", "40", "7", "250", "290", "1-869", "1-758",
      "508", "1-784", "685", "378", "239", "966", "221", "381", "248", "232", "65", "386",
      "677", "27", "211", "34", "94", "249", "597", "268", "46", "41", "963", "886", "992",
      "255", "66", "228", "690", "676", "1-868", "216", "90", "993", "1-649", "688", "1-340",
      "256", "380", "971", "44", "1", "598", "998", "678", "379", "58", "681", "967", "260",
      "263", "670", "245", "856", "599", "850", "262", "82", "84"
    ];
    return countryNumber.some(v => phoneNumber.startsWith(v));
  },
  randomUA() {
    const UAs = [
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 6.3 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.12 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.11 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/58.0.3029.110 Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.1 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
        "Mozilla/5.0 (Windows NT 6.1 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/45.0.2552.888",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64 rv:45.0) Gecko/20100101 Firefox/45.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_10_5) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
        "Mozilla/5.0 (Windows NT 10.0 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (iPad CPU OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 Mobile/14F89 Safari/602.1",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36 OPR/45.0.2552.812",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 5.1 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (X11 Linux x86_64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.12 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:40.0) Gecko/20100101 Firefox/40.1",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.10 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
        "Mozilla/5.0 (compatible MSIE 9.0 Windows NT 6.0 Trident/5.0 Trident/5.0)",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:45.0) Gecko/20100101 Firefox/45.0",
        "Mozilla/5.0 (compatible MSIE 9.0 Windows NT 6.1 Trident/5.0 Trident/5.0)",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (iPad CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (X11 Fedora Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 Trident/7.0 Touch rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 6.2 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 WOW64 Trident/7.0 rv:11.0) like Gecko"
    ]
    return UAs[Math.floor(Math.random() * UAs.length)]
  }
}