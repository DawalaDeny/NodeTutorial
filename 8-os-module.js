const os = require ('os')
//gebruiker
const gebruiker = os.userInfo()
console.log(gebruiker);
//hoelang systeem draait (sec)
console.log(os.uptime())

const currentOS = {
    name:os.type(),
    release: os.release(),
    totalMem: os.totalmem()
}
console.log(currentOS)