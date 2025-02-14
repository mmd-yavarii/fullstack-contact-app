import { CiUser } from 'react-icons/ci';
import { LiaUserEditSolid } from 'react-icons/lia';
import { PiTrash } from 'react-icons/pi';

import { phoenRegex, emailRegex } from '../../constants/regexes.js';
import styles from './ContactInfoPage.module.css';

const ContactInfoPage = ({
    info,
    setContacts,
    alertMessage,
    modalCloser,
    contacts,
}) => {
    // delete a contact handler
    const deleteHandler = () => {
        const permission = confirm('are you sure ?');
        if (permission) {
            setContacts((pre) => pre.filter((i) => i.id !== info.id));
            alertMessage('error', 'Successfully deleted!');
            modalCloser();
        }
    };

    // change contact info
    const changeContactInfo = () => {
        const item = contacts.find((i) => i.id == info.id);

        const name = prompt('name', item.name);
        const phone = prompt('phone number', item.phone);
        const email = prompt('email', item.email);

        if (name.length && phone.length && email.length) {
            if (phoenRegex.test(phone) && emailRegex.test(email)) {
                item.name = name;
                item.phone = phone;
                item.email = email;
            } else {
                alertMessage('error', 'please fill in inputs correctly');
            }
        } else {
            alertMessage('error', 'you must fill in all inputs');
        }
        alertMessage('success', 'Contact has been successfully updated!');
        modalCloser();
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button onClick={changeContactInfo}>
                    <LiaUserEditSolid fontSize="1.3rem" opacity="0.6" />
                </button>
                <button onClick={deleteHandler}>
                    <PiTrash fontSize="1.3rem" color="red" opacity="0.6" />
                </button>
            </div>

            <div className={styles.nameAndImage}>
                <div className={styles.userImage}>
                    <CiUser fontSize="2rem" opacity="0.4" />
                </div>
                <p>{info.name}</p>
            </div>

            <div className={styles.phoneAndEmail}>
                <a href={`tel:${info.phone}`}>{info.phone}</a>
                <a href={`mailto:${info.email}`}>{info.email}</a>
            </div>
        </div>
    );
};

export default ContactInfoPage;
