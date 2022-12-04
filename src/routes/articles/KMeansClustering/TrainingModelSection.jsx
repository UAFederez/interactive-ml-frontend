import { useEffect, useMemo, useRef, useState } from "react";
import Plot from "react-plotly.js";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { generateRange, setProduct } from "../../../utils/math";
import styles from "./KMeansClustering.module.css";

const TrainingModelSection = (props) => {
    const numClusters = useRef();
    const minUpdateDist = useRef();
    const maxIterations = useRef();

    const [errorMessage, setErrorMessage] = useState("");
    const [trainResult, setTrainResult] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [clusterAssignments, setClusterAssignments] = useState({
        dataset: [],
        grid: {
            testPointsX: [],
            testPointsY: [],
            assignments: [],
        },
    });

    useEffect(() => {
        setTrainResult({});
        setLoading(false);
    }, [props.dataset]);

    const computeClusterAssignments = (points, resultData) => {
        // Depending on how empty clusters were handled or may be changed in the future,
        // numClusters from the client may be different than the resulting number of clusters
        const numClusters = resultData.centroids.length;
        const numPoints = points[0].length;
        let assignments = [];

        for (let i = 0; i < numPoints; i++) {
            // Compute the closest cluster
            let [minClusterIdx, minEuclidDist] = [0, Infinity];
            const [px, py] = [points[0][i], points[1][i]];

            for (let k = 0; k < numClusters; k++) {
                const [cx, cy] = resultData.centroids[k];
                const euclidDist = Math.sqrt((cx - px) ** 2 + (cy - py) ** 2);

                if (euclidDist < minEuclidDist) {
                    minClusterIdx = k;
                    minEuclidDist = euclidDist;
                }
            }

            assignments.push(minClusterIdx);
        }
        return assignments;
    };

    const handleModelTrainSubmit = async (event) => {
        event.preventDefault();

        console.log("minUpdateDist", minUpdateDist.current.value);
        console.log("maxIter", maxIterations.current.value);

        const isMinUpdateDistInvalid =
            !minUpdateDist.current.value && minUpdateDist.current.value !== 0;
        const isMaxIterInvalid =
            !maxIterations.current.value && maxIterations.current.value !== 0;

        if (isMinUpdateDistInvalid && isMaxIterInvalid) {
            setErrorMessage(
                "You must specify at least one of 'Maximum Iterations' or 'Minimum Update Distance' for the stopping condition"
            );
            setLoading(false);
            return;
        }
        setErrorMessage("");

        let body = {
            train_x: [
                props.dataset.trainFeatures[0],
                props.dataset.trainFeatures[1],
            ],
            n_clusters: Number(numClusters.current.value),
        };

        if (!isMaxIterInvalid) {
            body["max_num_iter"] = Number(maxIterations.current.value);
        } else {
            body["min_avg_update_dist"] = Number(minUpdateDist.current.value);
        }

        console.log(body);

        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/kmeans-clustering`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const response = await result.json();
        setTrainResult(response);

        // Compute cluster assignments for the entire grid
        const gridTestRange = generateRange(-3, 3, 100);
        const gridTestPoints = setProduct(gridTestRange, gridTestRange);
        const gridClusterAssignments = computeClusterAssignments(
            [
                gridTestPoints.map((point) => point[0]),
                gridTestPoints.map((point) => point[1]),
            ],
            response
        );

        setClusterAssignments({
            dataset: computeClusterAssignments(
                props.dataset.trainFeatures,
                response
            ),
            grid: {
                testPointsX: gridTestPoints.map((point) => point[0]),
                testPointsY: gridTestPoints.map((point) => point[1]),
                assignments: gridClusterAssignments,
            },
        });

        console.log(gridClusterAssignments);
    };

    return (
        <div>
            <div>
                <form
                    onSubmit={(event) => {
                        setLoading(true);
                        setTrainResult({});
                        handleModelTrainSubmit(event);
                    }}
                >
                    <span className="lead">
                        Experiment with the values below to modify the
                        parameters of the model. You can specify either the
                        'Minimum Update Step' or 'Maximum Iterations', but if
                        you specify both, the model will prefer 'Maximum
                        Iterations' as the stopping criteria. Click on the 'Find
                        Clusters' below when ready.
                    </span>
                    <div className={styles.modelParamInput}>
                        <div className={styles.modelParamFields}>
                            <div className="inputGroup">
                                <label>Number of clusters (K)</label>
                                <input
                                    type="number"
                                    min="1"
                                    ref={numClusters}
                                    defaultValue={4}
                                    max={props.dataset.pointsPerCluster}
                                    step="1"
                                    required
                                />
                            </div>
                            <div className="inputGroup">
                                <label>Minimum Update Distance</label>
                                <input
                                    type="number"
                                    min="0.0001"
                                    ref={minUpdateDist}
                                    step="0.0001"
                                />
                            </div>
                            <div className="inputGroup">
                                <label>Maximum Iterations</label>
                                <input
                                    type="number"
                                    min="1"
                                    ref={maxIterations}
                                    max="500"
                                    step="1"
                                />
                            </div>
                        </div>
                        <div className={styles.buttonField}>
                            <button type="submit" className="button">
                                Find Clusters
                            </button>
                        </div>
                    </div>
                </form>
                {errorMessage ? (
                    <span className="lead error">{errorMessage}</span>
                ) : null}
            </div>
            {Object.keys(trainResult).length !== 0 ? (
                <div>
                    <p>
                        The plot below shows the same dataset, but also
                        including a color coding based on their cluster
                        assignments. The shaded regions partitioning the space
                        make up what is known as a <em>Voronoi</em> diagram and
                        it is the result of calculating the cluster assignment
                        for every point in the space. Each point marked with an
                        'x' and filled with a color is the cluster centroid
                        assigned for a cluster with that color.
                    </p>
                    <div className="datasetPlot">
                        <Plot
                            data={[
                                {
                                    x: clusterAssignments.grid.testPointsX,
                                    y: clusterAssignments.grid.testPointsY,
                                    z: clusterAssignments.grid.assignments,
                                    type: "heatmap",
                                    colorscale: "Portland",
                                    showscale: false,
                                    opacity: 0.8,
                                },
                                {
                                    x: props.dataset.trainFeatures[0],
                                    y: props.dataset.trainFeatures[1],
                                    type: "scatter",
                                    mode: "markers",
                                    marker: {
                                        color: clusterAssignments.dataset,
                                        symbol: "circle",
                                        opacity: 0.8,
                                        colorscale: "Portland",
                                        line: {
                                            color: "#222",
                                            width: 2,
                                        },
                                    },
                                },
                                {
                                    x: trainResult.centroids.map(
                                        (centroid) => centroid[0]
                                    ),
                                    y: trainResult.centroids.map(
                                        (centroid) => centroid[1]
                                    ),
                                    type: "scatter",
                                    mode: "markers",
                                    marker: {
                                        color: trainResult.centroids.map(
                                            (centroid, idx) => idx
                                        ),
                                        line: {
                                            color: "#f4f4f4",
                                            width: 2,
                                        },
                                        size: 15,
                                        symbol: "x",
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
                                    range: [-3, 3],
                                },
                                xaxis: {
                                    range: [-3, 3],
                                },
                                autosize: true,
                                showlegend: false,
                                title: "Scatterplot of the dataset with cluster assignments",
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
