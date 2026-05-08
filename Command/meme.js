const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Get random memes',
  aliases: ['memes', 'dank', 'funnypic'],
  cooldown: 3,
  async execute(sock, msg, args, from, sender) {
    await sock.sendMessage(from, { text: '⏳ *Fetching a fresh meme...*' });
    
    try {
      const response = await axios.get('https://meme-api.com/gimme');
      const meme = response.data;
      
      const memeMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎭 *FRESH MEME* 🎭
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📝 *Title:* ${meme.title}
┃
┃👍 *Upvotes:* ${meme.ups || 'N/A'}
┃🔗 *Subreddit:* r/${meme.subreddit}
┃📊 *Rank:* ${meme.rank || 'Popular'}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Type .meme for another!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { image: { url: meme.url }, caption: memeMsg });
    } catch (error) {
      // Fallback memes
      const fallbackMemes = [
        'https://i.imgflip.com/1bij.jpg',
        'https://i.imgflip.com/26am.jpg',
        'https://i.imgflip.com/1otk96.jpg',
        'https://i.imgflip.com/2kbnqp.jpg'
      ];
      
      await sock.sendMessage(from, { 
        image: { url: fallbackMemes[Math.floor(Math.random() * fallbackMemes.length)] }, 
        caption: '🎭 *Here\'s a meme for you!*\n\n💡 Type .meme for more!'
      });
    }
  }
};