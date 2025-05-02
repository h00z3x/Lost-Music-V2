"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/Buttons.ts
var Buttons_exports = {};
__export(Buttons_exports, {
  getButtons: () => getButtons
});
module.exports = __toCommonJS(Buttons_exports);
var import_discord = require("discord.js");
function getButtons(player, client) {
  const buttonData = [
    {
      customId: "PREV_BUT",
      emoji: client.emoji.previous,
      style: import_discord.ButtonStyle.Secondary
    },
    {
      customId: "REWIND_BUT",
      emoji: client.emoji.rewind,
      style: import_discord.ButtonStyle.Secondary
    },
    {
      customId: "PAUSE_BUT",
      emoji: player?.paused ? client.emoji.resume : client.emoji.pause,
      style: player?.paused ? import_discord.ButtonStyle.Success : import_discord.ButtonStyle.Secondary
    },
    {
      customId: "FORWARD_BUT",
      emoji: client.emoji.forward,
      style: import_discord.ButtonStyle.Secondary
    },
    {
      customId: "SKIP_BUT",
      emoji: client.emoji.skip,
      style: import_discord.ButtonStyle.Secondary
    },
    {
      customId: "LOW_VOL_BUT",
      emoji: client.emoji.voldown,
      style: import_discord.ButtonStyle.Secondary
    },
    {
      customId: "LOOP_BUT",
      emoji: client.emoji.loop.none,
      style: import_discord.ButtonStyle.Secondary
    },
    {
      customId: "STOP_BUT",
      emoji: client.emoji.stop,
      style: import_discord.ButtonStyle.Danger
    },
    {
      customId: "SHUFFLE_BUT",
      emoji: client.emoji.shuffle,
      style: import_discord.ButtonStyle.Secondary
    },
    {
      customId: "HIGH_VOL_BUT",
      emoji: client.emoji.volup,
      style: import_discord.ButtonStyle.Secondary
    }
  ];
  return buttonData.reduce((rows, { customId, emoji, style }, index) => {
    if (index % 5 === 0) rows.push(new import_discord.ActionRowBuilder());
    let emojiFormat;
    if (typeof emoji === "string" && emoji.startsWith("<:")) {
      const match = emoji.match(/^<:\w+:(\d+)>$/);
      emojiFormat = match ? match[1] : emoji;
    } else {
      emojiFormat = emoji;
    }
    const button = new import_discord.ButtonBuilder().setCustomId(customId).setEmoji(emojiFormat).setStyle(style);
    rows[rows.length - 1].addComponents(button);
    return rows;
  }, []);
}
__name(getButtons, "getButtons");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getButtons
});
