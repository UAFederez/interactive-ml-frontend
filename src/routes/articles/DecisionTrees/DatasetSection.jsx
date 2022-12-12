import Plot from "react-plotly.js";
import styles from "./DecisionTrees.module.css";

const DatasetSection = (props) => {
  return (
    <div>
      <span className="lead">
        We'll work with the same dataset we used binary classification with
        neural networks and we'll see how using a decision tree affects what the
        decision boundaries look like.
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
                onChange={props.handleChangeFunc}
                defaultValue={props.dataset.noiseFactor}
              />
              <label>{props.dataset.noiseFactor}</label>
            </div>
          </div>
          <div className="inputGroup">
            <label>Inner Circle Radius</label>
            <div className="inputRangeGroup">
              <input
                type="range"
                min={"0.0"}
                max={"1.0"}
                step={"0.01"}
                name="innerRadius"
                onChange={props.handleChangeFunc}
                defaultValue={props.dataset.innerRadius}
              />
              <label>{props.dataset.innerRadius}</label>
            </div>
          </div>
          <div className="inputGroup">
            <label>Number of points</label>
            <div className="inputRangeGroup">
              <input
                type="range"
                min={"5"}
                max={"50"}
                step={"1"}
                name="numPoints"
                onChange={props.handleChangeFunc}
                defaultValue={props.dataset.numPoints}
              />
              <label>{props.dataset.numPoints}</label>
            </div>
          </div>
        </div>
      </div>
      <p style={{ marginTop: "1rem" }}>
        Similar to before, the dataset above shows an example of a dataset that
        cannot be separated by a straight line. While in this and many other
        cases, it is possible to transform the features of the dataset such that
        there is a way to draw a linear decision boundary such as with logistic
        regression, this article will use this for demonstration purposes.
      </p>
    </div>
  );
};

export default DatasetSection;
