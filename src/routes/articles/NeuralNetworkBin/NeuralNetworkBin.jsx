import { MathJax } from "better-react-mathjax";
import React from "react";
import { Link } from "react-router-dom";
import { generateCirclesDataset } from "../../../utils/classificationUtils";
import { ActivationFunctionSection } from "./ActivationFunctionSection";
import { ArchitectureNotationSection } from "./ArchitectureNotationSection";
import { BackgroundSection } from "./BackgroundSection";
import { DatasetSection } from "./DatasetSection";
import { ForwardPropagationSection } from "./ForwardPropagationSection";
import { TrainingModelSection } from "./TrainingModelSection";
import { VectorizedImplementationSection } from "./VectorizedImplementationSection";

export default class NeuralNetworkBinary extends React.Component {
    state = {
        dataset: {
            trainFeatures: [],
            trainLabels: [],
            radii: ["5", "10"],
            noiseFactor: 0.25,
            numPoints: 25,
        },
    };

    regenerateDataset = () => {
        const [features, labels] = generateCirclesDataset(
            this.state.dataset.radii.map((radius) => Number(radius)),
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
    }

    render() {
        const sections = [
            {
                id: "dataset",
                title: "Dataset",
                content: <DatasetSection dataset={this.state.dataset} />,
            },
            {
                id: "background",
                title: "Background",
                content: <BackgroundSection />,
            },
            {
                id: "architecture-notation",
                title: "Architecture and Notation",
                content: <ArchitectureNotationSection />,
            },
            {
                id: "activation-function",
                title: "Activation Function",
                content: <ActivationFunctionSection />,
            },
            {
                id: "forward-propagation",
                title: "Forward Propagation",
                content: <ForwardPropagationSection />,
            },
            {
                id: "backpropagation",
                title: "Backpropagation",
                content: <ForwardPropagationSection />,
            },
            {
                id: "vectorized-impl",
                title: "Vectorized Implementation",
                content: <VectorizedImplementationSection />,
            },
            {
                id: "training-model",
                title: "Training the Model",
                content: <TrainingModelSection />,
            },
        ];
        return (
            <main>
                {/** Header */}
                <div className="container articleHeader">
                    <div>
                        <Link to="/" className="back">
                            <p>&#8249; Back</p>
                        </Link>
                    </div>
                    <h1 className="title">
                        Neural Networks for Binary Classification
                    </h1>
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
