# 🚀 **BASE BOT WA**

This is a simple WhatsApp bot base using the **Baileys** library.

📅 **Created on:** May 09, 2024

This bot supports **hot reload**, allowing for seamless updates while the script is running.

📌 **Before running the bot**, update the configuration in the `config.js` file.
This base bot supports **plugin-based** and **case-based** models:
- **Case Model** → Set `case: true` in `config.js`
- **Plugin Model** → Set `case: false` in `config.js`

✨ Enjoy using this bot and don't forget to **star** this repository!

📢 **Upcoming Features:** Button and message list support!

---

## 💡 **CREDITS**
👤 **Author:** [@berkahesport.id](https://github.com/BerkahEsport)

🔗 **Connect with me:**  
📞 [WhatsApp](https://wa.me/6289654279897)  
👥 [Join Group](https://tinyurl.com/berkahesport)  
📺 [YouTube](https://tinyurl.com/berkahesportid)

⚠️ **Do not delete the source code credits.**

---

## 🛠 **INSTALLATION**

Before running the bot, **configure `config.js`** as needed.

If you don't have a panel or hosting, you can run this bot on **Termux** (Android).  
📥 **Download Termux:** [Here](https://www.mediafire.com/file/qpkld91u7zmxsba/Termux_BE.apk/file)  
📺 **Installation Tutorial:** [Watch Here](https://youtu.be/ScSFRljXHAQ?si=RJk9ZJYoPoyym9JG)

### **🔧 Setup Bot:**
```bash
# Clone the repository
git clone https://github.com/BerkahEsport/botbe

# Move into the bot directory
cd botbe

# Install dependencies
npm i

# Start the bot
npm start
```

---

## 📜 **COMMAND TEMPLATE**
```js
export default {
    name: "this name", //✅ Command name
    command: ["cmd1", "cmd2"], //✅ Set commands here
    tags: "main", //✅ Category for command menu
    desc: "this description", //✅ Command description

    run: async(m, {sock, functions, args, text}) => {
        m.reply("Hello, I am a bot!") // Command response
    },
    
    // Optional settings
    customPrefix: "", // Use specific prefix
    limit: false, // Enable usage limit (true/number)
    isOwner: false, // Owner-only command
    isPremium: true, // Premium users only
    isBotAdmin: false, // Bot must be admin
    isAdmin: false, // Admin-only command
    isGroup: false, // Group-only command
    isPrivate: false, // Private chat only
}
```

🛠 **Available Arguments:**
```js
prefix, noPrefix, command, arg, args, text, sock, commands, cmd, name, user,
settings, isOwner, isGroup, isAdmin, isBotAdmin, admin, metadata,
participants, store, config, functions
```

---

## 📩 **SENDING MESSAGES**

💬 **Reply to messages**:
```js
sock.reply(jid, text, quoted, ...options)
```
📁 **Send media files**:
```js
sock.sendFile(jid, file, filename, text, quoted, ...options)
```
📢 **Send reply to the same command**:
```js
m.reply(text, ...options)
```

🔹 **Available options:**
```js
options.font: true // Change text style
options.asSticker: true // Convert media to stickers
options.asDocument: true // Convert media to document files
options.thumbnail: "url/buffer" // Set thumbnail
options.mentions: ["jid"] // Mention users
options.isForwarded: true // Mark message as forwarded
```

---

## 🙏 **THANKS TO ALLAH S.W.T**
Alhamdulillah, all praise and thanks are due to **Allah S.W.T** for His blessings and guidance. 💖

---

## 🔥 **CONTRIBUTING**
We welcome contributions! Here’s how you can help:
1. **Fork** the repository
2. **Create a new branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature-branch`)
5. **Open a Pull Request**

---

## 📜 **LICENSE**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🌍 **CONNECT WITH US**
Stay updated and follow us on social media:

🔹 [Instagram](https://instagram.com/berkahesport.id)  
🔹 [Twitter](https://twitter.com/berkahesport)  
🔹 [Facebook](https://facebook.com/berkahesport)  

📌 **Thank you for your support!** ⭐