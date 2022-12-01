import { useRef, useState } from "react";
import styles from "./NeuralNetworkBin.module.css";

export const TrainingModelSection = () => {
    const learningRate = useRef();
    const numEpochs = useRef();
    const [trainResult, setTrainResult] = useState({});
    const [isLoading, setLoading] = useState(false);

    return (
        <div>
            <span className="lead">
                Experiment with the values below to modify the parameters of the
                linear regression model. Click on the 'Train Model' button to
                start training the linear model.
            </span>
            <div className={styles.modelParamInput}>
                <div className={styles.modelParamFields}>
                    <div className="inputGroup">
                        <label htmlFor="learningRate">Learning Rate: </label>
                        <input
                            name="learningRate"
                            type="number"
                            step="0.01"
                            min="0.01"
                            ref={learningRate}
                            defaultValue={0.1}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="numEpochs">Number of Epochs: </label>
                        <input
                            name="numEpochs"
                            type="number"
                            step="1"
                            min="1"
                            ref={numEpochs}
                            defaultValue={50}
                            required
                        />
                    </div>
                </div>
                <div className={styles.buttonField}>
                    <button type="submit" className="button">
                        Train Model
                    </button>
                </div>
            </div>
        </div>
    );
};
