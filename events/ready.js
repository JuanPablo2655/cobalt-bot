const ascii = `
#####                                       ######               
#     #  ####  #####    ##   #      #####    #     #  ####  ##### 
#       #    # #    #  #  #  #        #      #     # #    #   #   
#       #    # #####  #    # #        #      ######  #    #   #   
#       #    # #    # ###### #        #      #     # #    #   #   
#     # #    # #    # #    # #        #      #     # #    #   #   
 #####   ####  #####  #    # ######   #      ######   ####    #   
			`;

module.exports = cobalt => {
    console.log('bot ready!', ascii);
    setInterval(function () {
        let l = [
            'Axalis take a shower',
            'John suck big peepee',
            'Alois committing genocide',
            'over the server'
        ]
        cobalt.user.setActivity(l[Math.floor(Math.random() * l.length)], {
            type: 'WATCHING'
        });
    }, 3600000);
}