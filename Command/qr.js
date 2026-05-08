const QRCode = require('qrcode');

module.exports = {
  name: 'qr',
  description: 'Generate QR code',
  aliases: ['qrcode', 'barcode', 'generateqr'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃📱 *QR CODE GENERATOR*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .qr [text/link]
┃
┃📝 *Examples:*
┃• .qr https://netgrip.com
┃• .qr Hello WhatsApp
┃• .qr +263716492962
┃• .qr My secret message
┃
┃✨ *Features:*
┃• High quality PNG
┃• Error correction
┃• Any text or URL
┃• Instant generation
┃
┃💡 *Scan with any QR reader*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const text = args.join(' ');
    
    try {
      const qrBuffer = await QRCode.toBuffer(text, { 
        type: 'png', 
        width: 500,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      await sock.sendMessage(from, { 
        image: qrBuffer, 
        caption: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃📱 *QR CODE GENERATED*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📝 *Data:*
┃${text.substring(0, 100)}${text.length > 100 ? '...' : ''}
┃
┃📐 *Size:* 500x500 pixels
┃✅ *Status:* Ready to scan
┃
┃💡 *Scan to access your data!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`
      });
    } catch (error) {
      await sock.sendMessage(from, { text: `❌ Failed to generate QR code.\n\nText: "${text}"\n\nError: ${error.message}` });
    }
  }
};