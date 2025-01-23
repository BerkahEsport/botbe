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
        text,
        sock,
        config,
        axios,
        cheerio,
        functions,
        api
    }) => {
      try {
    const response =  await facebookdl(text);
      await sock.sendFile(m.from, response.message[0].link, `FB`, config.name.bot, m);
    } catch (e) {
      const data = await functions.fetchJson(`${api}api/facebook?url=${text}&apikey=${config.setting.apikey}`);
      await sock.sendFile(m.from, data.result.hd, `FB`, config.name.bot, m);
    }
    async function facebookdl(link) {
      const url = 'https://getmyfb.com/process';
      const data = new URLSearchParams({
        id: link,
        locale: 'id',
        'HX-Request': 'true',
        'HX-Trigger': 'form',
        'HX-Target': 'target',
        'HX-Current-URL': 'https://getmyfb.com/id',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      });
      try {
        const response = await axios.post(url, data.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        });
        const $ = cheerio.load(response.data);
        const privateWarning = $('.private-warning').text().trim();
        if (privateWarning) {
          return {
            status: 403,
            message: 'Video bersifat pribadi. Silakan gunakan url lainnya.',
            link: 'https://getmyfb.com/id/private-video-downloader',
          };
        }
        const downloadLinks = [];
        $('.results-list-item').each((index, element) => {
          const label = $(element).text().trim();
          const link = $(element).find('a').attr('href');
          if (label.includes('360p(SD)') || label.includes('720p(HD)')) {
            downloadLinks.push({ label: label.replace(/\s+/g, ' '), link });
          }
        });
        if (downloadLinks.length === 0) {
          return {
            status: 404,
            message: 'Tidak ada tautan unduhan yang ditemukan.',
          };
        }
        return {
          status: 200,
          message: downloadLinks,
        };
      } catch (error) {
        return {
          status: 500,
          message: error.message || error,
        };
      }
    }    
  }
}