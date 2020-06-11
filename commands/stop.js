if(!message.member.hasPermission('ADMINISTRATOR')) {message.reply("Wystąpił jakiś problem z komendą! Powiadom administratora!")}
const discord = require("discord.js");

module.exports = {
  name: "stop",
  description: "Stop the music",
  execute(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("Musisz być na kanale głosowym!");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Nie gra nic, co mógłbym zatrzymać!");
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();

    serverQueue.textChannel.send("**Zatrzymano granie obecnej piosenki!**");
  

    
  }
};

