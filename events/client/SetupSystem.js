"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/events/client/SetupSystem.ts
var SetupSystem_exports = {};
__export(SetupSystem_exports, {
  default: () => SetupSystem
});
module.exports = __toCommonJS(SetupSystem_exports);
var import_discord8 = require("discord.js");

// src/structures/I18n.ts
var import_i18n = __toESM(require("i18n"));
var import_discord = require("discord.js");

// src/structures/Logger.ts
var import_signale = __toESM(require("signale"));
var { Signale } = import_signale.default;
var options = {
  disabled: false,
  interactive: false,
  logLevel: "info",
  scope: "Lavamusic",
  types: {
    info: {
      badge: "\u2139",
      color: "blue",
      label: "info"
    },
    warn: {
      badge: "\u26A0",
      color: "yellow",
      label: "warn"
    },
    error: {
      badge: "\u2716",
      color: "red",
      label: "error"
    },
    debug: {
      badge: "\u{1F41B}",
      color: "magenta",
      label: "debug"
    },
    success: {
      badge: "\u2714",
      color: "green",
      label: "success"
    },
    log: {
      badge: "\u{1F4DD}",
      color: "white",
      label: "log"
    },
    pause: {
      badge: "\u23F8",
      color: "yellow",
      label: "pause"
    },
    start: {
      badge: "\u25B6",
      color: "green",
      label: "start"
    }
  }
};
var Logger = class extends Signale {
  static {
    __name(this, "Logger");
  }
  constructor() {
    super(options);
  }
};

// src/structures/I18n.ts
var logger = new Logger();
function T(locale, text, ...params) {
  import_i18n.default.setLocale(locale);
  return import_i18n.default.__mf(text, ...params);
}
__name(T, "T");

// src/structures/Context.ts
var import_discord2 = require("discord.js");

// src/env.ts
var import_node_path = __toESM(require("path"));
var import_dotenv = require("dotenv");
var import_zod = require("zod");
(0, import_dotenv.config)({
  path: import_node_path.default.join(__dirname, ".env")
});
var LavalinkNodeSchema = import_zod.z.object({
  id: import_zod.z.string(),
  host: import_zod.z.string(),
  port: import_zod.z.number(),
  authorization: import_zod.z.string(),
  secure: import_zod.z.preprocess((val) => val === "true" || val === "false" ? val === "true" : val, import_zod.z.boolean().optional()),
  sessionId: import_zod.z.string().optional(),
  regions: import_zod.z.string().array().optional(),
  retryAmount: import_zod.z.number().optional(),
  retryDelay: import_zod.z.number().optional(),
  requestSignalTimeoutMS: import_zod.z.number().optional(),
  closeOnError: import_zod.z.boolean().optional(),
  heartBeatInterval: import_zod.z.number().optional(),
  enablePingOnStatsCheck: import_zod.z.boolean().optional()
});
var envSchema = import_zod.z.object({
  TOKEN: import_zod.z.string(),
  CLIENT_ID: import_zod.z.string(),
  DEFAULT_LANGUAGE: import_zod.z.string().default("EnglishUS"),
  PREFIX: import_zod.z.string().default("!"),
  OWNER_IDS: import_zod.z.preprocess((val) => typeof val === "string" ? JSON.parse(val) : val, import_zod.z.string().array().optional()),
  GUILD_ID: import_zod.z.string().optional(),
  TOPGG: import_zod.z.string().optional(),
  KEEP_ALIVE: import_zod.z.preprocess((val) => val === "true", import_zod.z.boolean().default(false)),
  LOG_CHANNEL_ID: import_zod.z.string().optional(),
  LOG_COMMANDS_ID: import_zod.z.string().optional(),
  BOT_STATUS: import_zod.z.preprocess((val) => {
    if (typeof val === "string") {
      return val.toLowerCase();
    }
    return val;
  }, import_zod.z.enum([
    "online",
    "idle",
    "dnd",
    "invisible"
  ]).default("online")),
  BOT_ACTIVITY: import_zod.z.string().default("Lavamusic"),
  BOT_ACTIVITY_TYPE: import_zod.z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val, 10);
    }
    return val;
  }, import_zod.z.number().default(0)),
  DATABASE_URL: import_zod.z.string().optional(),
  SEARCH_ENGINE: import_zod.z.preprocess((val) => {
    if (typeof val === "string") {
      return val.toLowerCase();
    }
    return val;
  }, import_zod.z.enum([
    "youtube",
    "youtubemusic",
    "soundcloud",
    "spotify",
    "apple",
    "deezer",
    "yandex",
    "jiosaavn"
  ]).default("youtube")),
  NODES: import_zod.z.preprocess((val) => typeof val === "string" ? JSON.parse(val) : val, import_zod.z.array(LavalinkNodeSchema)),
  GENIUS_API: import_zod.z.string().optional()
});
var env = envSchema.parse(process.env);
for (const key in env) {
  if (!(key in env)) {
    throw new Error(`Missing env variable: ${key}. Please check the .env file and try again.`);
  }
}

// src/structures/Event.ts
var Event = class {
  static {
    __name(this, "Event");
  }
  client;
  one;
  file;
  name;
  fileName;
  constructor(client, file, options2) {
    this.client = client;
    this.file = file;
    this.name = options2.name;
    this.one = options2.one ?? false;
    this.fileName = file.split(".")[0];
  }
  async run(..._args) {
    return await Promise.resolve();
  }
};

// src/structures/Lavamusic.ts
var import_node_fs2 = __toESM(require("fs"));
var import_node_path3 = __toESM(require("path"));
var import_sdk = require("@top-gg/sdk");
var import_discord4 = require("discord.js");
var import_discord5 = require("discord.js");

// src/database/server.ts
var import_client = require("@prisma/client");

// src/plugin/index.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));
var pluginsFolder = import_node_path2.default.join(process.cwd(), "plugin", "plugins");

// src/utils/Utils.ts
var import_discord3 = require("discord.js");

// src/structures/LavalinkClient.ts
var import_lavalink_client = require("lavalink-client");

// src/utils/SetupSystem.ts
var import_discord7 = require("discord.js");

// src/utils/Buttons.ts
var import_discord6 = require("discord.js");

// src/utils/SetupSystem.ts
function neb(embed, player, client, locale) {
  if (!player?.queue.current?.info) return embed;
  const iconUrl = client.config.icons[player.queue.current.info.sourceName] || client.user.displayAvatarURL({
    extension: "png"
  });
  const icon = player.queue.current.info.artworkUrl || client.config.links.img;
  const description = T(locale, "player.setupStart.description", {
    title: player.queue.current.info.title,
    uri: player.queue.current.info.uri,
    author: player.queue.current.info.author,
    length: client.utils.formatTime(player.queue.current.info.duration),
    requester: player.queue.current.requester.id
  });
  return embed.setAuthor({
    name: T(locale, "player.setupStart.now_playing"),
    iconURL: iconUrl
  }).setDescription(description).setImage(icon).setColor(client.color.main);
}
__name(neb, "neb");
async function setupStart(client, query, player, message) {
  let m;
  const embed = client.embed();
  const n = client.embed().setColor(client.color.main);
  const data = await client.db.getSetup(message.guild.id);
  const locale = await client.db.getLanguage(message.guildId);
  try {
    if (data) m = await message.channel.messages.fetch({
      message: data.messageId,
      cache: true
    });
  } catch (error) {
    client.logger.error(error);
  }
  if (m) {
    try {
      if (message.inGuild()) {
        const res = await player.search(query, message.author);
        switch (res.loadType) {
          case "empty":
          case "error":
            await message.channel.send({
              embeds: [
                embed.setColor(client.color.red).setDescription(T(locale, "player.setupStart.error_searching"))
              ]
            }).then((msg) => setTimeout(() => msg.delete(), 5e3));
            break;
          case "search":
          case "track": {
            player.queue.add(res.tracks[0]);
            await message.channel.send({
              embeds: [
                embed.setColor(client.color.main).setDescription(T(locale, "player.setupStart.added_to_queue", {
                  title: res.tracks[0].info.title,
                  uri: res.tracks[0].info.uri
                }))
              ]
            }).then((msg) => setTimeout(() => msg.delete(), 5e3));
            neb(n, player, client, locale);
            await m.edit({
              embeds: [
                n
              ]
            }).catch(() => {
              null;
            });
            break;
          }
          case "playlist": {
            player.queue.add(res.tracks);
            await message.channel.send({
              embeds: [
                embed.setColor(client.color.main).setDescription(T(locale, "player.setupStart.added_playlist_to_queue", {
                  length: res.tracks.length
                }))
              ]
            }).then((msg) => setTimeout(() => msg.delete(), 5e3));
            neb(n, player, client, locale);
            await m.edit({
              embeds: [
                n
              ]
            }).catch(() => {
              null;
            });
            break;
          }
        }
        if (!player.playing && player.queue.tracks.length > 0) await player.play();
      }
    } catch (error) {
      client.logger.error(error);
    }
  }
}
__name(setupStart, "setupStart");
async function oops(channel, args) {
  try {
    const embed1 = new import_discord7.EmbedBuilder().setColor("Red").setDescription(`${args}`);
    const m = await channel.send({
      embeds: [
        embed1
      ]
    });
    setTimeout(async () => await m.delete().catch(() => {
      null;
    }), 12e3);
  } catch (e) {
    return console.error(e);
  }
}
__name(oops, "oops");

// src/events/client/SetupSystem.ts
var SetupSystem = class extends Event {
  static {
    __name(this, "SetupSystem");
  }
  constructor(client, file) {
    super(client, file, {
      name: "setupSystem"
    });
  }
  async run(message) {
    const locale = await this.client.db.getLanguage(message.guildId);
    const channel = message.channel;
    if (!(channel instanceof import_discord8.TextChannel)) return;
    if (!message.member?.voice.channel) {
      await oops(channel, T(locale, "event.message.no_voice_channel_queue"));
      await message.delete().catch(() => {
        null;
      });
      return;
    }
    const voiceChannel = message.member.voice.channel;
    const clientUser = this.client.user;
    const clientMember = message.guild?.members.cache.get(clientUser.id);
    if (clientMember?.voice.channel && clientMember.voice.channelId !== voiceChannel.id) {
      await oops(channel, T(locale, "event.message.different_voice_channel_queue", {
        channel: clientMember.voice.channelId
      }));
      await message.delete().catch(() => {
        null;
      });
      return;
    }
    let player = this.client.manager.getPlayer(message.guildId);
    if (!player) {
      player = this.client.manager.createPlayer({
        guildId: message.guildId,
        voiceChannelId: voiceChannel.id,
        textChannelId: message.channelId,
        selfMute: false,
        selfDeaf: true,
        vcRegion: voiceChannel.rtcRegion
      });
      if (!player.connected) await player.connect();
    }
    await setupStart(this.client, message.content, player, message);
    await message.delete().catch(() => {
      null;
    });
  }
};
