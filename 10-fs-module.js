const { readFileSync, writeFileSync } = require ('fs')
const first = readFileSync('subfolder/first.txt', 'utf-8')
const sec = readFileSync('subfolder/test.txt', 'utf-8')
console.log(first, sec);

//flag --> flag object wat te doen? a = appenden!
writeFileSync('subfolder/resultwrite-sync.txt', `here is the result: ${first}, ${sec}`, {flag: 'a'})