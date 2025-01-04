/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 62895375950107

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default {
    name: "chord",
    command: ["chord"],
    tags: "tools",
    desc: "Search for the chords of the song you want to search for.",
    customPrefix: "",
    example: "akhirnya ku menemukanmu",
    limit: true,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        functions,
        axios,
        cheerio
    }) => {
        async function chord(query) {
          return new Promise(async(resolve, reject) => {
          const head = {"User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
              "Cookie":"__gads=ID=4513c7600f23e1b2-22b06ccbebcc00d1:T=1635371139:RT=1635371139:S=ALNI_MYShBeii6AFkeysWDKiD3RyJ1106Q; _ga=GA1.2.409783375.1635371138; _gid=GA1.2.1157186793.1635371140; _fbp=fb.1.1635371147163.1785445876"};
          let { data } = await axios.get("http://app.chordindonesia.com/?json=get_search_results&exclude=date,modified,attachments,comment_count,comment_status,thumbnail,thumbnail_images,author,excerpt,content,categories,tags,comments,custom_fields&search="+query, {headers: head});
            axios.get("http://app.chordindonesia.com/?json=get_post&id="+data.posts[0].id, {
              headers: head
            }).then(anu => {
              let $ = cheerio.load(anu.data.post.content);
              resolve({
                title: $("img").attr("alt") || query,
                chord: $("pre").text().trim()
              });
            }).catch(reject);
          });
        }
      m.reply(functions.list(await chord(text)), {font: true})
  }
}