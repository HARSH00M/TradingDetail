"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.named_wise = exports.name = void 0;
const dbConnection_1 = __importDefault(require("../../../../config/dbConnection"));
exports.name = "harsh";
const named_wise = (from, to) => {
    return (0, dbConnection_1.default) `WITH LatestHoldings AS (
    SELECT 
        acquirerdisposer,
        symbol,
        company,
        shareholdingprior,
        shareholdingpost,
        acquisitiondatefrom,
        ROW_NUMBER() OVER (PARTITION BY acquirerdisposer ORDER BY acquisitiondatefrom DESC) AS rn
    FROM 
        transactions
)

SELECT 
    t.acquirerdisposer,
    lh.symbol,
    lh.company,
	t.categoryofperson,
	t.securitytypeprior,
	t.transactiontype ,
	TO_CHAR(lh.acquisitiondatefrom, 'DD-MM-YYYY') AS latest_acquisitiondatefrom,
    SUM(t.numofsecurityacquireddisposed) AS totalnumofsecurity,
    SUM(t.valueofsecurityacquireddisposed) AS totalvalueofsecurity,
    lh.shareholdingprior,
    lh.shareholdingpost,
    (lh.shareholdingpost - lh.shareholdingprior) AS holding_difference,
    s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear
FROM 
    transactions t
JOIN 
    LatestHoldings lh ON t.acquirerdisposer = lh.acquirerdisposer AND lh.rn = 1
JOIN 
    stockdata s ON t.symbol = s.nsesymbol
WHERE 
    t.acquisitiondatefrom BETWEEN ${from} AND ${to}
    AND t.categoryofperson IN ('Director', 'Promoter Group', 'Promoters')
    AND t.securitytypeprior IN ('Equity Shares', 'Warrent')
    AND t.transactiontype = 'Buy'
GROUP BY 
    t.acquirerdisposer, lh.symbol, lh.company,t.categoryofperson, t.securitytypeprior, t.transactiontype, lh.acquisitiondatefrom, 
    lh.shareholdingprior, lh.shareholdingpost, 
    s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear
	ORDER BY 
    t.acquirerdisposer ASC

`;
};
exports.named_wise = named_wise;
//# sourceMappingURL=name_wise.js.map