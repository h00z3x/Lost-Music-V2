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

// src/events/player/QueueEnd.ts
var QueueEnd_exports = {};
__export(QueueEnd_exports, {
  default: () => QueueEnd
});
module.exports = __toCommonJS(QueueEnd_exports);

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
function T(locale, text, ...params) {
  import_i18n.default.setLocale(locale);
  return import_i18n.default.__mf(text, ...params);
}
__name(T, "T");

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
function getButtons(player, client) {
  const buttonData = [
    {
      customId: "PREV_BUT",
      emoji: client.emoji.previous,
      style: import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "REWIND_BUT",
      emoji: client.emoji.rewind,
      style: import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "PAUSE_BUT",
      emoji: player?.paused ? client.emoji.resume : client.emoji.pause,
      style: player?.paused ? import_discord6.ButtonStyle.Success : import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "FORWARD_BUT",
      emoji: client.emoji.forward,
      style: import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "SKIP_BUT",
      emoji: client.emoji.skip,
      style: import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "LOW_VOL_BUT",
      emoji: client.emoji.voldown,
      style: import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "LOOP_BUT",
      emoji: client.emoji.loop.none,
      style: import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "STOP_BUT",
      emoji: client.emoji.stop,
      style: import_discord6.ButtonStyle.Danger
    },
    {
      customId: "SHUFFLE_BUT",
      emoji: client.emoji.shuffle,
      style: import_discord6.ButtonStyle.Secondary
    },
    {
      customId: "HIGH_VOL_BUT",
      emoji: client.emoji.volup,
      style: import_discord6.ButtonStyle.Secondary
    }
  ];
  return buttonData.reduce((rows, { customId, emoji, style }, index) => {
    if (index % 5 === 0) rows.push(new import_discord6.ActionRowBuilder());
    let emojiFormat;
    if (typeof emoji === "string" && emoji.startsWith("<:")) {
      const match = emoji.match(/^<:\w+:(\d+)>$/);
      emojiFormat = match ? match[1] : emoji;
    } else {
      emojiFormat = emoji;
    }
    const button = new import_discord6.ButtonBuilder().setCustomId(customId).setEmoji(emojiFormat).setStyle(style);
    rows[rows.length - 1].addComponents(button);
    return rows;
  }, []);
}
__name(getButtons, "getButtons");

// src/utils/SetupSystem.ts
async function updateSetup(client, guild, locale) {
  const setup = await client.db.getSetup(guild.id);
  let m;
  if (setup?.textId) {
    const textChannel = guild.channels.cache.get(setup.textId);
    if (!textChannel) return;
    try {
      m = await textChannel.messages.fetch({
        message: setup.messageId,
        cache: true
      });
    } catch (error) {
      client.logger.error(error);
    }
  }
  if (m) {
    const player = client.manager.getPlayer(guild.id);
    if (player?.queue.current) {
      const iconUrl = client.config.icons[player.queue.current.info.sourceName] || client.user.displayAvatarURL({
        extension: "png"
      });
      const description = T(locale, "player.setupStart.description", {
        title: player.queue.current.info.title,
        uri: player.queue.current.info.uri,
        author: player.queue.current.info.author,
        length: client.utils.formatTime(player.queue.current.info.duration),
        requester: player.queue.current.requester.id
      });
      const embed = client.embed().setAuthor({
        name: T(locale, "player.setupStart.now_playing"),
        iconURL: iconUrl
      }).setColor(client.color.main).setDescription(description).setImage(player.queue.current.info.artworkUrl);
      await m.edit({
        embeds: [
          embed
        ],
        components: getButtons(player, client).map((b) => {
          b.components.forEach((c) => c.setDisabled(!player?.queue.current));
          return b;
        })
      }).catch(() => {
        null;
      });
    } else {
      const embed = client.embed().setColor(client.color.main).setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({
          extension: "png"
        })
      }).setDescription(T(locale, "player.setupStart.nothing_playing")).setImage(client.config.links.img);
      await m.edit({
        embeds: [
          embed
        ],
        components: getButtons(player, client).map((b) => {
          b.components.forEach((c) => c.setDisabled(true));
          return b;
        })
      }).catch(() => {
        null;
      });
    }
  }
}
__name(updateSetup, "updateSetup");

// src/events/player/QueueEnd.ts
var QueueEnd = class extends Event {
  static {
    __name(this, "QueueEnd");
  }
  constructor(client, file) {
    super(client, file, {
      name: "queueEnd"
    });
  }
  async run(player, _track, _payload) {
    const guild = this.client.guilds.cache.get(player.guildId);
    if (!guild) return;
    const locale = await this.client.db.getLanguage(player.guildId);
    await updateSetup(this.client, guild, locale);
    const messageId = player.get("messageId");
    if (!messageId) return;
    const channel = guild.channels.cache.get(player.textChannelId);
    if (!channel) return;
    const message = await channel.messages.fetch(messageId).catch(() => {
      null;
    });
    if (!message) return;
    if (message.editable) {
      await message.edit({
        components: []
      }).catch(() => {
        null;
      });
    }
  }
};
