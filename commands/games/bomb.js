export default {
    name: ["bomb"],
    command: ["bomb"],
    tags: "game",
    desc: "",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    before: async (m, {
        sock,
        quoted,
        user,
        temp
    }) => {
        temp = temp || new Map();
        let id = "bomb-"+m.from;
        if (!temp.has(id)) return;

        try {
            let gameData = temp.get(id);
            let [positions, reward, bonus, timer, key, timeout] = gameData;
            if (key === quoted.id) {
                let body = typeof m.body === "string" ? m.body.replace(/[^\d]+/g, "") : false;
                let selectedBox = positions.find(v => v.position == body);
                if (!selectedBox) {
                    return m.reply("🚩 Invalid box. Select a number 1 to 9.", m);
                }
                if (selectedBox.emot === "🎁") {
                    let teks = `🎁 *OPENED!*\n\nBox ${selectedBox.number} is opened, please choice other.!`;
                    m.reply(teks);
                    return;
                }
                selectedBox.state = true;
                if (selectedBox.emot === "💥") {
                    let teks = `💥 *BOOM!*\n\nBox ${selectedBox.number} contains a bomb!\Penalty: *-${reward} XP*`;
                    user.exp = Math.max(0, user.exp - reward);
                    sock.reply(m.from, teks, m).then(() => {
                        clearTimeout(timer);
                        temp.delete(id);
                    });
                    return;
                }
                let openedBoxes = positions.filter(v => v.state).length;
                if (openedBoxes === positions.length - 1) {
                    let teks = `🎉 Congratulations! All cities are open without being bombed.\Reward:*+${reward + bonus} XP*`;
                    user.exp += reward + bonus;
                    sock.reply(m.from, teks, m).then(() => {
                        clearTimeout(timer);
                        temp.delete(id);
                    });
                    return;
                }
                let teks = `乂 *ʙ ᴏ ᴍ ʙ*\n\nSelect numbers 1 - 9 to open the box:\n`;
                for (let i = 0; i < positions.length; i += 3) {
                    teks += positions.slice(i, i + 3).map(v => (v.state ? v.emot : v.number)).join("") + "\n";
                }
                teks += `\n⏱ Timeout: [ ${(timeout / 1000 / 60).toFixed(1)} menit ]`;
                clearTimeout(timer);
                let timerUpdate = setTimeout(() => {
                    if (temp.has(id)) {
                    let expiredTeks = `⏱️ Time's up!\n\nGame cleared.`;
                    sock.reply(m.from, expiredTeks, m);
                    temp.delete(id);
                    }
                }, timeout);
                let nextMsg = await sock.reply(m.from, teks, m);
                temp.set(id, [positions, reward, bonus, timerUpdate, nextMsg.key.id, timeout]);
            }
        } catch (e) {
            console.error(e);
            m.reply("🚩 There is an error!");
        }
    },
    run: async (m, { sock, user, functions, temp }) => {
        if (user.ai) throw ("Please turn off chat ai first to play the bomb game by typing _.off ai_")
        temp = temp || new Map();
        let id = "bomb-"+m.from;
        if (temp.has(id)) {
        return m.reply("🚩 Game in progress!");
        }
        try {
            let emojiNumbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
            let positions = Array.from({ length: 9 }, (_, i) => ({
                position: i + 1,
                number: emojiNumbers[i],
                emot: "🎁",
                state: false,
            }));
            let bombPosition = Math.floor(Math.random() * positions.length); // Angka acak antara 0 hingga 8
            positions[bombPosition].emot = "💥"
            let timeout = 90000;
            let reward = functions.randomInt(1, 100);
            let bonus = functions.randomInt(200, 500);
            let teks = `乂  *ʙ ᴏ ᴍ ʙ*\n\n`;
            teks += `Send numbers 1 - 9 to open the 9 number boxes below.:\n\n`;
            teks += positions.slice(0, 3).map(v => v.number).join("") + "\n";
            teks += positions.slice(3, 6).map(v => v.number).join("") + "\n";
            teks += positions.slice(6).map(v => v.number).join("") + "\n\n";
            teks += `ᵀⁱᵐᵉᵒᵘᵗ : [ *${(timeout / 1000 / 60)} ᵐⁱⁿ⁳* ]\n`;
            let startMsg = await sock.reply(m.from, teks, m);

            let timer = setTimeout(() => {
                if (temp.has(id)) {
                let expiredTeks = `⏱️ Time's up!\n\nGame cleared.`;
                sock.reply(m.from, expiredTeks, m);
                temp.delete(id);
                }
            }, timeout);
            temp.set(id, [positions, reward, bonus, timer, startMsg.key.id, timeout]);
        } catch (e) {
            console.error(e);
            m.reply("🚩 There is an error!");
        }
    }
}