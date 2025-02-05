import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import styles from './AddContact.module.css';

const AddContact = ({ setContacts, setAlert }) => {
    const [info, setInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // set inputs data
    const changeHandler = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setInfo((pre) => ({ ...pre, [key]: value }));
    };

    // add data
    const addHandler = () => {
        if (info.name.length && info.email.length && info.phone.length) {
            setContacts((pre) => [...pre, { ...info, id: uuidv4() }]);
            setInfo({ name: '', email: '', phone: '' });
            return;
        }
        // show alert
        setAlert({
            type: 'error',
            message: 'All fields must be filled out',
            show: true,
        });
        setTimeout(() => {
            setAlert({
                type: '',
                message: '',
                show: false,
            });
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <h3>Add New Contact</h3>
            <div className={styles.inps}>
                {!!!info.name.length && (
                    <label htmlFor="name">Enter Name</label>
                )}
                <input
                    type="text"
                    id="name"
                    value={info.name}
                    onChange={changeHandler}
                    name="name"
                />
            </div>
            <div className={styles.inps}>
                {!!!info.email.length && (
                    <label htmlFor="email">Enter Email</label>
                )}
                <input
                    type="text"
                    id="email"
                    value={info.email}
                    onChange={changeHandler}
                    name="email"
                />
            </div>
            <div className={styles.inps}>
                {!!!info.phone.length && (
                    <label htmlFor="phone">Enter Phone Number</label>
                )}
                <input
                    type="number"
                    id="phone"
                    value={info.phone}
                    onChange={changeHandler}
                    name="phone"
                />
            </div>
            <button onClick={addHandler}>Add</button>
        </div>
    );
};

export default AddContact;
