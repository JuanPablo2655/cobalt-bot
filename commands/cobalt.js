exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()
    .addField('Cobalt Network', '*The Cobalt Network is one of the largest and most prevalent roleplaying regions on Nationstates. We constitute a group of roleplayers from all walks of life that are united in our goal of creating and sponsoring roleplays of all kinds, from nation RPs, to character RPs. If you choose to move here you can enjoy the many perks, like an election system, a very active discord server, a multitude of various roleplays off all types, and a whole set of different people with different personalities!*', true)
    .addField('Founder', '[Atrilan](https://www.nationstates.net/nation=atrilan)', true)
    .addField('Co-Founder', '[Pacificora](https://www.nationstates.net/nation=pacificora)', true)
    .addField('president', '[Lan Khao Xang Hom Krung Tai](https://www.nationstates.net/nation=lan_khao_xang_hom_krung_tai)', true)
    .addField('Vice President', '[Nancivania](https://www.nationstates.net/nation=nancivania)', true)
    .addField('Ministers', '[Greater Redosia](https://www.nationstates.net/nation=greater_redosia)\n[Da Klan](https://www.nationstates.net/nation=da_klan)\n[Military Lands of the Scottish People](https://www.nationstates.net/nation=military_lands_of_the_scottish_people)\n[Romanussia](https://www.nationstates.net/nation=romanussia)\n', true)
    .addField('Cobalt Network News', 'none :(', true)
    .setColor('RANDOM');
    message.channel.send({embed})
    .catch(e => logger.error(e));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "cobalt",
  category: "NationStates",
  description: "info of the region.",
  usage: "cobalt"
};
