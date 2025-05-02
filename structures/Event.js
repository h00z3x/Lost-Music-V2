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

// src/structures/Event.ts
var Event_exports = {};
__export(Event_exports, {
  default: () => Event
});
module.exports = __toCommonJS(Event_exports);
var Event = class {
  static {
    __name(this, "Event");
  }
  client;
  one;
  file;
  name;
  fileName;
  constructor(client, file, options) {
    this.client = client;
    this.file = file;
    this.name = options.name;
    this.one = options.one ?? false;
    this.fileName = file.split(".")[0];
  }
  async run(..._args) {
    return await Promise.resolve();
  }
};
