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

// src/structures/I18n.ts
var I18n_exports = {};
__export(I18n_exports, {
  T: () => T,
  descriptionLocalization: () => descriptionLocalization,
  i18n: () => import_i18n.default,
  initI18n: () => initI18n,
  localization: () => localization
});
module.exports = __toCommonJS(I18n_exports);
var import_i18n = __toESM(require("i18n"));
var import_discord = require("discord.js");

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
      import_discord.Locale[lan],
      name
    ],
    description: [
      import_discord.Locale[lan],
      T(lan, desc)
    ]
  };
}
__name(localization, "localization");
function descriptionLocalization(name, text) {
  return import_i18n.default.getLocales().map((locale) => {
    if (locale in import_discord.Locale) {
      const localeValue = import_discord.Locale[locale];
      return localization(localeValue, name, text);
    }
    return localization(locale, name, text);
  });
}
__name(descriptionLocalization, "descriptionLocalization");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  T,
  descriptionLocalization,
  i18n,
  initI18n,
  localization
});
