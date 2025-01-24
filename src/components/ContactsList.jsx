import ContactItem from './ContactItem.jsx';
import styles from './ContactsList.module.css';

const ContactsList = ({ contacts, deleteHandler }) => {
    return (
        <div className={styles.container}>
            <h3>Contact List</h3>
            {contacts.length ? (
                <ul className={styles.contacts}>
                    {contacts.map((item) => (
                        <ContactItem
                            data={item}
                            key={item.id}
                            deleteHandler={deleteHandler}
                        />
                    ))}
                </ul>
            ) : (
                <p className={styles.message}>No Contacts Yet</p>
            )}
        </div>
    );
};

export default ContactsList;
