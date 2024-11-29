export default {
  name: "myanimelist",
  command: ["myanimelist", "mal"],
  tags: "anime",
  desc: "View anime details from the Animelist website.",
  customPrefix: "",
  example: "one piece",
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
    async function MAL(query) {
        return new Promise(async(resolve, reject) => {
          axios.get('https://myanimelist.net/anime.php?q='+query+'&cat=anime')
          .then(({ data }) => {
            let results = [];
            var $ = cheerio.load(data);
            $('div.js-categories-seasonal > table').each(async function(y,z) {
              for(let i = 1; i < 10; i++){
                let b = $(z).find('td.borderClass > div.title')[i];
                let c = $(z).find('td.borderClass > div.picSurround > a.hoverinfo_trigger')[i];
                let d = $(z).find('td.ac:nth-child(3)')[i];
                let e = $(z).find('td.ac:nth-child(4)')[i];
                let f = $(z).find('td.ac:nth-child(5)')[i];
                const msg = {
                  title: $(b).find('a.hoverinfo_trigger').text(),
                  thumbnail: $(c).find('img').attr('data-src'),
                  url: $(b).find('a.hoverinfo_trigger').attr('href'),
                  type: $(d).text().trim().replace('\n'),
                  episode: $(e).text().trim().replace('\n'),
                  score: $(f).text().trim().replace('\n'),
                };
                results.push(msg);
              }
            });
            if (results.length < 1) return reject([{result: "Not found!"}]);
            resolve(results);
          })
          .catch(err => {
            reject(err);
          });
        });
      }
    m.reply(functions.mapList(await MAL(text), "MyAnimeList"), {font: true})
  }
}