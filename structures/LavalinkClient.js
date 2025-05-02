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

// src/structures/LavalinkClient.ts
var LavalinkClient_exports = {};
__export(LavalinkClient_exports, {
  default: () => LavalinkClient
});
module.exports = __toCommonJS(LavalinkClient_exports);
var import_lavalink_client = require("lavalink-client");

// src/utils/functions/player.ts
var requesterTransformer = /* @__PURE__ */ __name((requester) => {
  if (typeof requester === "object" && "avatar" in requester && Object.keys(requester).length === 3) return requester;
  if (typeof requester === "object" && "displayAvatarURL" in requester) {
    return {
      id: requester.id,
      username: requester.username,
      avatarURL: requester.displayAvatarURL({
        extension: "png"
      }),
      discriminator: requester.discriminator
    };
  }
  return {
    id: requester.toString(),
    username: "unknown"
  };
}, "requesterTransformer");
async function autoPlayFunction(player, lastTrack) {
  if (!player.get("autoplay")) return;
  if (!lastTrack) return;
  if (lastTrack.info.sourceName === "spotify") {
    const filtered = player.queue.previous.filter((v) => v.info.sourceName === "spotify").slice(0, 5);
    const ids = filtered.map((v) => v.info.identifier || v.info.uri.split("/")?.reverse()?.[0] || v.info.uri.split("/")?.reverse()?.[1]);
    if (ids.length >= 2) {
      const res = await player.search({
        query: `seed_tracks=${ids.join(",")}`,
        source: "sprec"
      }, lastTrack.requester).then((response) => {
        response.tracks = response.tracks.filter((v) => v.info.identifier !== lastTrack.info.identifier);
        return response;
      }).catch(console.warn);
      if (res && res.tracks.length > 0) await player.queue.add(res.tracks.slice(0, 5).map((track) => {
        track.pluginInfo.clientData = {
          ...track.pluginInfo.clientData || {},
          fromAutoplay: true
        };
        return track;
      }));
    }
    return;
  }
  if (lastTrack.info.sourceName === "youtube" || lastTrack.info.sourceName === "youtubemusic") {
    const res = await player.search({
      query: `https://www.youtube.com/watch?v=${lastTrack.info.identifier}&list=RD${lastTrack.info.identifier}`,
      source: "youtube"
    }, lastTrack.requester).then((response) => {
      response.tracks = response.tracks.filter((v) => v.info.identifier !== lastTrack.info.identifier);
      return response;
    }).catch(console.warn);
    if (res && res.tracks.length > 0) await player.queue.add(res.tracks.slice(0, 5).map((track) => {
      track.pluginInfo.clientData = {
        ...track.pluginInfo.clientData || {},
        fromAutoplay: true
      };
      return track;
    }));
    return;
  }
  if (lastTrack.info.sourceName === "jiosaavn") {
    const res = await player.search({
      query: `jsrec:${lastTrack.info.identifier}`,
      source: "jsrec"
    }, lastTrack.requester);
    if (res.tracks.length > 0) {
      const track = res.tracks.filter((v) => v.info.identifier !== lastTrack.info.identifier)[0];
      await player.queue.add(track);
    }
  }
  return;
}
__name(autoPlayFunction, "autoPlayFunction");

// src/structures/LavalinkClient.ts
var LavalinkClient = class extends import_lavalink_client.LavalinkManager {
  static {
    __name(this, "LavalinkClient");
  }
  client;
  constructor(client) {
    super({
      nodes: client.env.NODES,
      sendToShard: /* @__PURE__ */ __name((guildId, payload) => client.guilds.cache.get(guildId)?.shard?.send(payload), "sendToShard"),
      queueOptions: {
        maxPreviousTracks: 25
      },
      playerOptions: {
        defaultSearchPlatform: client.env.SEARCH_ENGINE,
        onDisconnect: {
          autoReconnect: true,
          destroyPlayer: false
        },
        requesterTransformer,
        onEmptyQueue: {
          autoPlayFunction
        }
      }
    });
    this.client = client;
  }
  /**
  * Searches for a song and returns the tracks.
  * @param query The query to search for.
  * @param user The user who requested the search.
  * @param source The source to search in. Defaults to youtube.
  * @returns An array of tracks that match the query.
  */
  async search(query, user, source) {
    const nodes = this.nodeManager.leastUsedNodes();
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    const result = await node.search({
      query,
      source
    }, user, false);
    return result;
  }
};
