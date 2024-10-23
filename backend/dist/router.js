"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockdetail_1 = __importDefault(require("./src/routes/stockdetail"));
const search_1 = __importDefault(require("./src/routes/search"));
const tables_1 = __importDefault(require("./src/routes/tables"));
const auth_1 = __importDefault(require("./src/routes/auth"));
const insider_1 = __importDefault(require("./src/routes/insider"));
const router = (0, express_1.Router)();
router.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
router.use(stockdetail_1.default);
router.use("/tables", tables_1.default);
router.use(auth_1.default);
router.use(search_1.default);
router.use('/insider', insider_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map