import mongoose from 'mongoose'
const { Schema, model } = mongoose

const weightSchema = new Schema({
  weight: Number,
  fat: Number,
  visceralFat: Number,
  muscle: Number,
  date: Date,
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
},
{
  timestamps: true,
  versionKey: false
})

export default model('Weight', weightSchema)
