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

// src/structures/Command.ts
var Command_exports = {};
__export(Command_exports, {
  default: () => Command
});
module.exports = __toCommonJS(Command_exports);
var Command = class {
  static {
    __name(this, "Command");
  }
  client;
  name;
  name_localizations;
  description;
  description_localizations;
  aliases;
  cooldown;
  args;
  vote;
  player;
  permissions;
  slashCommand;
  options;
  category;
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.name_localizations = options.name_localizations ?? {};
    this.description = {
      content: options.description?.content ?? "No description provided",
      usage: options.description?.usage ?? "No usage provided",
      examples: options.description?.examples ?? [
        "No examples provided"
      ]
    };
    this.description_localizations = options.description_localizations ?? {};
    this.aliases = options.aliases ?? [];
    this.cooldown = options.cooldown ?? 3;
    this.args = options.args ?? false;
    this.vote = options.vote ?? false;
    this.player = {
      voice: options.player?.voice ?? false,
      dj: options.player?.dj ?? false,
      active: options.player?.active ?? false,
      djPerm: options.player?.djPerm ?? null
    };
    this.permissions = {
      dev: options.permissions?.dev ?? false,
      client: options.permissions?.client ?? [
        "SendMessages",
        "ViewChannel",
        "EmbedLinks"
      ],
      user: options.permissions?.user ?? []
    };
    this.slashCommand = options.slashCommand ?? false;
    this.options = options.options ?? [];
    this.category = options.category ?? "general";
  }
  async run(_client, _message, _args) {
    return await Promise.resolve();
  }
};
