# <===== BASE BOT WA =====>
This simple base for bot WhatsApp with libs Baileys.
This script was created on May 09, 2024.

This script uses a hot reload configuration which makes it easier for users when changes are made while the script is running.

Don't forget before running the base bot, it's a good idea to change the configuration in the config.js file. This base bot supports the plugin or case model. In the config.js file object settings > case: true then the bot uses the case model and vice versa if false then it uses the plugin model.

I hope it's useful for you and help give this script a star. Thank you.
Continued progress on creating button and message list features!

NB: If you do not understand how to use this base bot, please contact the script owner, they will be happy to help.

# <===== CREDITS =====>
Author: @berkahesport.id

Github: @berkahesport

Contact me: https://wa.me/6289654279897

Group WA: https://tinyurl.com/berkahesport

Youtube: https://tinyurl.com/berkahesportid

Do not delete the source code.
Thanks you...

# <===== INSTALLATION =====>
Before starting the bot, please change the config.js file first according to your wishes.

If you don't have a panel / bot hosting please use termux android, if you don't have I give a link to download the Termux application.

Download Link:
https://www.mediafire.com/file/qpkld91u7zmxsba/Termux_BE.apk/file

Tutorial install termux:
https://youtu.be/ScSFRljXHAQ?si=RJk9ZJYoPoyym9JG

```
git clone https://github.com/BerkahEsport/botbe
cd botbe
npm i
npm start
```

# <===== COMMAND CODE =====>
```
export default {
name: "this name", //✅ name command for your menu
command: ["cmd1", "cmd2"], //✅ set a command here
tags: "main", //✅ tags for this name for your menu
desc: "this description", //✅ description this command for your menu
// example: "text", // If it doesn't follow the instructions, you can tell me how to do it here

run: async(m, {sock, functions, args, text}) => {
    m.reply("Hello i am bot!") // response command
},
// this bottom config may not be filled in
customPrefix: "", // using certain prefixes
limit: false, // if you use a limit, it can be true or a number
isOwner: false, // owner bot
isPremium: true, // premium user
isBotAdmin: false, // bot admin
isAdmin: false, // admin gc
isGroup: false, // group only
isPrivate: false, // pc only
}
```
List Arguments that can be used:
```
        prefix,
        noPrefix,
        command,
        arg,
        args,
        text,
        sock,
        commands,
        cmd,
        name,
        user,
        settings,
        isOwner,
        isGroup,
        isAdmin,
        isBotAdmin,
        admin,
        metadata,
        participants,
        store,
        config,
        functions
```
# <===== SEND MESSAGE =====>

Instructions to send a message:


Reply to messages to a specific destination.
```
sock.reply(jid, text, quoted, ...options)
```
Reply to messages in the form of media to a specific destination,
```
sock.sendFile(jid, file, filename, text, quoted, ...options)
```
Reply to messages to the same command.
```
m.reply(text, ...options)
```

Informations:

```
jid [number] // destination number (jid@s.whatsapp.net, m.from, m.quoted.from, m.sender, m.quoted.sender)
text [string] // the reply text you want to send
quoted [object] // displays a reply message (m, m.quoted, null)
media [buffer|string] // The media sent can be a buffer or a media URL
filename [string] // name of the media file to be sent
...options [object] // additional creativity / others

=> options.font: true // change the form of writing to make it more interesting
=> options.asSticker: true // convert media to stickers in the sock.sendFile code
=> options.asDocument: true // convert media into document files
=> options.thumbnail: "url image / buffer" // displays a thumbnail image
=> options.mentions: ["jid number"] // array select the number you want to mention
=> options.isForwarded: true // displays messages sent multiple times
```
# <= THANKS TO ALLAH S.W.T =>
# <===== THANKS TO ALLAH S.W.T =====>

Alhamdulillah, all praise and thanks are due to Allah S.W.T for His blessings and guidance.

# <===== SUPPORT =====>

If you find this project helpful, please consider supporting its development:

- 🌟 Star the repository on [GitHub](https://github.com/BerkahEsport/botbe)
- 💬 Join the discussion on [WhatsApp Group](https://tinyurl.com/berkahesport)
- 📺 Subscribe to our [YouTube Channel](https://tinyurl.com/berkahesportid)

# <===== CONTRIBUTING =====>

We welcome contributions! Here’s how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

# <===== LICENSE =====>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# <===== CONNECT WITH US =====>

Stay connected and follow us on social media:

- [Instagram](https://instagram.com/berkahesport.id)
- [Twitter](https://twitter.com/berkahesport)
- [Facebook](https://facebook.com/berkahesport)

Thank you for your support!