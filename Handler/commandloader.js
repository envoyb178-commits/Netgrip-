const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function loadCommands() {
  const commandsPath = path.join(__dirname, '..', 'commands');
  
  if (!fs.existsSync(commandsPath)) {
    console.log(chalk.red('❌ Commands folder not found!'));
    return;
  }
  
  const categories = fs.readdirSync(commandsPath);
  let totalCommands = 0;
  
  for (const category of categories) {
    const categoryPath = path.join(commandsPath, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const commandFiles = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
      
      for (const file of commandFiles) {
        try {
          const command = require(path.join(categoryPath, file));
          if (command.name) {
            global.netgrip.commands.set(command.name, command);
            totalCommands++;
            
            if (command.aliases && Array.isArray(command.aliases)) {
              command.aliases.forEach(alias => {
                global.netgrip.commands.set(alias, command);
              });
            }
          }
        } catch (err) {
          console.log(chalk.red(`❌ Failed to load ${file}:`, err.message));
        }
      }
    }
  }
  
  console.log(chalk.green(`✅ Loaded ${totalCommands} commands`));
  return totalCommands;
}

module.exports = { loadCommands };