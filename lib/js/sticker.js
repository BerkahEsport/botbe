/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 6289654279897

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

import fs from "fs";
import ff from "fluent-ffmpeg";
import webp from "node-webpmux";
import path from "node:path";
import { fileURLToPath } from "node:url";
import config from "../../config.js";
import functions from "../functions.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url))
async function imageToWebp (media) {

    const tmpFileOut = path.join(__dirname, "../../tmp/" + `StickerOut_ConvertImg_${+new Date()}.webp`)
    const tmpFileIn = path.join(__dirname, "../../tmp/" + `StickerIn_ConvertImg_${+new Date()}.jpg`)

    fs.writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ff(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            //.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale=512:512:force_original_aspect_ratio=increase,fps=15,crop=512:512`]).toFormat("webp").save(tmpFileOut)
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = fs.readFileSync(tmpFileOut)
    fs.promises.unlink(tmpFileOut)
    fs.promises.unlink(tmpFileIn)
    return buff
}

async function videoToWebp (media) {

    const tmpFileOut = path.join(__dirname, "../../tmp/" + `StickerOut_ConvertVid_${+new Date()}.webp`)
    const tmpFileIn = path.join(__dirname, "../../tmp/" + `StickerIn_ConvertVid_${+new Date()}.mp4`)

    fs.writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ff(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            //.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale=512:512:force_original_aspect_ratio=increase,fps=15,crop=512:512`]).toFormat("webp").save(tmpFileOut)
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:10",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = fs.readFileSync(tmpFileOut)
    fs.promises.unlink(tmpFileOut)
    fs.promises.unlink(tmpFileIn)
    return buff
}

async function writeExifImg (media, metadata) {
    let wMedia = await imageToWebp(media)
    const tmpFileOut = path.join(__dirname, "../../tmp/" + `StickerOut_ExifImg_${+new Date()}.webp`)
    const tmpFileIn = path.join(__dirname, "../../tmp/" + `StickerIn_ExifImg_${+new Date()}.webp`)
    fs.writeFileSync(tmpFileIn, wMedia)

    if (Object.keys(metadata).length != 0 || Object.keys(config?.Exif).length != 0) {
        const img = new webp.Image()
        let opt = { packId: metadata?.packId ? metadata.packId : config?.Exif?.packId, packName: metadata?.packName ? metadata.packName : config?.Exif?.packName, packPublish: metadata?.packPublish ? metadata.packPublish : config?.Exif?.packPublish, packEmail: metadata?.packEmail ? metadata.packEmail : config?.Exif?.packEmail, packWebsite: metadata?.packWebsite ? metadata.packWebsite : config?.Exif?.packWebsite, androidApp: metadata?.androidApp ? metadata.androidApp : config?.Exif?.androidApp, iOSApp: metadata?.iOSApp ? metadata.iOSApp : config?.Exif?.iOSApp, emojis: metadata?.emojis ? metadata.emojis : config?.Exif?.emojis, isAvatar: metadata?.isAvatar ? metadata.isAvatar : config?.Exif?.isAvatar   }
        const json = { "sticker-pack-id": opt.packId, "sticker-pack-name": opt.packName, "sticker-pack-publisher": opt.packPublish, "sticker-pack-publisher-email": opt.packEmail, "sticker-pack-publisher-website": opt.packWebsite, "android-app-store-link": opt.androidApp, "ios-app-store-link": opt.iOSApp, "emojis": opt.emojis, "is-avatar-sticker": opt.isAvatar }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        fs.promises.unlink(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
}

async function writeExifVid (media, metadata) {
    let wMedia = await videoToWebp(media)
    const tmpFileOut = path.join(__dirname, "../../tmp/" + `StickerOut_ExifVid_${+new Date()}.webp`)
    const tmpFileIn = path.join(__dirname, "../../tmp/" + `StickerIn_ExifVid_${+new Date()}.webp`)
    fs.writeFileSync(tmpFileIn, wMedia)

    if (Object.keys(metadata).length != 0 || Object.keys(config?.Exif).length != 0) {
        const img = new webp.Image()
        let opt = { packId: metadata?.packId ? metadata.packId : config?.Exif?.packId, packName: metadata?.packName ? metadata.packName : config?.Exif?.packName, packPublish: metadata?.packPublish ? metadata.packPublish : config?.Exif?.packPublish, packEmail: metadata?.packEmail ? metadata.packEmail : config?.Exif?.packEmail, packWebsite: metadata?.packWebsite ? metadata.packWebsite : config?.Exif?.packWebsite, androidApp: metadata?.androidApp ? metadata.androidApp : config?.Exif?.androidApp, iOSApp: metadata?.iOSApp ? metadata.iOSApp : config?.Exif?.iOSApp, emojis: metadata?.emojis ? metadata.emojis : config?.Exif?.emojis, isAvatar: metadata?.isAvatar ? metadata.isAvatar : config?.Exif?.isAvatar   }
        const json = { "sticker-pack-id": opt.packId, "sticker-pack-name": opt.packName, "sticker-pack-publisher": opt.packPublish, "sticker-pack-publisher-email": opt.packEmail, "sticker-pack-publisher-website": opt.packWebsite, "android-app-store-link": opt.androidApp, "ios-app-store-link": opt.iOSApp, "emojis": opt.emojis, "is-avatar-sticker": opt.isAvatar }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        fs.promises.unlink(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
}

async function writeExif (media, metadata, fileName) { 
    let wMedia = /webp/.test(media.mimetype) ? media.data : /image/.test(media.mimetype) ? await imageToWebp(media.data) : /video/.test(media.mimetype) ? await videoToWebp(media.data) : ""
    const tmpFileOut = path.join(__dirname, "../../tmp/" + `${fileName+functions.getRandom("exif", 0)}.webp`)
    const tmpFileIn = path.join(__dirname, "../../tmp/" + `${fileName+functions.getRandom("exif", 0)}.webp`)
    fs.writeFileSync(tmpFileIn, wMedia)
    if (Object.keys(metadata).length != 0 || Object.keys(config?.Exif).length != 0) {
        const img = new webp.Image()
        let opt = { packId: metadata?.packId ? metadata.packId : config?.Exif?.packId, packName: metadata?.packName ? metadata.packName : config?.Exif?.packName, packPublish: metadata?.packPublish ? metadata.packPublish : config?.Exif?.packPublish, packEmail: metadata?.packEmail ? metadata.packEmail : config?.Exif?.packEmail, packWebsite: metadata?.packWebsite ? metadata.packWebsite : config?.Exif?.packWebsite, androidApp: metadata?.androidApp ? metadata.androidApp : config?.Exif?.androidApp, iOSApp: metadata?.iOSApp ? metadata.iOSApp : config?.Exif?.iOSApp, emojis: metadata?.emojis ? metadata.emojis : config?.Exif?.emojis, isAvatar: metadata?.isAvatar ? metadata.isAvatar : config?.Exif?.isAvatar   }
        const json = { "sticker-pack-id": opt.packId, "sticker-pack-name": opt.packName, "sticker-pack-publisher": opt.packPublish, "sticker-pack-publisher-email": opt.packEmail, "sticker-pack-publisher-website": opt.packWebsite, "android-app-store-link": opt.androidApp, "ios-app-store-link": opt.iOSApp, "emojis": opt.emojis, "is-avatar-sticker": opt.isAvatar }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        fs.promises.unlink(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
}

export { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif }