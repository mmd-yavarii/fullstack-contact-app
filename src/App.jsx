import { useState, useEffect } from 'react';

import Header from './components/Header/Header.jsx';
import ContactList from './components/Contacts/ContactList.jsx';
import EmptyPage from './components/EmptyPage/EmptyPage.jsx';
import Modal from './components/Modal/Modal.jsx';

function App() {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'mohammad yavarii',
            phone: '09036330147',
            email: 'mmdyavarii@gmail.com',
        },
    ]);

    return (
        <>
            <Header />

            {contacts.length ? (
                <ContactList contacts={contacts} />
            ) : (
                <EmptyPage />
            )}

            <Modal show={true}>
                <h1>hello</h1>
            </Modal>
        </>
    );
}

export default App;
