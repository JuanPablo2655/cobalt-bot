exports.run = async (client, message, args, level) => {
  message.channel.send({
    files: [{
      attachment: 'C:/Users/isidr/Desktop/cobalt/Images/pepe.jpg',
      name: 'pepe.jpg'
    }]
  })
    .then(console.log)
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "user"
};

exports.help = {
  name: "pepe",
  category: "Memes",
  description: "pepe!",
  usage: "pepe"
};
