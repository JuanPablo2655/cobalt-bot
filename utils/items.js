const { cobalt } = require("../cobalt");
const message = require("../events/message");

const list = [{
    name: 'padlock',
    description: '**Padlock** protect your money on hand from robbers.',
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 0,
    price: 0,
    keep: true,
    run: async (cobalt, message, args) => {

    }
}, {
    name: 'banknote',
    description: '**Padlock** more bank space.',
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 0,
    price: 0,
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
    sellAmount: 0,
    price: 0,
    keep: false,
    run: async (cobalt, message, args) => {
        
    }
}]