import { useEffect, useState } from 'react';

import Header from './components/Header/Header.jsx';
import ContactList from './components/Contacts/ContactList.jsx';
import EmptyPage from './components/EmptyPage/EmptyPage.jsx';
import Modal from './components/Modal/Modal.jsx';
import AddContact from './components/AddContactPage/AddContact.jsx';
import Alert from './components/Alert/Alert.jsx';

import ContactInfoPage from './components/ContactInfoPage/ContactInfoPage.jsx';

function App() {
    const [contacts, setContacts] = useState(
        JSON.parse(localStorage.getItem('contacts')) || [],
    );
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

    // update display state with contacts stae
    useEffect(() => {
        setDisplayContacts(contacts);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

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
                        <AddContact
                            setContacts={setContacts}
                            alertMessage={alertMessage}
                        />
                    ) : (
                        <ContactInfoPage
                            info={showContactInfo.info}
                            setContacts={setContacts}
                            alertMessage={alertMessage}
                            modalCloser={modalCloser}
                            contacts={contacts}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}

export default App;
