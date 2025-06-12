import connectDb, { contacts } from '@/utils/conectDB';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    await connectDb();
  } catch (err) {
    res.status(500).end();
  }

  switch (req.method) {
    case 'POST': {
      const { name, phone } = req.body;
      try {
        const newContactid = await contacts.insertOne({ name, phone });
        const newContact = await contacts.findOne({ _id: new ObjectId(newContactid.insertedId) });
        res.status(201).json(newContact);
      } catch (err) {
        res.status(500).end();
      }
      break;
    }
  }
}
