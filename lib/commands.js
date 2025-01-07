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
import path from "path";
import syntaxerror from "syntax-error";

let loadAllCommands = async (commandsFolder, type) => {
    if (type) return;
    let commands = {};

    function getFileName(filePath) {
        return path.basename(filePath);
    }

async function loadCommand(filePath) {
    try {
        const fileUrl = functions.filename(filePath);
        const module = await import(fileUrl);
        commands[filePath] = module.default;
        functions.log(`✔ Loaded command: ${getFileName(filePath)}`, "brightGreen", "italic");
    } catch (e) {
        functions.log(`✖ Error loading command "${getFileName(filePath)}": ${e}`, "red", "italic");
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
            functions.log(`Syntax error in "${getFileName(filePath)}":\n${err}`, "brightYellow", "bold");
            return;
        }

        const fileUrl = functions.filename(filePath);
        const module = await import(`${fileUrl}?update=${Date.now()}`);
        commands[filePath] = module.default;
        functions.log(`[ ${"UPDATE"} ] ${getFileName(filePath)} has been updated!`, "green", "bold");
    } catch (e) {
        functions.log(`✖ Error reloading command "${getFileName(filePath)}": ${e}`, "brightRed", "bold");
    }
}

function watchFile(filePath) {
    let debounceTimeout;
    fs.watchFile(filePath, { interval: 500 }, async (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(async () => {
                functions.log(`ℹ File ${getFileName(filePath)} has changed. Reloading...`, "brightGreen", "bold");
                if (fs.existsSync(filePath)) {
                    await reloadCommand(filePath);
                } else {
                    functions.log(`⚠ Deleted command "${getFileName(filePath)}"`, "red", "bold");
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
                functions.log(`➕ New file detected: ${getFileName(filePath)}. Loading...`, "cyan", "italic");
                loadCommand(filePath);
                watchFile(filePath);
            } else if (eventType === 'rename' && !fs.existsSync(filePath)) {
                functions.log(`⚠ Deleted command "${getFileName(filePath)}"`, "brightRed", "bold");
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