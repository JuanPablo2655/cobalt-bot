const moment = require('moment');
require('moment-timezone');
module.exports = cobalt => {
    console.log('[Cobalt]\tOnline!')
    cobalt.user.setActivity('Nigga Samuel', {type: 'WATCHING'});

    let timeChannel = cobalt.channels.get('602981047294099508');
    setInterval(function () {
        time = moment().tz('America/New_York').format('LT');
        timeChannel.setName("🕒 " + time + " CBT")
    }, 1 * 30000)
}