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
exports.default = CreateStockDataDatabase;
const config_1 = __importDefault(require("./config"));
function CreateStockDataDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, config_1.default) `CREATE TABLE stockData (
        nseSymbol VARCHAR(255),
          bseCode VARCHAR(255),
          _id VARCHAR(255) PRIMARY KEY,
          marketCapitalization NUMERIC,
          closePrice NUMERIC,
          industry VARCHAR(255),
          sector VARCHAR(255),
          priceToEarnings NUMERIC,
          priceToSales NUMERIC,
          revenueGrowthTtm NUMERIC,
          patGrowthTtm NUMERIC,
          patGrowthQoq NUMERIC,
          priceToBookValue NUMERIC,
          returns1W NUMERIC,
          returns1M NUMERIC,
          returns3M NUMERIC,
          returns6M NUMERIC,
          strengthVsNifty500Monthly NUMERIC,
          sma20D NUMERIC,
          evToEbitda NUMERIC,
          fixedAssets3YearsBack NUMERIC,
          fiftyTwoWhDistance NUMERIC,
          fiftyTwoWl NUMERIC,
          strengthVsNifty500Weekly NUMERIC,
          debtToEquity NUMERIC,
          debtToEquity3YearsBack NUMERIC,
          changeInDiiHoldings1Year NUMERIC,
          changeInFiiHoldings1Year NUMERIC,
          promoterHoldings NUMERIC,
          changeInPromoterHoldings1Year NUMERIC,
          roce NUMERIC,
          pbtGrowthTtm NUMERIC,
          fixedAssetsLatestYear NUMERIC
        )`;
    });
}
//# sourceMappingURL=CreateStockDataDatabase.js.map