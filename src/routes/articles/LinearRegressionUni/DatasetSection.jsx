import Plot from "react-plotly.js";
import styles from "./LinearRegressionUni.module.css";

const DatasetSection = (props) => {
    return (
        <div>
            <span className="lead">
                We'll see how linear regression works but first we need a
                dataset. Experiment with the values below to generate a dataset.
            </span>
            <div className={styles.paramInput}>
                <div className="inputGroup">
                    <label htmlFor="trueCoeff">True Coefficient: </label>
                    <input
                        name="trueCoeff"
                        step="0.01"
                        defaultValue={props.dataset.trueCoeff}
                        type="number"
                        onChange={props.handleInputChange}
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="trueBias">True Intercept: </label>
                    <input
                        name="trueBias"
                        step="0.01"
                        defaultValue={props.dataset.trueBias}
                        type="number"
                        onChange={props.handleInputChange}
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="noiseFac">Noise factor: </label>
                    <div className="inputRangeGroup">
                        <input
                            min="0"
                            max="1.0"
                            step="0.01"
                            defaultValue={props.dataset.noiseFac}
                            name="noiseFac"
                            type="range"
                            onChange={props.handleInputChange}
                        />
                        <label>{props.dataset.noiseFac}</label>
                    </div>
                </div>
                <div className="inputGroup">
                    <label htmlFor="numPoints">Number of data points: </label>
                    <div className="inputRangeGroup">
                        <input
                            min="3"
                            max="50"
                            step="1"
                            defaultValue={props.dataset.numPoints}
                            name="numPoints"
                            type="range"
                            onChange={props.handleInputChange}
                        />
                        <label>{props.dataset.numPoints}</label>
                    </div>
                </div>
            </div>
            <div className="datasetPlot">
                <Plot
                    data={[
                        {
                            x: props.dataset.train_x,
                            y: props.dataset.train_y,
                            type: "scatter",
                            mode: "markers",
                            marker: {
                                color: "#085454",
                            },
                        },
                    ]}
                    layout={{
                        title: "Scatterplot of the generated dataset",
                        autosize: true,
                        height: 600,
                        margin: {
                            l: 40,
                            r: 40,
                            t: 60,
                            b: 60,
                        },
                    }}
                    useResizeHandler
                    config={{
                        displayModeBar: false,
                    }}
                />
            </div>
        </div>
    );
};

export default DatasetSection;
