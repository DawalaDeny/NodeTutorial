const path = require ('path')
//seperator van path --> C:\Users\ --> \
console.log(path.sep)

const filepath = path.join('/subfolder','test.txt')
console.log(filepath);

const base = path.basename(filepath)
console.log(base);

const abosulte = path.resolve(__dirname,'subfolder', 'test.txt')
console.log(abosulte);