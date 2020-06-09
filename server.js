const discord = require("discord.js")
const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json")

//CLIENT EVENTS
client.on("ready", () => {
  console.log(`Zalogowano jako ${client.user.tag}`)
  client.user.setActivity(`🎶Muzyka | ❓${PREFIX}help - pomoc`);

    })


client.on("warn", info => console.log(info));

client.on("error", console.error)

//DEFINIING
client.commands = new discord.Collection()
client.prefix = PREFIX
client.queue = new Map();


//LETS LOAD ALL FILES
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} //LOADING DONE


//WHEN SOMEONE MESSAGE
client.on("message", message => {
   if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.startsWith(PREFIX)) { //IF MESSSAGE STARTS WITH MINE BOT PREFIX
    
    const args = message.content.slice(PREFIX.length).trim().split(/ +/) //removing prefix from args
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) {
      return;
    } 
    
  try  { //TRY TO GET COMMAND AND EXECUTE
      client.commands.get(command).execute(client, message, args)
    } catch (err) { //IF IT CATCH ERROR
      console.log(err)
      message.reply("Wystąpił jakiś problem z komendą! Powiadom administratora!")
    
    }
    

    
  }
  
  
});




//DONT DO ANYTHING WITH THIS TOKEN lol
client.login(TOKEN)

client.on("message", message => {

  let args = message.content.substring(PREFIX.length).split(" ")
    if (!message.content.startsWith(PREFIX)) return;
    if (message.author.bot) return;
    const avatar = client.user.avatarURL()

    switch(args[0]){

        case 'help':
          const embed3 = new discord.MessageEmbed()
          .setTitle('**Komendy Bota**')
          .addField(`${PREFIX}` + '**loop**', 'Zapętla muzykę')
          .addField(`${PREFIX}` + '**lyrics**', 'Wyświetla Tekst piosenki (o ile jest dostępny!)')
          .addField(`${PREFIX}` + '**name**', 'Wyświetla nazwe puszczonej piosenki')
          .addField(`${PREFIX}` + '**pause**', 'Pauzuje muzykę')
          .addField(`${PREFIX}` + '**play `<muzyka>`**', 'Puszcza daną muzykę')
          .addField(`${PREFIX}` + '**queue**', 'Wyświetla kolejkę muzyk do puszczenia')
          .addField(`${PREFIX}` + '**resume**', 'Wznawia zapauzowaną piosenkę')
          .addField(`${PREFIX}` + '**skip**', 'Pomija piosenkę')
          .addField(`${PREFIX}` + '**stop**', 'Zatrzymuje puszczanie piosenek')
          .setColor(0x9997fc)
          .setThumbnail(avatar)
          .setFooter('Mam nadzieję że miło spędzisz tu czas!')
          .setTimestamp()
          message.channel.send(embed3)
          console.log(`WIADOMOŚĆ Z KOMENDY || ${message.author.username} || TREŚĆ: ${message.content} || ID: ${message.author} || Kanał ${message.channel.name}`) 
          break;
  }     
})

