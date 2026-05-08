module.exports = {
  name: 'menu',
  description: 'Show all commands one per line',
  aliases: ['help', 'commands', 'cmds', 'list', 'all'],
  cooldown: 3,
  async execute(sock, msg, args, from, sender) {
    
    const menu = `|| ✨ NETGRIP MD ✨
||
|| 📱 ${global.netgrip.botName}
|| 👑 Owner: ${global.netgrip.ownerNumber}
|| 📊 Total: ${global.netgrip.commands.size} Commands
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 🏠 CORE COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .menu
|| £ .alive
|| £ .owner
|| £ .ping
|| £ .info
|| £ .pair
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 🤖 AI COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .gemini
|| £ .codeai
|| £ .gpt
|| £ .deepseek
|| £ .aiimage
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 🔧 TOOLS COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .weather
|| £ .translate
|| £ .calc
|| £ .qr
|| £ .tts
|| £ .wiki
|| £ .google
|| £ .image
|| £ .lyrics
|| £ .short
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 📥 DOWNLOAD COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .ytmp3
|| £ .ytmp4
|| £ .instagram
|| £ .tiktok
|| £ .facebook
|| £ .twitter
|| £ .mediafire
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 🎮 GAMES COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .rps
|| £ .quiz
|| £ .mathgame
|| £ .trivia
|| £ .hangman
|| £ .tictactoe
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 🎨 FUN COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .joke
|| £ .meme
|| £ .quote
|| £ .fact
|| £ .8ball
|| £ .roast
|| £ .compliment
|| £ .dadjoke
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 👥 GROUP COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .tagall
|| £ .poll
|| £ .kick
|| £ .add
|| £ .promote
|| £ .demote
|| £ .mute
|| £ .unmute
|| £ .lock
|| £ .unlock
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 🖼️ STICKER COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .sticker
|| £ .stickermeme
|| £ .take
|| £ .toimage
|| £ .wm
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 🎌 ANIME COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .naruto
|| £ .sasuke
|| £ .luffy
|| £ .goku
|| £ .ichigo
|| £ .tanjiro
|| £ .gojo
|| £ .eren
|| £ .midoriya
|| £ .saitama
|| £ .vegeta
|| £ .zoro
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 📦 OTHER COMMANDS
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| £ .cat
|| £ .dog
|| £ .fox
|| £ .panda
|| £ .bird
|| £ .profile
|| £ .balance
|| £ .daily
|| £ .level
|| £ .rank
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
||
|| 💡 TYPE £ .[command] TO USE
|| 🔥 EXAMPLE: £ .gemini Hello World
||
|| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
|| 🎯 TOTAL: ${global.netgrip.commands.size}+ COMMANDS 🎯`;

    await sock.sendMessage(from, { text: menu });
  }
};