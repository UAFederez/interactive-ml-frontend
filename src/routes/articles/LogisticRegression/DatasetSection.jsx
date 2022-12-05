import Plot from "react-plotly.js";
import styles from "./LogisticRegression.module.css";

export const DatasetSection = (props) => {
    return (
        <div>
            <span className="lead">
                Experiment with the values below to generate a dataset.
            </span>
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
            <div className="datasetPlot">
                <Plot
                    data={[
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
            <p>
                The plot above shows a scatterplot of the dataset containing two
                identifiable clusters, each with one of two (and only two)
                colors. You may have a dataset that has customer statistics
                along with a yes/no indicator of customer churn. Perhaps you
                have medical data about patients and another target variable
                representing whether they have a particular disease. These may
                be binary classes of any kind but the noticeable property is
                that we can envision a <em>straight line</em> that best splits
                the two classes (albeit not perfectly, as there may be some
                overlap).
            </p>
            <p>
                The idea that two distinct sets can be separated with a straight
                line is known formally as <em>linear separability</em> and
                logistic regression is one of the methods that can help with
                finding this best splitting line (or plane for higher
                dimensions).
            </p>
        </div>
    );
};
