import sql from '../config';





export default async function CreateTransactionsDatabase() {
    await sql`CREATE TABLE transactions( id SERIAL PRIMARY KEY, symbol VARCHAR(10) NOT NULL,company VARCHAR(255),regulation VARCHAR(100),acquirerDisposer VARCHAR(255),categoryOfPerson VARCHAR(100),securityTypePrior VARCHAR(100),numOfSecurityPrior DECIMAL(15, 2),shareholdingPrior DECIMAL(5, 2),securityTypeAcquiredDisposed VARCHAR(100),numOfSecurityAcquiredDisposed INT,valueOfSecurityAcquiredDisposed DECIMAL(15, 2),transactionType VARCHAR(50),securityTypePost VARCHAR(100),numOfSecurityPost INT,shareholdingPost DECIMAL(5, 2),acquisitionDateFrom Date NULL,acquisitionDateTo Date NULL,intimationDate Date NULL,modeOfAcquisition VARCHAR(100),derivativeTypeSecurity VARCHAR(100),derivativeContractSpecification VARCHAR(255),notionalValueBuy DECIMAL(15, 2),numOfUnitsContractBuy INT,notionalValueSell DECIMAL(15, 2),numOfUnitsContractSell INT,exchange VARCHAR(50),remark TEXT, broadcastDateTime varchar,xbrl varchar(255) );`
}