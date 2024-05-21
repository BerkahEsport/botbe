export default {
    name: "afk",
    command: ["afk"],
    tags: "main",
    desc: "",
    customPrefix: "",
    example: "%prefix%command sleep!",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        prefix,
        noPrefix,
        command,
        arg,
        args,
        text,
        sock,
        commands,
        cmd,
        name,
        user,
        settings,
        stats,
        isGroup,
        isAdmin,
        isBotAdmin,
        admin,
        metadata,
        participants,
        store,
        config,
        functions,
        axios,
        cheerio
    }) => {
      user.afk = +new Date()
      user.afkReason = text|| ""
      let afkmode = functions.random([" ✿.｡.:* 𝒜𝐹𝒦 𝑀𝒪𝒟𝐸 *.:｡.✿", "╰☆☆ ₐFK MₒDₑ ☆☆╮", "░▒▓█ 【A】【F】【K】 【M】【O】【D】【E】 █▓▒░", "▁ ▂ ▄ ▅ ▆ ▇ █ 〜A∿F∿K∿ ∿M∿O∿D∿E〜 █ ▇ ▆ ▅ ▄ ▂ ▁", "【☆】★【☆】★【𝒜𝐹𝒦 𝑀𝒪𝒟𝐸】★【☆】★【☆】" , ".•♫•♬• Å⫶F̊⫶K̊⫶ M̊⫶O̊⫶D̊⫶E̊⫶ •♬•♫•.", "꧁༒☬ A̴F̴K̴ ̴M̴O̴D̴E̴ ☬༒꧂", "§.•¨°÷•..× AFK MODE ×,.•¨°÷•..§", "░▒▓█►─═  ᴀꜰᴋ ᴍᴏᴅᴇ ═─◄█▓▒░", " ✴  🎀  𝒜𝐹𝒦 𝑀❁𝒟𝐸  🎀  ✴", "꧁𓊈𒆜 ƎᗡOW ⋊Ⅎ∀ 𒆜𓊉꧂", "•´¯`•. A͎͍͐￫F͎͍͐￫K͎͍͐￫ M͎͍͐￫O͎͍͐￫D͎͍͐￫E͎͍͐￫ .•´¯`•"])
      m.reply(`${ afkmode}
    
      ╭[ *★彡[YOU ARE NOW AFK]彡★* ]✧
      ┆ *Name*   : ${m.pushName || user.name}
      ┆ *Reason* : ${user.afkReason ? "" + user.afkReason : ""}
      ╰┅────────★`, {font: true})
    }
  }