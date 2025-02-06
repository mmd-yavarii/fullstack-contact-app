import { FiSearch } from 'react-icons/fi';

import styles from './Header.module.css';

const Header = ({ setShowAddPage, setDisplayContacts, contacts }) => {
    // show add page handler
    const showPage = () => {
        setShowAddPage(true);
    };

    // search handler
    const saerchHandler = (event) => {
        const value = event.target.value.trim().toLowerCase();

        if (!value) {
            setDisplayContacts(contacts);
            return;
        }

        setDisplayContacts(
            contacts.filter(
                (i) =>
                    i.name.toLowerCase().includes(value) ||
                    i.phone.includes(value) ||
                    i.email.includes(value),
            ),
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.addButtonAndMessage}>
                <h2>Contacts</h2>
                <button onClick={showPage} className="modalOpener">
                    Add Contact
                </button>
            </div>
            <div className={styles.search}>
                <FiSearch opacity={0.3} fontSize="1.2rem" />
                <input
                    type="text"
                    placeholder="Search name, number, etc"
                    onChange={saerchHandler}
                />
            </div>
        </div>
    );
};

export default Header;
