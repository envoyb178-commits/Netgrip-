const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
  name: 'ytmp3',
  description: 'Download YouTube audio',
  aliases: ['ytaudio', 'ytmusic', 'downloadmp3'],
  cooldown: 15,
  async execute(sock, msg, args, from, sender) {
    if (!args.length) {
      const helpMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎵 *YOUTUBE MP3 DOWNLOADER*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📌 *Usage:* .ytmp3 [youtube_url]
┃
┃📝 *Example:*
┃.ytmp3 https://youtu.be/dQw4w9WgXcQ
┃
┃📥 *Quality:* Highest quality audio
┃⚡ *Speed:* Fast downloads
┃💾 *Format:* MP3
┃
┃⚠️ *Download only for personal use*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
      await sock.sendMessage(from, { text: helpMsg });
      return;
    }
    
    const url = args[0];
    
    if (!ytdl.validateURL(url)) {
      await sock.sendMessage(from, { text: '❌ Invalid YouTube URL.\n\nMake sure it\'s a valid YouTube link (youtube.com/watch?v=... or youtu.be/...)' });
      return;
    }
    
    await sock.sendMessage(from, { text: '⏳ *Downloading audio...* This may take a moment.' });
    
    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;
      const duration = parseInt(info.videoDetails.lengthSeconds);
      
      if (duration > 600) {
        await sock.sendMessage(from, { text: '⚠️ Video is over 10 minutes. Download may take longer.' });
      }
      
      const audioStream = ytdl(url, { 
        filter: 'audioonly', 
        quality: 'highestaudio',
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      });
      
      const writeStream = fs.createWriteStream('audio.mp3');
      audioStream.pipe(writeStream);
      
      writeStream.on('finish', async () => {
        const audioBuffer = fs.readFileSync('audio.mp3');
        const fileSizeMB = (audioBuffer.length / (1024 * 1024)).toFixed(2);
        
        await sock.sendMessage(from, { 
          audio: audioBuffer, 
          mimetype: 'audio/mpeg',
          caption: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🎵 *DOWNLOAD COMPLETE* 🎵
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📝 *Title:* ${title.substring(0, 50)}
┃⏱️ *Duration:* ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}
┃📦 *Size:* ${fileSizeMB} MB
┃📥 *Quality:* Highest
┃
┃👤 *Requested by:* @${sender.split('@')[0]}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Enjoy your music!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`,
          mentions: [sender]
        });
        
        fs.unlinkSync('audio.mp3');
      });
    } catch (error) {
      await sock.sendMessage(from, { text: `❌ Download failed.\n\nError: ${error.message}\n\nPlease try:\n• Check the URL\n• Use a different video\n• Try again later` });
    }
  }
};