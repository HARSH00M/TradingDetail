"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = upload;
const storage_1 = __importDefault(require("./storage"));
const multer_1 = __importDefault(require("multer"));
const filter_1 = __importDefault(require("./filter"));
function upload() {
    return (0, multer_1.default)({
        storage: storage_1.default,
        limits: {
            fields: 5,
            fieldNameSize: 50, // TODO: Check if this size is enough
            fieldSize: 20000, // TODO: Check if this size is enough
            // TODO: Change this line after compression
            fileSize: 15000000, // 15 MB
        },
        fileFilter: function (_req, file, cb) {
            (0, filter_1.default)(file, cb);
        }
    }).single('csvfile');
}
//# sourceMappingURL=main.js.map