import { useEffect } from 'react';

import styles from './Modal.module.css';

const Modal = ({ children, show, closer }) => {
    // closer page
    useEffect(() => {
        const handleClickOutside = (event) => {
            const ele = document.querySelector('#modal');
            if (
                ele &&
                !ele.contains(event.target) &&
                !event.target.closest('.modalOpener')
            ) {
                closer();
            }
        };
        if (show) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className={styles.container} id="modal">
            {children}
        </div>
    );
};

export default Modal;
