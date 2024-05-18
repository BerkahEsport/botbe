# <===== BASE BOT WA =====>
This simple base for bot WhatsApp with libs Baileys.
This script was created on May 09, 2024.

This script uses a hot reload configuration which makes it easier for users when changes are made while the script is running.

I hope it's useful for you and help give this script a star. Thank you.
Continued progress on creating button and message list features!

# <===== CREDITS =====>
Author: @moexti

Github: @berkahesport

Contact me: https://wa.me/62895375950107

Do not delete the source code.
Thanks you...

# <===== INSTALLATION =====>
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
// example: "%prefix%command text", // If it doesn't follow the instructions, you can tell me how to do it here

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
=> options.thumb: "url image / buffer" // displays a thumbnail image
=> options.mentions: ["jid number"] // array select the number you want to mention
=> options.isForwarded: true // displays messages sent multiple times
```
# <= THANKS TO ALLAH S.W.T =>
