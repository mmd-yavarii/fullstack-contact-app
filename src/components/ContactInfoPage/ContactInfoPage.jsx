import { CiUser } from 'react-icons/ci';
import { LiaUserEditSolid } from 'react-icons/lia';
import { PiTrash } from 'react-icons/pi';

import styles from './ContactInfoPage.module.css';

const ContactInfoPage = ({ info }) => {
    // save on local storage
    const storeData = () => {
        // localStorage.setItem();
        console.log('save');
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button>
                    <LiaUserEditSolid fontSize="1.3rem" opacity="0.6" />
                </button>
                <button style={{ color: 'red' }}>
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
