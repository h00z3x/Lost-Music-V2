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

// src/types.ts
var types_exports = {};
__export(types_exports, {
  Language: () => Language,
  LocaleFlags: () => LocaleFlags,
  SearchEngine: () => SearchEngine
});
module.exports = __toCommonJS(types_exports);
var SearchEngine = /* @__PURE__ */ function(SearchEngine2) {
  SearchEngine2["YouTube"] = "ytsearch";
  SearchEngine2["YouTubeMusic"] = "ytmsearch";
  SearchEngine2["Spotify"] = "spsearch";
  SearchEngine2["Deezer"] = "dzsearch";
  SearchEngine2["Apple"] = "amsearch";
  SearchEngine2["SoundCloud"] = "scsearch";
  SearchEngine2["Yandex"] = "ymsearch";
  SearchEngine2["JioSaavn"] = "jssearch";
  return SearchEngine2;
}({});
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
var LocaleFlags = {
  // [Language.Bulgarian]: "🇧🇬",
  ["ChineseCN"]: "\u{1F1E8}\u{1F1F3}",
  ["ChineseTW"]: "\u{1F1F9}\u{1F1FC}",
  // [Language.Croatian]: "🇭🇷",
  // [Language.Czech]: "🇨🇿",
  // [Language.Danish]: "🇩🇰",
  // [Language.Dutch]: "🇳🇱",
  // [Language.EnglishGB]: "🇬🇧",
  ["EnglishUS"]: "\u{1F1FA}\u{1F1F8}",
  // [Language.Finnish]: "🇫🇮",
  ["French"]: "\u{1F1EB}\u{1F1F7}",
  ["German"]: "\u{1F1E9}\u{1F1EA}",
  // [Language.Greek]: "🇬🇷",
  ["Hindi"]: "\u{1F1EE}\u{1F1F3}",
  // [Language.Hungarian]: "🇭🇺",
  ["Indonesian"]: "\u{1F1EE}\u{1F1E9}",
  // [Language.Italian]: "🇮🇹",
  ["Japanese"]: "\u{1F1EF}\u{1F1F5}",
  ["Korean"]: "\u{1F1F0}\u{1F1F7}",
  // [Language.Lithuanian]: "🇱🇹",
  ["Norwegian"]: "\u{1F1F3}\u{1F1F4}",
  ["Polish"]: "\u{1F1F5}\u{1F1F1}",
  // [Language.PortugueseBR]: "🇧🇷",
  // [Language.Romanian]: "🇷🇴",
  ["Russian"]: "\u{1F1F7}\u{1F1FA}",
  ["SpanishES"]: "\u{1F1EA}\u{1F1F8}",
  // [Language.Swedish]: "🇸🇪",
  // [Language.Thai]: "🇹🇭",
  ["Turkish"]: "\u{1F1F9}\u{1F1F7}",
  // [Language.Ukrainian]: "🇺🇦",
  ["Vietnamese"]: "\u{1F1FB}\u{1F1F3}"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Language,
  LocaleFlags,
  SearchEngine
});
