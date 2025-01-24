import styles from './ContactItem.module.css';

const ContactItem = ({
    data: { id, name, lastName, email, phone },
    deleteHandler,
}) => {
    return (
        <ul>
            <li className={styles.item}>
                <p>
                    {name} {lastName}
                </p>
                <p>
                    <span>📥</span> {email}
                </p>
                <p>
                    <span>📞</span> {phone}
                </p>
                <button onClick={() => deleteHandler(id)}>🗑️</button>
            </li>
        </ul>
    );
};

export default ContactItem;
