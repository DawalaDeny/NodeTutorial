require('dotenv').config();
//zorgt ervoor dat je niet manueel try & catch blokken moet schrijven.
require('express-async-errors');


const express = require('express');



const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser')

//db
const connectDb = require('./db/connect')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')

const authRouter = require('./routes/authRoutes')


//logs voor jou --> verteld welke route je hit met tiny
//helpt bij het debuggen!
app.use(morgan('tiny'))

app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) =>{
    res.send('e-commerce-api')
})

app.get('/api/v1', (req, res) =>{
  console.log(req.cookies);
  res.send('e-commerce-api')
})

app.use('/api/v1/auth', authRouter)


app.use(notFoundMiddleware)
app.use(ErrorHandlerMiddleware)


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL)
    app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();