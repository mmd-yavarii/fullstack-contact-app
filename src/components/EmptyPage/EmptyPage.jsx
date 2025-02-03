import styles from './EmptyPage.module.css';

const EmptyPage = () => {
    return (
        <div className={styles.container}>
            <img src="./public/empty.png" />
            <h5>There is no contacts :(</h5>
        </div>
    );
};

export default EmptyPage;
