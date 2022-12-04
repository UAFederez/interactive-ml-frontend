import React from "react";
import { Link } from "react-router-dom";
import BackgroundSection from "./BackgroundSection";
import "../Article.css";
import AlgorithmSection from "./AlgorithmSection";
import TrainingModelSection from "./TrainingModelSection";
import TechnicalConsiderationsSection from "./TechnicalConsiderationsSection";
import DatasetSection from "./DatasetSection";
import { generateRandomUniform } from "../../../utils/math";
import {
    generateBlob,
    generateClusters,
} from "../../../utils/classificationUtils";

export default class KMeansClustering extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataset: {
                trainFeatures: [],
                radius: 1.0,
                pointsPerCluster: 50,
            },
        };
    }

    regenerateDataset = () => {
        const trainFeatures = generateBlob(
            this.state.dataset.pointsPerCluster,
            this.state.dataset.radius,
            [0, 0]
        );
        this.setState((prevState) => ({
            ...prevState,
            dataset: {
                ...prevState.dataset,
                trainFeatures: trainFeatures,
            },
        }));
    };

    handleUpdateDataset = (event) => {
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

    componentDidMount() {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
                        handleParamChange={this.handleUpdateDataset}
                    />
                ),
            },
            {
                id: "background",
                title: "Background",
                content: <BackgroundSection />,
            },
            {
                id: "algorithm",
                title: "Algorithm",
                content: <AlgorithmSection />,
            },
            {
                id: "technical-considerations",
                title: "Technical Considerations",
                content: <TechnicalConsiderationsSection />,
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
                    <h1 className="title">K-Means Clustering</h1>
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
