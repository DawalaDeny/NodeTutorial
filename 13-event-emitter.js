const eventEmitter = require ('events');

const customEmitter = new eventEmitter();

customEmitter.on('response', ()=>{
console.log('data received, jaa');
});
//je kan meerdere functies voor zelfde event mogelijk
//de order van je events "matters" dus eerst .on daarna pas emitten
customEmitter.on('response', (name, id)=>{
    if (name == null || id == null){
        console.log("2 argumenten naam & id");
    } else{
        console.log(`yhaaaah, ${name}, ${name}, ${name}, ${id}`);
    }

    });

customEmitter.emit('response')
//met argumenten
customEmitter.emit('response', "deny", 151515)