import mongoose from 'mongoose';
const {Schema, model } = mongoose;

const weightSchema = new Schema({
  weight: Number,
  fat: Number,
  visceralFat: Number,
  muscle: Number,
  date: Date
},
{
  timestamps: true,
  versionKey: false
});

export default model('Weight', weightSchema )