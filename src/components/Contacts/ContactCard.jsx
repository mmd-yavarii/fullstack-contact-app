import { CiUser } from 'react-icons/ci';

import styles from './ContactCard.module.css';

const ContactCard = ({ info: { name, phone, email } }) => {
    return (
        <div className={`${styles.container} modalOpener`}>
            <div className={styles.image}>
                <CiUser fontSize="1.5rem" opacity={0.4} />
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                <p className={styles.phone}>{phone}</p>
            </div>
        </div>
    );
};

export default ContactCard;
