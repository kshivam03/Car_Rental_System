const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");
const carRouter = require('./routers/carsRoute')
const userRouter = require('./routers/usersRoute')
const bookingsRouter = require('./routers/bookingsRoute')

app.use(express.json())
app.use(cors({origin: "*"}))
app.use(express.urlencoded({extended : false}))


app.use('/api/cars/', carRouter)
app.use('/api/users/', userRouter)
app.use('/api/bookings/', bookingsRouter)

app.listen(port, () => console.log(`Node JS server started in port ${port}`));
    