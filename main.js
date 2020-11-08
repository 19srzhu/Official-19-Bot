const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', {
totalShards: 2,
shardList: [ 0, 1 ],
token: process.env.Discord_Bot_Token });

manager.spawn(manager.totalShards, 0, -1);
manager.on('shardCreate', shard => console.log(`Shard ${shard.id} launched.`));
