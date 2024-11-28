import { exec } from "child_process";
export default {
  name: "$",
  command: [""],
  customPrefix: "$",
  tags: "owner",
  desc: "Executing system...",
  example: "",
  isOwner: true,
  isBotAdmin: false,
  isAdmin: false,
  isGroup: false,
  isPrivate: false,
  isPremium: false,
  run: async (m, {functions}) => {
    try {
      exec(m.text, async (err, stdout) => {
        if (err) return m.reply(functions.format(err));
        if (stdout) return m.reply(functions.format(stdout));
      });
    } catch (e) {
      m.reply(functions.format(e));
    }
  }
}