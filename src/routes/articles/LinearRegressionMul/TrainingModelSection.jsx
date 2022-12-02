import { MathJax } from "better-react-mathjax";
import { useRef, useState } from "react";
import Plot from "react-plotly.js";
import { dotProduct } from "../../../utils/math";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import styles from "./LinearRegressionMul.module.css";

const TrainingModelSection = (props) => {
    const learningRate = useRef();
    const numEpochs = useRef();

    const handleModelSubmit = async (event) => {
        event.preventDefault();
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/linear-regression-mul`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    method: "gradient_descent",
                    train_x: [
                        props.simpleDataset.trainX,
                        props.simpleDataset.trainY,
                    ],
                    train_y: props.simpleDataset.trainZ,
                    epochs: Number(numEpochs.current.value),
                    learning_rate: Number(learningRate.current.value),
                    include_hist: true,
                }),
            }
        );
        const response = await result.json();
        console.log(response);
        props.updateTrainResultFunc(response);
    };

    let predictedZ = [];
    if (Object.keys(props.trainResult).length !== 0) {
        predictedZ = props.simpleDataset.trainX.map((x, idx) =>
            dotProduct(
                [x, props.simpleDataset.trainY[idx], 1],
                props.trainResult.weights
            )
        );
    }

    return (
        <div>
            <span className="lead">
                Experiment with the values below to modify the parameters of the
                linear regression model. Click on the 'Train Model' button to
                start training the linear model.
            </span>
            <form onSubmit={handleModelSubmit}>
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
            {Object.keys(props.trainResult).length !== 0 ? (
                <div>
                    <p>
                        The plot below shows a scatterplot of the data points.
                        Analogous to the 1-dimensional case wherein there is
                        only one independent variable for univariate linear
                        regression, then higher dimensions generalize to{" "}
                        <MathJax inline>{"\\(n\\)"}-dimensional</MathJax>{" "}
                        hyperplanes. In this case, the plot below also shows the{" "}
                        <em>best-fit plane</em> that minizes the cost function
                        across the dataset.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                {
                                    x: props.simpleDataset.trainX,
                                    y: props.simpleDataset.trainY,
                                    z: props.simpleDataset.trainZ,
                                    mode: "markers",
                                    marker: {
                                        color: "#085454",
                                        size: 5,
                                        symbol: "circle",
                                        line: {
                                            color: "rgb(204, 204, 204)",
                                            width: 1,
                                        },
                                        opacity: 0.8,
                                    },
                                    type: "scatter3d",
                                },
                                {
                                    x: props.simpleDataset.trainX,
                                    y: props.simpleDataset.trainY,
                                    z: predictedZ,
                                    opacity: 0.4,
                                    color: "#731dd8",
                                    type: "mesh3d",
                                },
                            ]}
                            layout={{
                                margin: {
                                    l: 40,
                                    r: 40,
                                    t: 60,
                                    b: 60,
                                },
                                height: 600,
                                title: "Predicted values of the model",
                            }}
                            useResizeHandler
                            config={{
                                displayModeBar: false,
                            }}
                        />
                    </div>
                    <p>
                        The plot below shows a plot of the cost (MSE) values for
                        each iteration of the training phase. Similar to before,
                        the ideal outcome is a noticeable trend downwards as the
                        number of iterations increase. Perhaps experimenting
                        with the learning rate and number of iterations can shed
                        more light onto how it affects the training phase.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                {
                                    y: props.trainResult.history.loss,
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
            ) : null}
        </div>
    );
};

export default TrainingModelSection;
