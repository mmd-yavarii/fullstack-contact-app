import { useState, useEffect } from 'react';

import Header from './components/Header/Header.jsx';
import ContactList from './components/Contacts/ContactList.jsx';
import EmptyPage from './components/EmptyPage/EmptyPage.jsx';

function App() {
    const [contacts, setContacts] = useState([1]);

    return (
        <>
            <Header />

            {contacts.length ? <ContactList /> : <EmptyPage />}
        </>
    );
}

export default App;
