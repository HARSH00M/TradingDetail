// file to put data from excel file to database
var fs = require('fs');
var csv = require('csv-parser');
var count = 0;
var min = 200;
var results = [];










fs.createReadStream('./src/files/data.csv')
    .pipe(csv())
    .on('data', function (data) {
    if (results.length === 0) {
        console.log('First Object:', data);
        // Stop further processing after the first row
        results.push(data);
        var obj = results[0];
        var keys = Object.keys(obj);
        var values = Object.values(obj);
        console.log(values.length);
        console.log(values[0]);
        

    }
    // if(Object.values(data).length < min){
    //     min = Object.values(data).length;
    //     console.log(min)
    // }
})
    .on('end', function () {
    console.log('Finished reading the file.');
});
