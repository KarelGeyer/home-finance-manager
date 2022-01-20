import mongoose from 'mongoose';

const Transaction = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  sum: {
    type: Number,
  },
  currency: {
    type: String,
    required: true,
  },
  date: {
    type: new Date(),
  },
  month: {
    type: String,
  },
  isLoan: {
    type: Boolean
  }
});

export default mongoose.model('Transaction', Transaction);