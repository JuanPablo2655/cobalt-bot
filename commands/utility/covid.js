const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let covidEmbed = new Discord.RichEmbed();
        let [parameter, ...fullName] = args;

            if (parameter === 'state') {
            if (!fullName) {
                return message.channel.send("I need a correct state name. Ex. New York.")
            } else {
                const requestState = await fetch(`https://disease.sh/v3/covid-19/states/${fullName.join('%20')}`);
                const ans = await requestState.json();
                covidEmbed.setColor('RANDOM')
                    .setTitle(`COVID-19 Data for ${ans.state}`)
                    .addField('Total Cases', ans.cases, true)
                    .addField('Active Cases', ans.active, true)
                    .addField('Total Deaths', ans.deaths, true)
                    .addField('Today\'s deaths', ans.todayDeaths, true)
                    .addField('Today\'s Cases', ans.todayCases, true)
                    message.channel.send(covidEmbed)
            }
        } else if (parameter === 'country') {
            if (!fullName) {
                return message.channel.send("I need a correct country name. Ex: USA or United States.")
            } else {
                const requestCountry = await fetch(`https://disease.sh/v3/covid-19/countries/${fullName.join('%20')}?strict=false`);
                const ans = await requestCountry.json();
                covidEmbed.setColor('RANDOM')
                    .setTitle(`COVID-19 Data for ${ans.country}`)
                    .setThumbnail(ans.countryInfo.flag)
                    .addField('Total Cases', ans.cases, true)
                    .addField('Recovered', ans.recovered, true)
                    .addField('Active Cases', ans.active, true)
                    .addField('Total Deaths', ans.deaths, true)
                    .addField('Today\'s deaths', ans.todayDeaths, true)
                    .addField('Today\'s Cases', ans.todayCases, true)
                    .addField('Today\'s Recovered', ans.todayRecovered, true)
                    .addField('% of Population Infected', (ans.active / ans.population) * 100 + "%")
                message.channel.send(covidEmbed)
            }
        } else if (!parameter === 'state' || !parameter == 'county' || !fullName) {
            return message.channel.send('Error: paramater not recognized. Ex: cn!covid [state|country] name')
        } else {
            const requestAll = await fetch('https://disease.sh/v3/covid-19/all');
            const ans = await requestAll.json();
            covidEmbed.setColor('RANDOM')
                .setTitle('COVID-19 World Data')
                .addField('Total Cases', ans.cases, true)
                .addField('Recovered', ans.recovered, true)
                .addField('Active Cases', ans.active, true)
                .addField('Total Deaths', ans.deaths, true)
                .addField('Today\'s deaths', ans.todayDeaths, true)
                .addField('Today\'s Cases', ans.todayCases, true)
                .addField('Today\'s Recovered', ans.todayRecovered, true)
                .addField('% of Population Infected', (ans.active / ans.population) * 100 + "%")
            message.channel.send(covidEmbed)
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    aliases: []
}

exports.help = {
    name: "covid",
    description: "see the covid-19 data",
    usage: "covid"
}