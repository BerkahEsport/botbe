/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 6289654279897

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/
/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 6289654279897

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default {
        before: async (m, {
                sock,
                prefix,
                quoted,
                isPremium,
                isGroup,
                functions,
                settings,
                isPrefix,
                task,
                user
        }) => { 
                if (!user.ai) return;
                if (quoted.body.startsWith(">") || quoted.body.startsWith("$")) return m.log("Request eval...");
                function _0x438fc9(_0x4cad4a,_0x2b5066){return _0x5035(_0x4cad4a-0x194,_0x2b5066);}function _0x3211ad(_0x24970e,_0x10797f){return _0x5035(_0x24970e- -0x265,_0x10797f);}function _0x5035(_0x537da9,_0xb4c633){const _0x567792=_0x5677();return _0x5035=function(_0x50358c,_0xbd3816){_0x50358c=_0x50358c-0xf2;let _0x1ac2ec=_0x567792[_0x50358c];return _0x1ac2ec;},_0x5035(_0x537da9,_0xb4c633);}(function(_0x318032,_0x531e1){function _0x370006(_0x1fa92f,_0x12c3b7){return _0x5035(_0x12c3b7-0x2e6,_0x1fa92f);}const _0x53bf4c=_0x318032();function _0x4abb66(_0x15158d,_0x30c654){return _0x5035(_0x30c654- -0x6d,_0x15158d);}function _0x30e972(_0x379847,_0x18761a){return _0x5035(_0x18761a- -0x288,_0x379847);}while(!![]){try{const _0x4b3494=-parseInt(_0x370006(0x3f5,0x3fb))/0x1*(-parseInt(_0x4abb66(0x9f,0x9b))/0x2)+-parseInt(_0x370006(0x412,0x403))/0x3+-parseInt(_0x30e972(-0x159,-0x16d))/0x4+-parseInt(_0x4abb66(0xad,0xa2))/0x5+parseInt(_0x4abb66(0x8b,0x8c))/0x6+-parseInt(_0x370006(0x3ec,0x3ff))/0x7*(-parseInt(_0x30e972(-0x1a8,-0x196))/0x8)+-parseInt(_0x4abb66(0xba,0xaa))/0x9;if(_0x4b3494===_0x531e1)break;else _0x53bf4c['push'](_0x53bf4c['shift']());}catch(_0x409e5d){_0x53bf4c['push'](_0x53bf4c['shift']());}}}(_0x5677,0x38aa2));function _0x5901ab(_0x977330,_0x4d35f4){return _0x5035(_0x977330-0x12c,_0x4d35f4);}let block=!![];try{const isFilteredAI=_0x5b7201=>task[_0x3211ad(-0x169,-0x161)](_0x5b7201);if(!isPrefix&&isFilteredAI(m[_0x3211ad(-0x172,-0x167)])){block=![];throw _0x5901ab(0x22d,0x219);}task[_0x3211ad(-0x159,-0x16b)](m['sender']);if(m[_0x5901ab(0x222,0x224)]['startsWith'](prefix))return;if(!settings['autoai'])return task[_0x5901ab(0x242,0x243)](m['sender']),m[_0x438fc9(0x296,0x282)]('💤');if(!settings[_0x5901ab(0x23c,0x24e)]&&!isPremium)return task[_0x3211ad(-0x14f,-0x158)](m['sender']),m[_0x5901ab(0x231,0x225)](_0x5901ab(0x221,0x229));if(!m[_0x438fc9(0x28b,0x29e)][_0x3211ad(-0x158,-0x14e)](sock[_0x5901ab(0x23a,0x248)][_0x438fc9(0x2ac,0x2b3)])&&isGroup){task[_0x5901ab(0x242,0x234)](m[_0x3211ad(-0x172,-0x170)]);return;}let text=m[_0x5901ab(0x222,0x234)],buffer=null;if(quoted[_0x438fc9(0x2b2,0x2c4)]&&quoted['ptt']){await m[_0x3211ad(-0x163,-0x168)]('📢');const response=await(await import(_0x438fc9(0x28c,0x29d)+Date[_0x5901ab(0x246,0x244)]()))[_0x5901ab(0x235,0x230)](buffer,msg['key']['id']+_0x438fc9(0x291,0x29b));if(response[_0x3211ad(-0x167,-0x156)])text=response[_0x438fc9(0x297,0x2aa)]['data'][0x0];else{task[_0x3211ad(-0x14f,-0x146)](m[_0x3211ad(-0x172,-0x15e)]),await m['reply'](_0x5901ab(0x232,0x247)),await m[_0x3211ad(-0x163,-0x179)]('⚠️');return;}}if(text){await sock[_0x438fc9(0x2b0,0x2bc)]('composing',m[_0x438fc9(0x29b,0x294)]);const ephemeralExpiration=0xd2f00*0x7,isImage=quoted['isMedia']&&quoted[_0x438fc9(0x288,0x292)]['includes'](_0x5901ab(0x23e,0x24a));isImage&&(buffer=await sock[_0x438fc9(0x2a7,0x2b3)](quoted));let data={'content':'','image':null,'audio':null,'success':![]};await m['react'](isImage?'🌅':'🔍'),data=await(await import('../../lib/js/AI.js?update='+Date[_0x438fc9(0x2ae,0x2a0)]()))[_0x438fc9(0x294,0x29c)](text,buffer,quoted);if(data[_0x438fc9(0x292,0x292)]&&!!data['content']){m[_0x438fc9(0x296,0x291)]('⌛'),await m['reply'](data[_0x438fc9(0x29f,0x2b5)]);data['audio']&&await sock[_0x3211ad(-0x166,-0x16c)](m[_0x438fc9(0x29b,0x2aa)],{'audio':{'url':data['audio']},'mimetype':_0x5901ab(0x240,0x250),'ptt':!![],'mentions':[m[_0x3211ad(-0x172,-0x175)]]},{'ephemeralExpiration':ephemeralExpiration});if(Array[_0x3211ad(-0x16b,-0x171)](data[_0x5901ab(0x23e,0x248)]))for(const url of data[_0x3211ad(-0x153,-0x141)]){await sock[_0x5901ab(0x22b,0x224)](m[_0x5901ab(0x233,0x244)],{'image':{'url':url},'mimetype':_0x438fc9(0x29e,0x29e),'caption':'*Link:*\x0a'+url,'mentions':[m[_0x438fc9(0x287,0x29e)]]},{'ephemeralExpiration':ephemeralExpiration}),await functions[_0x3211ad(-0x154,-0x15e)](0x7d0);}else typeof data[_0x5901ab(0x23e,0x227)]==='string'&&await sock[_0x3211ad(-0x166,-0x159)](m[_0x3211ad(-0x15e,-0x155)],{'image':Buffer['from'](data[_0x5901ab(0x23e,0x238)][_0x438fc9(0x298,0x2a8)](',')[0x1]||data[_0x3211ad(-0x153,-0x14a)],_0x438fc9(0x28f,0x2a1)),'mimetype':_0x3211ad(-0x15b,-0x16d),'caption':'Result:\x20'+text,'mentions':[m[_0x438fc9(0x287,0x28b)]]},{'ephemeralExpiration':ephemeralExpiration});m[_0x5901ab(0x22e,0x234)]('✅');}}}catch(_0x532dd4){await m[_0x438fc9(0x299,0x289)](_0x532dd4),m['react']('⏱');}finally{block&&task[_0x5901ab(0x242,0x244)](m['sender']);}function _0x5677(){const _0x21b554=['17ZhyFWL','delete','106533luVswa','jid','251629qDUeFH','now','1150868dSxEqP','sendPresenceUpdate','1029522jefaMf','isMedia','64NkodQl','sender','mime','To\x20use\x20bots\x20in\x20this\x20group,\x20you\x20must\x20be\x20a\x20premium\x20user!','body','mentions','./lib/js/huggingFace.js?update=','1808820sGQYNB','isArray','base64','has','.ogg','success','sendMessage','default','Waiting\x20response\x20for\x20before\x20chat!','react','output','split','reply','Failed\x20to\x20convert\x20audio\x20to\x20text!','from','54198CHLCuO','processAudioToText','image/jpeg','content','add','includes','user','874515toKlfr','autoai','delay','image','downloadMediaMessage','audio/mpeg'];_0x5677=function(){return _0x21b554;};return _0x5677();}
        }
}