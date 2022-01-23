import connectDb from "../../../db/connectDb";
import User from "../../../models/User"
import { NextApiRequest, NextApiResponse } from 'next'

connectDb();

const index = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {method}: any = req;

  switch(method) {
    case 'GET': 
      try {
        const users = await User.find()
        res.status(200).send(users)
      } catch (error) {
        res.status(400).send(error)
      }
      break;

    case 'POST':  
      try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
      } catch(error) {
        res.status(400).send(error);
      }
      break;
  }
}

export default index;