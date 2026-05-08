const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKeys = require('../../config/apiKeys');

const genAI = new GoogleGenerativeAI(apiKeys.GEMINI_API_KEY);

module.exports = {
  name: 'gemini',
  description: 'Chat with Google Gemini AI',
  aliases: ['ai', 'ask', 'chat', 'question'],
  cooldown: 3,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🤖 *GEMINI AI - HELP*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .gemini [question]
┃
┃📝 *Examples:*
┃• .gemini What is artificial intelligence?
┃• .gemini Write a poem about nature
┃• .gemini Explain quantum physics
┃• .gemini How to learn programming?
┃
┃✨ *Capabilities:*
┃• Code generation (Python, JS, Java)
┃• Text analysis & summarization
┃• Creative writing & poems
┃• Math problem solving
┃• Language translation
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const question = args.join(' ');
    await sock.sendMessage(from, { text: `⏳ *Thinking about:* ${question.substring(0, 50)}...` });
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(question);
      const response = result.response.text();
      
      const aiMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🤖 *GEMINI AI RESPONSE*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃❓ *Question:* 
┃${question.substring(0, 80)}${question.length > 80 ? '...' : ''}
┃
┃✨ *Answer:*
┃${response.substring(0, 1800)}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 Powered by Google Gemini AI Pro
┃🕐 Response time: < 2 seconds
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      // Split if message too long
      if (aiMsg.length > 64000) {
        await sock.sendMessage(from, { text: response.substring(0, 3000) });
      } else {
        await sock.sendMessage(from, { text: aiMsg });
      }
    } catch (error) {
      await sock.sendMessage(from, { text: `❌ Gemini AI Error.\n\nYour question: ${question}\n\nPlease try again or use a different question.` });
    }
  }
};