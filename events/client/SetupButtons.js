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

// src/events/client/SetupButtons.ts
var SetupButtons_exports = {};
__export(SetupButtons_exports, {
  default: () => SetupButtons
});
module.exports = __toCommonJS(SetupButtons_exports);

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
var import_discord7 = require("discord.js");
async function buttonReply(int, args, color) {
  const embed = new import_discord7.EmbedBuilder();
  let m;
  if (int.replied) {
    m = await int.editReply({
      embeds: [
        embed.setColor(color).setDescription(args)
      ]
    }).catch(() => {
      null;
    });
  } else {
    m = await int.followUp({
      embeds: [
        embed.setColor(color).setDescription(args)
      ]
    }).catch(() => {
      null;
    });
  }
  setTimeout(async () => {
    if (int && !int.flags?.has(import_discord7.MessageFlags.Ephemeral)) {
      await m.delete().catch(() => {
        null;
      });
    }
  }, 2e3);
}
__name(buttonReply, "buttonReply");

// src/events/player/TrackStart.ts
var import_discord8 = require("discord.js");
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

// src/events/client/SetupButtons.ts
var SetupButtons = class extends Event {
  static {
    __name(this, "SetupButtons");
  }
  constructor(client, file) {
    super(client, file, {
      name: "setupButtons"
    });
  }
  async run(interaction) {
    const locale = await this.client.db.getLanguage(interaction.guildId);
    if (!interaction.replied) await interaction.deferReply().catch(() => {
      null;
    });
    if (!interaction.member.voice.channel) {
      return await buttonReply(interaction, T(locale, "event.setupButton.no_voice_channel_button"), this.client.color.red);
    }
    const clientMember = interaction.guild.members.cache.get(this.client.user?.id);
    if (clientMember.voice.channel && clientMember.voice.channelId !== interaction.member.voice.channelId) {
      return await buttonReply(interaction, T(locale, "event.setupButton.different_voice_channel_button", {
        channel: clientMember.voice.channel
      }), this.client.color.red);
    }
    const player = this.client.manager.getPlayer(interaction.guildId);
    if (!player) return await buttonReply(interaction, T(locale, "event.setupButton.no_music_playing"), this.client.color.red);
    if (!player.queue) return await buttonReply(interaction, T(locale, "event.setupButton.no_music_playing"), this.client.color.red);
    if (!player.queue.current) return await buttonReply(interaction, T(locale, "event.setupButton.no_music_playing"), this.client.color.red);
    const data = await this.client.db.getSetup(interaction.guildId);
    const { title, uri, duration, artworkUrl, sourceName, isStream } = player.queue.current.info;
    let message;
    try {
      message = await interaction.channel.messages.fetch(data?.messageId, {
        cache: true
      });
    } catch (_e) {
      null;
    }
    const iconUrl = this.client.config.icons[sourceName] || this.client.user?.displayAvatarURL({
      extension: "png"
    });
    const embed = this.client.embed().setAuthor({
      name: T(locale, "event.setupButton.now_playing"),
      iconURL: iconUrl
    }).setColor(this.client.color.main).setDescription(`[${title}](${uri}) - ${isStream ? T(locale, "event.setupButton.live") : this.client.utils.formatTime(duration)} - ${T(locale, "event.setupButton.requested_by", {
      requester: player.queue.current.requester.id
    })}`).setImage(artworkUrl || this.client.user?.displayAvatarURL({
      extension: "png"
    }));
    if (!interaction.isButton()) return;
    if (!await checkDj(this.client, interaction)) {
      return await buttonReply(interaction, T(locale, "event.setupButton.no_dj_permission"), this.client.color.red);
    }
    if (message) {
      const handleVolumeChange = /* @__PURE__ */ __name(async (change) => {
        const vol = player.volume + change;
        player.setVolume(vol);
        await buttonReply(interaction, T(locale, "event.setupButton.volume_set", {
          vol
        }), this.client.color.main);
        await message.edit({
          embeds: [
            embed.setFooter({
              text: T(locale, "event.setupButton.volume_footer", {
                vol,
                displayName: interaction.member.displayName
              }),
              iconURL: interaction.member.displayAvatarURL({})
            })
          ]
        });
      }, "handleVolumeChange");
      switch (interaction.customId) {
        case "PREV_BUT": {
          if (!player.queue.previous) {
            return await buttonReply(interaction, T(locale, "event.setupButton.no_previous_track"), this.client.color.main);
          }
          player.play({
            track: player.queue.previous[0]
          });
          await buttonReply(interaction, T(locale, "event.setupButton.playing_previous"), this.client.color.main);
          await message.edit({
            embeds: [
              embed.setFooter({
                text: T(locale, "event.setupButton.previous_footer", {
                  displayName: interaction.member.displayName
                }),
                iconURL: interaction.member.displayAvatarURL({})
              })
            ]
          });
          break;
        }
        case "REWIND_BUT": {
          const time = player.position - 1e4;
          if (time < 0) {
            player.seek(0);
          } else {
            player.seek(time);
          }
          await buttonReply(interaction, T(locale, "event.setupButton.rewinded"), this.client.color.main);
          await message.edit({
            embeds: [
              embed.setFooter({
                text: T(locale, "event.setupButton.rewind_footer", {
                  displayName: interaction.member.displayName
                }),
                iconURL: interaction.member.displayAvatarURL({})
              })
            ]
          });
          break;
        }
        case "PAUSE_BUT": {
          const name = player.paused ? T(locale, "event.setupButton.resumed") : T(locale, "event.setupButton.paused");
          if (player.paused) {
            player.resume();
          } else {
            player.pause();
          }
          await buttonReply(interaction, T(locale, "event.setupButton.pause_resume", {
            name
          }), this.client.color.main);
          await message.edit({
            embeds: [
              embed.setFooter({
                text: T(locale, "event.setupButton.pause_resume_footer", {
                  name,
                  displayName: interaction.member.displayName
                }),
                iconURL: interaction.member.displayAvatarURL({})
              })
            ],
            components: getButtons(player, this.client)
          });
          break;
        }
        case "FORWARD_BUT": {
          const time = player.position + 1e4;
          if (time > player.queue.current.info.duration) {
            return await buttonReply(interaction, T(locale, "event.setupButton.forward_limit"), this.client.color.main);
          }
          player.seek(time);
          await buttonReply(interaction, T(locale, "event.setupButton.forwarded"), this.client.color.main);
          await message.edit({
            embeds: [
              embed.setFooter({
                text: T(locale, "event.setupButton.forward_footer", {
                  displayName: interaction.member.displayName
                }),
                iconURL: interaction.member.displayAvatarURL({})
              })
            ]
          });
          break;
        }
        case "SKIP_BUT": {
          if (player.queue.tracks.length === 0) {
            return await buttonReply(interaction, T(locale, "event.setupButton.no_music_to_skip"), this.client.color.main);
          }
          player.skip();
          await buttonReply(interaction, T(locale, "event.setupButton.skipped"), this.client.color.main);
          await message.edit({
            embeds: [
              embed.setFooter({
                text: T(locale, "event.setupButton.skipped_footer", {
                  displayName: interaction.member.displayName
                }),
                iconURL: interaction.member.displayAvatarURL({})
              })
            ]
          });
          break;
        }
        case "LOW_VOL_BUT":
          await handleVolumeChange(-10);
          break;
        case "LOOP_BUT": {
          const loopOptions = [
            "off",
            "queue",
            "track"
          ];
          const newLoop = loopOptions[(loopOptions.indexOf(player.repeatMode) + 1) % loopOptions.length];
          player.setRepeatMode(newLoop);
          await buttonReply(interaction, T(locale, "event.setupButton.loop_set", {
            loop: newLoop
          }), this.client.color.main);
          await message.edit({
            embeds: [
              embed.setFooter({
                text: T(locale, "event.setupButton.loop_footer", {
                  loop: newLoop,
                  displayName: interaction.member.displayName
                }),
                iconURL: interaction.member.displayAvatarURL({})
              })
            ]
          });
          break;
        }
        case "STOP_BUT": {
          player.stopPlaying(true, false);
          await buttonReply(interaction, T(locale, "event.setupButton.stopped"), this.client.color.main);
          await message.edit({
            embeds: [
              embed.setFooter({
                text: T(locale, "event.setupButton.stopped_footer", {
                  displayName: interaction.member.displayName
                }),
                iconURL: interaction.member.displayAvatarURL({})
              }).setDescription(T(locale, "event.setupButton.nothing_playing")).setImage(this.client.config.links.img).setAuthor({
                name: this.client.user?.username,
                iconURL: this.client.user?.displayAvatarURL({
                  extension: "png"
                })
              })
            ]
          });
          break;
        }
        case "SHUFFLE_BUT": {
          player.queue.shuffle();
          await buttonReply(interaction, T(locale, "event.setupButton.shuffled"), this.client.color.main);
          break;
        }
        case "HIGH_VOL_BUT":
          await handleVolumeChange(10);
          break;
      }
    }
  }
};
