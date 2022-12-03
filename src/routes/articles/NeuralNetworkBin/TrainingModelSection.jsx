import { MathJax } from "better-react-mathjax";
import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import shortid from "shortid";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import NeuralNetLayerInput from "../../../components/NeuralNetLayerInput/NeuralNetLayerInput";
import { generateRange, setProduct } from "../../../utils/math";
import styles from "./NeuralNetworkBin.module.css";

export const TrainingModelSection = (props) => {
    const learningRate = useRef();
    const numEpochs = useRef();
    const [trainResult, setTrainResult] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [hiddenLayers, setHiddenLayers] = useState([
        { id: shortid.generate(), size: 128, activation: "ReLU" },
        { id: shortid.generate(), size: 128, activation: "ReLU" },
    ]);
    const hiddenLayerSizeInput = useRef();
    const hiddenLayerActivationInput = useRef();
    const bounds = Math.max(
        ...props.dataset.radii.map((radius) => Number(radius))
    );
    const axisRange = [-(bounds + 0.5), bounds + 0.5];

    useEffect(() => {
        setTrainResult({});
    }, [props.dataset]);

    const handleModelTrainSubmit = async (event) => {
        event.preventDefault();
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/neural-network`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    train_x: [
                        props.dataset.trainFeatures[0],
                        props.dataset.trainFeatures[1],
                    ],
                    train_y: props.dataset.trainLabels,
                    epochs: Number(numEpochs.current.value),
                    learning_rate: Number(learningRate.current.value),
                    layer_sizes: [
                        2,
                        ...hiddenLayers.map((layer) => layer.size),
                        1,
                    ],
                    layer_activations: [
                        ...hiddenLayers.map((layer) =>
                            layer.activation.toLowerCase()
                        ),
                        "sigmoid",
                    ],
                    metrics: ["binary_class_accuracy"],
                    loss_function: "binary_crossentropy",
                    include_hist: true,
                }),
            }
        );
        const response = await result.json();

        // Calculate the decision boundaries
        const datasetBounds = generateRange(-2, 2, 50);
        const datasetGrid = setProduct(datasetBounds, datasetBounds);
        const gridClassificationRequest = await fetch(
            `${import.meta.env.VITE_API_URL}/api/neural-network`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    predict_from_x: true,
                    train_x: [
                        datasetGrid.map((point) => point[0]),
                        datasetGrid.map((point) => point[1]),
                    ],
                    model: response.model,
                }),
            }
        );

        const gridClassificationResult = await gridClassificationRequest.json();
        response.gridClassificationTestPoints = [
            datasetGrid.map((point) => point[0]),
            datasetGrid.map((point) => point[1]),
        ];
        response.gridClassificationResult = gridClassificationResult.y_pred;
        setTrainResult(response);
        setLoading(false);
    };

    const handleAddHiddenLayer = () => {
        const newHiddenLayer = {
            id: shortid.generate(),
            size: Number(hiddenLayerSizeInput.current.value),
            activation: hiddenLayerActivationInput.current.value,
        };
        setHiddenLayers((prevHiddenLayers) => [
            ...prevHiddenLayers,
            newHiddenLayer,
        ]);
    };

    const deleteLayer = (idToDelete) => {
        setHiddenLayers((prevHiddenLayers) =>
            prevHiddenLayers.filter((currLayer) => currLayer.id !== idToDelete)
        );
    };

    return (
        <div>
            <form
                onSubmit={(event) => {
                    setLoading(true);
                    setTrainResult({});
                    handleModelTrainSubmit(event);
                }}
            >
                <h3>Model Architecture</h3>
                <span className="lead">
                    Experiment with the values below to modify the parameters of
                    the linear regression model, including the architecture of
                    the model itself. Click on the 'Train Model' button to start
                    training the linear model.
                </span>
                <div className={styles.modelParamInput}>
                    <div className={styles.modelParamFields}>
                        <div className="inputGroup">
                            <label>Layer Size</label>
                            <input
                                ref={hiddenLayerSizeInput}
                                type="number"
                                step="1"
                                min="1"
                                max="512"
                                defaultValue={128}
                                required
                            />
                        </div>
                        <div className="inputGroup">
                            <label>Activation Function</label>
                            <select
                                name="activation_func"
                                ref={hiddenLayerActivationInput}
                            >
                                <option value="ReLU">ReLU</option>
                                <option value="Sigmoid">Sigmoid</option>
                                <option value="Tanh">tanh</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.buttonField}>
                        <button
                            onClick={handleAddHiddenLayer}
                            className="button"
                            type="button"
                        >
                            Insert hidden layer
                        </button>
                    </div>
                </div>

                <div className={styles.layerCardsContainer}>
                    <NeuralNetLayerInput
                        layerType={"Input Layer"}
                        layerSize={"2"}
                    />
                    {hiddenLayers.map((layer) => (
                        <NeuralNetLayerInput
                            editable
                            key={layer.id}
                            layerType={"Hidden Layer"}
                            layerSize={layer.size}
                            layerActivation={layer.activation}
                            onDelete={() => deleteLayer(layer.id)}
                        />
                    ))}
                    <NeuralNetLayerInput
                        layerType={"Output Layer"}
                        layerSize={"1"}
                        layerActivation={"Sigmoid"}
                    />
                </div>

                <h3 style={{ marginTop: "2rem" }}>Training Parameters</h3>
                <div className={styles.modelParamInput}>
                    <div className={styles.modelParamFields}>
                        <div className="inputGroup">
                            <label htmlFor="learningRate">
                                Learning Rate:{" "}
                            </label>
                            <input
                                name="learningRate"
                                type="number"
                                step="0.001"
                                min="0.001"
                                ref={learningRate}
                                defaultValue={0.25}
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
                                defaultValue={100}
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
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                /* {
                                    opacity: 0.8,
                                    color: "rgb(300,100,200)",
                                    x: trainResult
                                        .gridClassificationTestPoints[0],
                                    y: trainResult
                                        .gridClassificationTestPoints[1],
                                    type: "scatter",
                                    mode: "markers",
                                    marker: {
                                        size: 12,
                                        symbol: "square",
                                        color: trainResult.gridClassificationResult,
                                        colorscale: "Portland",
                                    },
                                }, */
                                {
                                    opacity: 0.8,
                                    x: trainResult
                                        .gridClassificationTestPoints[0],
                                    y: trainResult
                                        .gridClassificationTestPoints[1],
                                    z: trainResult.gridClassificationResult,
                                    type: "heatmap",
                                    colorbar: {
                                        orientation: "h",
                                    },
                                    colorscale: "Portland",
                                },
                                {
                                    x: props.dataset.trainFeatures[0],
                                    y: props.dataset.trainFeatures[1],
                                    type: "scattergl",
                                    mode: "markers",
                                    marker: {
                                        line: {
                                            color: "#222",
                                            width: 1,
                                        },
                                        color: props.dataset.trainLabels,
                                        colorscale: "Portland",
                                    },
                                },
                            ]}
                            layout={{
                                height: 600,
                                margin: {
                                    l: 40,
                                    r: 40,
                                    t: 60,
                                    b: 60,
                                },
                                autosize: true,
                                showlegend: false,
                                title: "Scatterplot of the dataset with colored model decision boundaries",
                                xaxis: {
                                    range: axisRange,
                                },
                                yaxis: {
                                    range: axisRange,
                                },
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
                                    tick0: 0,
                                    title: { text: "binary cross-entropy" },
                                },
                                autosize: true,
                                title: "Loss curve",
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
                    <p>
                        The chart below shows the accuracy of the model, i.e.,
                        what is the percentage of correctly classified instances
                        across the dataset, where a value of{" "}
                        <MathJax inline>{"\\(1\\)"}</MathJax> is the highest.
                        Ideally, accuracy should increase as the number of
                        iterations increases provided that other parameters
                        (i.e, the learning rate, or even the architecture of the
                        model), do not lead to underfitting.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                {
                                    y: trainResult.history.metrics
                                        .binary_class_accuracy,
                                    type: "scatter",
                                    mode: "lines+markers",
                                    name: "data",
                                    marker: {
                                        color: "#18cedb",
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
                                    range: [0, 1],
                                    title: { text: "accuracy" },
                                },
                                autosize: true,
                                title: "Loss curve",
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
