import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "../Article.css";

const DatasetSection = (props) => {
    const [coeff, setCoeffs] = useState({ x: "0.25", y: "0.25" });
    const [intercept, setIntercept] = useState(0);
    const [noiseFactor, setNoiseFactor] = useState(0.25);
    const [numPoints, setNumPoints] = useState(25);

    const handleCoefficientUpdate = (event) => {
        setCoeffs((prevCoeffs) => ({
            ...prevCoeffs,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        props.updateParamsFunc(
            [coeff.x, coeff.y],
            intercept,
            noiseFactor,
            numPoints
        );
    }, [coeff, intercept, noiseFactor, numPoints]);

    return (
        <div>
            <span className="lead">
                Experiment with the values below to generate a dataset.
            </span>
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
            <div className="gridCols2">
                <div className="inputGroup">
                    <label>X Coefficient</label>
                    <input
                        type="number"
                        name="x"
                        value={coeff.x}
                        onChange={handleCoefficientUpdate}
                    />
                </div>
                <div className="inputGroup">
                    <label>Y Coefficient</label>
                    <input
                        type="number"
                        name="y"
                        value={coeff.y}
                        onChange={handleCoefficientUpdate}
                    />
                </div>
                <div className="inputGroup">
                    <label>Intercept</label>
                    <input
                        type="number"
                        name="intercept"
                        value={intercept}
                        onChange={(event) => setIntercept(event.target.value)}
                    />
                </div>
            </div>
            <div className="gridCols2">
                <div className="inputGroup">
                    <label>Noise Factor</label>
                    <div className="inputRangeGroup">
                        <input
                            type="range"
                            min="0.01"
                            max="1.0"
                            step="0.01"
                            defaultValue={noiseFactor}
                            onChange={(event) =>
                                setNoiseFactor(Number(event.target.value))
                            }
                        />
                        <label>{noiseFactor}</label>
                    </div>
                </div>
                <div className="inputGroup">
                    <label>Number of points along each dimension</label>
                    <div className="inputRangeGroup">
                        <input
                            type="range"
                            min="3"
                            max="50"
                            defaultValue={numPoints}
                            step="1"
                            onChange={(event) =>
                                setNumPoints(Number(event.target.value))
                            }
                        />
                        <label>{numPoints}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatasetSection;
