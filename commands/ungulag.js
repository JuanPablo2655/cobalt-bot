exports.run = async (client, message, args, level) => {
  let gulagd = message.mentions.members.first();
  let sender = message.member;
  let guild = message.guild;

  if (!gulagd)
    return message.reply("Please mention a valid member of this server");

  if (gulagd.id == sender.id) {
    message.channel.send("You can't gulag yourself, dummy!");
    return;
  }

  gulagd.removeRole('322512707960176641')
  .then(member => console.log(`${member.displayName} now has ${member.roles.size} roles`))
  .catch(console.error);
  message.channel.send("<@&322512707960176641> removed");
  gulagd.addRole('322514082496380929')
  .then(console.log)
  .catch(console.error);
  message.channel.send("<@&322514082496380929> role added");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "ungulag",
  category: "Moderation",
  description: "removes gulag'd role and add member role",
  usage: "ungulag [user]"
};
