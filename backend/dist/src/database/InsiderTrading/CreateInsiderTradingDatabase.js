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
exports.default = CreateTransactionsDatabase;
const config_1 = __importDefault(require("../config"));
function CreateTransactionsDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, config_1.default) `CREATE TABLE transactions( id SERIAL PRIMARY KEY, symbol VARCHAR(10) NOT NULL,company VARCHAR(255),regulation VARCHAR(100),acquirerDisposer VARCHAR(255),categoryOfPerson VARCHAR(100),securityTypePrior VARCHAR(100),numOfSecurityPrior DECIMAL(15, 2),shareholdingPrior DECIMAL(5, 2),securityTypeAcquiredDisposed VARCHAR(100),numOfSecurityAcquiredDisposed INT,valueOfSecurityAcquiredDisposed DECIMAL(15, 2),transactionType VARCHAR(50),securityTypePost VARCHAR(100),numOfSecurityPost INT,shareholdingPost DECIMAL(5, 2),acquisitionDateFrom Date NULL,acquisitionDateTo Date NULL,intimationDate Date NULL,modeOfAcquisition VARCHAR(100),derivativeTypeSecurity VARCHAR(100),derivativeContractSpecification VARCHAR(255),notionalValueBuy DECIMAL(15, 2),numOfUnitsContractBuy INT,notionalValueSell DECIMAL(15, 2),numOfUnitsContractSell INT,exchange VARCHAR(50),remark TEXT, broadcastDateTime varchar,xbrl varchar(255) );`;
    });
}
//# sourceMappingURL=CreateInsiderTradingDatabase.js.map