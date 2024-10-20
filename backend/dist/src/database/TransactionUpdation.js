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
exports.PerformTransactionUpdation = PerformTransactionUpdation;
const config_1 = __importDefault(require("./config"));
function PerformTransactionUpdation() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const wait1 = await sql`ALTER TABLE transactions ADD COLUMN industry VARCHAR;`
            // const wait2 = await sql`ALTER TABLE transactions ADD COLUMN sector VARCHAR;`
            // if(wait1)
            //     console.log("Added industry column to transactions table")
            // if(wait2)
            //     console.log("Added sector column to transactions table")
            const data = yield (0, config_1.default) `UPDATE transactions t SET "industry" = s.industry, "sector" = s.sector FROM stockdata s WHERE t.symbol = s.nsesymbol`;
            if (data)
                console.log("Updated transactions table with industry and sector");
            return data;
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
//# sourceMappingURL=TransactionUpdation.js.map