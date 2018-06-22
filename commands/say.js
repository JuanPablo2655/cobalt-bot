exports.run = async (client, message, args, level) => {
  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send(sayMessage);
  message.channel.send(`ran by: ${message.author.tag}`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "say",
  category: "Fun",
  description: "Let the bot say stuff.",
  usage: "say"
};
