import mongoose from 'mongoose';

interface Transaction {
  name: string,
  person: string,
  category: string,
  sum: number,
  currency: string,
  date: string,
  month?: string,
  isLoand?: boolean,
  tags?: string | string[]
}

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
    type: String || Array,
  },
  sum: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  month: {
    type: String,
  },
  isLoan: {
    type: Boolean
  }
});

export default mongoose.model<Transaction>('Transaction', Transaction);