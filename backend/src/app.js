const express= require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
// const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');
const { profile } = require('console');

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/orders', orderRouter)
// app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
// app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);


// var productsRouter = require('./routes/products');
// var userRouter = require('./routes/users');

//Using the routes 
// app.use('/api/users', usersRouter);
// app.use('/api/products', productsRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/orders', orderRouter);





/* CORS */
app.use(cors({
    origin: 'http:localhost:4200',
   
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Serve is running at port ${PORT}`)
})

module.exports = app;