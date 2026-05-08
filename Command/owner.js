module.exports = {
  name: 'owner',
  description: 'Show bot owner info',
  aliases: ['creator', 'dev', 'developer', 'support'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    const ownerMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃👑 *BOT OWNER INFORMATION*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📛 *Name:* Netgrip MD Team
┃📱 *Number:* ${global.netgrip.ownerNumber}
┃🤖 *Bot:* ${global.netgrip.botName}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💬 *Contact Methods:*
┃• WhatsApp: ${global.netgrip.ownerNumber}
┃• Status: Online 24/7
┃
┃⚠️ *For pair code, send to this number*
┃💡 *Type .pair to get your code*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
    
    await sock.sendMessage(from, { text: ownerMsg });
  }
};