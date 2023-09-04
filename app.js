const connectDB = require('./db/connect')
const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
require('dotenv').config()
const notFound = require('./middleware/not-found')


//midddleware

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks',tasks)

app.use(notFound)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is Listening on ${port} Port`))
    } catch (error) {
        console.log(error);
    }
}

start()
