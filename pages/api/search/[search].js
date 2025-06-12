import connectDb, { contacts } from '@/utils/conectDB';

export default async function handler(req, res) {
  const { search } = req.query;

  try {
    await connectDb();
  } catch (err) {
    console.log(err.message);
    res.status(500).end();
  }

  try {
    const filtered = await contacts.find({ name: search }).toArray();
    res.status(200).json(filtered);
  } catch (err) {
    console.log(err.message);
    res.status(500).end();
  }
}
