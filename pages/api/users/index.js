import connectDb from "../../db/connectDb";
import User from "../../../models/User"
connectDb();

const index = async (req, res) => {
  const {method} = req;

  switch(method) {
    case 'GET': 
      try {
        const transactions = await Transaction.find()
        res.status(200).send(transactions)
      } catch (error) {
        res.status(400).send(err)
      }
      break;

    case 'POST':  
      try {
        const transaction = await new Transaction(req.body);
        transaction.save();
        res.status(201).send(transaction);
      } catch(err) {
        res.status(400).send(err);
      }
      break;
  }
}

export default index;