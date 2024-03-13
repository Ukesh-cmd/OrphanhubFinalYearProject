const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require('express-session');

const createError = require('http-errors');
require('dotenv').config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Update this with your frontend URL
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // If you're using cookies or authentication
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

const db = require("./config/dbconnect");
const loginRoute = require("./routes/loginRoute")
const adminRoute = require("./routes/adminRoute")
const childRoute = require("./routes/childRoutes")
const userRoute = require("./routes/userRoute")
const donorRoutes = require("./routes/donorRoutes")
const staffRoute = require("./routes/staffRoute")
const adoptionRoute = require("./routes/adoptionRoute")
const webRoute = require('./routes/webRoutes');
const paymentRoute = require('./routes/paymentRoute');
const bookmarkRoute = require('./routes/bookmarkRoute');
const allocateRoute = require('./routes/allocateRoutes');
const topDonorRoute = require('./routes/topDonorRoute')
const sponsorRoute = require('./routes/sponsorRoute')
const scheduleCorn  = require('./controller/schedule')
const cron = require('node-cron');
const allocateDonation = require('./controller/allocationControler');


const cookie = require("cookie-parser");

app.use(session({
    secret: 'your-session-secret-key', // Change this to a secure random key
    resave: false,
    saveUninitialized: true,
  }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', adminRoute, childRoute, userRoute, loginRoute, donorRoutes, staffRoute, adoptionRoute, paymentRoute, bookmarkRoute, allocateRoute, topDonorRoute, sponsorRoute);
app.use('/', webRoute);


app.use(cookie);


app.use((err, req, res, next) => {
    err.statusCode = err.message || 500;
    err.message = err.message || "Internal server error";
    res.status(err.statusCode).json({
        message: err.message,
    });
})



const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})

scheduleCorn.allocate();
scheduleCorn.allocated();
