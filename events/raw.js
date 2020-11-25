module.exports = (cobalt, packet) => {
    if(packet.t !== "MESSAGE_REACTION_ADD" || packet.t !== "MESSAGE_REACTION_REMOVE") return;

	const channel = cobalt.channels.cache.get(packet.d.channel_id);
	if(channel.messages.cache.has(packet.d.message_id)) return;

	channel.messages.fetch(packet.d.message_id).then(function(message) {
		const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
		const reaction = message.reactions.cache.get(emoji);
		if (packet.t === "MESSAGE_REACTION_ADD") {
			cobalt.emit("messageReactionAdd", reaction, cobalt.users.cache.get(packet.d.user_id));
		}
		if (packet.t === "MESSAGE_REACTION_REMOVE") {
			cobalt.emit("messageReactionRemove", reaction, cobalt.users.cache.get(packet.d.user_id));
		}
	});
}