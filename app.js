const { log } = require('console');
const { readFile, writeFile } = require ('fs')
readFile('subfolder/first.txt','utf8', (err,result)=>{
    if (err){
        console.log(err);
        return
    }else{
        const first = result;
        readFile('subfolder/test.txt','utf8', 
        (err, result)=>{
            if (err){
                console.log(err);
                return
            }else{
                const second = result;
                writeFile('subfolder/resultsync2-txt', 
                `resultaat 2: ${first}, ${second}`,
                (err, result)=>{
                    if (err){
                        console.log(err);
                    return;
                    }
                    console.log(result);
                })}
        })
    }
})