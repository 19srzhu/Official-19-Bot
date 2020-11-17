const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(8080);









const config = require('./config.json')
const prefix = config.bot.prefix
const package = require("./package.json")
const { Client, MessageEmbed, WebhookClient } = require("discord.js")










const client = new Client({
  shards: config.shards.list,
  shardCount: config.shards.count,
  messageCacheMaxSize: -1,
  messageCacheLifetime: 14400,
  messageSweepInterval: 10,
  messageEditHistoryMaxSize: -1,
  fetchAllMembers: true,
  disableMentions: "everyone",
  allowedMentions: {},
  partials: [
    "USER",
    "CHANNEL",
    "GUILD_MEMBER",
    "MESSAGE",
    "REACTION"
  ],
  restWsBridgeTimeout: 5000,
  restTimeOffset: 500,
  restRequestTimeout: 15000,
  restSweepInterval: 60,
  retryLimit: 1,
  presence: {
    "status": "Hi! I am " + config.bot.name + "!",
    "afk": false,
    "activity": {
      "name": "",
      "type": "LISTENING",
      "shardID": config.shards.list
    }
  },
  ws: {
    large_threshold: 250
  },
  http: {
    version: 7,
    api: "https://discord.com/api",
    cdn: "https://cdn.discordapp.com",
    invite: "https://discord.gg"
  }
})










if (package.main = "bot.js"
&& process.env.Discord_Bot_Token) {
  client.login(process.env.Discord_Bot_Token)
}










client.on('ready', async () => {
  client.user.setActivity(`${prefix}help | over ${client.guilds.cache.size} servers with total` +
    `${client.users.cache.size} members.`, {
      type: "LISTENING",
      shardID: config.shards.list
    })
})










client.on('ready', async () => {
  if (package.main = "bot.js"
  && process.env.Discord_Restart_Webhook_Token
  && process.env.Discord_Restart_Webhook_Token2) {
    new WebhookClient(config.webhooks.restart.a, process.env.Discord_Restart_Webhook_Token).send('Bot online')
    new WebhookClient(config.webhooks.restart.b, process.env.Discord_Restart_Webhook_Token2).send('Bot online')
  }
})










client.on('message', async message => {
  if (!message.content.startsWith(prefix)) return










  if (message.content.toLowerCase().includes(prefix + `help`)) {
    message.channel.send(new MessageEmbed()
      .setTitle(config.bot.name + ' Commands')
      .setColor(0x000000)
      .setDescription(
        `\`help\` - Shows this menu.\n` +
        `\`ping\` - Get my latency.\n` +
        `\`join\` - Join a voice channel. Make sure you're in voice channel!\n` +
        `\`shutdown\` - Shut down the bot. **⚠ This is owner-only command! ⚠**\n` +
        `\`info\` - Get info about bot\n` +
        `\`invite\` - Get invite to join ${config.mainServer.name}.\n` +
        `\`eval\` - Execute JavaScript code. **⚠ This is owner-only command! ⚠**\n` +
        `\`uptime\` - View how long bot is running.\n` +
        `\`version\` - View bot version\n` +
        `\`pancake\` - Shows a pancake gif. **This command is under development!**`))
  }










  if (message.content.toLowerCase().includes(prefix + `ping`)) {
    message.channel.send("🏓 Pong! Ping is: " + new Date().getTime() - message.createdTimestamp + " ms")
  }










  if (message.channel.id === '735453230137606175'
  && !message.author.bot
  && config.bot.ID === "774591139093151774") {
    if (!message.content.startsWith('https://bonk.io/?r=')
    || !message.content.startsWith('http://bonk.io/?r=')
    || !message.content.startsWith('https://bonk2.io/beta/')
    || !message.content.startsWith('http://bonk2.io/beta/')) {
      message.delete()
      message.channel.send(`<@${message.author.id}> Do not send non-invites here!`).then(
        message => message.delete({ timeout: 10000 }))
    }
  }










  if (message.content.toLowerCase().includes(prefix + 'info')) {
    message.channel.send(`Made by ${config.owners.a.Discord.username} and ${config.owners.b.Discord.username}` + 
    `.\n\nServer count: ${client.guilds.cache.size}`)
  }










  if (message.content.toLowerCase().includes(prefix + 'join')) {
    if (message.member.voice.channel) {
      message.channel.send(`I've joined voice channel, but there's no play command!`)
      /* eslint-disable-next-line no-unused-vars*/
      const connection = await message.member.voice.channel.join()
    } else {
      message.channel.send(`You need to join a voice channel first!`)
    }
  }










  if (message.content.toLowerCase().includes(prefix + 'shutdown')
  && process.env.Discord_Restart_Webhook_Token
  && process.env.Discord_Restart_Webhook_Token2) {
    if (message.author.id === config.owners.a.Discord.ID
    || message.author.id === config.owners.b.Discord.ID) {
      message.channel.send('Shutting down...')
      new WebhookClient(config.webhooks.restart.a, process.env.Discord_Restart_Webhook_Token).send(
        `Bot shutting down. Command run by <@${message.author.id}>`)
      new WebhookClient(config.webhooks.restart.b, process.env.Discord_Restart_Webhook_Token2).send(
        `Bot shutting down. Command run by <@${message.author.id}>`)
      setTimeout(function() {
        process.exit()
      }, 2000)
    }
    if (message.author.id !== config.owners.a.Discord.ID
    && message.author.id !== config.owners.b.Discord.ID) {
      message.channel.send(`You're not bot owner!!`)
    }
  }










  if (message.content.toLowerCase().includes(prefix + 'stats')) {
    message.channel.send(`Server count: ${client.guilds.cache.size}`)
  }










  if (message.content.toLowerCase().includes(prefix + `invite`)) {
    message.channel.send(new MessageEmbed()
      .setTitle(`${config.mainServer.name} invite`)
      .setColor(0x000000)
      .setDescription(`[Join **NOW**](${config.mainServer.invite})!`))
  }










  const args = message.content.split(" ").slice(1)

  if (message.content.startsWith(prefix + "eval")) {
    /* eslint-disable no-unused-vars */
    function executeShellCommand(command) {
      require('child_process').exec(command, (error, stdout, stderr) => {
        if (error) {
          message.channel.send('ERROR:\n\n\n\n' + error, { split: true })
        }
        if (stdout) {
          message.channel.send('STDOUT:\n\n\n\n' + stdout, { split: true })
        }
        if (stderr) {
          message.channel.send('STDERR:\n\n\n\n' + stderr, { split: true })
        }
      })
    }
    /* eslint-enable no-unused-vars */
    if (message.author.id !== config.owners.a.Discord.ID
    && message.author.id !== config.owners.b.Discord.ID) return
    try {
      const code = args.join(" ")
      let evaled = eval(code)

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled)

      message.channel.send(evaled, { split: true })
    } catch (err) {
      message.channel.send(`Looks like there's an error!\n\n\`\`\`${err}\n\`\`\``, { split: true })
    }
  }










  if (message.content.toLowerCase().includes(prefix + "uptime")) {
    message.channel.send(`Bot is running for ${Math.floor(process.uptime())} seconds.`)
      .then(message => {
        var editBotUptimeMessage = setInterval(function() {
          message.edit(`Bot is running for ${Math.floor(process.uptime())} seconds.`)
        }, 1000)
        setTimeout(function() {
          clearInterval(editBotUptimeMessage)
        }, Math.floor(Math.random() * 10000))
      })
  }









  if (message.content.toLowerCase().includes(prefix + "version")) {
    message.channel.send("Version: " + package.version)
  }










  if (message.content.toLowerCase().includes(prefix + "pancake")) {
    // Command code will go here!
    message.channel.send("Command under development! Wait some time before we make it.")
  }
})