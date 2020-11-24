/* eslint-disable-next-line no-unused-vars */
const { Activity, ActivityFlags, APIMessage, Application, Base, BaseClient, BaseGuildEmoji, BaseManager, BitField, BroadcastDispatcher, CategoryChannel, Channel, ChannelManager, Client, ClientApplication, ClientPresence, ClientUser, ClientVoiceManager, Collector, DiscordAPIError, DMChannel, Emoji, Guild, GuildAuditLogs, GuildAuditLogsEntry, GuildChannel, GuildChannelManager, GuildEmoji, GuildEmojiManager, GuildEmojiRoleManager, GuildManager, GuildMember, GuildMemberManager, GuildMemberRoleManager, GuildPreview, GuildPreviewEmoji, HTTPError, Integration, IntegrationApplication, Intents, Invite, Message, MessageAttachment, MessageCollector, MessageEmbed, MessageFlags, MessageManager, MessageMentions, MessageReaction, NewsChannel, PartialGroupDMChannel, PermissionOverwrites, Permissions, PlayInterface, Presence, PresenceManager, ReactionCollector, ReactionEmoji, ReactionManager, ReactionUserManager, RichPresenceAssets, Role, RoleManager, Shard, ShardClientUtil, ShardingManager, SnowflakeUtil, Speaking, StoreChannel, StreamDispatcher, Structures, SystemChannelFlags, Team, TeamMember, TextBasedChannel, TextChannel, User, UserFlags, UserManager, Util, VoiceBroadcast, VoiceChannel, VoiceConnection, VoiceReceiver, VoiceRegion, VoiceState, VoiceStateManager, VolumeInterface, Webhook, WebhookClient, WebSocketManager, WebSocketShard } = require("discord.js")










const info = require("config.json").shards
const config = require("config.json").shards.config
const manager = new ShardingManager("./bot.js", {
    totalShards: info.count,
    shardList: info.list,
    mode: config.mode,
    respawn: config.respawn,
    shardArgs: config.shardArgs,
    execArgv: config.execArgv,
    token: process.env.Discord_Bot_Token
})










manager.spawn(config.shards.count, 0, -1)
manager.on("shardCreate", shard => console.log(`Shard ${shard.id} launched.`))
