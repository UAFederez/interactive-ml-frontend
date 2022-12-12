import React from "react";
import { Link } from "react-router-dom";
import { generateCirclesDataset } from "../../../utils/classificationUtils";
import BackgroundSection from "./BackgroundSection";
import DatasetSection from "./DatasetSection";
import EntropySection from "./EntropySection";
import TrainingModelSection from "./TrainingModelSection";

export default class DecisionTrees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: {
        trainFeatures: [],
        trainLabels: [],
        radii: [0.8, 1],
        noiseFactor: 0.1,
        innerRadius: 0.5,
        numPoints: 50,
      },
    };
  }

  regenerateDataset = () => {
    const [features, labels] = generateCirclesDataset(
      [Number(this.state.dataset.innerRadius), 1.0],
      this.state.dataset.noiseFactor,
      this.state.dataset.numPoints
    );
    this.setState((prevState) => ({
      ...prevState,
      dataset: {
        ...prevState.dataset,
        trainFeatures: features,
        trainLabels: labels,
      },
    }));
  };

  componentDidMount() {
    this.regenerateDataset();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  handleDataParamChange = (event) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        dataset: {
          ...prevState.dataset,
          [event.target.name]: Number(event.target.value),
        },
      }),
      () => {
        this.regenerateDataset();
      }
    );
  };

  render() {
    const sections = [
      {
        id: "dataset",
        title: "Dataset",
        content: (
          <DatasetSection
            dataset={this.state.dataset}
            handleChangeFunc={this.handleDataParamChange}
          />
        ),
      },
      {
        id: "background",
        title: "Background",
        content: <BackgroundSection />,
      },
      {
        id: "entropy",
        title: "Entropy",
        content: <EntropySection />,
      },
      {
        id: "training-model",
        title: "Training the Model",
        content: <TrainingModelSection dataset={this.state.dataset} />,
      },
    ];
    return (
      <main>
        <div className="container articleHeader">
          <div>
            <Link to="/" className="back">
              <p>&#8249; Back</p>
            </Link>
          </div>
          <h1 className="title">Decision Trees</h1>
        </div>

        <div className="container article">
          <div className="content">
            {sections.map((section) => (
              <div className="section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            ))}
          </div>
          <div className="bookmarksContainer">
            <div>
              <p className="bookmarkTitle">In this article</p>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <p>{section.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
