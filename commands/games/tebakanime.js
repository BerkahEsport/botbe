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
    name: "tebakanime",
    command: ["tebakanime", "helpta"],
    tags: "games",
    desc: "Guess game tebakanime.",
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
        const id = "tebakanime-"+m.from;
        if (!temp.has(id)) return;
        try {
            const answerBody = m.body.toLowerCase();
            const gameData = temp.get(id);
            const [data, answer, reward, timer, times] = gameData;
            if (data.key.id === quoted.id) {
                if (answer === answerBody) {
                    temp.delete(id);
                    clearTimeout(timer);
                    m.reply(`✅ *That's great*, your answer is correct.!\n\n🎉 *Reward*: ${reward} exp.`);
                    user.exp += reward;
                } else {
                    m.reply(`❌ Your answer is incorrect!\nLet's try again with another answer.\n\n💡 Type *${prefix}helpta* for help.\n🕒 Timer: ${times}`)
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
        const id = "tebakanime-" + m.from;
        switch (command) {
            case "tebakanime":
                if (temp.has(id)) {
                    return m.reply("🚩 Game tebakanime in progress!");
                }
                const result = await functions.api("api/tebakanime");
                const timeout = 60000;
                const times = functions.timer(timeout);
                const reward = functions.randomInt(1, 100);
                const image = result.result.img;
                const question = `🎉 *Tebak Anime!* 🎉

🖼️ *Whats this Anime!:*

⏳ *Time:* ${(timeout / 1000).toFixed(2)} second.
💡 Type: *${prefix} helpta* for help
🏆 *Bonus:* ${reward} XP.`.trim();
                const answer = result.result.jawaban;
                const data = await sock.sendFile(m.from, image, "", question, m);
                const timer = setTimeout(() => {
                    if (temp.has(id)) {
                        const expiredTeks = `⏱️ Time's up!\nThe answer is ${answer}\n\n🗑️ Game tebakanime cleared.`;
                        sock.reply(m.from, expiredTeks, m);
                        temp.delete(id);
                    }
                }, timeout);
                temp.set(id, [data, answer.toLowerCase(), reward, timer, times]);
            break;
            case "helpta":
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