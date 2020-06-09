module.exports = {
  name: "skip",
  description: "Skip the song or shift song to next",
  execute(client, message, args) {
    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("Musisz być na kanale głosowym!");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Nie gra nic, co mógłbym pominąć!");
    }

    serverQueue.connection.dispatcher.end();
    message.channel.send("✅ | Pomijam piosenkę");
  }
};
