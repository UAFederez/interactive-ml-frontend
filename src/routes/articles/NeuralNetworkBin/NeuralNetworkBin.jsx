import { MathJax } from "better-react-mathjax";
import React from "react";
import { Link } from "react-router-dom";
import { generateCirclesDataset } from "../../../utils/classificationUtils";
import { ActivationFunctionSection } from "./ActivationFunctionSection";
import { ArchitectureNotationSection } from "./ArchitectureNotationSection";
import { BackgroundSection } from "./BackgroundSection";
import { BackpropagationSection } from "./BackpropagationSection";
import { DatasetSection } from "./DatasetSection";
import { ForwardPropagationSection } from "./ForwardPropagationSection";
import { TrainingModelSection } from "./TrainingModelSection";
import { VectorizedImplementationSection } from "./VectorizedImplementationSection";

export default class NeuralNetworkBinary extends React.Component {
    state = {
        dataset: {
            trainFeatures: [],
            trainLabels: [],
            radii: ["0.8", "1"],
            noiseFactor: "0.0",
            innerRadius: "0.1",
            numPoints: "50",
        },
    };

    regenerateDataset = () => {
        const [features, labels] = generateCirclesDataset(
            [Number(this.state.dataset.innerRadius), 1.0],
            Number(this.state.dataset.noiseFactor),
            Number(this.state.dataset.numPoints)
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

    handleDataParamChange = (event) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                dataset: {
                    ...prevState.dataset,
                    [event.target.name]: event.target.value,
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
                content: <BackpropagationSection />,
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
