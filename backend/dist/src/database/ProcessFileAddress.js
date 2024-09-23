"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function processfilename(filename) {
    const filepath = path_1.default.join(__dirname, '../../../uploadedContent', filename);
    return filepath;
}
exports.default = processfilename;
//# sourceMappingURL=ProcessFileAddress.js.map