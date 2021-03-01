const list = [{
    name: 'padlock',
    description: '**Padlock** protect your money on hand from robbers.',
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 700,
    price: 1000,
    keep: true,
    run: async (cobalt, message, args) => {

    }
}, {
    name: 'banknote',
    description: '**Bank Note** more bank capacity.',
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 700,
    price: 1000,
    keep: false,
    run: async (cobalt, message, args) => {
        const random = Math.floor((Math.random() * 400) + 100);
        const amount = await cobalt.addBankSpace(message.author.id, random)
        message.channel.send(`You redeemed a banknote and got an extra ${random.toLocaleString()} of bank space. You now have ${amount.bankSpace.toLocaleString()}.`)
    }
}, {
    name: 'extralife',
    description: '**Extra Life** another chance at living.',
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 1400,
    price: 2000,
    keep: false,
    run: async (cobalt, message, args) => {
        
    }
}]

module.exports = list;