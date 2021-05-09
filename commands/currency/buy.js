const Discord = require("discord.js");
const items = require('../../utils/items');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let user = cobalt.fetchEconUser(message.author.id)
        let [itemID, ...buyAmount] = args;

        if (!itemID) return message.channel.send(`I need the item id, check \`cn!shop\` for the id of the item`)
        if (!buyAmount) buyAmount = 1
        else buyAmount = buyAmount

        const item = items.find(x => x.id.toLowerCase() === itemID)
        if (!item) return message.channel.send(`That item doesn't exist, please use the correct item id`)
        if (!item.canBuy) return message.channel.send(`Can't buy this item`)
        if (item.price > user.onHand || (buyAmount * item.price) > user.onHand) return message.channel.send(`You don't have enough CND to buy the item`)

        addCD();
        
        let itemInInv = user.items.find(x => x.id.toLowerCase() === item.id.toLowerCase());
        let array = [];
        array = user.items.filter(x => x.id !== item.id);
        if (itemInInv) {
            array.push({
                name: item.name,
                id: item.id,
                amount: parseInt(itemInInv.amount + buyAmount),
                description: item.description
            });
            user.item = array
            await user.save()
        } else {
            user.items.push({
                name: item.name,
                id: item.id,
                amount,
                description: item.description
            });
            await user.save();
        }

        user.onHand -= parseInt(item.price * buyAmount)
        await user.save();
        message.channel.send(`You bought ${buyAmount} ${item.name} for ₡${item.price * buyAmount}. You now have ₡${user.onHand} left`)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: false,
    ownerOnly: false,
    cooldown: 1,
    aliases: []
}

exports.help = {
    name: "buy",
    description: "buy items",
    usage: "buy [itemID] [amount || 1]"
}