import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import styles from "./LinearRegressionUni.module.css";

const TrainingModelSection = (props) => {
    const numEpochs = useRef();
    const learningRate = useRef();

    const [trainResult, setTrainResult] = useState({});
    const [isLoading, setLoading] = useState(false);

    const handleModelTrainSubmit = async (event) => {
        event.preventDefault();
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/linear-regression-uni`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    method: "gradient_descent",
                    train_x: props.dataset.train_x,
                    train_y: props.dataset.train_y,
                    epochs: Number(numEpochs.current.value),
                    learning_rate: Number(learningRate.current.value),
                    include_hist: true,
                }),
            }
        );
        const response = await result.json();
        setTrainResult(response);
    };

    useEffect(() => {
        setTrainResult({});
        setLoading(false);
    }, [props.dataset]);

    let modelOutputContourData = [
        {
            opacity: 0.8,
            color: "rgb(300,100,200)",
            x: props.lossLandscape.testPoints,
            y: props.lossLandscape.testPoints,
            z: props.lossLandscape.lossValues,
            type: "contour",
            colorbar: {
                orientation: "h",
            },
            colorscale: "Portland",
        },
    ];

    let modelOutputLineData = [
        {
            x: props.dataset.train_x,
            y: props.dataset.train_y,
            type: "scatter",
            mode: "markers",
            name: "data",
            marker: {
                color: "#085454",
            },
        },
    ];

    if (Object.keys(trainResult).length !== 0) {
        const w = trainResult.weight;
        const b = trainResult.bias;
        modelOutputLineData.push({
            x: [
                props.dataset.train_x[0],
                props.dataset.train_x[props.dataset.train_x.length - 1],
            ],
            y: [
                w * props.dataset.train_x[0] + b,
                w * props.dataset.train_x[props.dataset.train_x.length - 1] + b,
            ],
            type: "lines",
            name: "fitted line",
            mode: "lines",
            marker: { color: "#731dd8" },
        });
        modelOutputContourData.push({
            x: trainResult.param_hist.b,
            y: trainResult.param_hist.w,
            type: "scatter",
            name: "Trajectory",
            mode: "lines+markers",
            marker: { color: "white" },
            line: { dash: "dash" },
        });
        modelOutputContourData.push({
            x: [trainResult.param_hist.b[0]],
            y: [trainResult.param_hist.w[0]],
            type: "scatter",
            name: "Start",
            mode: "lines+markers",
            marker: { color: "#00ff00", size: 10, line: { width: 1 } },
        });
        modelOutputContourData.push({
            x: [props.dataset.trueBias],
            y: [props.dataset.trueCoeff],
            type: "scatter",
            mode: "markers",
            name: "True parameters",
            marker: {
                color: "#f22f2f",
                size: 10,
                line: { width: 1 },
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
                    handleModelTrainSubmit(event);
                }}
            >
                <div>
                    <div className={styles.modelParamInput}>
                        <div className={styles.inputFields}>
                            <div className="inputGroup">
                                <label htmlFor="learningRate">
                                    Learning rate:{" "}
                                </label>
                                <input
                                    name="learningRate"
                                    ref={learningRate}
                                    type="number"
                                    required
                                    step="0.01"
                                    min="0.0"
                                    defaultValue={0.1}
                                />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="numEpochs">
                                    Number of iterations:{" "}
                                </label>
                                <input
                                    defaultValue={50}
                                    required
                                    name="numEpochs"
                                    type="number"
                                    ref={numEpochs}
                                    min="1"
                                    max="500"
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
            </form>

            {Object.keys(trainResult).length !== 0 ? (
                <div>
                    <p>
                        The contour plot below shows the loss function again,
                        but also overlays the trajectory of the coefficient and
                        intercept parameters throughout the training phase of
                        the model, with the green point showing the where it was
                        (randomly) initialized and the red point being where it
                        ended after the specified number of iterations.
                    </p>
                    <p>
                        Try to play around with the learning rate and number of
                        iterations to see the effect it has on what the path
                        looks like. This shows just how important both
                        hyperparameters are to the performance of the model,
                        even for a convex function.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={modelOutputContourData}
                            layout={{
                                xaxis: {
                                    title: {
                                        text: "intercept",
                                    },
                                    range: [-10, 10],
                                },
                                yaxis: {
                                    title: {
                                        text: "coefficient",
                                    },
                                    range: [-10, 10],
                                },
                                margin: {
                                    l: 40,
                                    r: 40,
                                    t: 60,
                                    b: 60,
                                },
                                legend: {
                                    x: 0,
                                    xanchor: "left",
                                    y: 0,
                                    bgcolor: "rgba(255, 255, 255, 0.5)",
                                },
                                height: 600,
                                title: "Contour plot of the loss function",
                            }}
                            useResizeHandler
                            config={{
                                displayModeBar: false,
                            }}
                        />
                    </div>
                    <p>
                        The plot below shows a scatterplot of the data points
                        along with the best-fit line as determined through
                        gradient descent.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={modelOutputLineData}
                            layout={{
                                xaxis: { title: { text: "x" } },
                                yaxis: { title: { text: "y" } },
                                autosize: true,
                                height: 600,
                                title: "Scatterplot of data points",
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
                    <p>
                        The plot below shows a plot of the cost (MSE) values for
                        each iteration of the training phase. Ideally, there
                        should be a noticeable decline as iterations proceed
                        which shows that the model is actually progressing
                        towards the optimal parameters.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                {
                                    y: trainResult.loss_hist,
                                    type: "scatter",
                                    mode: "lines+markers",
                                    name: "data",
                                    marker: {
                                        color: "#085454",
                                    },
                                },
                            ]}
                            layout={{
                                xaxis: {
                                    title: { text: "epochs" },
                                },
                                yaxis: {
                                    title: { text: "MSE" },
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

export default TrainingModelSection;
