import chalk from "chalk";
const {  bgYellow, white, yellowBright, red, green, blue, yellow, cyan, redBright, gray } = chalk;
export default async(sock, m, user, config, functions) => {

console.log(`${chalk.gray((m.pushName == undefined ? chalk.bgYellow.black(" No Name! ") + " | " + m.sender.split("@")[0] 
    : m.isBaileys && m.fromMe ? chalk.bgYellow.black(" This BOT ") + " | " + sock.user.jid.split("@")[0] 
    : chalk.bgYellow.black(` ${m.pushName} `) + " | " + m.sender.split('@')[0]))}
${m.isBaileys && m.fromMe ? chalk.blue("Response BOT") : chalk.red("Chatting")} | ${chalk.yellow(m.isGroup ? (m.metadata.subject + " | " + (m.from || "Group Chat")) : "Chat Private")}
${chalk.blueBright("Type:")} ${chalk.magenta(m.type)} | ${chalk.green("User BOT:")} ${user.registered ? chalk.green("TRUE") : chalk.red("FALSE")}
${!m.body && m.isMedia ? chalk.cyan("Sending media...") : chalk.white(m.body)}
${chalk.green("<=================================================>")}`.trim());
}