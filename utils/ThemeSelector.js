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

// src/utils/ThemeSelector.ts
var ThemeSelector_exports = {};
__export(ThemeSelector_exports, {
  ThemeSelector: () => ThemeSelector
});
module.exports = __toCommonJS(ThemeSelector_exports);
var ThemeSelector = class {
  static {
    __name(this, "ThemeSelector");
  }
  /**
  * Applies a yellow fire effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the green fire effect.
  */
  fire(text) {
    let fade = "";
    let green = 250;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;255;${green};0m${line}\x1B[0m
`;
      green = Math.max(0, green - 25);
    }
    return fade;
  }
  /**
  * Applies a purple neon effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the purple neon effect.
  */
  purpleNeon(text) {
    let fade = "";
    let purple = 255;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;255;0;${purple}m${line}\x1B[0m
`;
      purple = Math.max(0, purple - 25);
    }
    return fade;
  }
  /**
  * Applies a cyan effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the cyan effect.
  */
  cyan(text) {
    let fade = "";
    let blue = 100;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;0;255;${blue}m${line}\x1B[0m
`;
      if (blue < 255) {
        blue = Math.min(255, blue + 15);
      }
    }
    return fade;
  }
  /**
  * Applies a water effect to the text.
  *
  * @param text - The input text to apply the effect to.
  * @returns The processed text with the water effect.
  */
  water(text) {
    let fade = "";
    let green = 255;
    for (const line of text.split("\n")) {
      fade += `\x1B[38;2;0;${green};255m${line}\x1B[0m
`;
      if (green > 30) {
        green = Math.max(30, green - 40);
      }
    }
    return fade;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeSelector
});
