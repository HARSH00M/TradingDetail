// file to put data from excel file to database
const fs = require('fs');
const csv = require('csv-parser');
var count = 0;
var min = 200;
var results = [];
fs.createReadStream('./src/files/data.csv')
    .pipe(csv())
    .on('data', (data) => {
    if (results.length === 0) {
        console.log('First Object:', data);
        // Stop further processing after the first row
        results.push(data);
        const obj = results[0];
        const keys = Object.keys(obj);
        const values = Object.values(obj);
        console.log(values.length);
        console.log(values);
        console.log(keys);
        console.log(keys.length);
    }
    // if(Object.values(data).length < min){
    //     min = Object.values(data).length;
    //     console.log(min)
    // }
})
    .on('end', () => {
    console.log('Finished reading the file.');
});
//# sourceMappingURL=addData.js.map