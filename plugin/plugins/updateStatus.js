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

// src/plugin/plugins/updateStatus.ts
var updateStatus_exports = {};
__export(updateStatus_exports, {
  default: () => updateStatus_default
});
module.exports = __toCommonJS(updateStatus_exports);
var updateStatusPlugin = {
  name: "Update Status Plugin",
  version: "1.0.0",
  author: "Appu",
  initialize: /* @__PURE__ */ __name((client) => {
    client.on("ready", () => client.utils.updateStatus(client));
  }, "initialize")
};
var updateStatus_default = updateStatusPlugin;
