import chalk from "chalk";
const {  bgYellow, white, yellowBright, red, green, blue, yellow, cyan, redBright, gray } = chalk;
export default async(sock, m) => {
    console.log(`${gray((m.pushName == undefined ? bgYellow("No Name!") + " | " + m.sender.split("@")[0] : m.isBaileys && m.fromMe ? bgYellow("This BOT") + " | " + sock.user.jid.split("@")[0] : bgYellow(m.pushName) + " | " + m.sender.split`@`[0]))}
${m.isBaileys && m.fromMe ? blue("Response BOT") : red("Chatting")} | ${yellow(m.isGroup ? m.metadata.subject + " | " + m.from || "Group Chat" : "Chat Private")}
${!m.body && m.isMedia ? cyan("Sending media...") : white(m.body)}
${green("<=================================================>")}`.trim())
}