const express = require ("express");
const app = express();
const port= 80;
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect')
require('dotenv').config()


//middleware
app.use(express.json())

app.use('/api/v1/tasks', tasks)

//routes
app.get('/', (req, res)=>{
    res.send("task manager");
    res.end();
})

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening to port: ${port}...`));

    } catch (error) {
        console.log(error);
    }
}

start();

