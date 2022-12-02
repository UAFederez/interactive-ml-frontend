import styles from "./NeuralNetLayerInput.module.css";

const NeuralNetLayerInput = (props) => {
    return (
        <div className={styles.layerCard}>
            <div className={styles.layerCardTitlebar}>
                <span className={styles.layerTitle}>{props.layerType}</span>
                {props.editable ? (
                    <button
                        type="button"
                        className={styles.layerDeleteBtn}
                        onClick={props.onDelete ? props.onDelete : null}
                    >
                        &times;
                    </button>
                ) : null}
            </div>
            <div className={styles.layerCardInfoContainer}>
                <div className={styles.layerCardInfo}>
                    <p className={styles.layerPropName}>Layer size</p>
                    <p className={styles.layerPropValue}>
                        {props.layerSize}{" "}
                        {`neuron${props.layerSize === "1" ? "" : "s"}`}
                    </p>
                </div>
                <div className={styles.layerCardInfo}>
                    <p className={styles.layerPropName}>Activation Function</p>
                    <p className={styles.layerPropValue}>
                        {props.layerActivation !== undefined
                            ? props.layerActivation
                            : "None"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NeuralNetLayerInput;
