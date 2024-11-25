export default {
    name: "facebook",
    command: ["facebook", "fb"],
    tags: "download",
    desc: "Download facebook with link...",
    customPrefix: "",
    example: "https://www.facebook.com/DramaFacbook21/videos/1775049149358700/?app=fbl",
    limit: 3,
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
    let response =  await facebookdl(text);
    sock.sendFile(m.from, response.message[0].link, `FB`, config.name.bot, m);

async function facebookdl(link) {
  const url = 'https://getmyfb.com/process'; 
  const data = new URLSearchParams({
      id: link,
      locale: 'id',
      'HX-Request': 'true',
      'HX-Trigger': 'form',
      'HX-Target': 'target',
      'HX-Current-URL': 'https://getmyfb.com/id',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  });
    try {
        const response = await axios.post(url, data.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        const $ = cheerio.load(response.data);
        const downloadLinks = [];
        $('.results-list-item').each((index, element) => {
            const label = $(element).text().trim(); 
            const link = $(element).find('a').attr('href');
            if (label.includes('360p(SD)') || label.includes('720p(HD)')) {
                downloadLinks.push({ label: label.replace(/\s+/g, ' '), link });
            }
        });
        return ({
          status: 200,
          message: downloadLinks
        });
    } catch (error) {
      return ({
        status: 404,
        message: error
      });
    }
}
  }
}