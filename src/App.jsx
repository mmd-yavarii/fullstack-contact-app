import { useEffect, useState } from 'react';

import Header from './components/Header/Header.jsx';
import ContactList from './components/Contacts/ContactList.jsx';
import EmptyPage from './components/EmptyPage/EmptyPage.jsx';
import Modal from './components/Modal/Modal.jsx';
import AddContact from './components/AddContactPage/AddContact.jsx';
import Alert from './components/Alert/Alert.jsx';

import ContactInfoPage from './components/ContactInfoPage/ContactInfoPage.jsx';

const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function App() {
    const [displayContacts, setDisplayContacts] = useState(contacts);

    const [showAddPage, setShowAddPage] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState({
        show: false,
        info: {},
    });
    const [alert, setAlert] = useState({
        type: '',
        message: '',
        show: false,
    });

    // open contacts info page after click on them
    function openContactsInfoPage(id) {
        const contact = contacts.find((i) => i.id == id);
        setShowContactInfo({ show: true, info: contact });
    }

    return (
        <>
            {alert.show && <Alert type={alert.type} text={alert.message} />}

            <Header
                setShowAddPage={setShowAddPage}
                setDisplayContacts={setDisplayContacts}
                contacts={contacts}
            />

            {/* show contacts */}
            {displayContacts.length ? (
                <ContactList
                    displayContacts={displayContacts}
                    openContactsInfoPage={openContactsInfoPage}
                />
            ) : (
                <EmptyPage />
            )}

            {/* modal for add new contacts  */}
            {showAddPage && (
                <Modal show={showAddPage} closer={() => setShowAddPage(false)}>
                    <AddContact contacts={contacts} setAlert={setAlert} />
                </Modal>
            )}

            {/* users info page */}
            {showContactInfo.show && (
                <Modal
                    show={true}
                    closer={() => setShowContactInfo({ show: false, info: {} })}
                >
                    <ContactInfoPage
                        info={showContactInfo.info}
                        contacts={contacts}
                    />
                </Modal>
            )}
        </>
    );
}

export default App;
