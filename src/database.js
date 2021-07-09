import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2fwcu.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
.then(db => console.log('db is connected'))
.catch(error => console.log(error));