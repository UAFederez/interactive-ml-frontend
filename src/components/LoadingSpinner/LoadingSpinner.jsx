import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => (
    <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
    </div>
);

export default LoadingSpinner;
