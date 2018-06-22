exports.run = async (client, message, args, level) => {
  let sender = message.member;
  message.channel.send("I agree with "+sender);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "agree",
  category: "Fun",
  description: "Agrees with you.",
  usage: "agree"
};
