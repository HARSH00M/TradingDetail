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
exports.MaximumNumbersOfTransactionsSectorWise = MaximumNumbersOfTransactionsSectorWise;
const config_1 = __importDefault(require("../config"));
function MaximumNumbersOfTransactionsSectorWise() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, config_1.default) `SELECT sector, 
        SUM(CAST(valueofsecurityacquireddisposed AS numeric)) AS total_value
        FROM transactions GROUP BY sector
        HAVING SUM(CAST(valueofsecurityacquireddisposed AS numeric)) > 0
        ORDER BY total_value DESC LIMIT 20;
         `;
            return result;
        }
        catch (err) {
            throw new Error("Error in fetching Maximum Numbers Of Transactions Sector Wise");
        }
    });
}
//# sourceMappingURL=table02.js.map