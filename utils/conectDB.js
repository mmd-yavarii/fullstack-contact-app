import { MongoClient } from 'mongodb';

const mongo = new MongoClient(process.env.MONGO_URI);
let db = null;
let contacts = null;

async function connectDb() {
  try {
    await mongo.connect();
    db = mongo.db('contactApp');
    contacts = db.collection('contacts');
    console.log(`\n✅ db connected successfully\n`);
  } catch (err) {
    console.log(`\n❌ connection error : ${err.message}\n`);
  }
}

export { db, contacts, connectDb as default };
