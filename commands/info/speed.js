import cp from "child_process";
import { promisify } from "util";

export default {
    name: "speed",
    command: ["speed"],
    tags: "main",
    desc: "Check speed internet...",
    customPrefix: "",
    example: "",
    limit: 3,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m) => {
        let exec = promisify(cp.exec).bind(cp)
        await m.reply("Test Speed...")
        let o 
        try {
            o = await exec("python lib/python/speed.py")
        } catch (e) {
            o = e
        } finally {
            let { stdout, stderr } = o
            if (stdout) return m.reply(stdout)
            if (stderr) return m.reply(stderr)
        }
    }
}