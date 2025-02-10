import { CiUser } from 'react-icons/ci';
import { LiaUserEditSolid } from 'react-icons/lia';
import { PiTrash } from 'react-icons/pi';

import styles from './ContactInfoPage.module.css';

const ContactInfoPage = ({ info, contacts }) => {
    // delete a contact handler
    const deleteHandler = () => {
        const permission = confirm('are you sure ?');
        if (permission) {
            const result = contacts.filter((i) => i.id !== info.id);
            contacts = result;
            localStorage.setItem('contacts', JSON.stringify(contacts));
            location.reload();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button>
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
