import Plot from "react-plotly.js";
import styles from "./KMeansClustering.module.css";

const DatasetSection = (props) => {
    return (
        <div>
            <span className="lead">
                Experiment with the values below to generate a dataset
            </span>
            <div className="datasetPlot">
                <Plot
                    data={[
                        {
                            x: props.dataset.trainFeatures[0],
                            y: props.dataset.trainFeatures[1],
                            type: "scattergl",
                            mode: "markers",
                            marker: {
                                color: "#085454",
                                symbol: "circle",
                                opacity: 0.8,
                            },
                        },
                    ]}
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
                    }}
                    useResizeHandler
                    config={{
                        displayModeBar: false,
                    }}
                />
            </div>
            <div className={styles.datasetParamInput}>
                <div className={styles.inputFields}>
                    <div className="inputGroup">
                        <label>Number of points</label>
                        <div className="inputRangeGroup">
                            <input
                                type="range"
                                min="3"
                                step="1"
                                max="100"
                                name="pointsPerCluster"
                                onChange={props.handleParamChange}
                                defaultValue={props.dataset.pointsPerCluster}
                            />
                            <label>{props.dataset.pointsPerCluster}</label>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <label>Radius</label>
                        <div className="inputRangeGroup">
                            <input
                                type="range"
                                min="1.0"
                                step="0.01"
                                max="2.0"
                                name="radius"
                                onChange={props.handleParamChange}
                                defaultValue={props.dataset.radius}
                            />
                            <label>{props.dataset.radius.toFixed(2)}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatasetSection;
