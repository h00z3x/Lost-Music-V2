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

// src/index.ts
var fs = __toESM(require("fs"));

// src/shard.ts
var import_discord = require("discord.js");

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

// src/shard.ts
async function shardStart(logger2) {
  const manager = new import_discord.ShardingManager("./LavaClient.js", {
    respawn: true,
    token: env.TOKEN,
    totalShards: "auto",
    shardList: "auto"
  });
  manager.on("shardCreate", (shard) => {
    shard.on("ready", () => {
      logger2.start(`[CLIENT] Shard ${shard.id} connected to Discord's Gateway.`);
    });
  });
  await manager.spawn();
  logger2.start(`[CLIENT] ${manager.totalShards} shard(s) spawned.`);
}
__name(shardStart, "shardStart");

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

// src/utils/ThemeSelector.ts
var ThemeSelector = class {
  static {
    __name(this, "ThemeSelector");
  }
  /**
  * Applies a yellow fire effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the green fire effect.
  */
  fire(text) {
    let fade = "";
    let green = 250;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;255;${green};0m${line}\x1B[0m
`;
      green = Math.max(0, green - 25);
    }
    return fade;
  }
  /**
  * Applies a purple neon effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the purple neon effect.
  */
  purpleNeon(text) {
    let fade = "";
    let purple = 255;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;255;0;${purple}m${line}\x1B[0m
`;
      purple = Math.max(0, purple - 25);
    }
    return fade;
  }
  /**
  * Applies a cyan effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the cyan effect.
  */
  cyan(text) {
    let fade = "";
    let blue = 100;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;0;255;${blue}m${line}\x1B[0m
`;
      if (blue < 255) {
        blue = Math.min(255, blue + 15);
      }
    }
    return fade;
  }
  /**
  * Applies a water effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the water effect.
  */
  water(text) {
    let fade = "";
    let green = 255;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;0;${green};255m${line}\x1B[0m
`;
      if (green > 30) {
        green = Math.max(30, green - 40);
      }
    }
    return fade;
  }
};

// src/index.ts
var logger = new Logger();
var theme = new ThemeSelector();
function setConsoleTitle(title) {
  process.stdout.write(`\x1B]0;${title}\x07`);
}
__name(setConsoleTitle, "setConsoleTitle");
try {
  if (!fs.existsSync("./utils/LavaLogo.txt")) {
    logger.error("LavaLogo.txt file is missing");
    process.exit(1);
  }
  console.clear();
  setConsoleTitle("Lavamusic");
  const logFile = fs.readFileSync("./utils/LavaLogo.txt", "utf-8");
  console.log(theme.purpleNeon(logFile));
  shardStart(logger);
} catch (err) {
  logger.error("[CLIENT] An error has occurred:", err);
}
