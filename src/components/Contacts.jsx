import { useState } from 'react';
import ContactsList from './ContactsList';
import inputs from '../constants/inputs.js';
import { v4 as uuid } from 'uuid';
import styles from './Contacts.module.css';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [alert, setAlert] = useState('');
    const [contact, setContact] = useState({
        id: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const changeHandler = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setContact((pre) => ({ ...pre, [key]: value }));
    };

    const addHandler = () => {
        if (
            !contact.name ||
            !contact.lastName ||
            !contact.email ||
            !contact.phone
        ) {
            setAlert('please enter valid data ');
            return;
        }
        setAlert('');
        const newContact = { ...contact, id: uuid() };
        setContacts((pre) => [...pre, newContact]);
        setContact({ id: '', name: '', lastName: '', email: '', phone: '' });
    };

    const deleteHandler = (id) => {
        const result = contacts.filter((item) => item.id !== id);
        setContacts(result);
    };

    return (
        <div className={styles.container}>
            {/* input for add new contact */}
            <div className={styles.form}>
                {inputs.map((item, index) => (
                    <input
                        key={index}
                        type={item.type}
                        placeholder={item.placeholder}
                        value={contact[item.name]}
                        name={item.name}
                        onChange={changeHandler}
                    />
                ))}

                <button onClick={addHandler}>Add Contact</button>
            </div>

            {/* alert message */}
            <div className={styles.alert}>{alert && <p>{alert}</p>}</div>

            {/* show all contacts */}
            <ContactsList contacts={contacts} deleteHandler={deleteHandler} />
        </div>
    );
};

export default Contacts;
