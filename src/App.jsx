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

    // set alert configuration
    function alertMessage(type, message) {
        setAlert({ type: type, message: message, show: true });
        setTimeout(() => {
            setAlert({ type: '', message: '', show: false });
        }, 1500);
    }

    // open contacts info page after click on them
    function openContactsInfoPage(id) {
        const contact = contacts.find((i) => i.id == id);
        setShowContactInfo({ show: true, info: contact });
    }

    // modal closer
    function modalCloser() {
        setShowAddPage(false);
        setShowContactInfo({ show: false, info: {} });
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

            {/* modal page */}
            {(showAddPage || showContactInfo.show) && (
                <Modal show={true} closer={modalCloser}>
                    {showAddPage ? (
                        <AddContact contacts={contacts} setAlert={setAlert} />
                    ) : (
                        <ContactInfoPage
                            info={showContactInfo.info}
                            contacts={contacts}
                            alertMessage={alertMessage}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}

export default App;
