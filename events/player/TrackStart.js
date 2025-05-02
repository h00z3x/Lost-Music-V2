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

// src/events/player/TrackStart.ts
var TrackStart_exports = {};
__export(TrackStart_exports, {
  checkDj: () => checkDj,
  default: () => TrackStart
});
module.exports = __toCommonJS(TrackStart_exports);
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
async function trackStart(msgId, channel, player, track, client, locale) {
  const icon = player.queue.current ? player.queue.current.info.artworkUrl : client.config.links.img;
  let m;
  try {
    m = await channel.messages.fetch({
      message: msgId,
      cache: true
    });
  } catch (error) {
    client.logger.error(error);
  }
  const iconUrl = client.config.icons[player.queue.current.info.sourceName] || client.user.displayAvatarURL({
    extension: "png"
  });
  const description = T(locale, "player.setupStart.description", {
    title: track.info.title,
    uri: track.info.uri,
    author: track.info.author,
    length: client.utils.formatTime(track.info.duration),
    requester: player.queue.current.requester.id
  });
  const embed = client.embed().setAuthor({
    name: T(locale, "player.setupStart.now_playing"),
    iconURL: iconUrl
  }).setColor(client.color.main).setDescription(description).setImage(icon);
  if (m) {
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
    await channel.send({
      embeds: [
        embed
      ],
      components: getButtons(player, client).map((b) => {
        b.components.forEach((c) => c.setDisabled(!player?.queue.current));
        return b;
      })
    }).then((msg) => {
      client.db.setSetup(msg.guild.id, msg.id, msg.channel.id);
    }).catch(() => {
      null;
    });
  }
}
__name(trackStart, "trackStart");

// src/events/player/TrackStart.ts
var TrackStart = class extends Event {
  static {
    __name(this, "TrackStart");
  }
  constructor(client, file) {
    super(client, file, {
      name: "trackStart"
    });
  }
  async run(player, track, _payload) {
    const guild = this.client.guilds.cache.get(player.guildId);
    if (!guild) return;
    if (!player.textChannelId) return;
    if (!track) return;
    const channel = guild.channels.cache.get(player.textChannelId);
    if (!channel) return;
    this.client.utils.updateStatus(this.client, guild.id);
    const locale = await this.client.db.getLanguage(guild.id);
    const embed = this.client.embed().setAuthor({
      name: T(locale, "player.trackStart.now_playing"),
      iconURL: this.client.config.icons[track.info.sourceName] ?? this.client.user?.displayAvatarURL({
        extension: "png"
      })
    }).setColor(this.client.color.main).setDescription(`**[${track.info.title}](${track.info.uri})**`).setFooter({
      text: T(locale, "player.trackStart.requested_by", {
        user: track.requester.username
      }),
      iconURL: track.requester.avatarURL
    }).setThumbnail(track.info.artworkUrl).addFields({
      name: T(locale, "player.trackStart.duration"),
      value: track.info.isStream ? "LIVE" : this.client.utils.formatTime(track.info.duration),
      inline: true
    }, {
      name: T(locale, "player.trackStart.author"),
      value: track.info.author,
      inline: true
    }).setTimestamp();
    const setup = await this.client.db.getSetup(guild.id);
    if (setup?.textId) {
      const textChannel = guild.channels.cache.get(setup.textId);
      if (textChannel) {
        await trackStart(setup.messageId, textChannel, player, track, this.client, locale);
      }
    } else {
      const message = await channel.send({
        embeds: [
          embed
        ],
        components: [
          createButtonRow(player, this.client)
        ]
      });
      player.set("messageId", message.id);
      createCollector(message, player, track, embed, this.client, locale);
    }
  }
};
function createButtonRow(player, client) {
  const previousButton = new import_discord8.ButtonBuilder().setCustomId("previous").setEmoji(client.emoji.previous).setStyle(import_discord8.ButtonStyle.Secondary).setDisabled(!player.queue.previous);
  const resumeButton = new import_discord8.ButtonBuilder().setCustomId("resume").setEmoji(player.paused ? client.emoji.resume : client.emoji.pause).setStyle(player.paused ? import_discord8.ButtonStyle.Success : import_discord8.ButtonStyle.Secondary);
  const stopButton = new import_discord8.ButtonBuilder().setCustomId("stop").setEmoji(client.emoji.stop).setStyle(import_discord8.ButtonStyle.Danger);
  const skipButton = new import_discord8.ButtonBuilder().setCustomId("skip").setEmoji(client.emoji.skip).setStyle(import_discord8.ButtonStyle.Secondary);
  const loopButton = new import_discord8.ButtonBuilder().setCustomId("loop").setEmoji(player.repeatMode === "track" ? client.emoji.loop.track : client.emoji.loop.none).setStyle(player.repeatMode !== "off" ? import_discord8.ButtonStyle.Success : import_discord8.ButtonStyle.Secondary);
  return new import_discord8.ActionRowBuilder().addComponents(resumeButton, previousButton, stopButton, skipButton, loopButton);
}
__name(createButtonRow, "createButtonRow");
function createCollector(message, player, _track, embed, client, locale) {
  const collector = message.createMessageComponentCollector({
    filter: /* @__PURE__ */ __name(async (b) => {
      if (b.member instanceof import_discord8.GuildMember) {
        const isSameVoiceChannel = b.guild?.members.me?.voice.channelId === b.member.voice.channelId;
        if (isSameVoiceChannel) return true;
      }
      await b.reply({
        content: T(locale, "player.trackStart.not_connected_to_voice_channel", {
          channel: b.guild?.members.me?.voice.channelId ?? "None"
        }),
        flags: import_discord8.MessageFlags.Ephemeral
      });
      return false;
    }, "filter")
  });
  collector.on("collect", async (interaction) => {
    if (!await checkDj(client, interaction)) {
      await interaction.reply({
        content: T(locale, "player.trackStart.need_dj_role"),
        flags: import_discord8.MessageFlags.Ephemeral
      });
      return;
    }
    const editMessage = /* @__PURE__ */ __name(async (text) => {
      if (message) {
        await message.edit({
          embeds: [
            embed.setFooter({
              text,
              iconURL: interaction.user.avatarURL({})
            })
          ],
          components: [
            createButtonRow(player, client)
          ]
        });
      }
    }, "editMessage");
    switch (interaction.customId) {
      case "previous":
        if (player.queue.previous) {
          await interaction.deferUpdate();
          const previousTrack = player.queue.previous[0];
          player.play({
            track: previousTrack
          });
          await editMessage(T(locale, "player.trackStart.previous_by", {
            user: interaction.user.tag
          }));
        } else {
          await interaction.reply({
            content: T(locale, "player.trackStart.no_previous_song"),
            flags: import_discord8.MessageFlags.Ephemeral
          });
        }
        break;
      case "resume":
        if (player.paused) {
          player.resume();
          await interaction.deferUpdate();
          await editMessage(T(locale, "player.trackStart.resumed_by", {
            user: interaction.user.tag
          }));
        } else {
          player.pause();
          await interaction.deferUpdate();
          await editMessage(T(locale, "player.trackStart.paused_by", {
            user: interaction.user.tag
          }));
        }
        break;
      case "stop": {
        player.stopPlaying(true, false);
        await interaction.deferUpdate();
        break;
      }
      case "skip":
        if (player.queue.tracks.length > 0) {
          await interaction.deferUpdate();
          player.skip();
          await editMessage(T(locale, "player.trackStart.skipped_by", {
            user: interaction.user.tag
          }));
        } else {
          await interaction.reply({
            content: T(locale, "player.trackStart.no_more_songs_in_queue"),
            flags: import_discord8.MessageFlags.Ephemeral
          });
        }
        break;
      case "loop": {
        await interaction.deferUpdate();
        switch (player.repeatMode) {
          case "off": {
            player.setRepeatMode("track");
            await editMessage(T(locale, "player.trackStart.looping_by", {
              user: interaction.user.tag
            }));
            break;
          }
          case "track": {
            player.setRepeatMode("queue");
            await editMessage(T(locale, "player.trackStart.looping_queue_by", {
              user: interaction.user.tag
            }));
            break;
          }
          case "queue": {
            player.setRepeatMode("off");
            await editMessage(T(locale, "player.trackStart.looping_off_by", {
              user: interaction.user.tag
            }));
            break;
          }
        }
        break;
      }
    }
  });
}
__name(createCollector, "createCollector");
async function checkDj(client, interaction) {
  const dj = await client.db.getDj(interaction.guildId);
  if (dj?.mode) {
    const djRole = await client.db.getRoles(interaction.guildId);
    if (!djRole) return false;
    const hasDjRole = interaction.member.roles.cache.some((role) => djRole.map((r) => r.roleId).includes(role.id));
    if (!(hasDjRole || interaction.member.permissions.has(import_discord8.PermissionFlagsBits.ManageGuild))) {
      return false;
    }
  }
  return true;
}
__name(checkDj, "checkDj");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkDj
});
