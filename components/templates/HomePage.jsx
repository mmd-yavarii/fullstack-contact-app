import { useState } from 'react';
import Card from '../module/Card';
import styles from './HomePage.module.css';
import Search from '../module/Search';

function HomePage({ contacts, setContacts, allContacts }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // add new contact handler
  async function saveNewConact() {
    if (name && phone) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify({ name, phone }),
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        setContacts((prev) => [...prev, json]);

        if (response.ok) {
          alert('contact added successfully :)');
        }

        setName('');
        setPhone('');
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.addNew}>
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button onClick={saveNewConact}>{isLoading ? 'Loading...' : 'Add'}</button>
      </div>

      <Search setContacts={setContacts} allContacts={allContacts} />

      {contacts.length ? (
        contacts.map((i) => <Card key={i._id} setContacts={setContacts} {...i} />)
      ) : (
        <p style={{ textAlign: 'center', marginTop: '60px' }}>There is no contact yet</p>
      )}
    </div>
  );
}

export default HomePage;
