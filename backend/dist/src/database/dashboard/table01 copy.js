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
exports.MaximumNumbersOfTransactionsIndustryWise = MaximumNumbersOfTransactionsIndustryWise;
const config_1 = __importDefault(require("../config"));
function MaximumNumbersOfTransactionsIndustryWise() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, config_1.default) `SELECT industry, 
            SUM(CAST(value_of_security_acquired_disposed AS numeric)) AS total_value
            FROM transactions
            WHERE value_of_security_acquired_disposed ~ '^[0-9]+(\.[0-9]+)?$'
            GROUP BY industry
            HAVING SUM(CAST(value_of_security_acquired_disposed AS numeric)) > 0
            ORDER BY total_value DESC;
         `;
            return result;
        }
        catch (err) {
            throw new Error("Error in fetching Maximum Numbers Of Transactions Industry Wise");
        }
    });
}
//# sourceMappingURL=table01%20copy.js.map