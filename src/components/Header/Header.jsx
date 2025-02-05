import { FiSearch } from 'react-icons/fi';

import styles from './Header.module.css';

const Header = ({ setShowAddPage, showAddPage }) => {
    // show add page handler
    const showPage = () => {
        setShowAddPage(true);
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
                <input type="text" placeholder="Search name, number, etc" />
            </div>
        </div>
    );
};

export default Header;
