module.exports = {
  name: 'tagall',
  description: 'Tag all group members',
  aliases: ['everyone', 'all', 'mentionall', 'notifyall'],
  cooldown: 30,
  async execute(sock, msg, args, from, sender) {
    if (!from.endsWith('@g.us')) {
      await sock.sendMessage(from, { text: '❌ This command only works in groups.' });
      return;
    }
    
    try {
      const groupMetadata = await sock.groupMetadata(from);
      const participants = groupMetadata.participants;
      const isAdmin = participants.find(p => p.id === sender && p.admin);
      
      if (!isAdmin && sender !== global.netgrip.ownerNumber + '@s.whatsapp.net') {
        await sock.sendMessage(from, { text: '❌ Only group admins can use tagall.' });
        return;
      }
      
      let message = args.length ? args.join(' ') : '📢 *GROUP ANNOUNCEMENT!*';
      message += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      
      const mentions = [];
      for (let participant of participants) {
        mentions.push(participant.id);
        message += `👤 @${participant.id.split('@')[0]}\n`;
      }
      
      message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📊 Total: ${participants.length} members`;
      
      await sock.sendMessage(from, { text: message, mentions });
    } catch (error) {
      await sock.sendMessage(from, { text: '❌ Failed to tag members. Please ensure I have admin rights.' });
    }
  }
};