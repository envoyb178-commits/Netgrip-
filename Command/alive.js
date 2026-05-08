module.exports = {
  name: 'alive',
  description: 'Check bot status',
  aliases: ['ping', 'status', 'online', 'health'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const memory = process.memoryUsage();
    
    const statusMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃✅ *BOT STATUS: ONLINE*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃🤖 *${global.netgrip.botName}*
┃📱 *Number:* ${global.netgrip.botNumber || 'Connected'}
┃
┃📊 *STATISTICS:*
┃• Uptime: ${hours}h ${minutes}m ${seconds}s
┃• Commands: ${global.netgrip.commands.size}
┃• Memory: ${Math.round(memory.heapUsed / 1024 / 1024)}MB
┃• Mode: ${global.netgrip.mode}
┃
┃🔐 *AUTH METHOD:*
┃• Type: Pair Code (No QR)
┃• Status: Active
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Need pair code?* Type .pair
┃🔄 *Auto-Reconnect:* ENABLED
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
    
    await sock.sendMessage(from, { text: statusMsg });
  }
};