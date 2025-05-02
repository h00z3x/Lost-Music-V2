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

// src/utils/Utils.ts
var Utils_exports = {};
__export(Utils_exports, {
  Utils: () => Utils
});
module.exports = __toCommonJS(Utils_exports);
var import_discord = require("discord.js");
var Utils = class {
  static {
    __name(this, "Utils");
  }
  static formatTime(ms) {
    const minuteMs = 60 * 1e3;
    const hourMs = 60 * minuteMs;
    const dayMs = 24 * hourMs;
    if (ms < minuteMs) return `${ms / 1e3}s`;
    if (ms < hourMs) return `${Math.floor(ms / minuteMs)}m ${Math.floor(ms % minuteMs / 1e3)}s`;
    if (ms < dayMs) return `${Math.floor(ms / hourMs)}h ${Math.floor(ms % hourMs / minuteMs)}m`;
    return `${Math.floor(ms / dayMs)}d ${Math.floor(ms % dayMs / hourMs)}h`;
  }
  static updateStatus(client, guildId) {
    const { user } = client;
    if (user && client.env.GUILD_ID && guildId === client.env.GUILD_ID) {
      const player = client.manager.getPlayer(client.env.GUILD_ID);
      user.setPresence({
        activities: [
          {
            name: client.env.BOT_ACTIVITY,
            type: client.env.BOT_ACTIVITY_TYPE
          }
        ],
        status: client.env.BOT_STATUS
      });
    }
  }
  static chunk(array, size) {
    const chunked_arr = [];
    for (let index = 0; index < array.length; index += size) {
      chunked_arr.push(array.slice(index, size + index));
    }
    return chunked_arr;
  }
  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB"
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }
  static formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  static parseTime(string) {
    const time = string.match(/(\d+[dhms])/g);
    if (!time) return 0;
    let ms = 0;
    for (const t of time) {
      const unit = t[t.length - 1];
      const amount = Number(t.slice(0, -1));
      if (unit === "d") ms += amount * 24 * 60 * 60 * 1e3;
      else if (unit === "h") ms += amount * 60 * 60 * 1e3;
      else if (unit === "m") ms += amount * 60 * 1e3;
      else if (unit === "s") ms += amount * 1e3;
    }
    return ms;
  }
  static progressBar(current, total, size = 20) {
    const percent = Math.round(current / total * 100);
    const filledSize = Math.round(size * current / total);
    const filledBar = "\u2593".repeat(filledSize);
    const emptyBar = "\u2591".repeat(size - filledSize);
    return `${filledBar}${emptyBar} ${percent}%`;
  }
  static async paginate(client, ctx, embed) {
    if (embed.length < 2) {
      if (ctx.isInteraction) {
        ctx.deferred ? ctx.interaction?.followUp({
          embeds: embed
        }) : ctx.interaction?.reply({
          embeds: embed
        });
        return;
      }
      ctx.channel.send({
        embeds: embed
      });
      return;
    }
    let page = 0;
    const getButton = /* @__PURE__ */ __name((page2) => {
      const firstEmbed = page2 === 0;
      const lastEmbed = page2 === embed.length - 1;
      const pageEmbed = embed[page2];
      const first = new import_discord.ButtonBuilder().setCustomId("first").setEmoji(client.emoji.page.first).setStyle(import_discord.ButtonStyle.Primary).setDisabled(firstEmbed);
      const back = new import_discord.ButtonBuilder().setCustomId("back").setEmoji(client.emoji.page.back).setStyle(import_discord.ButtonStyle.Primary).setDisabled(firstEmbed);
      const next = new import_discord.ButtonBuilder().setCustomId("next").setEmoji(client.emoji.page.next).setStyle(import_discord.ButtonStyle.Primary).setDisabled(lastEmbed);
      const last = new import_discord.ButtonBuilder().setCustomId("last").setEmoji(client.emoji.page.last).setStyle(import_discord.ButtonStyle.Primary).setDisabled(lastEmbed);
      const stop = new import_discord.ButtonBuilder().setCustomId("stop").setEmoji(client.emoji.page.cancel).setStyle(import_discord.ButtonStyle.Danger);
      const row = new import_discord.ActionRowBuilder().addComponents(first, back, stop, next, last);
      return {
        embeds: [
          pageEmbed
        ],
        components: [
          row
        ]
      };
    }, "getButton");
    const msgOptions = getButton(0);
    let msg;
    if (ctx.isInteraction) {
      if (ctx.deferred) {
        msg = await ctx.interaction.followUp({
          ...msgOptions,
          withResponse: true
        });
      } else {
        msg = await ctx.interaction.reply({
          ...msgOptions,
          withResponse: true
        });
      }
    } else {
      msg = await ctx.channel.send({
        ...msgOptions,
        withResponse: true
      });
    }
    const author = ctx instanceof import_discord.CommandInteraction ? ctx.user : ctx.author;
    const filter = /* @__PURE__ */ __name((int) => int.user.id === author?.id, "filter");
    const collector = msg.createMessageComponentCollector({
      filter,
      time: 6e4
    });
    collector.on("collect", async (interaction) => {
      if (interaction.user.id === author?.id) {
        await interaction.deferUpdate();
        if (interaction.customId === "first" && page !== 0) {
          page = 0;
        } else if (interaction.customId === "back" && page !== 0) {
          page--;
        } else if (interaction.customId === "stop") {
          collector.stop();
        } else if (interaction.customId === "next" && page !== embed.length - 1) {
          page++;
        } else if (interaction.customId === "last" && page !== embed.length - 1) {
          page = embed.length - 1;
        }
        await interaction.editReply(getButton(page));
      } else {
        await interaction.reply({
          content: ctx.locale("buttons.errors.not_author"),
          flags: import_discord.MessageFlags.Ephemeral
        });
      }
    });
    collector.on("end", async () => {
      await msg.edit({
        embeds: [
          embed[page]
        ],
        components: []
      });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Utils
});
