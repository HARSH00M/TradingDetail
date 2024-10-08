"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkFileType;
const path = require('path');
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /csv/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        return cb(null, false);
    }
}
//# sourceMappingURL=filter.js.map