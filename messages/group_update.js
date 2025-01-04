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


export default async function group_update(sock, update, store, config, functions) {
   try {
      for (const action of update) {
         const metadata = await sock.groupMetadata(action.id);
         let admins = (metadata.participants.reduce((memberAdmin, memberNow) => (memberNow.admin ? memberAdmin.push({ id: memberNow.id, admin: memberNow.admin }) : [...memberAdmin]) && memberAdmin, []));
         let isBotAdmin = !!admins.find((member) => member.id === sock.user.jid);
         if (!isBotAdmin && action.announce) return;
         // Get profile picture group
         let profile;
         try {
            profile = await sock.profilePictureUrl(action.id, "image");
         } catch {
            profile = "https://telegra.ph/file/ed3144572e1b6a0dc2b64.png";
         }

         // Action true = close
         if (action.announce) {
            sock.sendMessage(action.id, {
               text: `\n*❖━━━━━━[ ɢʀᴏᴜᴘ ᴄʟᴏꜱᴇ ]━━━━━━❖*`, contextInfo: {
                  externalAdReply: {
                     title: config.name.bot,
                     mediaType: 1,
                     previewType: 5,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: config.group.ofc
                  }
               }
            })
         } else if (!action.announce) {
            sock.sendMessage(action.id, {
               text: `*❖━━━━[ ɢʀᴏᴜᴘ ᴏᴘᴇɴ ]━━━━━━❖*`, contextInfo: {
                  externalAdReply: {
                     title: config.name.bot,
                     mediaType: 1,
                     previewType: 5,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: config.group.ofc
                  }
               }
            })
         } break;
      } return;
   } catch (e) {
      console.log("Error Group Update: ", e);
   } return;
}