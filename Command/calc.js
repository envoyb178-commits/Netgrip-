const math = require('mathjs');

module.exports = {
  name: 'calc',
  description: 'Advanced Calculator',
  aliases: ['calculate', 'math', 'solve', 'equation'],
  cooldown: 1,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🧮 *ADVANCED CALCULATOR*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .calc [expression]
┃
┃📝 *Examples:*
┃• .calc 2 + 2
┃• .calc sqrt(16)
┃• .calc sin(30 degree)
┃• .calc 2^10
┃• .calc log(100)
┃• .calc (10 + 5) * 3
┃
┃🔢 *Functions Available:*
┃• Basic: + - * / ^ %
┃• Advanced: sin, cos, tan
┃• Math: sqrt, log, ln, exp
┃• Constants: pi, e
┃• Factorial: 5!
┃
┃💡 *Try complex expressions!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const expression = args.join(' ');
    
    try {
      const result = math.evaluate(expression);
      
      const calcMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🧮 *CALCULATOR RESULT*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📝 *Expression:*
┃${expression}
┃
┃✨ *Result:*
┃${result}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 Type .calc help for functions
┃📊 Powered by Math.js
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      
      await sock.sendMessage(from, { text: calcMsg });
    } catch (error) {
      await sock.sendMessage(from, { text: `❌ Invalid expression: "${expression}"\n\n💡 Example: .calc 2+2\n\nCommon issues:\n• Check parentheses\n• Use * for multiplication\n• Use ^ for exponents` });
    }
  }
};