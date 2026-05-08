const axios = require('axios');

module.exports = {
  name: 'quote',
  description: 'Get inspirational quotes',
  aliases: ['inspire', 'motivation', 'sayings'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    await sock.sendMessage(from, { text: '⏳ *Finding an inspiring quote...*' });
    
    try {
      const response = await axios.get('https://zenquotes.io/api/random');
      const quote = response.data[0];
      
      const quoteMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃💭 *INSPIRATIONAL QUOTE*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃"${quote.q}"
┃
┃━ *${quote.a}* ━
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Share this with friends!*
┃✨ *Type .quote for another*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { text: quoteMsg });
    } catch (error) {
      const fallbackQuotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
      ];
      
      const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      
      const quoteMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃💭 *INSPIRATIONAL QUOTE*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃"${quote.text}"
┃
┃━ *${quote.author}* ━
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { text: quoteMsg });
    }
  }
};