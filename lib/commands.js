/*<============== CREDITS ==============>
	Author: @berkahesport
	Contact me: 62895375950107
    Website: https://berkahesport.my.id/
	
	Do not delete the source code.
	It is prohibited to sell and buy
	WhatsApp BOT scripts
	without the knowledge
	of the script owner.
	
	Selling = Sin 
	
	Thank you to Allah S.W.T
<============== CREDITS ==============>*/

import functions from "./functions.js";
import fs from "fs";
import chalk from "chalk";
import path from "path";
import syntaxerror from "syntax-error";

let loadAllCommands = async (commandsFolder) => {
    let commands = {};

    function getFileName(filePath) {
        return path.basename(filePath);
    }

async function loadCommand(filePath) {
    try {
        const fileUrl = functions.filename(filePath);
        const module = await import(fileUrl);
        commands[filePath] = module.default;
        console.log(chalk.greenBright(`✔ Loaded command: ${chalk.cyanBright(getFileName(filePath))}`));
    } catch (e) {
        console.error(chalk.redBright(`✖ Error loading command "${chalk.cyanBright(getFileName(filePath))}": ${e}`));
    }
}

async function reloadCommand(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let err = syntaxerror(fileContent, filePath, {
            sourceType: "module",
            allowAwaitOutsideFunction: true
        });

        if (err) {
            console.error(chalk.bgRed.white(`Syntax error in "${chalk.yellowBright(getFileName(filePath))}":\n${err}`));
            return;
        }

        const fileUrl = functions.filename(filePath);
        const module = await import(`${fileUrl}?update=${Date.now()}`);
        commands[filePath] = module.default;
        console.log(chalk.bgGreen.black(`[ ${chalk.yellowBright("UPDATE")} ] ${chalk.greenBright(getFileName(filePath))} has been updated!`));
    } catch (e) {
        console.error(chalk.redBright(`✖ Error reloading command "${chalk.cyanBright(getFileName(filePath))}": ${e}`));
    }
}

function watchFile(filePath) {
    let debounceTimeout;
    fs.watchFile(filePath, { interval: 500 }, async (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(async () => {
                console.log(chalk.blueBright(`ℹ File ${chalk.cyanBright(getFileName(filePath))} has changed. Reloading...`));
                if (fs.existsSync(filePath)) {
                    await reloadCommand(filePath);
                } else {
                    console.warn(chalk.yellow(`⚠ Deleted command "${chalk.red(getFileName(filePath))}"`));
                    delete commands[filePath];
                }
            }, 100);
        }
    });
}

function watchDirectory(dirPath) {
    fs.watch(dirPath, (eventType, filename) => {
        if (filename && filename.endsWith('.js')) {
            const filePath = path.join(dirPath, filename);
            if (eventType === 'rename' && fs.existsSync(filePath)) {
                console.log(chalk.magentaBright(`➕ New file detected: ${chalk.cyanBright(getFileName(filePath))}. Loading...`));
                loadCommand(filePath);
                watchFile(filePath);
            } else if (eventType === 'rename' && !fs.existsSync(filePath)) {
                console.warn(chalk.yellow(`⚠ Deleted command "${chalk.red(getFileName(filePath))}"`));
                delete commands[filePath];
            }
        }
    });

    const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.js'));
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        loadCommand(filePath);
        watchFile(filePath);
    });
}

async function watchCommands(commandsFolder) {
    const readdir = fs.readdirSync(commandsFolder);
    readdir.forEach((dirName) => {
        const dirPath = path.join(commandsFolder, dirName);
        if (fs.lstatSync(dirPath).isDirectory()) {
            watchDirectory(dirPath);
        }
    });
}
    await watchCommands(commandsFolder);
    await functions.delay(3000);
    return commands;
}

export { loadAllCommands };