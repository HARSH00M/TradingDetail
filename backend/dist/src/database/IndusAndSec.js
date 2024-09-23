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
const config_1 = __importDefault(require("./config"));
function PerformTransactionUpdation() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, config_1.default) `ALTER TABLE transactions ADD COLUMN industry VARCHAR;
        ALTER TABLE transactions ADD COLUMN sector VARCHAR;`;
            console.log("Updated transactions table");
            yield (0, config_1.default) `UPDATE transactions t SET "industry" = s.industry, "sector" = s.sector FROM stockdata s WHERE t.symbol = s.nsesymbol`;
            console.log("Updated transactions table with industry and sector");
        }
        catch (err) {
            console.log(err);
        }
    });
}
//# sourceMappingURL=IndusAndSec.js.map