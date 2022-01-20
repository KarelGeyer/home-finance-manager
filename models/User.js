import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
  },
  currency: {
    type: String,
    required: true,
  },
  accountID: {
    type: String,
    required: true,
  },
  teamID: {
    type: String,
  },
  image: {
    type: String,
  }
});

export default mongoose.model('User', User);