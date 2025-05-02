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

// src/plugin/plugins/keepAlive.ts
var keepAlive_exports = {};
__export(keepAlive_exports, {
  default: () => keepAlive_default
});
module.exports = __toCommonJS(keepAlive_exports);
var import_node_http = __toESM(require("http"));

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

// src/plugin/plugins/keepAlive.ts
var keepAlive = {
  name: "KeepAlive Plugin",
  version: "1.0.0",
  author: "Appu",
  initialize: /* @__PURE__ */ __name((client) => {
    if (env.KEEP_ALIVE) {
      const server = import_node_http.default.createServer((_req, res) => {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end(`I'm alive! Currently serving ${client.guilds.cache.size} guilds.`);
      });
      server.listen(3e3, () => {
        client.logger.info("Keep-Alive server is running on port 3000");
      });
    }
  }, "initialize")
};
var keepAlive_default = keepAlive;
