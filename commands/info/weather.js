export default {
    name: "weather",
    command: ["weather"],
    tags: "info",
    desc: "To see weather conditions in a particular area.",
    customPrefix: "",
    example: "Boyolali",
    limit: true,
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
try {
    let response = axios.get('https://api.weatherapi.com/v1/current.json?key=897dba35c1d94f4cbea134758220207&q=' + text)
    let res = await response
    let {
        name,
        region,
        country,
        lat,
        lon,
        tz_id,
        localtime_epoch,
        localtime
    } = res.data.location
    let {
        last_updated_epoch,
        last_updated,
        temp_c,
        temp_f,
        is_day,
        wind_mph,
        wind_kph,
        wind_degree,
        wind_dir,
        pressure_mb,
        pressure_in,
        precip_mm,
        precip_in,
        humidity,
        cloud,
        feelslike_c,
        feelslike_f,
        vis_km,
        vis_miles,
        uv,
        gust_mph,
        gust_kph
    } = res.data.current
    let caption = `
*- - - - [ CONDITION ] - - -*
${res.data.current.condition.text}

*Name:* ${name}
*Region:* ${region}
*Country:* ${country}
*Latitude:* ${lat}
*Longitude:* ${lon}
*Timezone ID:* ${tz_id}
*Local Time Epoch:* ${localtime_epoch}
*Local Time:* ${localtime}

${functions.readMore()}
*- - - - [ DETAILED ] - - -*
*Last Updated Epoch:* ${last_updated_epoch}
*Last Updated:* ${last_updated}
*Temp Celcius:* ${temp_c}
*Temp Fahrenheit:* ${temp_f}
*Is Day:* ${is_day}
*Wind Mph:* ${wind_mph}
*Wind Kph:* ${wind_kph}
*Wind Degree:* ${wind_degree}
*Wind Dir:* ${wind_dir}
*Pressure Mb:* ${pressure_mb}
*Pressure In:* ${pressure_in}
*Precip Mm:* ${precip_mm}
*Precip In:* ${precip_in}
*Humidity:* ${humidity}
*Cloud:* ${cloud}
*Feelslike Celcius:* ${feelslike_c}
*Feelslike Fahrenheit:* ${feelslike_f}
*Vis Km:* ${vis_km}
*Vis Miles:* ${vis_miles}
*UV:* ${uv}
*Gust Mph:* ${gust_mph}
*Gust Kph:* ${gust_kph}
    `.trim()
m.reply("https:" + res.data.current.condition.icon, {caption, font: true})
        } catch(e) {
            throw (e)
        }
    }
}