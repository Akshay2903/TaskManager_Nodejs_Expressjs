const connectDB = require('./db/connect')
const express = require('express')
const cors = require('cors');
const app = express();
const tasks = require('./routes/tasks')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


//midddleware
app.use(cors());
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks',tasks)

app.use(notFound)

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is Listening on ${port} Port`))
    } catch (error) {
        console.log(error);
    }
}

start()
