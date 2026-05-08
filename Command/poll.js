module.exports = {
  name: 'poll',
  description: 'Create a group poll',
  aliases: ['vote', 'survey', 'question'],
  cooldown: 10,
  async execute(sock, msg, args, from, sender) {
    if (!from.endsWith('@g.us')) {
      await sock.sendMessage(from, { text: '❌ This command only works in groups.' });
      return;
    }
    
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃📊 *POLL CREATOR* 📊
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .poll [question] | [option1] | [option2] ...
┃
┃📝 *Example:*
┃.poll Best programming language? | Python | JavaScript | Java
┃
┃📋 *Rules:*
┃• Separate options with |
┃• Question first, then options
┃• Minimum 2 options
┃• Maximum 5 options
┃
┃💡 *Vote by replying with number!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const pollText = args.join(' ');
    const parts = pollText.split('|').map(s => s.trim());
    
    if (parts.length < 3) {
      await sock.sendMessage(from, { text: '❌ Invalid format.\n\nUse: .poll question | option1 | option2' });
      return;
    }
    
    const question = parts[0];
    const options = parts.slice(1, 6); // Max 5 options
    
    let pollMessage = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃📊 *GROUP POLL* 📊
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📝 *Question:* ${question}
┃
┃📋 *Options:*
┃\n`;
    
    for (let i = 0; i < options.length; i++) {
      pollMessage += `┃ ${i + 1}. ${options[i]}\n`;
    }
    
    pollMessage += `\n┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *How to vote:*
┃Reply with the number of
┃your choice (1-${options.length})
┃
┃🗳️ *Poll ends in 24 hours*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
    
    await sock.sendMessage(from, { text: pollMessage });
  }
};