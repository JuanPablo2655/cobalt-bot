exports.run = async (client, msg, args, level) => {
  let hugMoji = client.emojis.find('name', 'Hug');
  const target = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();

  if (!target || target === client.user) {
    return msg.reply('Please mention someone.');
  }

  const hugSentences = [
    `There you go ${target.username} I love you ♥`,
    `Oh... ${target.username} I got you buddy ${hugMoji}`,
    `Come here ${target.username} ♥`,
    `You are so sweet ${target.username} come get a hug!`,
    `Come here ${target.username} my hug will make your day better. ${hugMoji}`
  ];

  msg.channel.send(hugSentences[Math.floor(Math.random() * hugSentences.length)]);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "user"
};

exports.help = {
  name: "hug",
  category: "Fun",
  description: "Give your friend a hug.",
  usage: "hug [user]"
};
