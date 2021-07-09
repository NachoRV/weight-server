import app from './app.js'
import dotenv from 'dotenv'
import './database.js'
dotenv.config()

// dotenv.config();

app.listen(process.env.PORT)
console.log('server lisen on port', process.env.PORT)
