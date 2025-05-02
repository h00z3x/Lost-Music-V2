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

// src/database/server.ts
var server_exports = {};
__export(server_exports, {
  default: () => ServerData
});
module.exports = __toCommonJS(server_exports);
var import_client = require("@prisma/client");

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

// src/database/server.ts
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
