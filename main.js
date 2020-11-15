const { ShardingManager } = require("discord.js")










const info = require('config.json').shards
const config = require('config.json').shards.config
const manager = new ShardingManager('./bot.js', {
totalShards: info.count,
shardList: info.list,
mode: config.mode,
respawn: config.respawn,
shardArgs: config.shardArgs,
execArgv: config.execArgv,
token: process.env.Discord_Bot_Token
})










manager.spawn(config.shards.count, 0, -1)
manager.on('shardCreate', shard => console.log(`Shard ${shard.id} launched.`))
