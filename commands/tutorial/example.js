export default {
name: "cmd1", //✅ name command for your menu, equate it to one of the command arrays
command: ["cmd1", "cmd2"], //✅ set a command here
tags: "main", //✅ tags for this name for your menu
desc: "this description", //✅ description this command for your menu
// example: "%prefixcommand text", // If it doesn't follow the instructions, you can tell me how to do it here
run: async(m, {sock, functions, args, text}) => {
    m.reply("Hello i am bot!\n\n- *Script BOT* \n> "+m.github) // response command
},
// this bottom config may not be filled in
customPrefix: "", // using certain prefixes
example: "", // example if using args/text (%prefix, %args, %text, %command)
limit: false, // if you use a limit, it can be true or a number
isOwner: false, // owner bot
isPremium: true, // premium user
isBotAdmin: false, // bot admin
isAdmin: false, // admin gc
isGroup: false, // group only
isPrivate: false, // pc only
}