const axios = require('axios');

module.exports = {
  name: 'joke',
  description: 'Get a random joke',
  aliases: ['pun', 'laugh', 'funny', 'hilarious'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    await sock.sendMessage(from, { text: '⏳ *Finding a funny joke for you...*' });
    
    try {
      // Try API first
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political&type=twopart');
      const joke = response.data;
      
      let jokeText = '';
      if (joke.type === 'twopart') {
        jokeText = `❓ ${joke.setup}\n\n😂 ${joke.delivery}`;
      } else {
        jokeText = `😂 ${joke.joke}`;
      }
      
      const jokeMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃😂 *JOKE TIME* 😂
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃${jokeText}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Want more?* Type .joke again
┃📊 Category: ${joke.category || 'Random'}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { text: jokeMsg });
    } catch (error) {
      // Fallback jokes
      const fallbackJokes = [
        { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything! 🧪" },
        { setup: "What do you call a fake noodle?", punchline: "An impasta! 🍝" },
        { setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field! 🌾" },
        { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear! 🐻" },
        { setup: "Why did the math book look so sad?", punchline: "It had too many problems! 📚" }
      ];
      
      const joke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
      
      const jokeMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃😂 *JOKE TIME* 😂
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃❓ ${joke.setup}
┃
┃✨ ${joke.punchline}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Type .joke for more laughs!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { text: jokeMsg });
    }
  }
};