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

// src/utils/BotLog.ts
var BotLog_exports = {};
__export(BotLog_exports, {
  sendLog: () => sendLog
});
module.exports = __toCommonJS(BotLog_exports);
function sendLog(client, message, type = "info") {
  if (!client?.channels.cache && client.env.LOG_CHANNEL_ID) return;
  const channel = client.channels.cache.get(client.env.LOG_CHANNEL_ID);
  if (!channel) return;
  const colors = {
    error: 16711680,
    warn: 16776960,
    info: 65280,
    success: 65280
  };
  const color = colors[type];
  const embed = client.embed().setColor(color).setDescription(message).setTimestamp();
  channel.send({
    embeds: [
      embed
    ]
  }).catch(() => {
    null;
  });
}
__name(sendLog, "sendLog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendLog
});
