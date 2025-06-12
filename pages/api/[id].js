import connectDb, { contacts } from '@/utils/conectDB';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectDb();
  } catch (err) {
    res.status(500).end();
  }

  switch (req.method) {
    case 'PATCH':
      const { nameInp, phoneInp } = req.body;

      try {
        const result = await contacts.updateOne({ _id: new ObjectId(id) }, { $set: { name: nameInp, phone: phoneInp } });
        console.log(result);
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(500).end();
      }
      break;

    case 'DELETE':
      try {
        await contacts.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({});
      } catch (err) {
        res.status(500).end();
      }
      break;
  }
}
