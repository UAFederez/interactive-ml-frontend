import { useEffect, useRef, useState } from "react";
import styles from "./LogisticRegression.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Plot from "react-plotly.js";
import { generateRange } from "../../../utils/math";

export const TrainingModelSection = (props) => {
    const learningRate = useRef();
    const numEpochs = useRef();
    const [trainResult, setTrainResult] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setTrainResult({});
    }, [props.dataset]);

    const handleModelSubmit = async (event) => {
        event.preventDefault();
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/logistic-regression`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    method: "gradient_descent",
                    train_x: [
                        props.dataset.trainFeatures[0],
                        props.dataset.trainFeatures[1],
                    ],
                    train_y: props.dataset.trainLabels,
                    epochs: Number(numEpochs.current.value),
                    learning_rate: Number(learningRate.current.value),
                    include_hist: true,
                }),
            }
        );
        const response = await result.json();
        console.log(response);
        setTrainResult(response);
        setLoading(false);
    };

    let modelOutputScatterPlot = [
        {
            x: props.dataset.trainFeatures[0],
            y: props.dataset.trainFeatures[1],
            type: "scatter",
            mode: "markers",
            marker: {
                color: props.dataset.trainLabels,
                colorscale: "Portland",
            },
        },
    ];

    if (Object.keys(trainResult).length !== 0) {
        const xRange = generateRange(
            Math.min(...props.dataset.trainFeatures[0], -2.5),
            Math.max(...props.dataset.trainFeatures[0], 2.5),
            100
        );
        const yRange = xRange.map(
            (x) =>
                -(trainResult.weights[0] * x + trainResult.weights[2]) /
                trainResult.weights[1]
        );
        modelOutputScatterPlot.push({
            x: xRange,
            y: yRange,
            type: "lines",
            line: {
                width: 2,
                dash: "dash",
                color: "#731dd8",
            },
        });
    }

    return (
        <div>
            <span className="lead">
                Experiment with the values below to modify the parameters of the
                linear regression model. Click on the 'Train Model' button to
                start training the linear model.
            </span>
            <form
                onSubmit={(event) => {
                    setLoading(true);
                    setTrainResult({});
                    handleModelSubmit(event);
                }}
            >
                <div className={styles.modelParamInput}>
                    <div className={styles.modelParamFields}>
                        <div className="inputGroup">
                            <label htmlFor="learningRate">
                                Learning Rate:{" "}
                            </label>
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
                            <label htmlFor="numEpochs">
                                Number of Epochs:{" "}
                            </label>
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
            </form>
            {Object.keys(trainResult).length !== 0 ? (
                <div className="datasetPlot">
                    <Plot
                        data={modelOutputScatterPlot}
                        layout={{
                            height: 600,
                            margin: {
                                l: 30,
                                r: 30,
                                t: 60,
                                b: 60,
                            },
                            yaxis: {
                                range: [-2.5, 2.5],
                            },
                            xaxis: {
                                range: [-2.5, 2.5],
                            },
                            autosize: true,
                            title: "Scatterplot of the dataset",
                            showlegend: false,
                        }}
                        useResizeHandler
                        config={{
                            displayModeBar: false,
                        }}
                    />
                </div>
            ) : isLoading ? (
                <LoadingSpinner />
            ) : null}
        </div>
    );
};
