import axios from "axios";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";
import path from "node:path";
import stream from "stream";
import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { platform } from "os";
import moment from "moment-timezone";
import { format } from "util";
import Jimp from "jimp"
import fetch from "node-fetch";
import mimes from "mime-types";
import chalk from "chalk";
import config from "../config.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const depen = fs.readFileSync("./package.json").toString();


export default new class Function {
    constructor() {
        for (const a in depen?.dependencies) {
            this[a] = import(a)
        }
    }
// <===== Membuat teks =====>

/*
.mapList(data, top, {name: "", value: "",
                     name1: "", value1: "",
                     name2: "", value2: "",
                     name3: "", value3: "",
                     name4: "", value4: "",
                     name5: "", value5: "",
                                       })
*/
mapList(data, top, options = {}) {
let symbol = this.random(["⟰", "♕", "♔", "✪", "✽", "✦", "★", "⁂", "✇", "✡", "≛", "꙰", "☀"])
return ` *<===[ ${top ? `${symbol} ${top} ${symbol}` : `${symbol} ʜᴀꜱɪʟ ᴘᴇɴᴄᴀʀɪᴀɴ ${symbol}`} ]===>*

${data.map((v,i) => `*[${i+1}]* ${options.name ? `*${options.name}:*` : ""} *${options.value ? v[options.value] : v.title}*
${options.name1 ? `*${options.name1}:* _${options.value1 ? v[options.value1] : ""}_` : `${options.value1 ? `➠  _${v[options.value1]}_` : ""}`}
${options.name2 ? `*${options.name2}:* _${options.value2 ? v[options.value2] : ""}_` : `${options.value2 ? `➠  _${v[options.value2]}_` : ""}`}
${options.name3 ? `*${options.name3}:* _${options.value3 ? v[options.value3] : ""}_` : `${options.value3 ? `➠  _${v[options.value3]}_` : ""}`}
${options.name4 ? `*${options.name4}:* _${options.value4 ? v[options.value4] : ""}_` : `${options.value4 ? `➠  _${v[options.value4]}_` : ""}`}
${options.name5 ? `*${options.name5}:* _${options.value5 ? v[options.value5] : ""}_` : `${options.value5 ? `➠  _${v[options.value5]}_` : ""}`}
${options.name6 ? `*${options.name6}:* _${options.value6 ? v[options.value6] : ""}_` : `${options.value6 ? `➠  _${v[options.value6]}_` : ""}`}
${options.name7 ? `*${options.name7}:* _${options.value7 ? v[options.value7] : ""}_` : `${options.value7 ? `➠  _${v[options.value7]}_` : ""}`}
${options.name8 ? `*${options.name8}:* _${options.value8 ? v[options.value8] : ""}_` : `${options.value8 ? `➠  _${v[options.value8]}_` : ""}`}
${options.name9 ? `*${options.name9}:* _${options.value9 ? v[options.value9] : ""}_` : `${options.value9 ? `➠  _${v[options.value9]}_` : ""}`}
${options.name10 ? `*${options.name10}:* _${options.value10 ? v[options.value10] : ""}_` : `${options.value10 ? `➠  _${v[options.value10]}_` : ""}`}
`.trim()).join(`\n<==== ${config.nama.bot} ====>\n\n`)}`
}


// <===== Fungsi =====>
    require(module, dir = import.meta) {
        const path = (dir).url || (dir)
        let require = createRequire(path)
        return require(module)
    }

    __filename(pathURL = import.meta, rmPrefix = platform() !== "win32") {
        const path = (pathURL).url || (pathURL)
        return rmPrefix ?
            /file:\/\/\//.test(path) ?
                fileURLToPath(path) :
                path : /file:\/\/\//.test(path) ?
                path : pathToFileURL(path).href
    }

    __dirname(pathURL) {
        const dir = this.__filename(pathURL, true)
        const regex = /\/$/
        return regex.test(dir) ?
            dir : fs.existsSync(dir) && fs.statSync(dir).isDirectory ?
                dir.replace(regex, "") :
                path.dirname(dir)
    }

    async dirSize(directory) {
        const files = fs.readdirSync(directory)
        const stats = files.map(file => fs.statSync(path.join(directory, file)))

        return (await Promise.all(stats)).reduce((accumulator, { size }) => accumulator + size, 0)
    }
    chalk(text, color) {
        return console.log(chalk.bgCyan("Hasil konsol: \n") + !color ? chalk.yellowBright(typeof text == "object" ? JSON.stringify(text) : text) : isNaN(color)
         ? chalk.ansi256(parseInt(color) > 255 ? 255 : color)(text) : chalk.red(text))
    }
    numbersOnly(inputString) {
        return inputString.replace(/[^0-9]/g, "");
    }
    isNumber(x) {
        return typeof x === "number" && !isNaN(x);
    }
    isBoolean(x) {
        return typeof x === "boolean" && Boolean(x)
    }
    sleep(ms) {
        return new Promise(a => setTimeout(a, ms))
    }
    delay(time) {
        return new Promise(res => setTimeout(res, time))
    }
    format(str) {
        return JSON.stringify(str, null, 2)
    }

    Format(str, options = {}) {
        return format(str)
    }

    jam(numer, options = {}) {
        let format = options.format ? options.format : "HH:mm"
        let jam = options?.timeZone ? moment(numer).tz(timeZone).format(format) : moment(numer).format(format)

        return `${jam}`
    }
    msToDate(ms) {
        let days = Math.floor(ms / (24 * 60 * 60 * 1000));
        let daysms = ms % (24 * 60 * 60 * 1000);
        let hours = Math.floor((daysms) / (60 * 60 * 1000));
        let hoursms = ms % (60 * 60 * 1000);
        let minutes = Math.floor((hoursms) / (60 * 1000));
        let minutesms = ms % (60 * 1000);
        let sec = Math.floor((minutesms) / (1000));
        return days + " hari " + hours + " jam " + minutes + " menit " + sec + " detik";
        }
    clockString(ms) {
        let y = isNaN(ms) ? "--" : Math.floor(ms / 31556926000)
        let m = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
        let d = isNaN( ms ) ? "--" : Math.floor( ms / 86400000 ) % 30
        let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
        return [y , " Tahun ", m, " Bulan ", d, " Hari ", h, " Jam"].map(v => v.toString().padStart(2, 0)).join("")
      }
    tanggal(numer, timeZone = "") {
        const myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
        var tgl = new Date(numer);
        timeZone ? tgl.toLocaleString("en", { timeZone }) : ""
        var day = tgl.getDate()
        var bulan = tgl.getMonth()
        var thisDay = tgl.getDay(),
            thisDay = myDays[thisDay];
        var yy = tgl.getYear()
        var year = (yy < 1000) ? yy + 1900 : yy;
        let gmt = new Date(0).getTime() - new Date("1 January 1970").getTime()

        return `${thisDay}, ${day} ${myMonths[bulan]} ${year}`
    }

    async getFile(PATH, save = false) {
        try {
            let filename = "Not Saved"
            let data
            if (/^https?:\/\//.test(PATH)) {
                data = await (await this.fetchBuffer(PATH)).data
            } else if (/^data:.*?\/.*?;base64,/i.test(PATH) || this.isBase64(PATH)) {
                data = Buffer.from(PATH.split`,`[1], "base64")
            } else if (fs.existsSync(PATH) && (fs.statSync(PATH)).isFile()) {
                data = fs.readFileSync(PATH)
            } else if (Buffer.isBuffer(PATH)) {
                data = PATH
            } else {
                data = Buffer.alloc(20)
            }

            let type = await fileTypeFromBuffer(data) || {
                mime: "application/octet-stream",
                ext: ".bin"
            }

            if (data && save) {
                filename = path.join(__dirname, "..", "..", "tmp", +new Date()+ "." + type.ext)
                fs.promises.writeFile(filename, data)
            }
            let size = Buffer.byteLength(data)
            return {
                filename,
                size,
                sizeH: this.formatSize(size),
                ...type,
                data
            }
        } catch { }
    }
/**
 * Membuffer file.
 * @param {fs.PathLike} PATH 
 * @param {String} text
 */
async getFiles(PATH, text = "") {
    let filename, res;
    if (/^https?:\/\//.test(PATH)) {
        let data = await fetch(this.isUrl(PATH))
        res = data instanceof ArrayBuffer ? Buffer.from(await data.arrayBuffer()) : await data.buffer()
    } else if (/^data:.*?\/.*?;base64,/i.test(PATH) || this.isBase64(PATH)) {
        res = Buffer.from(PATH?.split(",")[1] ? PATH?.split(",")[1] : PATH, "base64")
    } else if (fs.existsSync(PATH) && (fs.statSync(PATH)).isFile()) {
        res = fs.readFileSync(PATH)
    } else if (Buffer.isBuffer(PATH)) {
        res = PATH
    } else {
        res = Buffer.alloc(20)
    }
     const type = await fileTypeFromBuffer(res) || {
        mime: "application/octet-stream",
        ext: ".bin"
    }
    let name = !text ? `BOTBE_${this.getRandom("", "5")}` : `${text.replace(/[\\/:*?"<>| ]/g, "_")}_${this.getRandom("", "3")}`;
    let size = Buffer.byteLength(res)
    if (res && !filename && size > 1000000) (filename = path.join(__dirname, "../tmp/" +`${name}` + "." + type.ext), await fs.promises.writeFile(filename, res))
    return {
        filename: size > 1000000 ? filename : res, 
        ...type, 
        res, 
        size, 
        sizeH: this.formatSize(size)
    }
}

async fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw response.status;
        }
        const contentType = response.headers.get("content-type");
        if (contentType.includes("application/json")) {
          return await response.json();
        } else if (contentType.includes("text")) {
          return await response.text();
        } else {
          return await response.buffer();
        }
      } catch (error) {
        throw error;
      }
    }
  
    async fetchJson(url, options = {}) {
        try {
           let { data } = await axios(url, {
              headers: {
                 "Accept": "application/json, text/plain, */*",
                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
                 ...(options.headers ? options.headers : {}),
              },
              responseType: "json",
              ...options
           });
           return data;
        } catch (e) {
           throw e;
        }
     }
  
     async fetchText(url, options = {}) {
        try {
           let data = await axios.get(url, {
              headers: {
                 ...(!!options.headers ? options.headers : {})
              },
              responseType: "text",
              ...options
           })
  
           return await data?.data;
        } catch (e) {
           throw e;
        }
     }
  
     fetchBuffer(string, options = {}) {
        return new Promise(async (resolve, reject) => {
           try {
              if (/^https?:\/\//i.test(string)) {
                 let data = await axios.get(string, {
                    headers: {
                       ...(!!options.headers ? options.headers : {}),
                    },
                    responseType: "arraybuffer",
                    ...options,
                 })
                 let buffer = await data?.data
                 let name = /filename/i.test(data.headers?.get("content-disposition")) ? data.headers?.get("content-disposition")?.match(/filename=(.*)/)?.[1]?.replace(/["";]/g, "") : ""
                 let mime = mimes.lookup(name) || data.headers.get("content-type") || (await fileTypeFromBuffer(buffer))?.mime
                 resolve({
                    data: buffer,
                    size: Buffer.byteLength(buffer),
                    sizeH: this.formatSize(Buffer.byteLength(buffer)),
                    name,
                    mime,
                    ext: mimes.extension(mime)
                 });
              } else if (/^data:.*?\/.*?;base64,/i.test(string)) {
                 let data = Buffer.from(string.split`,`[1], "base64")
                 let size = Buffer.byteLength(data)
                 resolve({ data, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(data)) || { mime: "application/octet-stream", ext: ".bin" }) });
              } else if (fs.existsSync(string) && fs.statSync(string).isFile()) {
                 let data = fs.readFileSync(string)
                 let size = Buffer.byteLength(data)
                 resolve({ data, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(data)) || { mime: "application/octet-stream", ext: ".bin" }) });
              } else if (Buffer.isBuffer(string)) {
                 let size = Buffer?.byteLength(string) || 0
                 resolve({ data: string, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(string)) || { mime: "application/octet-stream", ext: ".bin" }) });
              } else if (/^[a-zA-Z0-9+/]={0,2}$/i.test(string)) {
                 let data = Buffer.from(string, "base64")
                 let size = Buffer.byteLength(data)
                 resolve({ data, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(data)) || { mime: "application/octet-stream", ext: ".bin" }) });
              } else {
                 let buffer = Buffer.alloc(20)
                 let size = Buffer.byteLength(buffer)
                 resolve({ data: buffer, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(buffer)) || { mime: "application/octet-stream", ext: ".bin" }) });
              }
           } catch (e) {
              reject(new Error(e?.message || e))
           }
        });
     }

     isUrl(url, stringTertentu = "") {
        const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gi");
        const match = url.match(regex);
        if (!stringTertentu) {
            return match
        } else if (match) {
            const urlString = match[0];
            // Cek apakah URL mengandung stringTertentu
            if (urlString.includes(stringTertentu)) {
                return match;
            }
        }
        return false;
    }

    random(list) {
        return list[Math.floor(Math.random() * list.length)]
    }

    randomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    getRandom(ext = "", length = "10") {
        var result = ""
        var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        var characterLength = character.length
        for (var i = 0; i < length; i++) {
            result += character.charAt(Math.floor(Math.random() * characterLength))
        }
        return `${result}${ext ? `.${ext}` : ""}`
    }
    getRandomStringsFromArray(arr, count) {
        const length = Math.min(count, arr.length);
        const originalCopy = arr.slice();
        const result = [];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * originalCopy.length);
            result.push(originalCopy.splice(randomIndex, 1)[0]);
        }
        return result;
    }
    readMore() {
        return String.fromCharCode(8206).repeat(4001)
    }
    
    isReadableStream(obj) {
        return obj instanceof stream.Stream &&
            typeof (obj._read == "function") &&
            typeof (obj._readableState === "object")
    }

    isBase64(string) {
        const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
        return regex.test(string)
    }

    bufferToStream(buffer) {
        let buff = Buffer.isBuffer(buffer) ? buffer : Buffer.alloc()
        return new stream.Readable({
            read() {
                this.push(buff)
                this.push(null)
            }
        })
    }

    bufferToBase64(buffer) {
        if (!Buffer.isBuffer(buffer)) throw new Error("Buffer Not Detected")

        var buf = new Buffer(buffer)
        return buf.toString("base64")
    }

    base64ToBuffer(base) {
        return Buffer.from(base, "base64")
    }

    streamToBuffer(strea) {
        let buff = Buffer.alloc(0)
        for (const chunk of strea) {
            buff = Buffer.concat([buff, chunk])
        }
        strea.destroy()
        return buff
    }

    formatSize(bytes) {
        if (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + " GB"; }
        else if (bytes >= 1000000) { bytes = (bytes / 1000000).toFixed(2) + " MB"; }
        else if (bytes >= 1000) { bytes = (bytes / 1000).toFixed(2) + " KB"; }
        else if (bytes > 1) { bytes = bytes + " bytes"; }
        else if (bytes == 1) { bytes = bytes + " byte"; }
        else { bytes = "0 bytes"; }
        return bytes;
    }

    toTimeString(time) {
        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / (60 * 1000)) % 60)
        const hours = Math.floor((time / (60 * 60 * 1000)) % 24)
        const days = Math.floor((time / (24 * 60 * 60 * 1000)))
        return (
            (days ? `${days} Hari ` : "") +
            (hours ? `${hours} Jam ` : "") +
            (minutes ? `${minutes} Menit ` : "") +
            (seconds ? `${seconds} Detik` : "")
        ).trim()
    }

    runtime(seconds) {
        seconds = parseInt(seconds)
        var d = Math.floor(seconds / (3600 * 24))
        var h = Math.floor(seconds % (3600 * 24) / 3600)
        var m = Math.floor(seconds % 3600 / 60)
        var s = Math.floor(seconds % 60)
        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
        return dDisplay + hDisplay + mDisplay + sDisplay
    }

    async resizeImage(buffer, height) {
        buffer = (await this.getFile(buffer)).data
  
        return new Promise((resolve, reject) => {
           Jimp.read(buffer, (err, image) => {
              if (err) {
                 reject(err)
                 return
              }
  
              image.resize(Jimp.AUTO, height)
                 .getBuffer(Jimp.MIME_PNG, (err, resizedBuffer) => {
                    if (err) {
                       reject(err)
                       return
                    }
                    resolve(resizedBuffer)
                 })
           })
        })
     }

    async correct(mainString, targetStrings) {
        function compareTwoStrings(first, second) {
            first = first.replace(/\s+/g, "")
            second = second.replace(/\s+/g, "")

            if (first === second) return 1; // identical or empty
            if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

            let firstBigrams = new Map();
            for (let i = 0; i < first.length - 1; i++) {
                const bigram = first.substring(i, i + 2);
                const count = firstBigrams.has(bigram)
                    ? firstBigrams.get(bigram) + 1
                    : 1;

                firstBigrams.set(bigram, count);
            };

            let intersectionSize = 0;
            for (let i = 0; i < second.length - 1; i++) {
                const bigram = second.substring(i, i + 2);
                const count = firstBigrams.has(bigram)
                    ? firstBigrams.get(bigram)
                    : 0;

                if (count > 0) {
                    firstBigrams.set(bigram, count - 1);
                    intersectionSize++;
                }
            }

            return (2.0 * intersectionSize) / (first.length + second.length - 2);
        }

        targetStrings = Array.isArray(targetStrings) ? targetStrings : []

        const ratings = [];
        let bestMatchIndex = 0;

        for (let i = 0; i < targetStrings.length; i++) {
            const currentTargetString = targetStrings[i];
            const currentRating = compareTwoStrings(mainString, currentTargetString)
            ratings.push({ target: currentTargetString, rating: currentRating })
            if (currentRating > ratings[bestMatchIndex].rating) {
                bestMatchIndex = i
            }
        }

        const bestMatch = ratings[bestMatchIndex]

        return { all: ratings, indexAll: bestMatchIndex, result: bestMatch.target, rating: bestMatch.rating };
    }
    calculateProfit(originalPrice, profitPercentage) {
        if (originalPrice <= 0 || profitPercentage <= 0) {
            return {
                profitAmount: 0,
                totalPrice: originalPrice
            };
        }
    
        var profitAmount = (originalPrice * profitPercentage) / 100; // Menghitung jumlah keuntungan
        var totalPrice = originalPrice + profitAmount; // Menghitung harga total
    
        return {
            profitAmount: profitAmount,
            totalPrice: totalPrice
        };
    }
    toWA(input) {
        return input.replace(/[^\d.]+/g, '') // Menghapus karakter non-angka, kecuali titik
                    .replace(/^085/g, '6285') // Mengganti setiap awalan "085" dengan "6285"
                    .split('.') // Memisahkan string setiap kali ada tanda titik
                    .map(str => str + "@s.whatsapp.net"); // Menambahkan "@s.whatsapp.net" ke setiap string dalam array
    }
}