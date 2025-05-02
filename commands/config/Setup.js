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

// src/commands/config/Setup.ts
var Setup_exports = {};
__export(Setup_exports, {
  default: () => Setup
});
module.exports = __toCommonJS(Setup_exports);
var import_discord7 = require("discord.js");

// src/structures/Command.ts
var Command = class {
  static {
    __name(this, "Command");
  }
  client;
  name;
  name_localizations;
  description;
  description_localizations;
  aliases;
  cooldown;
  args;
  vote;
  player;
  permissions;
  slashCommand;
  options;
  category;
  constructor(client, options2) {
    this.client = client;
    this.name = options2.name;
    this.name_localizations = options2.name_localizations ?? {};
    this.description = {
      content: options2.description?.content ?? "No description provided",
      usage: options2.description?.usage ?? "No usage provided",
      examples: options2.description?.examples ?? [
        "No examples provided"
      ]
    };
    this.description_localizations = options2.description_localizations ?? {};
    this.aliases = options2.aliases ?? [];
    this.cooldown = options2.cooldown ?? 3;
    this.args = options2.args ?? false;
    this.vote = options2.vote ?? false;
    this.player = {
      voice: options2.player?.voice ?? false,
      dj: options2.player?.dj ?? false,
      active: options2.player?.active ?? false,
      djPerm: options2.player?.djPerm ?? null
    };
    this.permissions = {
      dev: options2.permissions?.dev ?? false,
      client: options2.permissions?.client ?? [
        "SendMessages",
        "ViewChannel",
        "EmbedLinks"
      ],
      user: options2.permissions?.user ?? []
    };
    this.slashCommand = options2.slashCommand ?? false;
    this.options = options2.options ?? [];
    this.category = options2.category ?? "general";
  }
  async run(_client, _message, _args) {
    return await Promise.resolve();
  }
};

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

// src/commands/config/Setup.ts
var Setup = class extends Command {
  static {
    __name(this, "Setup");
  }
  constructor(client) {
    super(client, {
      name: "setup",
      description: {
        content: "cmd.setup.description",
        examples: [
          "setup create",
          "setup delete",
          "setup info"
        ],
        usage: "setup"
      },
      category: "config",
      aliases: [
        "set"
      ],
      cooldown: 3,
      args: true,
      vote: true,
      player: {
        voice: false,
        dj: false,
        active: false,
        djPerm: null
      },
      permissions: {
        dev: false,
        client: [
          "SendMessages",
          "ReadMessageHistory",
          "ViewChannel",
          "EmbedLinks",
          "ManageChannels"
        ],
        user: [
          "ManageGuild"
        ]
      },
      slashCommand: true,
      options: [
        {
          name: "create",
          description: "cmd.setup.options.create",
          type: 1
        },
        {
          name: "delete",
          description: "cmd.setup.options.delete",
          type: 1
        },
        {
          name: "info",
          description: "cmd.setup.options.info",
          type: 1
        }
      ]
    });
  }
  async run(client, ctx, args) {
    const subCommand = ctx.isInteraction ? ctx.options.getSubCommand() : args[0];
    const embed = client.embed().setColor(this.client.color.main);
    switch (subCommand) {
      case "create": {
        const data = await client.db.getSetup(ctx.guild.id);
        if (data?.textId && data.messageId) {
          return await ctx.sendMessage({
            embeds: [
              {
                description: ctx.locale("cmd.setup.errors.channel_exists"),
                color: client.color.red
              }
            ]
          });
        }
        const textChannel = await ctx.guild.channels.create({
          name: `${client.user?.username}-song-requests`,
          type: import_discord7.ChannelType.GuildText,
          topic: "Song requests for the music bot.",
          permissionOverwrites: [
            {
              type: import_discord7.OverwriteType.Member,
              id: client.user?.id,
              allow: [
                import_discord7.PermissionFlagsBits.ViewChannel,
                import_discord7.PermissionFlagsBits.SendMessages,
                import_discord7.PermissionFlagsBits.EmbedLinks,
                import_discord7.PermissionFlagsBits.ReadMessageHistory
              ]
            },
            {
              type: import_discord7.OverwriteType.Role,
              id: ctx.guild.roles.everyone.id,
              allow: [
                import_discord7.PermissionFlagsBits.ViewChannel,
                import_discord7.PermissionFlagsBits.SendMessages,
                import_discord7.PermissionFlagsBits.ReadMessageHistory
              ]
            }
          ]
        });
        const player = this.client.manager.getPlayer(ctx.guild.id);
        const image = this.client.config.links.img;
        const desc = player?.queue.current ? `[${player.queue.current.info.title}](${player.queue.current.info.uri})` : ctx.locale("player.setupStart.nothing_playing");
        embed.setDescription(desc).setImage(image);
        await textChannel.send({
          embeds: [
            embed
          ],
          components: getButtons(player, client)
        }).then((msg) => {
          client.db.setSetup(ctx.guild.id, textChannel.id, msg.id);
        });
        await ctx.sendMessage({
          embeds: [
            {
              description: ctx.locale("cmd.setup.messages.channel_created", {
                channelId: textChannel.id
              }),
              color: this.client.color.main
            }
          ]
        });
        break;
      }
      case "delete": {
        const data2 = await client.db.getSetup(ctx.guild.id);
        if (!data2) {
          return await ctx.sendMessage({
            embeds: [
              {
                description: ctx.locale("cmd.setup.errors.channel_not_exists"),
                color: client.color.red
              }
            ]
          });
        }
        client.db.deleteSetup(ctx.guild.id);
        const textChannel = ctx.guild.channels.cache.get(data2.textId);
        if (textChannel) await textChannel.delete().catch(() => {
          null;
        });
        await ctx.sendMessage({
          embeds: [
            {
              description: ctx.locale("cmd.setup.messages.channel_deleted"),
              color: this.client.color.main
            }
          ]
        });
        break;
      }
      case "info": {
        const data3 = await client.db.getSetup(ctx.guild.id);
        if (!data3) {
          return await ctx.sendMessage({
            embeds: [
              {
                description: ctx.locale("cmd.setup.errors.channel_not_exists"),
                color: client.color.red
              }
            ]
          });
        }
        const channel = ctx.guild.channels.cache.get(data3.textId);
        if (channel) {
          embed.setDescription(ctx.locale("cmd.setup.messages.channel_info", {
            channelId: channel.id
          }));
          await ctx.sendMessage({
            embeds: [
              embed
            ]
          });
        } else {
          await ctx.sendMessage({
            embeds: [
              {
                description: ctx.locale("cmd.setup.errors.channel_not_exists"),
                color: client.color.red
              }
            ]
          });
        }
        break;
      }
      default:
        break;
    }
  }
};
