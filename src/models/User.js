import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const {Schema, model } = mongoose;


const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId
  }]
},
{
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt)
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return bcryptjs.compare(password, receivedPassword)
}

export default model('User', userSchema )