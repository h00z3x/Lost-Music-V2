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

// src/events/client/MessageCreate.ts
var MessageCreate_exports = {};
__export(MessageCreate_exports, {
  default: () => MessageCreate
});
module.exports = __toCommonJS(MessageCreate_exports);
var import_discord6 = require("discord.js");

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

// src/structures/Context.ts
var Context = class {
  static {
    __name(this, "Context");
  }
  ctx;
  interaction;
  message;
  id;
  channelId;
  client;
  author;
  channel;
  guild;
  createdAt;
  createdTimestamp;
  member;
  args;
  msg;
  guildLocale;
  constructor(ctx, args) {
    this.ctx = ctx;
    this.interaction = ctx instanceof import_discord2.ChatInputCommandInteraction ? ctx : null;
    this.message = ctx instanceof import_discord2.Message ? ctx : null;
    this.channel = ctx.channel;
    this.id = ctx.id;
    this.channelId = ctx.channelId;
    this.client = ctx.client;
    this.author = ctx instanceof import_discord2.Message ? ctx.author : ctx.user;
    this.guild = ctx.guild;
    this.createdAt = ctx.createdAt;
    this.createdTimestamp = ctx.createdTimestamp;
    this.member = ctx.member;
    this.args = args;
    this.setArgs(args);
    this.setUpLocale();
  }
  async setUpLocale() {
    const defaultLanguage = env.DEFAULT_LANGUAGE || "EnglishUS";
    this.guildLocale = this.guild ? await this.client.db.getLanguage(this.guild.id) : defaultLanguage;
  }
  get isInteraction() {
    return this.ctx instanceof import_discord2.ChatInputCommandInteraction;
  }
  setArgs(args) {
    this.args = this.isInteraction ? args.map((arg) => arg.value) : args;
  }
  async sendMessage(content) {
    if (this.isInteraction) {
      if (typeof content === "string" || isInteractionReplyOptions(content)) {
        this.msg = await this.interaction?.reply(content);
        return this.msg;
      }
    } else if (typeof content === "string" || isMessagePayload(content)) {
      this.msg = await (this.message?.channel).send(content);
      return this.msg;
    }
    return this.msg;
  }
  async editMessage(content) {
    if (this.isInteraction && this.msg) {
      this.msg = await this.interaction?.editReply(content);
      return this.msg;
    }
    if (this.msg) {
      this.msg = await this.msg.edit(content);
      return this.msg;
    }
    return this.msg;
  }
  async sendDeferMessage(content) {
    if (this.isInteraction) {
      this.msg = await this.interaction?.deferReply({
        withResponse: true
      });
      return this.msg;
    }
    this.msg = await (this.message?.channel).send(content);
    return this.msg;
  }
  locale(key, ...args) {
    if (!this.guildLocale) this.guildLocale = env.DEFAULT_LANGUAGE || "EnglishUS";
    return T(this.guildLocale, key, ...args);
  }
  async sendFollowUp(content) {
    if (this.isInteraction) {
      if (typeof content === "string" || isInteractionReplyOptions(content)) {
        await this.interaction?.followUp(content);
      }
    } else if (typeof content === "string" || isMessagePayload(content)) {
      this.msg = await (this.message?.channel).send(content);
    }
  }
  get deferred() {
    return this.isInteraction ? this.interaction?.deferred : !!this.msg;
  }
  options = {
    getRole: /* @__PURE__ */ __name((name, required = true) => {
      return this.interaction?.options.get(name, required)?.role;
    }, "getRole"),
    getMember: /* @__PURE__ */ __name((name, required = true) => {
      return this.interaction?.options.get(name, required)?.member;
    }, "getMember"),
    get: /* @__PURE__ */ __name((name, required = true) => {
      return this.interaction?.options.get(name, required);
    }, "get"),
    getChannel: /* @__PURE__ */ __name((name, required = true) => {
      return this.interaction?.options.get(name, required)?.channel;
    }, "getChannel"),
    getSubCommand: /* @__PURE__ */ __name(() => {
      return this.interaction?.options.data[0].name;
    }, "getSubCommand")
  };
};
function isInteractionReplyOptions(content) {
  return content instanceof Object;
}
__name(isInteractionReplyOptions, "isInteractionReplyOptions");
function isMessagePayload(content) {
  return content instanceof Object;
}
__name(isMessagePayload, "isMessagePayload");

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

// src/events/client/MessageCreate.ts
var MessageCreate = class extends Event {
  static {
    __name(this, "MessageCreate");
  }
  constructor(client, file) {
    super(client, file, {
      name: "messageCreate"
    });
  }
  async run(message) {
    if (message.author.bot) return;
    if (!(message.guild && message.guildId)) return;
    const setup = await this.client.db.getSetup(message.guildId);
    if (setup && setup.textId === message.channelId) {
      return this.client.emit("setupSystem", message);
    }
    const locale = await this.client.db.getLanguage(message.guildId);
    const guild = await this.client.db.get(message.guildId);
    const mention = new RegExp(`^<@!?${this.client.user?.id}>( |)$`);
    if (mention.test(message.content)) {
      await message.reply({
        content: T(locale, "event.message.prefix_mention", {
          prefix: guild?.prefix
        })
      });
      return;
    }
    const escapeRegex = /* @__PURE__ */ __name((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "escapeRegex");
    const prefixRegex = new RegExp(`^(<@!?${this.client.user?.id}>|${escapeRegex(guild.prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const match = message.content.match(prefixRegex);
    if (!match) return;
    const [matchedPrefix] = match;
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();
    if (!cmd) return;
    const command = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd));
    if (!command) return;
    const ctx = new Context(message, args);
    ctx.setArgs(args);
    ctx.guildLocale = locale;
    const clientMember = message.guild.members.resolve(this.client.user);
    const isDev = this.client.env.OWNER_IDS?.includes(message.author.id);
    if (!(message.inGuild() && message.channel.permissionsFor(clientMember)?.has(import_discord6.PermissionFlagsBits.ViewChannel))) return;
    if (!(clientMember.permissions.has(import_discord6.PermissionFlagsBits.ViewChannel) && clientMember.permissions.has(import_discord6.PermissionFlagsBits.SendMessages) && clientMember.permissions.has(import_discord6.PermissionFlagsBits.EmbedLinks) && clientMember.permissions.has(import_discord6.PermissionFlagsBits.ReadMessageHistory))) {
      return await message.author.send({
        content: T(locale, "event.message.no_send_message")
      }).catch(() => {
        null;
      });
    }
    if (command.permissions) {
      if (command.permissions?.client) {
        const missingClientPermissions = command.permissions.client.filter((perm) => !clientMember.permissions.has(perm));
        if (missingClientPermissions.length > 0) {
          return await message.reply({
            content: T(locale, "event.message.no_permission", {
              permissions: missingClientPermissions.map((perm) => `\`${perm}\``).join(", ")
            })
          });
        }
      }
      if (command.permissions?.user) {
        if (!(isDev || message.member.permissions.has(command.permissions.user))) {
          return await message.reply({
            content: T(locale, "event.message.no_user_permission")
          });
        }
      }
      if (command.permissions?.dev && this.client.env.OWNER_IDS) {
        if (!isDev) return;
      }
    }
    if (command.vote && this.client.env.TOPGG) {
      const voted = await this.client.topGG.hasVoted(message.author.id);
      if (!(isDev || voted)) {
        const voteBtn = new import_discord6.ActionRowBuilder().addComponents(new import_discord6.ButtonBuilder().setLabel(T(locale, "event.message.vote_button")).setURL(`https://top.gg/bot/${this.client.user?.id}/vote`).setStyle(import_discord6.ButtonStyle.Link));
        return await message.reply({
          content: T(locale, "event.message.vote_message"),
          components: [
            voteBtn
          ]
        });
      }
    }
    if (command.player) {
      if (command.player.voice) {
        if (!message.member.voice.channel) {
          return await message.reply({
            content: T(locale, "event.message.no_voice_channel", {
              command: command.name
            })
          });
        }
        if (!clientMember.permissions.has(import_discord6.PermissionFlagsBits.Connect)) {
          return await message.reply({
            content: T(locale, "event.message.no_connect_permission", {
              command: command.name
            })
          });
        }
        if (!clientMember.permissions.has(import_discord6.PermissionFlagsBits.Speak)) {
          return await message.reply({
            content: T(locale, "event.message.no_speak_permission", {
              command: command.name
            })
          });
        }
        if (message.member.voice.channel?.type === import_discord6.ChannelType.GuildStageVoice && !clientMember.permissions.has(import_discord6.PermissionFlagsBits.RequestToSpeak)) {
          return await message.reply({
            content: T(locale, "event.message.no_request_to_speak", {
              command: command.name
            })
          });
        }
        if (clientMember.voice.channel && clientMember.voice.channelId !== message.member.voice.channelId) {
          return await message.reply({
            content: T(locale, "event.message.different_voice_channel", {
              channel: `<#${clientMember.voice.channelId}>`,
              command: command.name
            })
          });
        }
      }
      if (command.player.active) {
        const queue = this.client.manager.getPlayer(message.guildId);
        if (!queue?.queue.current) {
          return await message.reply({
            content: T(locale, "event.message.no_music_playing")
          });
        }
      }
      if (command.player.dj) {
        const dj = await this.client.db.getDj(message.guildId);
        if (dj?.mode) {
          const djRole = await this.client.db.getRoles(message.guildId);
          if (!djRole) {
            return await message.reply({
              content: T(locale, "event.message.no_dj_role")
            });
          }
          const hasDJRole = message.member.roles.cache.some((role) => djRole.map((r) => r.roleId).includes(role.id));
          if (!(isDev || hasDJRole && !message.member.permissions.has(import_discord6.PermissionFlagsBits.ManageGuild))) {
            return await message.reply({
              content: T(locale, "event.message.no_dj_permission")
            });
          }
        }
      }
    }
    if (command.args && args.length === 0) {
      const embed = this.client.embed().setColor(this.client.color.red).setTitle(T(locale, "event.message.missing_arguments")).setDescription(T(locale, "event.message.missing_arguments_description", {
        command: command.name,
        examples: command.description.examples ? command.description.examples.join("\n") : "None"
      })).setFooter({
        text: T(locale, "event.message.syntax_footer")
      });
      await message.reply({
        embeds: [
          embed
        ]
      });
      return;
    }
    if (!this.client.cooldown.has(cmd)) {
      this.client.cooldown.set(cmd, new import_discord6.Collection());
    }
    const now = Date.now();
    const timestamps = this.client.cooldown.get(cmd);
    const cooldownAmount = (command.cooldown || 5) * 1e3;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      const timeLeft = (expirationTime - now) / 1e3;
      if (now < expirationTime && timeLeft > 0.9) {
        return await message.reply({
          content: T(locale, "event.message.cooldown", {
            time: timeLeft.toFixed(1),
            command: cmd
          })
        });
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    if (args.includes("@everyone") || args.includes("@here")) {
      return await message.reply({
        content: T(locale, "event.message.no_mention_everyone")
      });
    }
    try {
      return command.run(this.client, ctx, ctx.args);
    } catch (error) {
      this.client.logger.error(error);
      await message.reply({
        content: T(locale, "event.message.error", {
          error: error.message || "Unknown error"
        })
      });
    } finally {
      const logs = this.client.channels.cache.get(this.client.env.LOG_COMMANDS_ID);
      if (logs) {
        const embed = new import_discord6.EmbedBuilder().setAuthor({
          name: "Prefix - Command Logs",
          iconURL: this.client.user?.avatarURL({
            size: 2048
          })
        }).setColor(this.client.config.color.green).addFields({
          name: "Command",
          value: `\`${command.name}\``,
          inline: true
        }, {
          name: "User",
          value: `${message.author.tag} (\`${message.author.id}\`)`,
          inline: true
        }, {
          name: "Guild",
          value: `${message.guild.name} (\`${message.guild.id}\`)`,
          inline: true
        }).setTimestamp();
        await logs.send({
          embeds: [
            embed
          ]
        });
      }
    }
  }
};
