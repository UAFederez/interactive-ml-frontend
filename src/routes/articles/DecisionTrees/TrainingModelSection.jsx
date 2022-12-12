import Graphviz from "graphviz-react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { generateRange, setProduct } from "../../../utils/math";
import styles from "./DecisionTrees.module.css";

const TrainingModelSection = (props) => {
  const [trainResult, setTrainResult] = useState({});
  const [isLoading, setLoading] = useState(false);

  // Used for referencing the model parameter input fields
  const maximumDepth = useRef();
  const minSamplesLeaf = useRef();

  useEffect(() => {
    setTrainResult({});
  }, [props.dataset]);

  const handleModelTrainSubmit = async (event) => {
    event.preventDefault();

    // Train the model on the dataset
    const trainFeatures = props.dataset.trainFeatures.map((values, idx) => ({
      name: `feature-${idx}`,
      values,
    }));

    const modelTrainResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/decision-trees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: "train",
          train_features: trainFeatures,
          min_samples_leaf: Number(minSamplesLeaf.current.value),
          max_depth: Number(maximumDepth.current.value),
          will_prune: false,
          train_labels: {
            name: "class",
            values: props.dataset.trainLabels,
          },
        }),
      }
    );

    const modelTrainJSON = await modelTrainResponse.json();
    console.log(modelTrainJSON);

    // Perform inference using the model on the entire grid
    const datasetBounds = generateRange(-1.25, 1.25, 50);
    const datasetGrid = setProduct(datasetBounds, datasetBounds);
    const testData = [
      ...datasetGrid.map(([x, y]) => ({
        "feature-0": x,
        "feature-1": y,
      })),
    ];

    const gridClassificationRequest = await fetch(
      `${import.meta.env.VITE_API_URL}/api/decision-trees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: "predict",
          test_data: testData,
          serialized_tree: modelTrainJSON.tree_serialized,
        }),
      }
    );

    const gridClassificationResult = await gridClassificationRequest.json();
    modelTrainJSON.gridClassificationTestPoints = [
      datasetGrid.map((point) => point[0]),
      datasetGrid.map((point) => point[1]),
    ];
    modelTrainJSON.gridClassificationResult =
      gridClassificationResult.predicted;
    setTrainResult(modelTrainJSON);
    setLoading(false);
  };

  return (
    <div>
      <span className="lead">
        Experiment with the values below to modify the parameters of the
        decision tree model when training.
      </span>
      <form
        onSubmit={(event) => {
          setLoading(true);
          setTrainResult({});
          handleModelTrainSubmit(event);
        }}
      >
        <div className={styles.modelParamInput}>
          <div className={styles.inputFields}>
            <div className="inputGroup">
              <label>Minimum samples per leaf node</label>
              <input
                type="number"
                ref={minSamplesLeaf}
                min={1}
                max={props.dataset.numPoints}
                step={1}
                defaultValue={5}
              />
            </div>
            <div className="inputGroup">
              <label>Maximum Depth</label>
              <input
                type="number"
                ref={maximumDepth}
                min={1}
                max={20}
                step={1}
                defaultValue={5}
              />
            </div>
          </div>
          <div className={styles.buttonField}>
            <button type="submit" className="button">
              Train Model
            </button>
          </div>
        </div>

        {Object.keys(trainResult).length !== 0 ? (
          <>
            <p>
              The plot below shows the same dataset as before, including an
              overlay of the classification labels for each point on the grid.
              This shows how a model such as a decision tree can ideally find
              the optimal splitting points to divide the dataset and reduce the
              entropy.
            </p>
            <div className="datasetPlot">
              <Plot
                data={[
                  {
                    opacity: 0.8,
                    x: trainResult.gridClassificationTestPoints[0],
                    y: trainResult.gridClassificationTestPoints[1],
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
                  title:
                    "Scatterplot of the dataset with colored model decision boundaries",
                  xaxis: {
                    range: [-1.25, 1.25],
                  },
                  yaxis: {
                    range: [-1.25, 1.25],
                  },
                }}
                useResizeHandler
                config={{
                  displayModeBar: false,
                }}
              />
            </div>
            <p>
              The plot below shows a visualization of the actual decision tree.
              Each node that is not a leaf can be identified by the name of the
              predictor variable it uses as well as the threshold value if it is
              based on a numeric predictor. Leaf nodes are represented simply by
              the output class label and branches are labelled based on the
              whether the record meets a certain criteria for the decision.{" "}
            </p>
            <div className={styles.graphvizPlot}>
              <Graphviz
                dot={trainResult["graphviz_output"]}
                options={{ width: "100%", fit: true, engine: "dot" }}
              />
            </div>
          </>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : null}
      </form>
    </div>
  );
};

export default TrainingModelSection;
