import connectDb from "../../../db/connectDb";
import Transaction from '../../../models/Transaction';
import { NextApiRequest, NextApiResponse } from 'next'

connectDb();

const index = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {method}: any = req;

  switch(method) {
    case 'GET': 
      try {
        const transactions = await Transaction.find()
        console.log(transactions)
        res.status(200).send(transactions)
      } catch (error: unknown) {
        res.status(400).send(error)
      }
      break;

    case 'POST':  
      try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).send(transaction);
      } catch(err: unknown) {
        res.status(400).send(err);
      }
      break;

    case 'DELETE':
      const id = req.body._id;
      console.log(req.body);
      try {
        const transaction = await Transaction.findByIdAndDelete(id);
        console.log(transaction);
        res.status(201).send(transaction);
      } catch(err: unknown) {
        res.status(400).send(err);
      }
      break;
  }
}

export default index;