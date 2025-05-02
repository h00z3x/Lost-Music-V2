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

// src/events/client/VoiceStateUpdate.ts
var VoiceStateUpdate_exports = {};
__export(VoiceStateUpdate_exports, {
  default: () => VoiceStateUpdate
});
module.exports = __toCommonJS(VoiceStateUpdate_exports);
var import_discord6 = require("discord.js");

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

// src/events/client/VoiceStateUpdate.ts
var VoiceStateUpdate = class extends Event {
  static {
    __name(this, "VoiceStateUpdate");
  }
  constructor(client, file) {
    super(client, file, {
      name: "voiceStateUpdate"
    });
  }
  async run(oldState, newState) {
    const guildId = newState.guild.id;
    if (!guildId) return;
    const player = this.client.manager.getPlayer(guildId);
    if (!player) return;
    if (!player?.voiceChannelId) return;
    const vc = newState.guild.channels.cache.get(player.voiceChannelId);
    if (!(vc && vc.members instanceof Map)) return;
    const is247 = await this.client.db.get_247(guildId);
    if (!(newState.guild.members.cache.get(this.client.user.id)?.voice.channelId || !is247) && player) {
      return player.destroy();
    }
    let type = null;
    if (!oldState.channelId && newState.channelId) {
      type = "join";
    } else if (oldState.channelId && !newState.channelId) {
      type = "leave";
    } else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
      type = "move";
    }
    if (type === "join") {
      this.handale.join(newState, this.client);
    } else if (type === "leave") {
      this.handale.leave(newState, this.client);
    } else if (type === "move") {
      this.handale.move(newState, this.client);
    }
  }
  handale = {
    async join(newState, client) {
      await new Promise((resolve) => setTimeout(resolve, 3e3));
      const bot = newState.guild.voiceStates.cache.get(client.user.id);
      if (!bot) return;
      if (bot.id === client.user?.id && bot.channelId && bot.channel?.type === import_discord6.ChannelType.GuildStageVoice && bot.suppress) {
        if (bot.channel && bot.member && bot.channel.permissionsFor(bot.member).has("MuteMembers")) {
          await bot.setSuppressed(false);
        }
      }
      const player = client.manager.getPlayer(newState.guild.id);
      if (!player) return;
      if (!player?.voiceChannelId) return;
      const vc = newState.guild.channels.cache.get(player.voiceChannelId);
      if (!(vc && vc.members instanceof Map)) return;
      if (newState.id === client.user?.id && !newState.serverDeaf) {
        const permissions = vc.permissionsFor(newState.guild.members.me);
        if (permissions?.has("DeafenMembers")) {
          await newState.setDeaf(true);
        }
      }
      if (newState.id === client.user?.id) {
        if (newState.serverMute && !player.paused) {
          player.pause();
        } else if (!newState.serverMute && player.paused) {
          player.resume();
        }
      }
    },
    async leave(newState, client) {
      const player = client.manager.getPlayer(newState.guild.id);
      if (!player) return;
      if (!player?.voiceChannelId) return;
      const is247 = await client.db.get_247(newState.guild.id);
      const vc = newState.guild.channels.cache.get(player.voiceChannelId);
      if (!(vc && vc.members instanceof Map)) return;
      if (vc.members instanceof Map && [
        ...vc.members.values()
      ].filter((x) => !x.user.bot).length <= 0) {
        setTimeout(async () => {
          if (!player?.voiceChannelId) return;
          const playerVoiceChannel = newState.guild.channels.cache.get(player?.voiceChannelId);
          if (player && playerVoiceChannel && playerVoiceChannel.members instanceof Map && [
            ...playerVoiceChannel.members.values()
          ].filter((x) => !x.user.bot).length <= 0) {
            if (!is247) {
              player.destroy();
            }
          }
        }, 5e3);
      }
    },
    async move(newState, client) {
      await new Promise((resolve) => setTimeout(resolve, 3e3));
      const bot = newState.guild.voiceStates.cache.get(client.user.id);
      if (!bot) return;
      if (bot.id === client.user?.id && bot.channelId && bot.channel?.type === import_discord6.ChannelType.GuildStageVoice && bot.suppress) {
        if (bot.channel && bot.member && bot.channel.permissionsFor(bot.member).has("MuteMembers")) {
          await bot.setSuppressed(false);
        }
      }
    }
  };
};
