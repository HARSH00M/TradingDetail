"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = __importDefault(require("./search"));
const config_1 = __importDefault(require("../database/config"));
const StockRouter = search_1.default;
StockRouter.get('/stockdetail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("code executed");
        const result = yield (0, config_1.default) `SELECT table_name FROM information_schema.tables`;
        res.json({
            response: result
        });
    }
    catch (err) {
        res.json({
            error: err,
            message: err.message
        });
    }
}));
exports.default = StockRouter;
//# sourceMappingURL=stockdetail.js.map