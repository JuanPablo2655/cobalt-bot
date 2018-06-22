exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  let guild = message.guild;
      let role = message.guild.roles.find("name", "Domo Arigato Mr. Roboto");
      let msg = !role?"Please create a role called 'Domo Arigato Mr. Roboto' and add all the bots to it":
    "Members: "+(guild.memberCount-role.members.size)+"\n" +
          "Bots: "+role.members.size+"\n";
      const embed = new Discord.RichEmbed()
      .addField(`${guild.name}`, 'Server stats')
      .addField('__Owner:__', `${guild.owner.displayName}`)
      .addField('__Created at__', `${guild.createdAt}`)
      .addField('__Verification Level__', `${level[guild.verificationLevel]}`)
      .addField('__Region__', `${guild.region}`)
      .addField('__Members__', `Total: ${guild.memberCount}\n` +msg)
      .setFooter(`requested by: ${message.author.tag}`)
      .setColor('RANDOM');
      message.channel.send({embed})
      .catch(e => logger.error(e))
  }

  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: "serverinfo",
    category: "System",
    description: "Shows info of the server.",
    usage: "serverinfo"
  };
