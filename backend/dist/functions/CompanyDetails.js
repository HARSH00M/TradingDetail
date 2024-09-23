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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertData = upsertData;
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
function CreateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await sql`drop table Transactions`;
            const result = yield (0, dbConnection_1.default) `CREATE TABLE market_data (
            
            nse_symbol VARCHAR(255),
            bse_code VARCHAR(255),
            _id VARCHAR(255),
            market_capitalization VARCHAR(255),
            close_price VARCHAR(255),
            industry VARCHAR(255),
            sector VARCHAR(255),
            price_to_earnings VARCHAR(255),
            price_to_sales VARCHAR(255),
            revenue_growth_ttm VARCHAR(255),
            pat_growth_ttm VARCHAR(255),
            pat_growth_qoq VARCHAR(255),
            price_to_book_value VARCHAR(255),
            returns_1w VARCHAR(255),
            returns_1m VARCHAR(255),
            returns_3m VARCHAR(255),
            returns_6m VARCHAR(255),
            strength_vs_nifty_500_monthly VARCHAR(255),
            sma_20d VARCHAR(255),
            ev_to_ebitda VARCHAR(255),
            fixed_assets_3_years_back VARCHAR(255),
            _52wh_distance VARCHAR(255),
            _52wl VARCHAR(255),
            strength_vs_nifty_500_weekly VARCHAR(255),
            debt_to_equity VARCHAR(255),
            debt_to_equity_3_years_back VARCHAR(255),
            change_in_dii_holdings_1_year VARCHAR(255),
            change_in_fii_holdings_1_year VARCHAR(255),
            promoter_holdings VARCHAR(255),
            change_in_promoter_holdings_1_year VARCHAR(255),
            roce VARCHAR(255),
            pbt_growth_ttm VARCHAR(255),
            fixed_assets_latest_year VARCHAR(255),
            id SERIAL PRIMARY KEY
        );`;
            console.log(result === null || result === void 0 ? void 0 : result.length);
            console.log('Database created successfully');
        }
        catch (error) {
            console.error('Connection error:', error);
        }
    });
}
function upsertData(row) {
    return __awaiter(this, void 0, void 0, function* () {
        const { symbol } = row, columns = __rest(row, ["symbol"]);
        // Remove 'Name' or 'name' from the row if present
        delete columns['Name'];
        delete columns['name'];
        // Prepare column names and their associated values
        const columnNames = Object.keys(columns).map(col => `"${col}"`).join(', ');
        const columnValues = Object.values(columns);
        // Construct dynamic column update values for conflict resolution
        const updateColumns = Object.keys(columns)
            .map(col => `"${col}" = EXCLUDED."${col}"`)
            .join(', ');
        // Prepare the values array with the symbol first
        const values = [symbol, ...columnValues];
        // Construct the SQL query string
        try {
            yield (0, dbConnection_1.default) `
    INSERT INTO market_data (symbol, ${columnNames})
    VALUES (${columnValues.map((_, i) => `$${i + 2}`).join(', ')})
    ON CONFLICT (symbol)
    DO UPDATE SET ${updateColumns}
  `;
            console.log('Upsert successful');
        }
        catch (error) {
            console.error('Error executing query:', error);
        }
    });
}
//# sourceMappingURL=CompanyDetails.js.map