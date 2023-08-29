const express = require('express');
const app = express();
const {products} = require("./data.js")
const {people} =require('./data.js')
app.use(express.static("./methods-public"))
app.use(express.json())
const fs = require('fs');

app.get('/', (req, res)=>{
    res.send('<h1>homepage</h1><a href="/api/products">products</a>');
})
app.get('/api/products', (req, res)=>{
    const newProducts = products.map((product)=>{
        const id = product.id;
        const name = product.name;
        const image = product.image;        
        return {id:id,name:name,image:image}
    })
    res.json(newProducts);
})
app.get('/api/people', (req, res)=>{
    res.json({data:people})
})
app.post('/api/people', (req, res)=>{
    const name = req.body.name
    if(!name){
        res.status(400).json({succes:false, msg:"fill in a name"})
    }else{
        const newPerson = { id: people.length + 1, name: name };
        people.push(newPerson);
        res.status(201).json({success:true, person:name, msg:`hey ${name}`})
        
    }
    

})

app.listen(80, ()=>{
    console.log("listening on port 80....");
})