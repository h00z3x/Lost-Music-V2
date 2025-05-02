"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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

// src/LavaClient.ts
var import_discord5 = require("discord.js");

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

// src/structures/Lavamusic.ts
var import_node_fs2 = __toESM(require("fs"));
var import_node_path3 = __toESM(require("path"));
var import_sdk = require("@top-gg/sdk");
var import_discord3 = require("discord.js");
var import_discord4 = require("discord.js");

// src/config.ts
var config_default = {
  color: {
    red: 16711680,
    green: 65280,
    blue: 255,
    yellow: 16776960,
    main: 4360181
  },
  emoji: {
    // You can add custom emoji with ID format (e.g., <:emojiName:123456789012345678>)
    pause: "\u23F8\uFE0F",
    resume: "\u25B6\uFE0F",
    stop: "\u23F9\uFE0F",
    skip: "\u23ED\uFE0F",
    previous: "\u23EE\uFE0F",
    forward: "\u23E9",
    rewind: "\u23EA",
    voldown: "\u{1F509}",
    volup: "\u{1F50A}",
    shuffle: "\u{1F500}",
    loop: {
      none: "\u{1F501}",
      track: "\u{1F502}"
    },
    page: {
      last: "\u23E9",
      first: "\u23EA",
      back: "\u2B05\uFE0F",
      next: "\u27A1\uFE0F",
      cancel: "\u23F9\uFE0F"
    }
  },
  icons: {
    youtube: "https://i.imgur.com/xzVHhFY.png",
    spotify: "https://i.imgur.com/qvdqtsc.png",
    soundcloud: "https://i.imgur.com/MVnJ7mj.png",
    applemusic: "https://i.imgur.com/Wi0oyYm.png",
    deezer: "https://i.imgur.com/xyZ43FG.png",
    jiosaavn: "https://i.imgur.com/N9Nt80h.png"
  },
  links: {
    img: "https://i.imgur.com/ud3EWNh.jpg"
  }
};

// src/database/server.ts
var import_client = require("@prisma/client");
var ServerData = class {
  static {
    __name(this, "ServerData");
  }
  prisma;
  constructor() {
    this.prisma = new import_client.PrismaClient();
  }
  async get(guildId) {
    return await this.prisma.guild.findUnique({
      where: {
        guildId
      }
    }) ?? this.createGuild(guildId);
  }
  async createGuild(guildId) {
    return await this.prisma.guild.create({
      data: {
        guildId,
        prefix: env.PREFIX
      }
    });
  }
  async setPrefix(guildId, prefix) {
    await this.prisma.guild.upsert({
      where: {
        guildId
      },
      update: {
        prefix
      },
      create: {
        guildId,
        prefix
      }
    });
  }
  async getPrefix(guildId) {
    const guild = await this.get(guildId);
    return guild?.prefix ?? env.PREFIX;
  }
  async updateLanguage(guildId, language) {
    await this.prisma.guild.update({
      where: {
        guildId
      },
      data: {
        language
      }
    });
  }
  async getLanguage(guildId) {
    const guild = await this.get(guildId);
    return guild?.language ?? env.DEFAULT_LANGUAGE;
  }
  async getSetup(guildId) {
    return await this.prisma.setup.findUnique({
      where: {
        guildId
      }
    });
  }
  async setSetup(guildId, textId, messageId) {
    await this.prisma.setup.upsert({
      where: {
        guildId
      },
      update: {
        textId,
        messageId
      },
      create: {
        guildId,
        textId,
        messageId
      }
    });
  }
  async deleteSetup(guildId) {
    await this.prisma.setup.delete({
      where: {
        guildId
      }
    });
  }
  async set_247(guildId, textId, voiceId) {
    await this.prisma.stay.upsert({
      where: {
        guildId
      },
      update: {
        textId,
        voiceId
      },
      create: {
        guildId,
        textId,
        voiceId
      }
    });
  }
  async delete_247(guildId) {
    await this.prisma.stay.delete({
      where: {
        guildId
      }
    });
  }
  async get_247(guildId) {
    if (guildId) {
      const stay = await this.prisma.stay.findUnique({
        where: {
          guildId
        }
      });
      if (stay) return stay;
      return null;
    }
    return this.prisma.stay.findMany();
  }
  async setDj(guildId, mode) {
    await this.prisma.dj.upsert({
      where: {
        guildId
      },
      update: {
        mode
      },
      create: {
        guildId,
        mode
      }
    });
  }
  async getDj(guildId) {
    return await this.prisma.dj.findUnique({
      where: {
        guildId
      }
    });
  }
  async getRoles(guildId) {
    return await this.prisma.role.findMany({
      where: {
        guildId
      }
    });
  }
  async addRole(guildId, roleId) {
    await this.prisma.role.create({
      data: {
        guildId,
        roleId
      }
    });
  }
  async removeRole(guildId, roleId) {
    await this.prisma.role.deleteMany({
      where: {
        guildId,
        roleId
      }
    });
  }
  async clearRoles(guildId) {
    await this.prisma.role.deleteMany({
      where: {
        guildId
      }
    });
  }
  async getPlaylist(userId, name) {
    return await this.prisma.playlist.findUnique({
      where: {
        userId_name: {
          userId,
          name
        }
      }
    });
  }
  async getUserPlaylists(userId) {
    return await this.prisma.playlist.findMany({
      where: {
        userId
      }
    });
  }
  async createPlaylist(userId, name) {
    await this.prisma.playlist.create({
      data: {
        userId,
        name
      }
    });
  }
  // createPlaylist with tracks
  async createPlaylistWithTracks(userId, name, tracks) {
    await this.prisma.playlist.create({
      data: {
        userId,
        name,
        tracks: JSON.stringify(tracks)
      }
    });
  }
  /**
  * Deletes a playlist from the database
  *
  * @param userId The ID of the user that owns the playlist
  * @param name The name of the playlist to delete
  */
  async deletePlaylist(userId, name) {
    await this.prisma.playlist.delete({
      where: {
        userId_name: {
          userId,
          name
        }
      }
    });
  }
  async deleteSongsFromPlaylist(userId, playlistName) {
    const playlist = await this.getPlaylist(userId, playlistName);
    if (playlist) {
      await this.prisma.playlist.update({
        where: {
          userId_name: {
            userId,
            name: playlistName
          }
        },
        data: {
          tracks: JSON.stringify([])
        }
      });
    }
  }
  async addTracksToPlaylist(userId, playlistName, tracks) {
    const tracksJson = JSON.stringify(tracks);
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        userId_name: {
          userId,
          name: playlistName
        }
      }
    });
    if (playlist) {
      const existingTracks = playlist.tracks ? JSON.parse(playlist.tracks) : [];
      if (Array.isArray(existingTracks)) {
        const updatedTracks = [
          ...existingTracks,
          ...tracks
        ];
        await this.prisma.playlist.update({
          where: {
            userId_name: {
              userId,
              name: playlistName
            }
          },
          data: {
            tracks: JSON.stringify(updatedTracks)
          }
        });
      } else {
        throw new Error("Existing tracks are not in an array format.");
      }
    } else {
      await this.prisma.playlist.create({
        data: {
          userId,
          name: playlistName,
          tracks: tracksJson
        }
      });
    }
  }
  async removeSong(userId, playlistName, encodedSong) {
    const playlist = await this.getPlaylist(userId, playlistName);
    if (playlist) {
      const tracks = JSON.parse(playlist?.tracks);
      const songIndex = tracks.indexOf(encodedSong);
      if (songIndex !== -1) {
        tracks.splice(songIndex, 1);
        await this.prisma.playlist.update({
          where: {
            userId_name: {
              userId,
              name: playlistName
            }
          },
          data: {
            tracks: JSON.stringify(tracks)
          }
        });
      }
    }
  }
  async getTracksFromPlaylist(userId, playlistName) {
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        userId_name: {
          userId,
          name: playlistName
        }
      }
    });
    if (!playlist) {
      return null;
    }
    const tracks = JSON.parse(playlist.tracks);
    return tracks;
  }
};

// src/plugin/index.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));
var pluginsFolder = import_node_path2.default.join(process.cwd(), "plugin", "plugins");
async function loadPlugins(client2) {
  try {
    const pluginFiles = import_node_fs.default.readdirSync(pluginsFolder).filter((file) => file.endsWith(".js"));
    for (const file of pluginFiles) {
      const pluginPath = import_node_path2.default.join(pluginsFolder, file);
      const { default: plugin } = require(pluginPath);
      if (plugin.initialize) plugin.initialize(client2);
      client2.logger.info(`Loaded plugin: ${plugin.name} v${plugin.version}`);
    }
  } catch (error) {
    client2.logger.error("Error loading plugins:", error);
  }
}
__name(loadPlugins, "loadPlugins");

// src/utils/Utils.ts
var import_discord = require("discord.js");
var Utils = class {
  static {
    __name(this, "Utils");
  }
  static formatTime(ms) {
    const minuteMs = 60 * 1e3;
    const hourMs = 60 * minuteMs;
    const dayMs = 24 * hourMs;
    if (ms < minuteMs) return `${ms / 1e3}s`;
    if (ms < hourMs) return `${Math.floor(ms / minuteMs)}m ${Math.floor(ms % minuteMs / 1e3)}s`;
    if (ms < dayMs) return `${Math.floor(ms / hourMs)}h ${Math.floor(ms % hourMs / minuteMs)}m`;
    return `${Math.floor(ms / dayMs)}d ${Math.floor(ms % dayMs / hourMs)}h`;
  }
  static updateStatus(client2, guildId) {
    const { user } = client2;
    if (user && client2.env.GUILD_ID && guildId === client2.env.GUILD_ID) {
      const player = client2.manager.getPlayer(client2.env.GUILD_ID);
      user.setPresence({
        activities: [
          {
            name: client2.env.BOT_ACTIVITY,
            type: client2.env.BOT_ACTIVITY_TYPE
          }
        ],
        status: client2.env.BOT_STATUS
      });
    }
  }
  static chunk(array, size) {
    const chunked_arr = [];
    for (let index = 0; index < array.length; index += size) {
      chunked_arr.push(array.slice(index, size + index));
    }
    return chunked_arr;
  }
  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB"
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }
  static formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  static parseTime(string) {
    const time = string.match(/(\d+[dhms])/g);
    if (!time) return 0;
    let ms = 0;
    for (const t of time) {
      const unit = t[t.length - 1];
      const amount = Number(t.slice(0, -1));
      if (unit === "d") ms += amount * 24 * 60 * 60 * 1e3;
      else if (unit === "h") ms += amount * 60 * 60 * 1e3;
      else if (unit === "m") ms += amount * 60 * 1e3;
      else if (unit === "s") ms += amount * 1e3;
    }
    return ms;
  }
  static progressBar(current, total, size = 20) {
    const percent = Math.round(current / total * 100);
    const filledSize = Math.round(size * current / total);
    const filledBar = "\u2593".repeat(filledSize);
    const emptyBar = "\u2591".repeat(size - filledSize);
    return `${filledBar}${emptyBar} ${percent}%`;
  }
  static async paginate(client2, ctx, embed) {
    if (embed.length < 2) {
      if (ctx.isInteraction) {
        ctx.deferred ? ctx.interaction?.followUp({
          embeds: embed
        }) : ctx.interaction?.reply({
          embeds: embed
        });
        return;
      }
      ctx.channel.send({
        embeds: embed
      });
      return;
    }
    let page = 0;
    const getButton = /* @__PURE__ */ __name((page2) => {
      const firstEmbed = page2 === 0;
      const lastEmbed = page2 === embed.length - 1;
      const pageEmbed = embed[page2];
      const first = new import_discord.ButtonBuilder().setCustomId("first").setEmoji(client2.emoji.page.first).setStyle(import_discord.ButtonStyle.Primary).setDisabled(firstEmbed);
      const back = new import_discord.ButtonBuilder().setCustomId("back").setEmoji(client2.emoji.page.back).setStyle(import_discord.ButtonStyle.Primary).setDisabled(firstEmbed);
      const next = new import_discord.ButtonBuilder().setCustomId("next").setEmoji(client2.emoji.page.next).setStyle(import_discord.ButtonStyle.Primary).setDisabled(lastEmbed);
      const last = new import_discord.ButtonBuilder().setCustomId("last").setEmoji(client2.emoji.page.last).setStyle(import_discord.ButtonStyle.Primary).setDisabled(lastEmbed);
      const stop = new import_discord.ButtonBuilder().setCustomId("stop").setEmoji(client2.emoji.page.cancel).setStyle(import_discord.ButtonStyle.Danger);
      const row = new import_discord.ActionRowBuilder().addComponents(first, back, stop, next, last);
      return {
        embeds: [
          pageEmbed
        ],
        components: [
          row
        ]
      };
    }, "getButton");
    const msgOptions = getButton(0);
    let msg;
    if (ctx.isInteraction) {
      if (ctx.deferred) {
        msg = await ctx.interaction.followUp({
          ...msgOptions,
          withResponse: true
        });
      } else {
        msg = await ctx.interaction.reply({
          ...msgOptions,
          withResponse: true
        });
      }
    } else {
      msg = await ctx.channel.send({
        ...msgOptions,
        withResponse: true
      });
    }
    const author = ctx instanceof import_discord.CommandInteraction ? ctx.user : ctx.author;
    const filter = /* @__PURE__ */ __name((int) => int.user.id === author?.id, "filter");
    const collector = msg.createMessageComponentCollector({
      filter,
      time: 6e4
    });
    collector.on("collect", async (interaction) => {
      if (interaction.user.id === author?.id) {
        await interaction.deferUpdate();
        if (interaction.customId === "first" && page !== 0) {
          page = 0;
        } else if (interaction.customId === "back" && page !== 0) {
          page--;
        } else if (interaction.customId === "stop") {
          collector.stop();
        } else if (interaction.customId === "next" && page !== embed.length - 1) {
          page++;
        } else if (interaction.customId === "last" && page !== embed.length - 1) {
          page = embed.length - 1;
        }
        await interaction.editReply(getButton(page));
      } else {
        await interaction.reply({
          content: ctx.locale("buttons.errors.not_author"),
          flags: import_discord.MessageFlags.Ephemeral
        });
      }
    });
    collector.on("end", async () => {
      await msg.edit({
        embeds: [
          embed[page]
        ],
        components: []
      });
    });
  }
};

// src/structures/I18n.ts
var import_i18n = __toESM(require("i18n"));
var import_discord2 = require("discord.js");

// src/types.ts
var Language = /* @__PURE__ */ function(Language2) {
  Language2["ChineseCN"] = "ChineseCN";
  Language2["ChineseTW"] = "ChineseTW";
  Language2["EnglishUS"] = "EnglishUS";
  Language2["French"] = "French";
  Language2["German"] = "German";
  Language2["Hindi"] = "Hindi";
  Language2["Indonesian"] = "Indonesian";
  Language2["Japanese"] = "Japanese";
  Language2["Korean"] = "Korean";
  Language2["Norwegian"] = "Norwegian";
  Language2["Polish"] = "Polish";
  Language2["Russian"] = "Russian";
  Language2["SpanishES"] = "SpanishES";
  Language2["Turkish"] = "Turkish";
  Language2["Vietnamese"] = "Vietnamese";
  return Language2;
}({});

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
function initI18n() {
  import_i18n.default.configure({
    locales: Object.keys(Language),
    defaultLocale: typeof config_default === "string" ? config_default : "EnglishUS",
    directory: `${process.cwd()}/locales`,
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,
    logWarnFn: console.warn,
    logErrorFn: console.error,
    missingKeyFn: /* @__PURE__ */ __name((_locale, value) => {
      return value;
    }, "missingKeyFn"),
    mustacheConfig: {
      tags: [
        "{",
        "}"
      ],
      disable: false
    }
  });
  logger.info("I18n has been initialized");
}
__name(initI18n, "initI18n");
function T(locale, text, ...params) {
  import_i18n.default.setLocale(locale);
  return import_i18n.default.__mf(text, ...params);
}
__name(T, "T");
function localization(lan, name, desc) {
  return {
    name: [
      import_discord2.Locale[lan],
      name
    ],
    description: [
      import_discord2.Locale[lan],
      T(lan, desc)
    ]
  };
}
__name(localization, "localization");

// src/structures/LavalinkClient.ts
var import_lavalink_client = require("lavalink-client");

// src/utils/functions/player.ts
var requesterTransformer = /* @__PURE__ */ __name((requester) => {
  if (typeof requester === "object" && "avatar" in requester && Object.keys(requester).length === 3) return requester;
  if (typeof requester === "object" && "displayAvatarURL" in requester) {
    return {
      id: requester.id,
      username: requester.username,
      avatarURL: requester.displayAvatarURL({
        extension: "png"
      }),
      discriminator: requester.discriminator
    };
  }
  return {
    id: requester.toString(),
    username: "unknown"
  };
}, "requesterTransformer");
async function autoPlayFunction(player, lastTrack) {
  if (!player.get("autoplay")) return;
  if (!lastTrack) return;
  if (lastTrack.info.sourceName === "spotify") {
    const filtered = player.queue.previous.filter((v) => v.info.sourceName === "spotify").slice(0, 5);
    const ids = filtered.map((v) => v.info.identifier || v.info.uri.split("/")?.reverse()?.[0] || v.info.uri.split("/")?.reverse()?.[1]);
    if (ids.length >= 2) {
      const res = await player.search({
        query: `seed_tracks=${ids.join(",")}`,
        source: "sprec"
      }, lastTrack.requester).then((response) => {
        response.tracks = response.tracks.filter((v) => v.info.identifier !== lastTrack.info.identifier);
        return response;
      }).catch(console.warn);
      if (res && res.tracks.length > 0) await player.queue.add(res.tracks.slice(0, 5).map((track) => {
        track.pluginInfo.clientData = {
          ...track.pluginInfo.clientData || {},
          fromAutoplay: true
        };
        return track;
      }));
    }
    return;
  }
  if (lastTrack.info.sourceName === "youtube" || lastTrack.info.sourceName === "youtubemusic") {
    const res = await player.search({
      query: `https://www.youtube.com/watch?v=${lastTrack.info.identifier}&list=RD${lastTrack.info.identifier}`,
      source: "youtube"
    }, lastTrack.requester).then((response) => {
      response.tracks = response.tracks.filter((v) => v.info.identifier !== lastTrack.info.identifier);
      return response;
    }).catch(console.warn);
    if (res && res.tracks.length > 0) await player.queue.add(res.tracks.slice(0, 5).map((track) => {
      track.pluginInfo.clientData = {
        ...track.pluginInfo.clientData || {},
        fromAutoplay: true
      };
      return track;
    }));
    return;
  }
  if (lastTrack.info.sourceName === "jiosaavn") {
    const res = await player.search({
      query: `jsrec:${lastTrack.info.identifier}`,
      source: "jsrec"
    }, lastTrack.requester);
    if (res.tracks.length > 0) {
      const track = res.tracks.filter((v) => v.info.identifier !== lastTrack.info.identifier)[0];
      await player.queue.add(track);
    }
  }
  return;
}
__name(autoPlayFunction, "autoPlayFunction");

// src/structures/LavalinkClient.ts
var LavalinkClient = class extends import_lavalink_client.LavalinkManager {
  static {
    __name(this, "LavalinkClient");
  }
  client;
  constructor(client2) {
    super({
      nodes: client2.env.NODES,
      sendToShard: /* @__PURE__ */ __name((guildId, payload) => client2.guilds.cache.get(guildId)?.shard?.send(payload), "sendToShard"),
      queueOptions: {
        maxPreviousTracks: 25
      },
      playerOptions: {
        defaultSearchPlatform: client2.env.SEARCH_ENGINE,
        onDisconnect: {
          autoReconnect: true,
          destroyPlayer: false
        },
        requesterTransformer,
        onEmptyQueue: {
          autoPlayFunction
        }
      }
    });
    this.client = client2;
  }
  /**
  * Searches for a song and returns the tracks.
  * @param query The query to search for.
  * @param user The user who requested the search.
  * @param source The source to search in. Defaults to youtube.
  * @returns An array of tracks that match the query.
  */
  async search(query, user, source) {
    const nodes = this.nodeManager.leastUsedNodes();
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    const result = await node.search({
      query,
      source
    }, user, false);
    return result;
  }
};

// src/structures/Lavamusic.ts
var Lavamusic = class extends import_discord3.Client {
  static {
    __name(this, "Lavamusic");
  }
  commands = new import_discord3.Collection();
  aliases = new import_discord3.Collection();
  db = new ServerData();
  cooldown = new import_discord3.Collection();
  config = config_default;
  logger = new Logger();
  emoji = config_default.emoji;
  color = config_default.color;
  body = [];
  topGG;
  utils = Utils;
  env = env;
  manager;
  embed() {
    return new import_discord3.EmbedBuilder();
  }
  async start(token) {
    initI18n();
    if (env.TOPGG) {
      this.topGG = new import_sdk.Api(env.TOPGG);
    } else {
      this.logger.warn("Top.gg token not found!");
    }
    this.manager = new LavalinkClient(this);
    await this.loadCommands();
    this.logger.info("Successfully loaded commands!");
    await this.loadEvents();
    this.logger.info("Successfully loaded events!");
    loadPlugins(this);
    await this.login(token);
    this.on(import_discord3.Events.InteractionCreate, async (interaction) => {
      if (interaction.isButton() && interaction.guildId) {
        const setup = await this.db.getSetup(interaction.guildId);
        if (setup && interaction.channelId === setup.textId && interaction.message.id === setup.messageId) {
          this.emit("setupButtons", interaction);
        }
      }
    });
  }
  async loadCommands() {
    const commandsPath = import_node_fs2.default.readdirSync(import_node_path3.default.join(process.cwd(), "commands"));
    for (const dir of commandsPath) {
      const commandFiles = import_node_fs2.default.readdirSync(import_node_path3.default.join(process.cwd(), "commands", dir)).filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const cmdModule = require(import_node_path3.default.join(process.cwd(), "commands", dir, file));
        const command = new cmdModule.default(this, file);
        command.category = dir;
        this.commands.set(command.name, command);
        command.aliases.forEach((alias) => {
          this.aliases.set(alias, command.name);
        });
        if (command.slashCommand) {
          const data = {
            name: command.name,
            description: T(import_discord4.Locale.EnglishUS, command.description.content),
            type: import_discord3.ApplicationCommandType.ChatInput,
            options: command.options || [],
            default_member_permissions: Array.isArray(command.permissions.user) && command.permissions.user.length > 0 ? import_discord3.PermissionsBitField.resolve(command.permissions.user).toString() : null,
            name_localizations: null,
            description_localizations: null
          };
          const localizations = [];
          import_i18n.default.getLocales().map((locale) => {
            localizations.push(localization(locale, command.name, command.description.content));
          });
          for (const localization2 of localizations) {
            const [language, name] = localization2.name;
            const [language2, description] = localization2.description;
            data.name_localizations = {
              ...data.name_localizations,
              [language]: name
            };
            data.description_localizations = {
              ...data.description_localizations,
              [language2]: description
            };
          }
          if (command.options.length > 0) {
            command.options.map((option) => {
              const optionsLocalizations = [];
              import_i18n.default.getLocales().map((locale) => {
                optionsLocalizations.push(localization(locale, option.name, option.description));
              });
              for (const localization2 of optionsLocalizations) {
                const [language, name] = localization2.name;
                const [language2, description] = localization2.description;
                option.name_localizations = {
                  ...option.name_localizations,
                  [language]: name
                };
                option.description_localizations = {
                  ...option.description_localizations,
                  [language2]: description
                };
              }
              option.description = T(import_discord4.Locale.EnglishUS, option.description);
            });
            data.options?.map((option) => {
              if ("options" in option && option.options.length > 0) {
                option.options?.map((subOption) => {
                  const subOptionsLocalizations = [];
                  import_i18n.default.getLocales().map((locale) => {
                    subOptionsLocalizations.push(localization(locale, subOption.name, subOption.description));
                  });
                  for (const localization2 of subOptionsLocalizations) {
                    const [language, name] = localization2.name;
                    const [language2, description] = localization2.description;
                    subOption.name_localizations = {
                      ...subOption.name_localizations,
                      [language]: name
                    };
                    subOption.description_localizations = {
                      ...subOption.description_localizations,
                      [language2]: description
                    };
                  }
                  subOption.description = T(import_discord4.Locale.EnglishUS, subOption.description);
                });
              }
            });
          }
          this.body.push(data);
        }
      }
    }
  }
  async deployCommands(guildId) {
    const route = guildId ? import_discord3.Routes.applicationGuildCommands(this.user?.id ?? "", guildId) : import_discord3.Routes.applicationCommands(this.user?.id ?? "");
    try {
      const rest = new import_discord3.REST({
        version: "10"
      }).setToken(env.TOKEN ?? "");
      await rest.put(route, {
        body: this.body
      });
      this.logger.info("Successfully deployed slash commands!");
    } catch (error) {
      this.logger.error(error);
    }
  }
  async loadEvents() {
    const eventsPath = import_node_fs2.default.readdirSync(import_node_path3.default.join(process.cwd(), "events"));
    for (const dir of eventsPath) {
      const eventFiles = import_node_fs2.default.readdirSync(import_node_path3.default.join(process.cwd(), "events", dir)).filter((file) => file.endsWith(".js"));
      for (const file of eventFiles) {
        const eventModule = require(import_node_path3.default.join(process.cwd(), "events", dir, file));
        const event = new eventModule.default(this, file);
        if (dir === "player") {
          this.manager.on(event.name, (...args) => event.run(...args));
        } else if (dir === "node") {
          this.manager.nodeManager.on(event.name, (...args) => event.run(...args));
        } else {
          this.on(event.name, (...args) => event.run(...args));
        }
      }
    }
  }
};

// src/LavaClient.ts
var { GuildMembers, MessageContent, GuildVoiceStates, GuildMessages, Guilds, GuildMessageTyping } = import_discord5.GatewayIntentBits;
var clientOptions = {
  intents: [
    Guilds,
    GuildMessages,
    MessageContent,
    GuildVoiceStates,
    GuildMembers,
    GuildMessageTyping
  ],
  allowedMentions: {
    parse: [
      "users",
      "roles"
    ],
    repliedUser: false
  }
};
var client = new Lavamusic(clientOptions);
client.start(env.TOKEN);
