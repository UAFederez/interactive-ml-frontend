import React from "react";
import { Link } from "react-router-dom";
import { generateBinaryClusters } from "../../../utils/classificationUtils";
import "../Article.css";
import { CostFunctionSection } from "./CostFunctionSection";
import { DatasetSection } from "./DatasetSection";
import { GradientDescentSection } from "./GradientDescentSection";
import { ProblemStatementSection } from "./ProblemStatementSection";
import { TrainingModelSection } from "./TrainingModelSection";
import { VectorizedImplementationSection } from "./VectorizedImplementationSection";

export default class LogisticRegression extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: {
                clusterCentroids: this.chooseClustersRandomly(),
                trainFeatures: [],
                trainLabels: [],
                noiseFactor: 0.25,
                clusterRadius: 1.0,
                pointsPerCluster: 25,
            },
            trainResult: {},
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
        const [features, labels] = generateBinaryClusters(
            this.state.dataset.clusterCentroids,
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

    /**
     * Cluster centroids are randomly selected along the circumference of a unit circle centered
     * at the origin for demonstration purposes. The second cluster centroid is generated such
     * that it diametrically opposes the first.
     */
    chooseClustersRandomly = () => {
        const firstClusterTheta = Math.random() * Math.PI * 2.0;
        const firstCluster = [
            Math.cos(firstClusterTheta),
            Math.sin(firstClusterTheta),
        ];
        const secondCluster = [-firstCluster[0], -firstCluster[1]];

        return [firstCluster, secondCluster];
    };

    fullResetDataset = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                dataset: {
                    ...prevState.dataset,
                    clusterCentroids: this.chooseClustersRandomly(),
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
                        clusterRandomFunc={this.fullResetDataset}
                        handleDatasetParamChange={this.handleDatasetParamChange}
                    />
                ),
            },
            {
                id: "problem-statement",
                title: "Problem Statement",
                content: <ProblemStatementSection />,
            },
            {
                id: "cost-function",
                title: "Cost Function",
                content: <CostFunctionSection />,
            },
            {
                id: "gradient-descent",
                title: "Gradient Descent",
                content: <GradientDescentSection />,
            },
            {
                id: "vectorized-impl",
                title: "Vectorized Implementation",
                content: <VectorizedImplementationSection />,
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
                    <h1 className="title">Logistic Regression</h1>
                </div>

                <div className="container article">
                    <div className="content">
                        {sections.map((section) => (
                            <div
                                id={section.id}
                                className="section"
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
