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
                <div>
                    <p>
                        The scatter plot below shows the dataset with the two
                        clusters previously set as before, but now also shows
                        what the model &mdash; through a sequence of iterations
                        of gradient descent &mdash; has identified to be the
                        best-splitting plane given the training parameters
                        supplied. Try to play around with the parameters to see
                        how it affects what the resulting line looks like.
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
                        The chart below also shows the loss curve of the model,
                        the progression of the binary cross-entropy loss showing
                        how the model progresses towards what has been
                        determined to be the optimal solution (depending on how
                        the training parameters were set) after the specified
                        number of iterations. Playing around with the parameters
                        can also introduce changes in this graph.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                {
                                    y: trainResult.history.loss,
                                    type: "scatter",
                                    mode: "lines+markers",
                                    name: "data",
                                    marker: {
                                        color: "#18cedb",
                                    },
                                },
                            ]}
                            layout={{
                                xaxis: {
                                    title: { text: "epochs" },
                                },
                                yaxis: {
                                    title: { text: "binary cross-entropy" },
                                },
                                autosize: true,
                                title: "Loss curve",
                                height: 600,
                                margin: {
                                    l: 40,
                                    r: 40,
                                    t: 60,
                                    b: 60,
                                },
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
