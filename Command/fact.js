const axios = require('axios');

module.exports = {
  name: 'fact',
  description: 'Get random facts',
  aliases: ['didyouknow', 'trivia', 'interesting'],
  cooldown: 2,
  async execute(sock, msg, args, from, sender) {
    await sock.sendMessage(from, { text: '⏳ *Finding an interesting fact...*' });
    
    const facts = [
      "🐝 Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs that was still edible!",
      "🌍 Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.",
      "🦒 A giraffe's tongue can be up to 20 inches long and is blue-black in color to prevent sunburn.",
      "🐧 Penguins propose to their mates with a pebble. Finding the perfect pebble is crucial for mating.",
      "🍌 Bananas are berries, but strawberries aren't. Botanically, berries develop from a single flower ovary.",
      "🦷 You produce about 25,000 quarts of saliva in your lifetime - enough to fill two swimming pools!",
      "🐙 An octopus has three hearts, nine brains, and blue blood.",
      "🦩 Flamingos are born grey. Their diet of brine shrimp and algae turns them pink.",
      "🧀 The Great Wall of China is not visible from space with the naked eye.",
      "🐪 Camel humps store fat, not water. They can go weeks without food or water using this fat.",
      "🎤 Cows have best friends and become stressed when separated from them.",
      "🦋 Butterflies taste with their feet. They have taste sensors on their legs.",
      "🧠 Your brain uses 20% of your body's total oxygen and energy.",
      "🍕 Pineapple contains bromelain, an enzyme that breaks down protein - it's eating you back!",
      "🐘 Elephants are the only mammals that can't jump.",
      "💧 A single cloud can weigh over a million pounds due to water droplets.",
      "🎵 Listening to music releases dopamine in your brain - the same chemical released when eating or exercising.",
      "🦷 Teeth are the only part of the human body that can't repair themselves."
    ];
    
    const fact = facts[Math.floor(Math.random() * facts.length)];
    
    const factMsg = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━┈
┃📚 *DID YOU KNOW?*
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃
┃${fact}
┃
┃━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃💡 *Type .fact for another fact!*
┃✨ *Share knowledge with friends*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈`;
    
    await sock.sendMessage(from, { text: factMsg });
  }
};