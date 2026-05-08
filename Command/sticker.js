const sharp = require('sharp');

module.exports = {
  name: 'sticker',
  description: 'Convert image to sticker',
  aliases: ['s', 'stiker', 'stickermaker', 'to sticker'],
  cooldown: 3,
  async execute(sock, msg, args, from, sender) {
    let media;
    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (quoted?.imageMessage) {
      media = await sock.downloadMediaMessage({
        message: { imageMessage: quoted.imageMessage }
      });
      
      const stickerBuffer = await sharp(media)
        .resize(512, 512, { fit: 'cover' })
        .png()
        .toBuffer();
      
      await sock.sendMessage(from, { sticker: stickerBuffer });
    } 
    else if (msg.message.imageMessage) {
      media = await sock.downloadMediaMessage(msg);
      
      const stickerBuffer = await sharp(media)
        .resize(512, 512, { fit: 'cover' })
        .png()
        .toBuffer();
      
      await sock.sendMessage(from, { sticker: stickerBuffer });
    }
    else if (quoted?.videoMessage && quoted.videoMessage.seconds < 11) {
      media = await sock.downloadMediaMessage({
        message: { videoMessage: quoted.videoMessage }
      });
      
      await sock.sendMessage(from, { sticker: media });
    }
    else {
      const stickerMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🖼️ *STICKER MAKER* 🖼️
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *How to use:*
┃
┃1️⃣ *For image:*
┃• Send an image
┃• Reply to image with .sticker
┃
┃2️⃣ *For video:*
┃• Send short video (max 10s)
┃• Reply with .sticker
┃
┃✨ *Features:*
┃• Auto-resize to 512x512
┃• High quality output
┃• No watermark
┃• Instant conversion
┃
┃💡 *Create custom stickers!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: stickerMsg });
    }
  }
};