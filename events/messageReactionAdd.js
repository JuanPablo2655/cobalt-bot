module.exports = async (cobalt, data, user) => {
    let message = data.message;
    let emoji = data.emoji.name

    if (user.id == cobalt.user.id) return

    if (message.author.id == cobalt.user.id) return

    
    
}