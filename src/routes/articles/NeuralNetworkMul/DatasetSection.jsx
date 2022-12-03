import Plot from "react-plotly.js";
import styles from "./NeuralNetworkMul.module.css";

const DatasetSection = (props) => {
    return (
        <div>
            <div className="datasetPlot">
                <Plot
                    data={[
                        {
                            x: props.dataset.trainFeatures[0],
                            y: props.dataset.trainFeatures[1],
                            type: "scatter",
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
                        <label>Noise Factor</label>
                        <div className="inputRangeGroup">
                            <input
                                type="range"
                                min={"0.0"}
                                max={"1.0"}
                                step={"0.01"}
                                name="noiseFactor"
                                onChange={props.handleDatasetParamChange}
                                defaultValue={props.dataset.noiseFactor}
                            />
                            <label>{props.dataset.noiseFactor}</label>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <label>Cluster Radius</label>
                        <div className="inputRangeGroup">
                            <input
                                type="range"
                                min={"0.0"}
                                max={"1.0"}
                                step={"0.01"}
                                name="clusterRadius"
                                onChange={props.handleDatasetParamChange}
                                defaultValue={props.dataset.clusterRadius}
                            />
                            <label>{props.dataset.clusterRadius}</label>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <label>Points per cluster</label>
                        <div className="inputRangeGroup">
                            <input
                                type="range"
                                min={"3"}
                                max={"50"}
                                step={"1"}
                                name="pointsPerCluster"
                                onChange={props.handleDatasetParamChange}
                                defaultValue={props.dataset.pointsPerCluster}
                            />
                            <label>{props.dataset.pointsPerCluster}</label>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonField}>
                    <button
                        className="button"
                        onClick={(event) => {
                            event.preventDefault();
                            props.clusterRandomFunc();
                        }}
                    >
                        Randomize Centroids
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DatasetSection;
