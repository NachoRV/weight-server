import mongoose from 'mongoose'
const { Schema, model } = mongoose

const roleschema = new Schema({
  name: String
},
{
  versionKey: false
})

export default model('Role', roleschema)
