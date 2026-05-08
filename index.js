const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const Pino = require('pino');
const chalk = require('chalk');
const express = require('express');
const dotenv = require('dotenv');
const { loadCommands } = require('./handlers/commandLoader');
const { handleCommand } = require('./handlers/commandHandler');

dotenv.config();

// ============ CONFIGURATION ============
global.netgrip = {
  prefix: process.env.PREFIX || '.',
  mode: process.env.MODE || 'public',
  ownerNumber: process.env.OWNER_NUMBER || '263716492962',
  botName: process.env.BOT_NAME || 'Netgrip MD',
  commands: new Map(),
  cooldowns: new Map(),
  warns: new Map(),
  balances: new Map(),
  afkUsers: new Map(),
  pairCodes: new Map(),
  autoReconnect: true,
  startTime: Date.now()
};

// ============ EXPRESS SERVER FOR RENDER ============
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    bot: global.netgrip.botName,
    uptime: Math.floor((Date.now() - global.netgrip.startTime) / 1000),
    commands: global.netgrip.commands.size,
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>${global.netgrip.botName}</title></head>
    <body style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial;">
      <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
        <h1 style="color: #667eea;">🤖 ${global.netgrip.botName}</h1>
        <p>✅ Bot is Running 24/7</p>
        <p>📊 ${global.netgrip.commands.size} Commands Loaded</p>
        <p>🕐 Uptime: ${Math.floor((Date.now() - global.netgrip.startTime) / 1000)} seconds</p>
        <hr>
        <p style="color: green;">🟢 Auto-Reconnect: ENABLED</p>
        <p style="color: blue;">🔐 Pair Code Method</p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(chalk.green(`✅ Web server running on port ${PORT}`));
});

// ============ PRINT BANNER ============
console.log(chalk.cyan(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     ███╗   ██╗███████╗████████╗ ██████╗ ██████╗ ██╗██████╗
║     ████╗  ██║██╔════╝╚══██╔══╝██╔════╝ ██╔══██╗██║██╔══██╗
║     ██╔██╗ ██║█████╗     ██║   ██║  ███╗██████╔╝██║██████╔╝
║     ██║╚██╗██║██╔══╝     ██║   ██║   ██║██╔═══╝ ██║██╔═══╝
║     ██║ ╚████║███████╗   ██║   ╚██████╔╝██║     ██║██║
║     ╚═╝  ╚═══╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝
║                                                       ║
║            ✨ WhatsApp Bot - 200+ Commands ✨         ║
╚═══════════════════════════════════════════════════════╝
`));
console.log(chalk.white('═'.repeat(55)));
console.log(chalk.green(`✓ Bot Name: ${global.netgrip.botName}`));
console.log(chalk.green(`✓ Owner: ${global.netgrip.ownerNumber}`));
console.log(chalk.green(`✓ Prefix: ${global.netgrip.prefix}`));
console.log(chalk.green(`✓ Auto-Reconnect: ENABLED`));
console.log(chalk.white('═'.repeat(55)));

// ============ BOT CONNECTION WITH AUTO RECONNECT ============
let reconnectAttempts = 0;
let isConnecting = false;

async function connectToWhatsApp() {
  if (isConnecting) return;
  isConnecting = true;
  
  try {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,
      logger: Pino({ level: 'silent' }),
      browser: ['Netgrip MD Bot', 'Chrome', '3.0.0'],
      markOnlineOnConnect: true,
      syncFullHistory: false
    });
    
    global.sock = sock;
    
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;
      
      if (connection === 'open') {
        reconnectAttempts = 0;
        global.netgrip.botNumber = sock.user.id.split(':')[0];
        
        console.log(chalk.green('\n✅ CONNECTED SUCCESSFULLY!'));
        console.log(chalk.cyan(`📱 Bot Number: ${global.netgrip.botNumber}`));
        console.log(chalk.cyan(`🕐 Time: ${new Date().toLocaleString()}`));
        
        // Load commands
        await loadCommands();
        
        // Send startup message to owner
        const startupMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃✨ *${global.netgrip.botName} IS ONLINE*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃📱 *Number:* ${global.netgrip.botNumber}
┃📊 *Commands:* ${global.netgrip.commands.size}
┃🕐 *Uptime:* 24/7 Active
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Type .menu* to start
┃🔐 *Type .pair* to connect
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
        
        await sock.sendMessage(global.netgrip.ownerNumber + '@s.whatsapp.net', { text: startupMsg }).catch(() => {});
        isConnecting = false;
      }
      
      if (connection === 'close') {
        isConnecting = false;
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        
        if (statusCode !== DisconnectReason.loggedOut) {
          reconnectAttempts++;
          const delay = Math.min(5000 * reconnectAttempts, 30000);
          console.log(chalk.yellow(`⚠️ Disconnected! Reconnecting in ${delay/1000}s... (Attempt ${reconnectAttempts})`));
          setTimeout(() => connectToWhatsApp(), delay);
        } else {
          console.log(chalk.red('❌ Logged out. Please delete auth_info folder and restart.'));
        }
      }
    });
    
    // ============ MESSAGE HANDLER ==========
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;
      const msg = messages[0];
      if (!msg.message || msg.key.fromMe) return;
      
      const from = msg.key.remoteJid;
      const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
      const sender = msg.key.participant || from;
      
      // Pair Code Generator
      if (body.toLowerCase() === '.pair' || body.toLowerCase() === 'pair') {
        const pairCode = Math.floor(100000 + Math.random() * 900000).toString();
        global.netgrip.pairCodes.set(sender, pairCode);
        
        await sock.sendMessage(from, { text: `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃🔐 *PAIR CODE GENERATED*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃📱 *Your Code:* *${pairCode}*
┃
┃📲 Send this code to:
┃👉 ${global.netgrip.ownerNumber}
┃
┃⏰ *Valid:* 5 minutes
┃
┃✨ *No QR Code Needed!*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈` });
        
        setTimeout(() => global.netgrip.pairCodes.delete(sender), 300000);
        return;
      }
      
      // Verify Pair Code
      if (sender === global.netgrip.ownerNumber + '@s.whatsapp.net' && /^\d{6}$/.test(body)) {
        for (let [user, code] of global.netgrip.pairCodes) {
          if (code === body) {
            global.netgrip.pairCodes.delete(user);
            await sock.sendMessage(from, { text: `✅ User ${user.split('@')[0]} paired successfully!` });
            await sock.sendMessage(user, { text: `✅ *Welcome to ${global.netgrip.botName}!*\n\nYou now have access to ${global.netgrip.commands.size} commands.\nType .menu to get started!` });
            break;
          }
        }
        return;
      }
      
      // Handle commands
      if (body.startsWith(global.netgrip.prefix)) {
        const args = body.slice(global.netgrip.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = global.netgrip.commands.get(commandName);
        
        if (command) {
          await handleCommand(sock, msg, command, args, from, sender);
        }
      }
    });
    
  } catch (error) {
    console.log(chalk.red('❌ Connection error:'), error);
    isConnecting = false;
    setTimeout(() => connectToWhatsApp(), 10000);
  }
}

// Start bot
connectToWhatsApp();