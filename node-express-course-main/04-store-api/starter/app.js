require('dotenv').config();
require('express-async-errors')
//async errors
const db = require('./db/connect');

const express = require('express');
const app = express();

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const routerProduct = require('./routes/products') 

//middleware
app.use(express.json());

//routes
app.get('/', (req, res)=>{
    res.send('<h1>store API</h1><a href="/api/v1/products">products route</a>')
})
app.use('/api/v1/products', routerProduct)

//products route

app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 80

const start = async () =>{
    try {
        await db(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening port: ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();