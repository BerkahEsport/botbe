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

export default {
    name: "tebaktebakan",
    command: ["tebaktebakan", "helptt"],
    tags: "games",
    desc: "Guess game tebaktebakan.",
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
        const id = "tebaktebakan-"+m.from;
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
                    m.reply(`❌ Your answer is incorrect!\nLet's try again with another answer.\n\n💡 Type *${prefix}helptt* for help.\n🕒 Timer: ${times}`)
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
        const id = "tebaktebakan-"+m.from;
        switch (command) {
            case "tebaktebakan":
                if (temp.has(id)) {
                    return m.reply("🚩 Game tebaktebakan in progress!");
                }
                const result = await functions.api("api/tebaktebakan");
                const timeout = 60000;
                const times = functions.timer(timeout);
                const reward = functions.randomInt(1, 100);
                const question = `❓ *Question*: ${result.result.soal}\n\n💡 *Clue*:Type *${prefix}helptt* for help.\n⏱️ *Timer*: ${times}.`;
                const answer = result.result.jawaban;
                const data = await sock.reply(m.from, question, m);
                const timer = setTimeout(() => {
                    if (temp.has(id)) {
                        temp.delete(id);
                        const expiredTeks = `⏱️ Time's up!\n\n🗑️ Game tebaktebakan cleared.`;
                        sock.reply(m.from, expiredTeks, m);
                    }
                }, timeout);
                temp.set(id, [data, answer.toLowerCase(), reward, timer, times]);
            break;
            case "helptt":
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