const { Client, MessageEmbed, WebhookClient } = require("discord.js");
const client = new Client();
const prefix = "$";
const package = require("./package.json")
const ownerID = { "Filip": "666734196689076285", "19": "746766077123624990" }

if (package.main = "bot.js") {
	client.login(process.env.Discord_Bot_Token)
}

client.on('ready', async () => {
  client.user.setActivity(prefix + 'help', { type: 'LISTENING' })
});

client.on('ready', async () => {
	if (package.main = "bot.js") {
		new WebhookClient('775006585894207488', process.env.Discord_Restart_Webhook_Token).send('Bot online')
	}
})
		

client.on('message', async message => {

  if (message.content.startsWith(prefix + `help`)) {
    message.channel.send(new MessageEmbed()
      .setTitle('Official Filip Bot Commands')
      .setColor(0x000000)
      .setDescription(
      '`help` - Shows this menu.\n' +
      '`ping` - Get my latency.\n' +
      "`join` - Join a voice channel. Make sure you're in voice channel!\n" +
      '`shutdown` - Shut down the bot. **⚠ This is owner-only command! ⚠**\n' +
      '`info` - Get info about bot\n' +
      '`invite` - Get invite to join Official Filip Server.\n' +
      '`eval` - Execute JavaScript code. **⚠ This is owner-only command! ⚠**'))
  };

  if (message.content.startsWith(prefix + `ping`)) {
    message.channel.send("🏓 Pong! Ping is: " + new Date().getTime() - message.createdTimestamp + " ms")
  }

  if (message.channel.id === '735453230137606175' && !message.author.bot) {
	  if (!message.content.startsWith('https://bonk.io/?r=') || !message.content.startsWith('http://bonk.io/?r=')
	      || !message.content.startsWith('https://bonk2.io/beta/') || !message.content.startsWith('http://bonk2.io/beta/')) {
		  message.delete()
		  message.channel.send(`<@` + message.author.id + `> Do not send non-invites here!`).then(
			  message => message.delete({ timeout: 10000 }))
	  }
  };
	
  if (message.content.startsWith(prefix + 'info')) {
      message.channel.send('Made by Filip.\n\n' +
                           'Server count: ' + client.guilds.cache.size)
  }

  if (message.content.startsWith(prefix + 'join')) {
    if (message.member.voice.channel) {
      message.channel.send(`I've joined voice channel, but there's no play command!`)
      const connection = await message.member.voice.channel.join();
    } else {
      message.channel.send('You need to join a voice channel first!')
    };
  };

  if (message.content.startsWith(prefix + 'shutdown')) {
      if (message.author.id === ownerID.Filip || message.author.id === ownerID.19) {
	  message.channel.send('Shutting down...')
	  process.exit()
      }
      if (message.author.id !== ownerID.Filip || message.author.id !== ownerID.19) {
	      message.channel.send(`You're not bot owner!!`)
      }
  };

  if (message.content.startsWith(prefix + 'stats')) {
      message.channel.send(`Server count: ${client.guilds.cache.size}`)
  };

  if (message.content.startsWith(prefix + `invite`)) {
    message.channel.send(new MessageEmbed()
      .setTitle('Official Filip Server invite')
      .setColor(0x000000)
      .setDescription('[Join **NOW**](https://discord.gg/bhdgvJt)!'))
  };

  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "eval")) {
    if (message.author.id !== ownerID.Filip || message.author.id !== ownerID.19) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(evaled, { split: true });
    } catch (err) {
      message.channel.send(`Looks like there's an error!\n\n\`\`\`${err}\n\`\`\``, { split: true });
    }
  }
});
