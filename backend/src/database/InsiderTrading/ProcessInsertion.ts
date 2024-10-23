import sql from '../config';
import { parse, isValid, format } from 'date-fns'; 

interface StockData {
    [key: string]: any; 
}

const replaceNullsWithZero = (data: StockData): StockData => {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value === null || value === 'null' || value==='nil' || value==='Nil' || value==='-'? null : value])
    );
};


const parseDate = (dateString: string): string | null => { 
    // Check for a specific placeholder indicating a null date
    if (dateString === '-' || dateString === null) {
        return null; // Return null if the input is '-'
    }
    // Updated formats to include only the desired formats
    const formats = ['dd-MM-yyyy', 'dd-MMM-yy', 'dd-MMM-yyyy'];

    // Attempt to parse the date string using the defined formats
    for (const formatString of formats) {
        const parsedDate = parse(dateString, formatString, new Date());
        if (isValid(parsedDate)) {
            // Return the date formatted as 'dd-MM-yyyy'
            return format(parsedDate, 'yyyy-MM-dd');
        }
    }
    
    throw new Error(`Invalid date value: ${dateString}`);
};


const countNull = (data: StockData): number => {
    return Object.values(data).filter(value => value === null).length;
}

export default async function ProcessInsertionDatabase(stockDataArray: StockData[]): Promise<void> {
    try {
        await sql.begin(async (transaction: any) => {
            for (const stockData of stockDataArray) {
                const sanitizedData = replaceNullsWithZero(stockData);
                console.log(stockData)
                // Skip if symbol is null
                if (!sanitizedData.symbol) {
                    console.log(`Skipped insertion for stock data due to null symbol: ${JSON.stringify(sanitizedData)}`);
                    continue; // Skip to the next iteration
                }

                if(countNull(sanitizedData) > 4){
                    console.log(`Skipped insertion for stock data due to null values: ${JSON.stringify(sanitizedData)}`);
                    continue; // Skip to the next iteration
                }

                // Parse and validate the date fields
                const acquisitionDateFrom = parseDate(sanitizedData.acquisitionDateFrom);
                const acquisitionDateTo = parseDate(sanitizedData.acquisitionDateTo);
                const intimationDate = parseDate(sanitizedData.intimationDate);

                
                // Insert the data into the database with the parsed dates
                await transaction`INSERT INTO transactions (
                    symbol, company, regulation, acquirerDisposer, categoryOfPerson, securityTypePrior, 
                    numOfSecurityPrior, shareholdingPrior,
                    numOfSecurityAcquiredDisposed, valueOfSecurityAcquiredDisposed, transactionType, 
                    securityTypePost, numOfSecurityPost, shareholdingPost, acquisitionDateFrom, 
                    acquisitionDateTo, intimationDate, modeOfAcquisition, derivativeTypeSecurity, 
                    derivativeContractSpecification, notionalValueBuy, numOfUnitsContractBuy, 
                    notionalValueSell, numOfUnitsContractSell, exchange, remark, 
                    broadcastDateTime, xbrl
                ) VALUES (
                    ${sanitizedData.symbol}, ${sanitizedData.company}, ${sanitizedData.regulation}, 
                    ${sanitizedData.acquirerDisposer}, ${sanitizedData.categoryOfPerson}, 
                    ${sanitizedData.securityTypePrior}, ${sanitizedData.numOfSecurityPrior}, 
                    ${sanitizedData.shareholdingPrior}, 
                    ${sanitizedData.numOfSecurityAcquiredDisposed}, ${sanitizedData.valueOfSecurityAcquiredDisposed}, 
                    ${sanitizedData.transactionType}, ${sanitizedData.securityTypePost}, 
                    ${sanitizedData.numOfSecurityPost}, ${sanitizedData.shareholdingPost}, 
                    ${acquisitionDateFrom}, ${acquisitionDateTo}, 
                    ${intimationDate}, ${sanitizedData.modeOfAcquisition}, 
                    ${sanitizedData.derivativeTypeSecurity}, ${sanitizedData.derivativeContractSpecification}, 
                    ${sanitizedData.notionalValueBuy}, ${sanitizedData.numOfUnitsContractBuy}, 
                    ${sanitizedData.notionalValueSell}, ${sanitizedData.numOfUnitsContractSell}, 
                    ${sanitizedData.exchange}, ${sanitizedData.remark}, 
                    ${sanitizedData.broadcastDateTime}, ${sanitizedData.xbrl}
                )`;
            }
        });

        console.log('All data inserted successfully');
    } catch (err) {
        console.error('Error during database insertion:', err);
        throw new Error(err); // Rethrow error to handle it at a higher level
    } finally {
        await sql.end(); // Ensure the connection is closed
    }
}
