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

export default {
    name: "tebakgambar",
    command: ["tebakgambar", "helptg"],
    tags: "games",
    desc: "Guess game tebakgambar.",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    before: async(m, {
        quoted,
        temp,
        user,
        prefix
    }) => {
        temp = temp || new Map();
        const id = "tebakgambar-"+m.from;
        if (!temp.has(id)) return;
        try {
            const answerBody = m.body.toLowerCase().trim();
            const gameData = temp.get(id);
            const [data, answer, reward, timer, times] = gameData;
            if (data.key.id === quoted.id) {
                if (answer.toLowerCase() === answerBody) {
                    temp.delete(id);
                    clearTimeout(timer);
                    m.reply(`✅ *That's great*, your answer is correct.!\n\n🎉 *Reward*: ${reward} exp.`);
                    user.exp += reward;
                } else {
                    m.reply(`❌ Your answer is incorrect!\nLet's try again with another answer.\n\n💡 Type *${prefix}helptg* for help.\n🕒 Timer: ${times}`)
                }
            }
        } catch (e) {
            console.error(e);
            m.reply("🚩 There is an error!");
            temp.delete(id);
        }
    },
    run: async(m, {
        sock,
        functions,
        temp,
        prefix,
        command
    }) => {
        temp = temp || new Map();
        const id = "tebakgambar-" + m.from;
        switch (command) {
            case "tebakgambar":
                if (temp.has(id)) {
                    return m.reply("🚩 Game tebakgambar in progress!");
                }
                const result = await functions.api("api/tebakgambar");
                const timeout = 90000;
                const times = functions.timer(timeout);
                const reward = functions.randomInt(1, 100);
                const image = result.result.img;
                const answer = result.result.jawaban;
                const clue = result.result.deskripsi;
                const question = `🎉 *Tebak Gambar!* 🎉

🖼️ *What this image!*
🔍 *Description:*
${clue}

⏳ *Time:* ${(timeout / 1000).toFixed(2)} second.
💡 *Type:* _${prefix} helptg_ for help.
🏆 *Bonus:* ${reward} XP.`.trim();
                const data = await sock.sendFile(m.from, image, "", question, m);
                const timer = setTimeout(() => {
                    if (temp.has(id)) {
                        const expiredTeks = `⏱️ Time's up!\nThe answer is ${answer}\n\n🗑️ Game tebakgambar cleared.`;
                        sock.reply(m.from, expiredTeks, m);
                        temp.delete(id);
                    }
                }, timeout);
                temp.set(id, [data, answer, reward, timer, times]);
            break;
            case "helptg":
                if (temp.has(id)) {
                    const gameData = temp.get(id);
                    const [data, answer] = gameData;
                    const clue = answer.replace(/[AIUEO]/gi, "_");
                    sock.reply(m.from, "🔍 Instruction: ```" + clue + "```", data);
                } else {
                    m.reply('❌ There are no ongoing issues in this chat.');
                    throw false;
                }
            break;
        }
    }
}