exports.run = async (client, message, args, level) => {
  let user = message.mentions.users.first();
      if(!user)
          return message.reply("Please mention a valid member of this server");

      message.channel.send(`${user} has been thoroughly gassed like the Jew they are.`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "gas",
  category: "Fun",
  description: "Lets you gas whoever you like.",
  usage: "gas"
};
