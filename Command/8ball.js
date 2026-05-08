module.exports = {
  name: '8ball',
  description: 'Magic 8-ball answers',
  aliases: ['magicball', 'fortune', 'predict'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎱 *MAGIC 8-BALL*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .8ball [question]
┃
┃📝 *Examples:*
┃• .8ball Will I be rich?
┃• .8ball Should I do it?
┃• .8ball Is today my lucky day?
┃
┃🎱 *Ask any yes/no question!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const question = args.join(' ');
    
    const answers = [
      { text: "Yes, definitely!", emoji: "🎱✨", type: "positive" },
      { text: "Without a doubt.", emoji: "🎱✅", type: "positive" },
      { text: "Most likely yes.", emoji: "🎱👍", type: "positive" },
      { text: "Signs point to yes.", emoji: "🎱🔮", type: "positive" },
      { text: "Yes - absolutely!", emoji: "🎱💯", type: "positive" },
      { text: "Ask again later.", emoji: "🎱⏳", type: "neutral" },
      { text: "Better not tell you now.", emoji: "🎱🤫", type: "neutral" },
      { text: "Cannot predict now.", emoji: "🎱❓", type: "neutral" },
      { text: "Concentrate and ask again.", emoji: "🎱🧘", type: "neutral" },
      { text: "Don't count on it.", emoji: "🎱❌", type: "negative" },
      { text: "My sources say no.", emoji: "🎱📉", type: "negative" },
      { text: "Very doubtful.", emoji: "🎱🤔", type: "negative" },
      { text: "Outlook not so good.", emoji: "🎱😬", type: "negative" },
      { text: "No, but something better awaits!", emoji: "🎱🌟", type: "negative" }
    ];
    
    const answer = answers[Math.floor(Math.random() * answers.length)];
    
    const ballMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎱 *MAGIC 8-BALL* 🎱
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃❓ *Your Question:*
┃${question}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃${answer.emoji} *Answer:* ${answer.text}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Take it as guidance, not fate!*
┃🎱 *Ask another question with .8ball*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
    
    await sock.sendMessage(from, { text: ballMsg });
  }
};