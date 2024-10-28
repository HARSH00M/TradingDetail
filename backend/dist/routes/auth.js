"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/auth", (req, res) => {
    const { email, password } = req.query;
    if (email === 'admin' && password === 'admin') {
        res.json({
            message: "Login Successful",
            authenticated: true
        });
    }
    else {
        res.json({
            message: "Login failed",
            authenticated: false
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map