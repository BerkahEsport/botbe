/* <============== CREDITS ==============>
Author: @berkahesport.id
Contact me: 6289654279897

Do not delete the source.
Thanks you...
*/
export default {
        settings: {
            prefix: ".", // Prefix for response command.
            restapi: "https://berkahesport.my.id/", // RestAPI this SCRIPT.
            key: "free_be", // This default apikey over 1000 limit/day. Get apikey unlimited from https://berkahesport.my.id/ or contact owner BE: https:/wa.me/6289654279897
            groqkey: "", // Contact me for the API key https:/wa.me/6289654279897 or source code https://console.groq.com/keys
            mongodb: "", // MongoDB connection string https://cloud.mongodb.com/
            store: false, // using store (If you use the WhatsApp story feature, you must change it to true, and the consequence is that over time the bot will become slow, so please delete the store.js file in the lib/json folder)
            case: false, // if true using case not plugin
            email: "berkahesport@gmail.com", // input your email
            address: "Boyolali", // input your address
            ig: "@berkahesport.id", // input your Instagram
            github: "https://github.com/BerkahEsport", // input your Github
            script: "https://github.com/BerkahEsport/botbe" // this base script
        },
        name: {
            bot: "ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ", // Just change it according to your wishes.
            owner: "berkahesport" // Just change it according to your wishes.
        },
        number: {
            bot: "", // If you want add your bot number.
            mods: ["6289654279897"], // Add your number here. This will later function as a bot moderator.
            owner: "6289654279897" // Change your number as the main owner of the bot later.
        },
        group: {
            ofc: "https://chat.whatsapp.com/JKdIWr5fj990Ux2oqTjTo5", // Change your group link.
            chid: "120363312128345279@newsletter"
        },
        logo: {
            thumb: "https://telegra.ph/file/47b3652155f158b931bda.jpg", // Replace it with your image URL as a menu display etc. in your bot.
            thumbs: "https://raw.githubusercontent.com/BerkahEsport/database/main/tmp/gmbr/logo2.png",
            be: "https://i.ibb.co/YTXmJfF/berkahesport.png",
            accessDenied: "https://pomf2.lain.la/f/8c7we849.jpg",
            nothing: "https://telegra.ph/file/6b9cbf4c186b050a31de8.jpg"
        },
        text: {
            create: "² October 2021", // Replace it with the date when your bot started.
            wait: "```「▰▰▰▰▱▱▱▱▱▱」Loading...```",
            waits: [
                "```「▰▱▱▱▱▱▱▱▱▱」Loading...```",
                "```「▰▰▱▱▱▱▱▱▱▱」Loading...```",
                "```「▰▰▰▱▱▱▱▱▱▱」Loading...```",
                "```「▰▰▰▰▱▱▱▱▱▱」Loading...```",
                "```「▰▰▰▰▰▱▱▱▱▱」Loading...```"
            ],
            error: "( ⚈̥̥̥̥̥́⌢⚈̥̥̥̥̥̀) *𝔼ℝℝ𝕆ℝ* ( ⚈̥̥̥̥̥́⌢⚈̥̥̥̥̥̀)\n\n• The feature encountered an error. Please report it to the owner!\n> *Chat the owner*: _https://wa.me/6289654279897_ \n> _Or try the command again after a while!_",
            ty: "\n> 💭 ʜᴇʀᴇ ɪꜱ ᴛʜᴇ ʀᴇꜱᴜʟᴛ... \n> ᴅᴏɴ'ᴛ ꜰᴏʀɢᴇᴛ ᴛᴏ ꜱᴜᴘᴘᴏʀᴛ ɪɢ @ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ! \n> 👍 ᴛʜᴀɴᴋ ʏᴏᴜ!",
            subs: "Don't just look, make sure to subscribe too! \n https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w"
        },
        msg: {
            rowner: "*𝔻𝔼𝕍𝔼𝕃𝕆ℙ𝔼ℝ 𝕆ℕ𝕃𝕐* • This command is only for bot developers!",
            owner: "*𝕆𝕎ℕ𝔼ℝ 𝕆ℕ𝕃𝕐* • This command is only for bot owners!",
            premium: "*ℙℝ𝔼𝕄𝕀𝕌𝕄 𝕆ℕ𝕃𝕐* • This command is only for premium bot users!",
            group: "*𝔾ℝ𝕆𝕌ℙ 𝕆ℕ𝕃𝕐* • This command can only be used on groups!",
            private: "*ℙℝ𝕀𝕍𝔸𝕋𝔼 ℂℍ𝔸𝕋* • This command can only be used in private chats",
            admin: "*𝔸𝔻𝕄𝕀ℕ 𝕆ℕ𝕃𝕐* • This command can only be used by group admins!",
            botAdmin: "*𝔹𝕆𝕋 𝔸𝔻𝕄𝕀ℕ* • This command can only be used if the bot is a group admin!",
        },
        Exif: { // For sticker
            packId: "https://berkahesport.my.id/",
            packName: `ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ\nChatBOT: 6289649672623`,
            packPublish: "Thank's to:\nAllah S.W.T",
            packEmail: "berkahesport@gmail.com",
            packWebsite: "https://berkahesport.my.id/",
            androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
            iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
            emojis: [],
            isAvatar: 0,
        }
}
