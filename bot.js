/*eslint-disable no-delete-var, no-redeclare, no-unused-vars*/
var express = require("express")
var app = express()
app.get("/", (req, res) => res.send("Hello World!"))

app.listen(8080)


var path = require("path")
var { Octokit } = require("@octokit/rest")
var fs = require("fs")
var Discord = require("discord.js")
var config = require("./config.json")
var prefix = config.bot.prefix
var ms = require("ms")


var octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
})

var client = new Discord.Client({
	shards: config.shards.list,
	shardCount: config.shards.count,
	messageCacheMaxSize: -1,
	messageCacheLifetime: 14400,
	messageSweepInterval: 3600,
	messageEditHistoryMaxSize: -1,
	fetchAllMembers: true,
	disableMentions: "everyone",
	allowedMentions: {
		parse: [],
		users: [],
		roles: []
	},
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
		status: "Hi! I am Official 19 Bot!",
		afk: false,
		activity: {
			name: "",
			type: "PLAYING",
			shardID: config.shards.list
		}
	},
	ws: {
		large_threshold: 250,
		intents: [
			"GUILDS",
			"GUILD_MEMBERS",
			"GUILD_BANS",
			"GUILD_EMOJIS",
			"GUILD_INTEGRATIONS",
			"GUILD_WEBHOOKS",
			"GUILD_INVITES",
			"GUILD_VOICE_STATES",
			"GUILD_PRESENCES",
			"GUILD_MESSAGES",
			"GUILD_MESSAGE_REACTIONS",
			"GUILD_MESSAGE_TYPING",
			"DIRECT_MESSAGES",
			"DIRECT_MESSAGE_REACTIONS",
			"DIRECT_MESSAGE_TYPING"
		]
	},
	http: {
		version: 8,
		api: "https://discord.com/api",
		cdn: "https://cdn.discordapp.com",
		invite: "https://discord.gg",
		template: "https://discord.new"
	}
})


client.login(process.env.Discord_Bot_Token)


client.on("ready", async () => {
    client.user.setPresence({
        status: "online",
        afk: false,
        activity: {
            /* eslint-disable-next-line quotes */
            name: `unknown`,
            type: "PLAYING"
        },
        shardID: config.shards.list
    })
})


client.on("message", async message => {
    //Commands code will go here!
})