module.exports = (cobalt, packet) => {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = cobalt.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return;
    channel.fetchMessage(packet.d.message_id).then(message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        if (reaction) reaction.users.set(packet.d.user_id, cobalt.users.get(packet.d.user_id));
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            cobalt.emit('messageReactionAdd', reaction, cobalt.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            cobalt.emit('messageReactionRemove', reaction, cobalt.users.get(packet.d.user_id));
        }
    });
}