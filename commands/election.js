const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    if (args[0] === '-p') {
        let President = new Discord.RichEmbed()
            .setTitle('Seventh Cobaltian Election')
            .addField('President / Vice-President', '[Greater Redosia](https://www.nationstates.net/nation=greater_redosia)\n[The Pearl River](https://www.nationstates.net/nation=the_pearl_river)\n[Military Lands of the Scottish People](https://www.nationstates.net/nation=military_lands_of_the_scottish_people)\n[Nations United for Conquest](https://www.nationstates.net/nation=nations_united_for_conquest)')
            .setColor('RANDOM');
        message.channel.send(President);
    } else if (args[0] === '-i') {
        let Information = new Discord.RichEmbed()
            .setTitle('Seventh Cobaltian Election')
            .addField('Minister of Information / Discord', '[Chewion](https://www.nationstates.net/nation=chewion)\n[Granluras](https://www.nationstates.net/nation=granluras)')
            .setColor('RANDOM');
        message.channel.send(Information);
    } else if (args[0] === '-d') {
        let Defense = new Discord.RichEmbed()
            .setTitle('Seventh Cobaltian Election')
            .addField('Minister of Defense / Foreign Affairs', '[Shadow Guard](https://www.nationstates.net/nation=shadow_guard)\n[Alaroma](https://www.nationstates.net/nation=alaroma)\n[Pacificora](https://www.nationstates.net/nation=pacificora)')
            .setColor('RANDOM');
        message.channel.send(Defense);
    } else if (args[0] === '-ia') {
        let Internal = new Discord.RichEmbed()
            .setTitle('Seventh Cobaltian Election')
            .addField('Minister of Internal Affairs / Polls', '[The Industrial States of Columbia](https://www.nationstates.net/nation=the_industrial_states_of_columbia)')
            .setColor('RANDOM');
        message.channel.send(Internal);
    } else if (!args[0]) {
        let electionrich = new Discord.RichEmbed()
            .setTitle('Seventh Cobaltian Election')
            .addField('President / Vice-President', '[Greater Redosia](https://www.nationstates.net/nation=greater_redosia)\n[The Pearl River](https://www.nationstates.net/nation=the_pearl_river)\n[Military Lands of the Scottish People](https://www.nationstates.net/nation=military_lands_of_the_scottish_people)\n[Nations United for Conquest](https://www.nationstates.net/nation=nations_united_for_conquest)')
            .addField('Minister of Information / Discord', '[Chewion](https://www.nationstates.net/nation=chewion)\n[Granluras](https://www.nationstates.net/nation=granluras)')
            .addField('Minister of Defense / Foreign Affairs', '[Shadow Guard](https://www.nationstates.net/nation=shadow_guard)\n[Alaroma](https://www.nationstates.net/nation=alaroma)\n[Pacificora](https://www.nationstates.net/nation=pacificora)')
            .addField('Minister of Internal Affairs / Polls', '[The Industrial States of Columbia](https://www.nationstates.net/nation=the_industrial_states_of_columbia)')
            .setColor('RANDOM');
        message.channel.send(electionrich);
    } else if (args[0] === '-vote') {
        message.channel.send("Voting link: https://goo.gl/forms/wCKCqZmN7Phdu3ip1")
    }
}

exports.conf = {
    aliases: ['election']
}

exports.help = {
    name: "election",
    description: "Seventh Cobaltian Election",
    usage: "election [-p|-i|-d|-ia|-vote]"
}