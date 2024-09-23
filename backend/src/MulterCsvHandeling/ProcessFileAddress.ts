import path from 'path';

function processfilename(filename : string){
    

    const filepath = path.join(__dirname, '../../../uploadedContent', filename);

    return filepath;
}


export default processfilename;