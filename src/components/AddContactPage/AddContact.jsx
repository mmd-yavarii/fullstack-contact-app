import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import {
    convertNumbers,
    phoenRegex,
    emailRegex,
} from '../../constants/regexes.js';
import styles from './AddContact.module.css';

const AddContact = ({ setContacts, alertMessage }) => {
    const [info, setInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // set inputs data
    const changeHandler = (event) => {
        event.target.value = convertNumbers(event.target.value);

        const key = event.target.name;
        let value = event.target.value;

        if (key === 'phone') {
            if (isNaN(value[value.length - 1])) {
                value = value.slice(0, -1);
            }
        }
        setInfo((pre) => ({ ...pre, [key]: value }));
    };

    // config alert message
    const alerter = (emssage, type = 'error') => {
        setAlert({
            type: type,
            message: emssage,
            show: true,
        });
        setTimeout(() => {
            setAlert({
                type: '',
                message: '',
                show: false,
            });
        }, 2000);
    };

    // add data
    const addHandler = () => {
        if (info.name.length && info.email.length && info.phone.length) {
            if (phoenRegex.test(info.phone) && emailRegex.test(info.email)) {
                setContacts((pre) => [...pre, { ...info, id: uuidv4() }]);
                setInfo({ name: '', email: '', phone: '' });

                alertMessage('success', 'Contact added successfully ! ');
            } else {
                alertMessage('error', 'Invalid phone number or email !');
            }
        } else {
            alertMessage('error', 'All fields must be filled out !');
        }
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
                    type="text"
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
