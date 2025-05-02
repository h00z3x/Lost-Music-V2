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

// src/utils/SetupSystem.ts
var SetupSystem_exports = {};
__export(SetupSystem_exports, {
  buttonReply: () => buttonReply,
  oops: () => oops,
  setupStart: () => setupStart,
  trackStart: () => trackStart,
  updateSetup: () => updateSetup
});
module.exports = __toCommonJS(SetupSystem_exports);
var import_discord3 = require("discord.js");

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
function T(locale, text, ...params) {
  import_i18n.default.setLocale(locale);
  return import_i18n.default.__mf(text, ...params);
}
__name(T, "T");

// src/utils/Buttons.ts
var import_discord2 = require("discord.js");
function getButtons(player, client) {
  const buttonData = [
    {
      customId: "PREV_BUT",
      emoji: client.emoji.previous,
      style: import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "REWIND_BUT",
      emoji: client.emoji.rewind,
      style: import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "PAUSE_BUT",
      emoji: player?.paused ? client.emoji.resume : client.emoji.pause,
      style: player?.paused ? import_discord2.ButtonStyle.Success : import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "FORWARD_BUT",
      emoji: client.emoji.forward,
      style: import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "SKIP_BUT",
      emoji: client.emoji.skip,
      style: import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "LOW_VOL_BUT",
      emoji: client.emoji.voldown,
      style: import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "LOOP_BUT",
      emoji: client.emoji.loop.none,
      style: import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "STOP_BUT",
      emoji: client.emoji.stop,
      style: import_discord2.ButtonStyle.Danger
    },
    {
      customId: "SHUFFLE_BUT",
      emoji: client.emoji.shuffle,
      style: import_discord2.ButtonStyle.Secondary
    },
    {
      customId: "HIGH_VOL_BUT",
      emoji: client.emoji.volup,
      style: import_discord2.ButtonStyle.Secondary
    }
  ];
  return buttonData.reduce((rows, { customId, emoji, style }, index) => {
    if (index % 5 === 0) rows.push(new import_discord2.ActionRowBuilder());
    let emojiFormat;
    if (typeof emoji === "string" && emoji.startsWith("<:")) {
      const match = emoji.match(/^<:\w+:(\d+)>$/);
      emojiFormat = match ? match[1] : emoji;
    } else {
      emojiFormat = emoji;
    }
    const button = new import_discord2.ButtonBuilder().setCustomId(customId).setEmoji(emojiFormat).setStyle(style);
    rows[rows.length - 1].addComponents(button);
    return rows;
  }, []);
}
__name(getButtons, "getButtons");

// src/utils/SetupSystem.ts
function neb(embed, player, client, locale) {
  if (!player?.queue.current?.info) return embed;
  const iconUrl = client.config.icons[player.queue.current.info.sourceName] || client.user.displayAvatarURL({
    extension: "png"
  });
  const icon = player.queue.current.info.artworkUrl || client.config.links.img;
  const description = T(locale, "player.setupStart.description", {
    title: player.queue.current.info.title,
    uri: player.queue.current.info.uri,
    author: player.queue.current.info.author,
    length: client.utils.formatTime(player.queue.current.info.duration),
    requester: player.queue.current.requester.id
  });
  return embed.setAuthor({
    name: T(locale, "player.setupStart.now_playing"),
    iconURL: iconUrl
  }).setDescription(description).setImage(icon).setColor(client.color.main);
}
__name(neb, "neb");
async function setupStart(client, query, player, message) {
  let m;
  const embed = client.embed();
  const n = client.embed().setColor(client.color.main);
  const data = await client.db.getSetup(message.guild.id);
  const locale = await client.db.getLanguage(message.guildId);
  try {
    if (data) m = await message.channel.messages.fetch({
      message: data.messageId,
      cache: true
    });
  } catch (error) {
    client.logger.error(error);
  }
  if (m) {
    try {
      if (message.inGuild()) {
        const res = await player.search(query, message.author);
        switch (res.loadType) {
          case "empty":
          case "error":
            await message.channel.send({
              embeds: [
                embed.setColor(client.color.red).setDescription(T(locale, "player.setupStart.error_searching"))
              ]
            }).then((msg) => setTimeout(() => msg.delete(), 5e3));
            break;
          case "search":
          case "track": {
            player.queue.add(res.tracks[0]);
            await message.channel.send({
              embeds: [
                embed.setColor(client.color.main).setDescription(T(locale, "player.setupStart.added_to_queue", {
                  title: res.tracks[0].info.title,
                  uri: res.tracks[0].info.uri
                }))
              ]
            }).then((msg) => setTimeout(() => msg.delete(), 5e3));
            neb(n, player, client, locale);
            await m.edit({
              embeds: [
                n
              ]
            }).catch(() => {
              null;
            });
            break;
          }
          case "playlist": {
            player.queue.add(res.tracks);
            await message.channel.send({
              embeds: [
                embed.setColor(client.color.main).setDescription(T(locale, "player.setupStart.added_playlist_to_queue", {
                  length: res.tracks.length
                }))
              ]
            }).then((msg) => setTimeout(() => msg.delete(), 5e3));
            neb(n, player, client, locale);
            await m.edit({
              embeds: [
                n
              ]
            }).catch(() => {
              null;
            });
            break;
          }
        }
        if (!player.playing && player.queue.tracks.length > 0) await player.play();
      }
    } catch (error) {
      client.logger.error(error);
    }
  }
}
__name(setupStart, "setupStart");
async function trackStart(msgId, channel, player, track, client, locale) {
  const icon = player.queue.current ? player.queue.current.info.artworkUrl : client.config.links.img;
  let m;
  try {
    m = await channel.messages.fetch({
      message: msgId,
      cache: true
    });
  } catch (error) {
    client.logger.error(error);
  }
  const iconUrl = client.config.icons[player.queue.current.info.sourceName] || client.user.displayAvatarURL({
    extension: "png"
  });
  const description = T(locale, "player.setupStart.description", {
    title: track.info.title,
    uri: track.info.uri,
    author: track.info.author,
    length: client.utils.formatTime(track.info.duration),
    requester: player.queue.current.requester.id
  });
  const embed = client.embed().setAuthor({
    name: T(locale, "player.setupStart.now_playing"),
    iconURL: iconUrl
  }).setColor(client.color.main).setDescription(description).setImage(icon);
  if (m) {
    await m.edit({
      embeds: [
        embed
      ],
      components: getButtons(player, client).map((b) => {
        b.components.forEach((c) => c.setDisabled(!player?.queue.current));
        return b;
      })
    }).catch(() => {
      null;
    });
  } else {
    await channel.send({
      embeds: [
        embed
      ],
      components: getButtons(player, client).map((b) => {
        b.components.forEach((c) => c.setDisabled(!player?.queue.current));
        return b;
      })
    }).then((msg) => {
      client.db.setSetup(msg.guild.id, msg.id, msg.channel.id);
    }).catch(() => {
      null;
    });
  }
}
__name(trackStart, "trackStart");
async function updateSetup(client, guild, locale) {
  const setup = await client.db.getSetup(guild.id);
  let m;
  if (setup?.textId) {
    const textChannel = guild.channels.cache.get(setup.textId);
    if (!textChannel) return;
    try {
      m = await textChannel.messages.fetch({
        message: setup.messageId,
        cache: true
      });
    } catch (error) {
      client.logger.error(error);
    }
  }
  if (m) {
    const player = client.manager.getPlayer(guild.id);
    if (player?.queue.current) {
      const iconUrl = client.config.icons[player.queue.current.info.sourceName] || client.user.displayAvatarURL({
        extension: "png"
      });
      const description = T(locale, "player.setupStart.description", {
        title: player.queue.current.info.title,
        uri: player.queue.current.info.uri,
        author: player.queue.current.info.author,
        length: client.utils.formatTime(player.queue.current.info.duration),
        requester: player.queue.current.requester.id
      });
      const embed = client.embed().setAuthor({
        name: T(locale, "player.setupStart.now_playing"),
        iconURL: iconUrl
      }).setColor(client.color.main).setDescription(description).setImage(player.queue.current.info.artworkUrl);
      await m.edit({
        embeds: [
          embed
        ],
        components: getButtons(player, client).map((b) => {
          b.components.forEach((c) => c.setDisabled(!player?.queue.current));
          return b;
        })
      }).catch(() => {
        null;
      });
    } else {
      const embed = client.embed().setColor(client.color.main).setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({
          extension: "png"
        })
      }).setDescription(T(locale, "player.setupStart.nothing_playing")).setImage(client.config.links.img);
      await m.edit({
        embeds: [
          embed
        ],
        components: getButtons(player, client).map((b) => {
          b.components.forEach((c) => c.setDisabled(true));
          return b;
        })
      }).catch(() => {
        null;
      });
    }
  }
}
__name(updateSetup, "updateSetup");
async function buttonReply(int, args, color) {
  const embed = new import_discord3.EmbedBuilder();
  let m;
  if (int.replied) {
    m = await int.editReply({
      embeds: [
        embed.setColor(color).setDescription(args)
      ]
    }).catch(() => {
      null;
    });
  } else {
    m = await int.followUp({
      embeds: [
        embed.setColor(color).setDescription(args)
      ]
    }).catch(() => {
      null;
    });
  }
  setTimeout(async () => {
    if (int && !int.flags?.has(import_discord3.MessageFlags.Ephemeral)) {
      await m.delete().catch(() => {
        null;
      });
    }
  }, 2e3);
}
__name(buttonReply, "buttonReply");
async function oops(channel, args) {
  try {
    const embed1 = new import_discord3.EmbedBuilder().setColor("Red").setDescription(`${args}`);
    const m = await channel.send({
      embeds: [
        embed1
      ]
    });
    setTimeout(async () => await m.delete().catch(() => {
      null;
    }), 12e3);
  } catch (e) {
    return console.error(e);
  }
}
__name(oops, "oops");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buttonReply,
  oops,
  setupStart,
  trackStart,
  updateSetup
});
