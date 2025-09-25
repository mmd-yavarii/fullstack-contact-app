import Link from 'next/link';
import styles from './ContactCard.module.css';

import { AiOutlineUser } from 'react-icons/ai';

export default function ContactCard({ name, phoneNumber }) {
    return (
        <Link href={`/${phoneNumber}`}>
            <div className={styles.container}>
                <div className={styles.profileImg}>
                    <AiOutlineUser opacity="0.5" />
                </div>

                <div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.phoneNumber}>{phoneNumber}</p>
                </div>
            </div>
        </Link>
    );
}
