"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const moment_1 = __importDefault(require("moment"));
const storage = multer_1.default.diskStorage({
    destination: './uploadedContent',
    filename: function (_req, file, cb) {
        const date = Date.now();
        const formattedDate = (0, moment_1.default)(date).format('MMMM-Do-YYYY-h-mm-ss-a');
        const generatedFilename = file.fieldname + '-' + formattedDate + '.csv';
        // Attach the filename to the request object
        _req.generatedFilename = generatedFilename;
        cb(null, generatedFilename);
    }
});
exports.default = storage;
//# sourceMappingURL=storage.js.map