async function handleCommand(sock, msg, command, args, from, sender) {
  // Cooldown check
  const cooldownKey = `${command.name}_${sender}`;
  if (global.netgrip.cooldowns.has(cooldownKey)) {
    const remaining = Math.ceil((global.netgrip.cooldowns.get(cooldownKey) - Date.now()) / 1000);
    if (remaining > 0) {
      await sock.sendMessage(from, { text: `⏱️ Please wait ${remaining} seconds before using ${command.name} again.` });
      return;
    }
  }
  
  if (command.cooldown) {
    global.netgrip.cooldowns.set(cooldownKey, Date.now() + (command.cooldown * 1000));
    setTimeout(() => global.netgrip.cooldowns.delete(cooldownKey), command.cooldown * 1000);
  }
  
  try {
    await command.execute(sock, msg, args, from, sender);
  } catch (error) {
    console.error(`Error in ${command.name}:`, error);
    await sock.sendMessage(from, { text: '❌ Command execution failed. Please try again.' });
  }
}

module.exports = { handleCommand };