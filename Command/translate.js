const translate = require('google-translate-api-x');

module.exports = {
  name: 'translate',
  description: 'Translate text to any language',
  aliases: ['tr', 'tl', 'convert'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🌐 *GOOGLE TRANSLATE*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .translate [lang] [text]
┃
┃📝 *Examples:*
┃• .translate es Hello world
┃• .translate fr Good morning
┃• .translate ja Thank you
┃• .translate zh How are you?
┃
┃🌍 *Language Codes:*
┃en=English  es=Spanish  fr=French
┃de=German   ja=Japanese zh=Chinese
┃ar=Arabic   ru=Russian  hi=Hindi
┃it=Italian  ko=Korean   pt=Portuguese
┃
┃💡 *Auto-detects source language!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    let targetLang = 'en';
    let text = args.join(' ');
    
    // Check if first argument is a language code
    if (args[0] && args[0].length === 2) {
      targetLang = args[0];
      text = args.slice(1).join(' ');
    }
    
    if (!text || text.trim().length === 0) {
      await sock.sendMessage(from, { text: '❌ Please provide text to translate.' });
      return;
    }
    
    await sock.sendMessage(from, { text: `⏳ *Translating to ${targetLang.toUpperCase()}...*` });
    
    try {
      const res = await translate(text, { to: targetLang });
      
      const translationMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🌐 *TRANSLATION RESULT*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📝 *Original Text:*
┃${text.substring(0, 200)}${text.length > 200 ? '...' : ''}
┃
┃🔄 *From:* ${res.from.language.iso.toUpperCase()}
┃🎯 *To:* ${targetLang.toUpperCase()}
┃
┃✨ *Translated Text:*
┃${res.text}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 Powered by Google Translate
┃📱 Translate any language instantly
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { text: translationMsg });
    } catch (error) {
      await sock.sendMessage(from, { text: `❌ Translation failed.\n\nText: "${text}"\nTarget language: ${targetLang}\n\nPlease try again with different text.` });
    }
  }
};