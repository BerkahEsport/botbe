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

import axios from "axios";
import * as cheerio from "cheerio";

export default async (instagramLink) => {
    try {
        const { data: html, headers } = await axios.get('https://indown.io/id', {
            withCredentials: true
        });
        const cookies = headers['set-cookie'].join('; ');

        const $ = cheerio.load(html);
        const formAction = $('form#downloadForm').attr('action');
        const inputValues = Object.fromEntries(
            $('form#downloadForm input[name]').get().map((element) => [$(element).attr('name'), $(element).val() || ''])
        );
        inputValues.link = instagramLink;

        const { data: responseData } = await axios.post(formAction, new URLSearchParams(inputValues), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookies
            },
            withCredentials: true
        });

        const $$ = cheerio.load(responseData);
        const mediaSet = new Set();

        $$('div.container.mt-4#result div.row.justify-content-center div.col-md-4').each((_, el) => {
            const mediaLink = $$(el);
            const type = mediaLink.find('a.image-link').length > 0 ? 'image' : 'video';
            const href = decodeURIComponent(mediaLink.find(type === 'image' ? 'div.mt-2.mb-2.text-center a' : 'div video source').attr('href')) ?? '';
            const alternative = mediaLink.find(type === 'image' ? 'a.image-link' : 'div.mt-3.text-center div.btn-group-vertical a').attr('href') ?? '';
            mediaSet.add({
                type,
                href,
                alternative
            });
        });

        return [...mediaSet];
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
