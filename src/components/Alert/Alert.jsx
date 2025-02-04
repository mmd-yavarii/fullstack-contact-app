import styles from './Alert.module.css';

const Alert = ({ text, type }) => {
    return (
        <div className={type == 'error' ? styles.error : styles.success}>
            {text}
        </div>
    );
};

export default Alert;

// setAlert({
//     type: 'error',
//     message: 'Please Fill in inputs',
//     show: true,
// });
// setTimeout(() => {
//     setAlert({
//         type: '',
//         message: '',
//         show: false,
//     });
// }, 1500);
