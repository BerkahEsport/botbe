import path from "path";
import util from "util";
import { toBuffer } from "baileys";
import { platform } from "process";
import { fileURLToPath, pathToFileURL } from "url";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import axios from "axios";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
_filename(pathURL = import.meta.url, rmPrefix = platform !== "win32") { 
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString(); 
},
_dirname(pathURL, rmPrefix = platform !== "win32") { 
  return path.dirname(this._filename(pathURL, rmPrefix));
},
chalkLog(text, color) {
  let formattedText = typeof text === "object" ? JSON.stringify(text) : text;
  let coloredText = !color ? chalk.yellowBright(formattedText) :
                    isNaN(color) ? chalk.ansi256(parseInt(color) > 255 ? 255 : color)(formattedText) :
                    chalk.red(formattedText);
  console.log(chalk.bgCyan("Console Output:\n") + coloredText);
},
toUpper(query) {
  const arr = query.split(" ")
  for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr.join(" ")
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
  return input.split(linkPattern).map(part => {
    if (linkPattern.test(part)) {
      return part;
    } else if (part.startsWith(" ¿") && part.endsWith("¿ ")) {
      return part.replace(/¿/g, "");
    } else {
      return part.split("").map(char => charMap[char] || char).join("");
    }
  }).join("");
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
  timeZone ? tgl.toLocaleString("en", { timeZone }) : "";
  let day = tgl.getDate();
  let bulan = tgl.getMonth();
  let hari = tgl.getDay();
  let thisDay = myDays[hari];
  let yy = tgl.getYear();
  let year = (yy < 1000) ? yy + 1900 : yy;
  return `${thisDay}, ${day} ${myMonths[bulan]} ${year}`;
},
isUrl(url, certainstring = "") {
  const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gi");
  const match = url.match(regex);
  if (!certainstring) {
      return match
  } else if (match) {
      const urlString = match[0];
      if (urlString.includes(certainstring)) {
          return match;
      }
  }
  return false;
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
runtime(seconds) {
  seconds = parseInt(seconds)
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
async shortUrl(url) {
  try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
      return response.data;
  } catch (error) {
      console.error('Error occurred while shortening URL:', error);
      throw error;
  }
},
async fetchBuffer(url, options = {}) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				headers: {
					Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
					"Upgrade-Insecure-Requests": "1",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
					...(options.headers ? options.headers : {}),
				},
				responseType: "stream",
				...(options && delete options.headers && options),
			})
			.then(async ({ data, headers }) => {
				let buffer = await toBuffer(data);
				let position = headers.get("content-disposition")?.match(/filename=(?:(?:"|")(.*?)(?:"|")|([^""\s]+))/);
				let filename = decodeURIComponent(position?.[1] || position?.[2]) || null;
				let mimetype = (await fileTypeFromBuffer(buffer)).mime || "application/octet-stream";
				let ext = (await fileTypeFromBuffer(buffer)).ext || "bin";
				resolve({ data: buffer, filename, mimetype, ext });
			})
			.catch(e => reject(e))
      ;
	});
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
async getFile(PATH, text = "") {
  if (!fs.existsSync("./tmp")) {
    fs.mkdirSync("./tmp")
  } else {
    if (!fs.existsSync("./tmp/image")) fs.mkdirSync("./tmp/image")
    if (!fs.existsSync("./tmp/audio"))fs.mkdirSync("./tmp/audio")
    if (!fs.existsSync("./tmp/video"))fs.mkdirSync("./tmp/video")
  }
  let filename, data;
  if (/^https?:\/\//.test(PATH)) {
      data = await (await this.fetchBuffer(PATH)).data
  } else if (/^data:.*?\/.*?;base64,/i.test(PATH) || this.isBase64(PATH)) {
      data = Buffer.from(PATH?.split(",")[1] ? PATH?.split(",")[1] : PATH, "base64")
  } else if (fs.existsSync(PATH) && (fs.statSync(PATH)).isFile()) {
      data = fs.readFileSync(PATH)
  } else if (Buffer.isBuffer(PATH)) {
      data = PATH
  } else {
      data = Buffer.alloc(20)
  }
   const type = await fileTypeFromBuffer(data) || {
      mime: "application/octet-stream",
      ext: ".bin"
  }
  let name = !text ? `BOTBE_${this.getRandom("", "5")}` : `${text.replace(/[\\/:*?"<>| ]/g, "_")}_${this.getRandom("", "3")}`;
  let size = Buffer.byteLength(data)
  let mime = /image/.test(type.mime) ? "image/" : /audio/.test(type.mime) ? "audio/" : /video/.test(type.mime) ? "video/" : ""
  if (data && !filename && size > 1000000) (filename = path.join(__dirname, `../tmp/${mime}` +`${name}` + "." + type.ext), await fs.promises.writeFile(filename, data))
  return {
      filename: size > 1000000 ? filename : data, 
      ...type, 
      data, 
      size, 
      sizeH: this.formatSize(size)
  }
}
}