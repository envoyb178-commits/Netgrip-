const weather = require('weather-js');

module.exports = {
  name: 'weather',
  description: 'Get real-time weather',
  aliases: ['wthr', 'climate', 'temp', 'forecast'],
  cooldown: 5,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🌤️ *WEATHER FORECAST*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .weather [city name]
┃
┃📝 *Examples:*
┃• .weather London
┃• .weather New York
┃• .weather Tokyo
┃• .weather Sydney
┃
┃🌍 *Works worldwide*
┃💡 *Try with your city name!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const city = args.join(' ');
    await sock.sendMessage(from, { text: `⏳ *Fetching weather for ${city}...*` });
    
    weather.find({ search: city, degreeType: 'C' }, async (err, result) => {
      if (err || !result || !result[0]) {
        await sock.sendMessage(from, { text: `❌ City "${city}" not found.\n\nTry a different city name or check spelling.` });
        return;
      }
      
      const current = result[0].current;
      const location = result[0].location;
      
      // Weather condition emojis
      const weatherEmojis = {
        'sunny': '☀️', 'clear': '☀️', 'cloudy': '☁️', 'rain': '🌧️', 
        'snow': '❄️', 'thunder': '⛈️', 'fog': '🌫️', 'wind': '💨'
      };
      
      let weatherIcon = '🌡️';
      for (let [key, emoji] of Object.entries(weatherEmojis)) {
        if (current.skytext.toLowerCase().includes(key)) {
          weatherIcon = emoji;
          break;
        }
      }
      
      const weatherMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃${weatherIcon} *WEATHER REPORT* ${weatherIcon}
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📍 *Location:* ${location.name}
┃📅 *Day:* ${current.day}
┃⏰ *Time:* ${current.observationtime}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃🌡️ *Temperature:* ${current.temperature}°C
┃💧 *Humidity:* ${current.humidity}%
┃🌬️ *Wind:* ${current.winddisplay}
┃☁️ *Sky:* ${current.skytext}
┃🔥 *Feels like:* ${current.feelslike}°C
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃📊 *Additional Info:*
┃• Wind chill: ${current.windchill || 'N/A'}°C
┃• Heat index: ${current.heatindex || 'N/A'}°C
┃• Dew point: ${current.dewpoint || 'N/A'}°C
┃
┃💡 *Data source:* Weather API
┃🕐 Last update: ${current.observationpoint || 'Recent'}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { text: weatherMsg });
    });
  }
};