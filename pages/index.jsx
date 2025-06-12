import HomePage from '@/components/templates/HomePage';
import connectDb, { contacts } from '@/utils/conectDB';
import { useEffect, useState } from 'react';

export default function Home({ allContacts }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => setContacts(allContacts), []);

  return <HomePage contacts={contacts} setContacts={setContacts} allContacts={allContacts} />;
}

export async function getStaticProps() {
  try {
    await connectDb();
    const allContacts = await contacts.find().toArray();

    return {
      props: {
        allContacts: JSON.parse(JSON.stringify(allContacts)),
      },
      revalidate: 100,
    };
  } catch (err) {
    console.log(err.message);
    return {
      notFound: true,
    };
  }
}
