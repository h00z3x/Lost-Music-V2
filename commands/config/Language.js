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

// src/commands/config/Language.ts
var Language_exports = {};
__export(Language_exports, {
  default: () => LanguageCommand
});
module.exports = __toCommonJS(Language_exports);

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

// src/structures/I18n.ts
var import_i18n = __toESM(require("i18n"));
var import_discord = require("discord.js");

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
var LocaleFlags = {
  // [Language.Bulgarian]: "🇧🇬",
  ["ChineseCN"]: "\u{1F1E8}\u{1F1F3}",
  ["ChineseTW"]: "\u{1F1F9}\u{1F1FC}",
  // [Language.Croatian]: "🇭🇷",
  // [Language.Czech]: "🇨🇿",
  // [Language.Danish]: "🇩🇰",
  // [Language.Dutch]: "🇳🇱",
  // [Language.EnglishGB]: "🇬🇧",
  ["EnglishUS"]: "\u{1F1FA}\u{1F1F8}",
  // [Language.Finnish]: "🇫🇮",
  ["French"]: "\u{1F1EB}\u{1F1F7}",
  ["German"]: "\u{1F1E9}\u{1F1EA}",
  // [Language.Greek]: "🇬🇷",
  ["Hindi"]: "\u{1F1EE}\u{1F1F3}",
  // [Language.Hungarian]: "🇭🇺",
  ["Indonesian"]: "\u{1F1EE}\u{1F1E9}",
  // [Language.Italian]: "🇮🇹",
  ["Japanese"]: "\u{1F1EF}\u{1F1F5}",
  ["Korean"]: "\u{1F1F0}\u{1F1F7}",
  // [Language.Lithuanian]: "🇱🇹",
  ["Norwegian"]: "\u{1F1F3}\u{1F1F4}",
  ["Polish"]: "\u{1F1F5}\u{1F1F1}",
  // [Language.PortugueseBR]: "🇧🇷",
  // [Language.Romanian]: "🇷🇴",
  ["Russian"]: "\u{1F1F7}\u{1F1FA}",
  ["SpanishES"]: "\u{1F1EA}\u{1F1F8}",
  // [Language.Swedish]: "🇸🇪",
  // [Language.Thai]: "🇹🇭",
  ["Turkish"]: "\u{1F1F9}\u{1F1F7}",
  // [Language.Ukrainian]: "🇺🇦",
  ["Vietnamese"]: "\u{1F1FB}\u{1F1F3}"
};

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

// src/commands/config/Language.ts
var LanguageCommand = class extends Command {
  static {
    __name(this, "LanguageCommand");
  }
  constructor(client) {
    super(client, {
      name: "language",
      description: {
        content: "cmd.language.description",
        examples: [
          "language set `EnglishUS`",
          "language reset"
        ],
        usage: "language"
      },
      category: "config",
      aliases: [
        "lang"
      ],
      cooldown: 3,
      args: true,
      vote: false,
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
          "EmbedLinks"
        ],
        user: [
          "ManageGuild"
        ]
      },
      slashCommand: true,
      options: [
        {
          name: "set",
          description: "cmd.language.options.set",
          type: 1,
          options: [
            {
              name: "language",
              description: "cmd.language.options.language",
              type: 3,
              required: true,
              autocomplete: true
            }
          ]
        },
        {
          name: "reset",
          description: "cmd.language.options.reset",
          type: 1
        }
      ]
    });
  }
  async run(client, ctx, args) {
    let subCommand;
    if (ctx.isInteraction) {
      subCommand = ctx.options.getSubCommand();
    } else {
      subCommand = args.shift();
    }
    const defaultLanguage = env.DEFAULT_LANGUAGE || Language.EnglishUS;
    if (subCommand === "set") {
      const embed = client.embed().setColor(this.client.color.main);
      const locale = await client.db.getLanguage(ctx.guild.id) || defaultLanguage;
      let lang;
      if (ctx.isInteraction) {
        lang = ctx.options.get("language")?.value;
      } else {
        lang = args[0];
      }
      if (!Object.values(Language).includes(lang)) {
        const availableLanguages = Object.entries(LocaleFlags).map(([key, value]) => `${value}:\`${key}\``).reduce((acc, curr, index) => {
          if (index % 2 === 0) {
            return acc + curr + (index === Object.entries(LocaleFlags).length - 1 ? "" : " ");
          }
          return `${acc + curr}
`;
        }, "");
        return ctx.sendMessage({
          embeds: [
            embed.setDescription(ctx.locale("cmd.language.invalid_language", {
              languages: availableLanguages
            }))
          ]
        });
      }
      if (locale && locale === lang) {
        return ctx.sendMessage({
          embeds: [
            embed.setDescription(ctx.locale("cmd.language.already_set", {
              language: lang
            }))
          ]
        });
      }
      await client.db.updateLanguage(ctx.guild.id, lang);
      ctx.guildLocale = lang;
      return ctx.sendMessage({
        embeds: [
          embed.setDescription(ctx.locale("cmd.language.set", {
            language: lang
          }))
        ]
      });
    }
    if (subCommand === "reset") {
      const embed = client.embed().setColor(this.client.color.main);
      const locale = await client.db.getLanguage(ctx.guild.id);
      if (!locale) {
        return ctx.sendMessage({
          embeds: [
            embed.setDescription(ctx.locale("cmd.language.not_set"))
          ]
        });
      }
      await client.db.updateLanguage(ctx.guild.id, defaultLanguage);
      ctx.guildLocale = defaultLanguage;
      return ctx.sendMessage({
        embeds: [
          embed.setDescription(ctx.locale("cmd.language.reset"))
        ]
      });
    }
  }
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const languages = Object.values(Language).map((language) => ({
      name: language,
      value: language
    }));
    const filtered = languages.filter((language) => language.name.toLowerCase().includes(focusedValue.toLowerCase()));
    await interaction.respond(filtered.slice(0, 25)).catch(console.error);
  }
};
