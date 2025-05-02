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

// src/commands/playlist/Steal.ts
var Steal_exports = {};
__export(Steal_exports, {
  default: () => StealPlaylist
});
module.exports = __toCommonJS(Steal_exports);

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

// src/commands/playlist/Steal.ts
var StealPlaylist = class extends Command {
  static {
    __name(this, "StealPlaylist");
  }
  constructor(client) {
    super(client, {
      name: "steal",
      description: {
        content: "cmd.steal.description",
        examples: [
          "steal <@user> <playlist_name>"
        ],
        usage: "steal <@user> <playlist_name>"
      },
      category: "playlist",
      aliases: [
        "st"
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
        user: []
      },
      slashCommand: true,
      options: [
        {
          name: "user",
          description: "cmd.steal.options.user",
          type: 6,
          required: true
        },
        {
          name: "playlist",
          description: "cmd.steal.options.playlist",
          type: 3,
          required: true,
          autocomplete: true
        }
      ]
    });
  }
  async run(client, ctx) {
    let targetUser = ctx.args[0];
    const playlistName = ctx.args[1];
    let targetUserId = null;
    if (targetUser?.startsWith("<@") && targetUser.endsWith(">")) {
      targetUser = targetUser.slice(2, -1);
      if (targetUser.startsWith("!")) {
        targetUser = targetUser.slice(1);
      }
      targetUser = await client.users.fetch(targetUser);
      targetUserId = targetUser.id;
    } else if (targetUser) {
      try {
        targetUser = await client.users.fetch(targetUser);
        targetUserId = targetUser.id;
      } catch (_error) {
        const users = client.users.cache.filter((user) => user.username.toLowerCase() === targetUser.toLowerCase());
        if (users.size > 0) {
          targetUser = users.first();
          targetUserId = targetUser.id;
        } else {
          return await ctx.sendMessage({
            embeds: [
              {
                description: "Invalid username or user not found.",
                color: this.client.color.red
              }
            ]
          });
        }
      }
    }
    if (!playlistName) {
      return await ctx.sendMessage({
        embeds: [
          {
            description: ctx.locale("cmd.steal.messages.provide_playlist"),
            color: this.client.color.red
          }
        ]
      });
    }
    if (!targetUserId) {
      return await ctx.sendMessage({
        embeds: [
          {
            description: ctx.locale("cmd.steal.messages.provide_user"),
            color: this.client.color.red
          }
        ]
      });
    }
    try {
      const targetPlaylist = await client.db.getPlaylist(targetUserId, playlistName);
      if (!targetPlaylist) {
        return await ctx.sendMessage({
          embeds: [
            {
              description: ctx.locale("cmd.steal.messages.playlist_not_exist"),
              color: this.client.color.red
            }
          ]
        });
      }
      const targetSongs = await client.db.getTracksFromPlaylist(targetUserId, playlistName);
      const existingPlaylist = await client.db.getPlaylist(ctx.author?.id, playlistName);
      if (existingPlaylist) {
        return await ctx.sendMessage({
          embeds: [
            {
              description: ctx.locale("cmd.steal.messages.playlist_exists", {
                playlist: playlistName
              }),
              color: this.client.color.red
            }
          ]
        });
      }
      await client.db.createPlaylistWithTracks(ctx.author?.id, playlistName, targetSongs);
      return await ctx.sendMessage({
        embeds: [
          {
            description: ctx.locale("cmd.steal.messages.playlist_stolen", {
              playlist: playlistName,
              user: targetUser.username
            }),
            color: this.client.color.main
          }
        ]
      });
    } catch (error) {
      client.logger.error(error);
      return await ctx.sendMessage({
        embeds: [
          {
            description: ctx.locale("cmd.steal.messages.error_occurred"),
            color: this.client.color.red
          }
        ]
      });
    }
  }
  async autocomplete(interaction) {
    try {
      const focusedValue = interaction.options.getFocused();
      const userOptionId = interaction.options.get("user")?.value;
      if (!userOptionId) {
        await interaction.respond([
          {
            name: "Please specify a user to search their playlists.",
            value: "NoUser"
          }
        ]).catch(console.error);
        return;
      }
      const user = await interaction.client.users.fetch(userOptionId);
      if (!user) {
        await interaction.respond([
          {
            name: "User not found.",
            value: "NoUserFound"
          }
        ]).catch(console.error);
        return;
      }
      const playlists = await this.client.db.getUserPlaylists(user.id);
      if (!playlists || playlists.length === 0) {
        await interaction.respond([
          {
            name: "No playlists found for this user.",
            value: "NoPlaylists"
          }
        ]).catch(console.error);
        return;
      }
      const filtered = playlists.filter((playlist) => playlist.name.toLowerCase().startsWith(focusedValue.toLowerCase()));
      return await interaction.respond(filtered.map((playlist) => ({
        name: playlist.name,
        value: playlist.name
      }))).catch(console.error);
    } catch (error) {
      return await interaction.respond([
        {
          name: "An error occurred while fetching playlists.",
          value: "Error"
        }
      ]).catch(console.error);
    }
  }
};
