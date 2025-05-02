"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/config.ts
var config_exports = {};
__export(config_exports, {
  default: () => config_default
});
module.exports = __toCommonJS(config_exports);
var config_default = {
  color: {
    red: 4292673536,
    green: 4278247680,
    blue: 28079,
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
