const moment = require('moment-timezone');

module.exports = cobalt => {
    console.log('[Cobalt]\tOnline!')
    cobalt.user.setActivity('Samuel', {type: 'WATCHING'});

    let timeChannel = cobalt.channels.get('602981047294099508');
    setInterval(function () {
        time = moment().tz('America/New_York').format('LT');
        timeChannel.setName("🕒 " + time + " CBT").then(console.log("what the bot changed: "+time))
        console.log("time: "+time)
    }, 5 * 60000)
}