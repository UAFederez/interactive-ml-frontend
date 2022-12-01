import Plot from "react-plotly.js";
import "../Article.css";

export const DatasetSection = (props) => {
    return (
        <div>
            <span className="lead">
                Experiment with the values below to generate a dataset.
            </span>
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
                        autosize: true,
                        title: "Scatterplot of the dataset",
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
