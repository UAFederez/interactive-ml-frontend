import React from "react";
import { Link } from "react-router-dom";
import { generateClusters } from "../../../utils/classificationUtils";
import { generateRandomUniform } from "../../../utils/math";
import BackgroundSection from "./BackgroundSection";
import DatasetSection from "./DatasetSection";
import GradientDescentSection from "./GradientDescentSection";
import LossFunctionSection from "./LossFunctionSection";
import TrainingModelSection from "./TrainingModelSection";

export default class NeuralNetworkMul extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataset: {
                trainFeatures: [],
                trainLabels: [],
                centroids: this.chooseClustersRandomly(),
                clusterRadius: 1.0,
                noiseFactor: 0.25,
                pointsPerCluster: 50,
            },
        };
    }

    handleDatasetParamChange = (event) => {
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

    regenerateDataset = () => {
        const [features, labels] = generateClusters(
            this.state.dataset.centroids,
            this.state.dataset.clusterRadius,
            this.state.dataset.noiseFactor,
            this.state.dataset.pointsPerCluster
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

    chooseClustersRandomly = () => {
        const numClusters = 4;
        const startingTheta = (Math.random() * Math.PI) / 2.0;
        let centroids = [];

        for (let i = 0; i < numClusters; i++) {
            const theta = startingTheta + (i * (2.0 * Math.PI)) / numClusters;
            centroids.push([
                Math.cos(theta) * Math.SQRT2, // x
                Math.sin(theta) * Math.SQRT2, // y
            ]);
        }
        return centroids;
    };

    fullResetDataset = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                dataset: {
                    ...prevState.dataset,
                    centroids: this.chooseClustersRandomly(),
                },
            }),
            () => {
                this.regenerateDataset();
            }
        );
    };

    componentDidMount() {
        this.regenerateDataset();
    }

    render() {
        const sections = [
            {
                id: "dataset",
                title: "Dataset",
                content: (
                    <DatasetSection
                        dataset={this.state.dataset}
                        handleDatasetParamChange={this.handleDatasetParamChange}
                        clusterRandomFunc={this.fullResetDataset}
                    />
                ),
            },
            {
                id: "background",
                title: "Background",
                content: <BackgroundSection />,
            },
            {
                id: "loss-function",
                title: "Loss Function",
                content: <LossFunctionSection />,
            },
            {
                id: "gradient-descent",
                title: "Gradient Descent",
                content: <GradientDescentSection />,
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
                    <h1 className="title">
                        Neural Networks for Multiclass Classification
                    </h1>
                </div>

                <div className="container article">
                    <div className="content">
                        {sections.map((section) => (
                            <div
                                className="section"
                                id={`${section.id}`}
                                key={section.id}
                            >
                                <h2>{section.title}</h2>
                                {section.content}
                            </div>
                        ))}
                    </div>

                    <div className="bookmarksContainer">
                        <div className="bookmarks">
                            <p className="bookmarkTitle">In this article</p>
                            <ul>
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`}>
                                            {section.title}
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
