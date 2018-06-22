exports.run = async (client, message, args, level) => {
  let receiver = message.mentions.members.first();
  let sender = message.member;
  let guild = message.guild;

  if (!receiver)
    return message.reply("Please mention a valid member of this server");

  if (receiver.id == sender.id) {
    message.channel.send("You can't gulag yourself, dummy!");
    return;
  }

  receiver.setRoles([])
    .then(member => console.log(`${receiver.displayName} now has ${receiver.roles.size} roles`))
    .catch(console.error);

  const channel = client.channels.get('322507273064808461');
  channel.send("You were sent to the gulags for your acts for treason")
  receiver.addRole('322512707960176641')
  message.channel.send("Have fun in the gulags!")
    .then(console.log)
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "gulag",
  category: "Moderation",
  description: "gives gulag'd role to tagged user.",
  usage: "gulag [user]"
};
