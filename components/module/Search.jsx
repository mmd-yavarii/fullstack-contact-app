import { useEffect, useState } from 'react';
import styles from './Search.module.css';

function Search({ setContacts, allContacts }) {
  const [searchInp, setSearchInp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchInp.length) setContacts(allContacts);
  }, [searchInp]);

  async function searchHandler() {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/search/${searchInp}`);
      const json = await response.json();
      setContacts(json);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search..." value={searchInp} onChange={(e) => setSearchInp(e.target.value)} />
      <button onClick={searchHandler}>{isLoading ? 'Loading...' : 'search'}</button>
    </div>
  );
}

export default Search;
