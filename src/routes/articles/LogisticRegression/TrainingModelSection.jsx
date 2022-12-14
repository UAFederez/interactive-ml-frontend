import { useEffect, useMemo, useRef, useState } from "react";
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

    const modelOutputScatterPlot = useMemo(() => {
        let result = [
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
            result.push({
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
        return result;
    });

    return (
        <div>
            <span className="lead">
                Experiment with the values below to modify the parameters of the
                logistic regression model. Click on the 'Train Model' button to
                start training the model.
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
                <div>
                    <p>
                        The plot below shows the same dataset but also including
                        line that results from the coefficients calculated from
                        logistic regression. Ideally, the line should sit in
                        such a way so as to seemingly divide the dataset into
                        two halves based on their class. This is known as the{" "}
                        <em>linear decision boundary</em>.
                    </p>
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
                    <p>
                        The plot below shows the accuracy that the model is
                        achieving throughout each iteration, where accuracy is
                        simply the number of correctly classified instances
                        measured as a percentage of the size of the dataset.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                {
                                    y: trainResult.history.accuracy_hist,
                                    type: "scatter",
                                    mode: "lines+markers",
                                    name: "data",
                                    marker: {
                                        color: "#085454",
                                    },
                                },
                            ]}
                            layout={{
                                margin: {
                                    l: 40,
                                    r: 40,
                                    t: 60,
                                    b: 60,
                                },
                                xaxis: {
                                    title: { text: "epochs" },
                                },
                                yaxis: {
                                    range: [0, 1.05],
                                    title: { text: "accuracy" },
                                },
                                autosize: true,
                                title: "Accuracy Graph",
                                height: 600,
                                legend: {
                                    x: 0,
                                    xanchor: "left",
                                    y: 1,
                                    bgcolor: "rgba(255, 255, 255, 0.5)",
                                },
                            }}
                            useResizeHandler
                            config={{
                                displayModeBar: false,
                            }}
                        />
                    </div>
                </div>
            ) : isLoading ? (
                <LoadingSpinner />
            ) : null}
        </div>
    );
};
