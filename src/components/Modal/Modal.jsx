import { useEffect, useState } from 'react';

import styles from './Modal.module.css';

const Modal = ({ children, show }) => {
    const [isShow, setIsShow] = useState(show);

    useEffect(() => {
        setIsShow(show);
    }, [show]);

    // close modal after click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const ele = document.querySelector('#modal');
            if (ele && !ele.contains(event.target)) {
                setIsShow(false);
            }
        };
        if (isShow) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isShow]);

    return (
        isShow && (
            <div className={styles.container} id="modal">
                {children}
            </div>
        )
    );
};

export default Modal;
