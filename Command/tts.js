const gtts = require('node-gtts')('en');
const fs = require('fs');

module.exports = {
  name: 'tts',
  description: 'Text to Speech',
  aliases: ['speak', 'say', 'voice'],
  cooldown: 3,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎤 *TEXT TO SPEECH*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .tts [text]
┃
┃📝 *Examples:*
┃• .tts Hello world
┃• .tts How are you?
┃• .tts Good morning everyone
┃
┃🌍 *Languages:*
┃• English (default)
┃• Type .tts [lang] [text]
┃• Example: .tts es Hola
┃
┃💡 *Bot will speak your text!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    let language = 'en';
    let text = args.join(' ');
    
    // Check for language code
    if (args[0] && args[0].length === 2 && args[0].match(/[a-z]{2}/i)) {
      language = args[0].toLowerCase();
      text = args.slice(1).join(' ');
    }
    
    if (!text || text.trim().length === 0) {
      await sock.sendMessage(from, { text: '❌ Please provide text to speak.' });
      return;
    }
    
    await sock.sendMessage(from, { text: `⏳ *Generating speech in ${language.toUpperCase()}...*` });
    
    try {
      const tts = require('node-gtts')(language);
      const audioFile = 'tts_audio.mp3';
      
      await new Promise((resolve, reject) => {
        tts.save(audioFile, text, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      const audioBuffer = fs.readFileSync(audioFile);
      
      await sock.sendMessage(from, { 
        audio: audioBuffer, 
        mimetype: 'audio/mpeg',
        caption: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎤 *TEXT TO SPEECH*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📝 *Text:* ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}
┃🌍 *Language:* ${language.toUpperCase()}
┃
┃💡 *Listen to the audio above!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`
      });
      
      fs.unlinkSync(audioFile);
    } catch (error) {
      await sock.sendMessage(from, { text: `❌ TTS failed.\n\nText: "${text}"\nLanguage: ${language}\n\nPlease try again with English text.` });
    }
  }
};