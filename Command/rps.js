module.exports = {
  name: 'rps',
  description: 'Rock Paper Scissors',
  aliases: ['rockpaperscissors', 'rpsgame'],
  cooldown: 3,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎮 *ROCK PAPER SCISSORS*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .rps [choice]
┃
┃📝 *Examples:*
┃• .rps rock
┃• .rps paper
┃• .rps scissors
┃
┃🎯 *How to play:*
┃Rock 🪨 beats Scissors ✂️
┃Scissors ✂️ beats Paper 📄
┃Paper 📄 beats Rock 🪨
┃
┃💡 *Beat the bot to win!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const choice = args[0].toLowerCase();
    const valid = ['rock', 'paper', 'scissors'];
    
    if (!valid.includes(choice)) {
      await sock.sendMessage(from, { text: '❌ Invalid choice. Choose: rock, paper, or scissors' });
      return;
    }
    
    const botChoice = valid[Math.floor(Math.random() * 3)];
    let result = '';
    let resultEmoji = '';
    let winMessage = '';
    
    const icons = { rock: '🪨', paper: '📄', scissors: '✂️' };
    
    if (choice === botChoice) {
      result = "TIE!";
      resultEmoji = "🤝";
      winMessage = "It's a draw! Play again?";
    } else if (
      (choice === 'rock' && botChoice === 'scissors') ||
      (choice === 'paper' && botChoice === 'rock') ||
      (choice === 'scissors' && botChoice === 'paper')
    ) {
      result = "YOU WIN!";
      resultEmoji = "🏆🎉";
      winMessage = "Great job! You beat the bot!";
    } else {
      result = "BOT WINS!";
      resultEmoji = "🤖💀";
      winMessage = "Better luck next time!";
    }
    
    const gameMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎮 *ROCK PAPER SCISSORS* 🎮
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃👤 *You chose:* ${choice} ${icons[choice]}
┃🤖 *Bot chose:* ${botChoice} ${icons[botChoice]}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃${resultEmoji} *RESULT:* ${result}
┃
┃💡 ${winMessage}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃🎯 *Play again:* .rps rock/paper/scissors
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
    
    await sock.sendMessage(from, { text: gameMsg });
  }
};