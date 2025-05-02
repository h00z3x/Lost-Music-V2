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

// src/plugin/plugins/antiCrash.ts
var antiCrash_exports = {};
__export(antiCrash_exports, {
  default: () => antiCrash_default
});
module.exports = __toCommonJS(antiCrash_exports);
var antiCrash = {
  name: "AntiCrash Plugin",
  version: "1.0.0",
  author: "Appu",
  initialize: /* @__PURE__ */ __name((client) => {
    const handleExit = /* @__PURE__ */ __name(async () => {
      if (client) {
        client.logger.star("Disconnecting from Discord...");
        await client.destroy();
        client.logger.success("Successfully disconnected from Discord!");
        process.exit();
      }
    }, "handleExit");
    process.on("unhandledRejection", (reason, promise) => {
      client.logger.error("Unhandled Rejection at:", promise, "reason:", reason);
    });
    process.on("uncaughtException", (err) => {
      client.logger.error("Uncaught Exception thrown:", err);
    });
    process.on("SIGINT", handleExit);
    process.on("SIGTERM", handleExit);
    process.on("SIGQUIT", handleExit);
  }, "initialize")
};
var antiCrash_default = antiCrash;
