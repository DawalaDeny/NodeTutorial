console.log(__dirname)
console.log(__filename)

//?
//console.log(require)

//info over huidige module (file)
//console.log(module)

//info over env (waar programma uitgevoerd wordt)
//console.log(process)

setInterval(() => {
    name()
}, 1000);

function name(params) {
    console.log("hello world")
}