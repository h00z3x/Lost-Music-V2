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

// src/commands/music/Lyrics.ts
var Lyrics_exports = {};
__export(Lyrics_exports, {
  default: () => Lyrics
});
module.exports = __toCommonJS(Lyrics_exports);
var import_discord6 = require("discord.js");
var import_genius_lyrics_api = require("genius-lyrics-api");

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

// src/commands/music/Lyrics.ts
var Lyrics = class extends Command {
  static {
    __name(this, "Lyrics");
  }
  constructor(client) {
    super(client, {
      name: "lyrics",
      description: {
        content: "cmd.lyrics.description",
        examples: [
          "lyrics"
        ],
        usage: "lyrics"
      },
      category: "music",
      aliases: [
        "ly"
      ],
      cooldown: 3,
      args: false,
      vote: false,
      player: {
        voice: true,
        dj: false,
        active: true,
        djPerm: null
      },
      permissions: {
        dev: false,
        client: [
          "SendMessages",
          "ReadMessageHistory",
          "ViewChannel",
          "EmbedLinks"
        ],
        user: []
      },
      slashCommand: true,
      options: []
    });
  }
  async run(client, ctx) {
    const player = client.manager.getPlayer(ctx.guild.id);
    if (!player) return await ctx.sendMessage(ctx.locale("event.message.no_music_playing"));
    const embed = this.client.embed();
    const track = player.queue.current;
    const trackTitle = track.info.title.replace(/\[.*?\]/g, "").trim();
    const artistName = track.info.author.replace(/\[.*?\]/g, "").trim();
    const trackUrl = track.info.uri;
    const artworkUrl = track.info.artworkUrl;
    await ctx.sendDeferMessage(ctx.locale("cmd.lyrics.searching", {
      trackTitle
    }));
    const options2 = {
      apiKey: client.env.GENIUS_API,
      title: trackTitle,
      artist: artistName,
      optimizeQuery: true
    };
    try {
      const lyrics = await (0, import_genius_lyrics_api.getLyrics)(options2);
      if (lyrics) {
        const lyricsPages = this.paginateLyrics(lyrics);
        let currentPage = 0;
        const row = new import_discord6.ActionRowBuilder().addComponents(new import_discord6.ButtonBuilder().setCustomId("prev").setEmoji(this.client.emoji.page.back).setStyle(import_discord6.ButtonStyle.Secondary).setDisabled(true), new import_discord6.ButtonBuilder().setCustomId("stop").setEmoji(this.client.emoji.page.cancel).setStyle(import_discord6.ButtonStyle.Danger), new import_discord6.ButtonBuilder().setCustomId("next").setEmoji(this.client.emoji.page.next).setStyle(import_discord6.ButtonStyle.Secondary).setDisabled(lyricsPages.length <= 1));
        await ctx.editMessage({
          embeds: [
            embed.setColor(client.color.main).setDescription(ctx.locale("cmd.lyrics.lyrics_track", {
              trackTitle,
              trackUrl,
              lyrics: lyricsPages[currentPage]
            })).setThumbnail(artworkUrl).setTimestamp()
          ],
          components: [
            row
          ]
        });
        const filter = /* @__PURE__ */ __name((interaction) => interaction.user.id === ctx.author?.id, "filter");
        const collector = ctx.channel.createMessageComponentCollector({
          filter,
          componentType: import_discord6.ComponentType.Button,
          time: 6e4
        });
        collector.on("collect", async (interaction) => {
          if (interaction.customId === "prev") {
            currentPage--;
          } else if (interaction.customId === "next") {
            currentPage++;
          } else if (interaction.customId === "stop") {
            collector.stop();
            return interaction.update({
              components: []
            });
          }
          await interaction.update({
            embeds: [
              embed.setDescription(ctx.locale("cmd.lyrics.lyrics_track", {
                trackTitle,
                trackUrl,
                lyrics: lyricsPages[currentPage]
              })).setThumbnail(artworkUrl).setTimestamp()
            ],
            components: [
              new import_discord6.ActionRowBuilder().addComponents(new import_discord6.ButtonBuilder().setCustomId("prev").setEmoji(this.client.emoji.page.back).setStyle(import_discord6.ButtonStyle.Secondary).setDisabled(currentPage === 0), new import_discord6.ButtonBuilder().setCustomId("stop").setEmoji(this.client.emoji.page.cancel).setStyle(import_discord6.ButtonStyle.Danger), new import_discord6.ButtonBuilder().setCustomId("next").setEmoji(this.client.emoji.page.next).setStyle(import_discord6.ButtonStyle.Secondary).setDisabled(currentPage === lyricsPages.length - 1))
            ]
          });
          return;
        });
        collector.on("end", () => {
          ctx.editMessage({
            components: []
          });
        });
      } else {
        await ctx.editMessage({
          embeds: [
            embed.setColor(client.color.red).setDescription(ctx.locale("cmd.lyrics.errors.no_results"))
          ]
        });
      }
    } catch (error) {
      client.logger.error(error);
      await ctx.editMessage({
        embeds: [
          embed.setColor(client.color.red).setDescription(ctx.locale("cmd.lyrics.errors.lyrics_error"))
        ]
      });
    }
  }
  paginateLyrics(lyrics) {
    const lines = lyrics.split("\n");
    const pages = [];
    let page = "";
    for (const line of lines) {
      if (page.length + line.length > 2048) {
        pages.push(page);
        page = "";
      }
      page += `${line}
`;
    }
    if (page) pages.push(page);
    return pages;
  }
};
