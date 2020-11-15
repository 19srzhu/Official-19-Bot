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










if (package.main = "bot.js" && process.env.Discord_Bot_Token) {
    client.login(process.env.Discord_Bot_Token)
}










var shutdownAfterFourHours = setInterval(function() {
if (Math.floor(process.uptime) === 14400) {
new WebhookClient(config.webhooks.restart.a, process.env.Discord_Restart_Webhook_Token).send(
    `Shutting down because process reached 4 hours (14400 seconds) of working. Process will be running soon and then bot will be` +
    `online. If you just run a command, then you can expect bot won't respond until process is back running. \n\n\n\n** ` +
    `Why did you set that limit?**\n\n\n\nGitHub auto shutdown the bot after process is running for about 6 hours. Owners can still` +
    `run command \`disableAutoShutdown\` to disable this shutdown at next running process.`)
new WebhookClient(config.webhooks.restart.b, process.env.Discord_Restart_Webhook_Token2).send(
    `Shutting down because process reached 4 hours (14400 seconds) of working. Process will be running soon and then bot will be` +
    `online. If you just run a command, then you can expect bot won't respond until process is back running. \n\n\n\n** ` +
    `Why did you set that limit?**\n\n\n\nGitHub auto shutdown the bot after process is running for about 6 hours. Owners can still` +
    `run command \`disableAutoShutdown\` to disable this shutdown at next running process.`)
process.exit()
}
}, 1000)











client.on('ready', async () => {
    client.user.setActivity(prefix + 'help | over ' + client.guilds.cache.size + ' servers with total ' +
                client.users.cache.size + ' members', {
        type: "LISTENING",
        shardID: config.shards.list
    })
})










client.on('ready', async () => {
    if (package.main = "bot.js" && process.env.Discord_Restart_Webhook_Token && process.env.Discord_Restart_Webhook_Token2) {
        new WebhookClient(config.webhooks.restart.a, process.env.Discord_Restart_Webhook_Token).send('Bot online')
        new WebhookClient(config.webhooks.restart.b, process.env.Discord_Restart_Webhook_Token2).send('Bot online')
    }
})










client.on('message', async message => {
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
      `\`eval\` - Execute JavaScript code. **⚠ This is owner-only command! ⚠**` +
      `\`disableAutoShutdown\` - Disable auto shutdown after 4 hours of running process (process is running for` +
      ` ${Math.floor(process.uptime())} seconds`))
  }










  if (message.content.toLowerCase().includes(prefix + `ping`)) {
    message.channel.send("🏓 Pong! Ping is: " + new Date().getTime() - message.createdTimestamp + " ms")
  }










  if (message.channel.id === '735453230137606175' && !message.author.bot && config.bot.ID === "774591139093151774") {
      if (!message.content.startsWith('https://bonk.io/?r=') || !message.content.startsWith('http://bonk.io/?r=')
          || !message.content.startsWith('https://bonk2.io/beta/') || !message.content.startsWith('http://bonk2.io/beta/')) {
          message.delete()
          message.channel.send(`<@${message.author.id}> Do not send non-invites here!`).then(
              message => message.delete({ timeout: 10000 }))
      }
  }
  









  if (message.content.toLowerCase().includes(prefix + 'info')) {
      message.channel.send(`Made by ${config.owners.a.Discord.username} and ${config.owners.b.Discord.username}.\n\n` +
                           `Server count: ${client.guilds.cache.size}`)
  }










  if (message.content.toLowerCase().includes(prefix + 'join')) {
    if (message.member.voice.channel) {
      message.channel.send(`I've joined voice channel, but there's no play command!`)
      const connection = await message.member.voice.channel.join()
    } else {
      message.channel.send(`You need to join a voice channel first!`)
    }
  }










  if (message.content.toLowerCase().includes(prefix + 'shutdown')) {
      if (message.author.id === config.owners.a.Discord.ID || message.author.id === config.owners.b.Discord.ID) {
      message.channel.send('Shutting down...')
      new WebhookClient(config.webhooks.restart.a, process.env.Discord_Restart_Webhook_Token).send(
          `Bot shutting down. Command run by <@${message.author.id}>`)
      new WebhookClient(config.webhooks.restart.b, process.env.Discord_Restart_Webhook_Token2).send(
          `Bot shutting down. Command run by <@${message.author.id}>`)
      setTimeout(function() {
          process.exit()
      }, 2000)
      }
      if (message.author.id !== config.owners.a.Discord.ID && message.author.id !== config.owners.b.Discord.ID) {
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
    if (message.author.id !== config.owners.a.Discord.ID && message.author.id !== config.owners.b.Discord.ID) return
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
    
    
    
    
    
    
    
    
    
    
  if (message.content.toLowerCase().includes(prefix + "disableAutoShutdown")) {
      clearInterval(shutdownAfterFourHours)
      message.channel.send("Success!")
  }
})
