const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDB = require("./Configurations/DB")
const ErrorHandler = require("./Middlewares/Error")

// Load environment variables 
dotenv.config({ path: "./Configurations/Config.env" })

// Connect to Database
connectDB()
//Rout files
const Universities = require('./Routes/Universities')

const app = express()

//Body Parser
app.use(express.json())

// Developer is logging Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

//Mount routers
app.use("/api/v1/Universities", Universities)

app.use(ErrorHandler)
 
const PORT = process.env.PORT || 8080

const Server = app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`));  

// Handle unhandled promise rejection errors

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`)
    //Close server and exit process 
    Server.close(() => process.exit(1))
})