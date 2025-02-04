import { useState } from 'react';

import Header from './components/Header/Header.jsx';
import ContactList from './components/Contacts/ContactList.jsx';
import EmptyPage from './components/EmptyPage/EmptyPage.jsx';
import Modal from './components/Modal/Modal.jsx';
import AddContact from './components/AddContactPage/AddContact.jsx';
import Alert from './components/Alert/Alert.jsx';

function App() {
    const [contacts, setContacts] = useState([]);
    const [alert, setAlert] = useState({
        type: '',
        message: '',
        show: false,
    });

    return (
        <>
            {alert.show && <Alert type={alert.type} text={alert.message} />}

            <Header />

            {/* show contacts */}
            {contacts.length ? (
                <ContactList contacts={contacts} />
            ) : (
                <EmptyPage />
            )}

            {/* modal for add new contacts  */}
            <Modal show={true}>
                <AddContact setContacts={setContacts} setAlert={setAlert} />
            </Modal>
        </>
    );
}

export default App;
