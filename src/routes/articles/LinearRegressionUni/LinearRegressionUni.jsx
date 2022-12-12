import React from "react";
import { Link } from "react-router-dom";
import { generateLinearDataset } from "../../../utils/linearRegressionUtils";
import "../Article.css";
import AnalyticalSolutionSection from "./AnalyticalSolutionSection";
import CalculatingGradientSection from "./CalculatingGradientSection";
import GradientDescentSection from "./GradientDescentSection";
import DatasetSection from "./DatasetSection";
import LossFunctionSection from "./LossFunctionSection";
import ProblemStatementSection from "./ProblemStatementSection";
import TrainingModelSection from "./TrainingModelSection";
import MeanSquaredErrorSection from "./MeanSquaredErrorSection";

export default class LinearRegressionUni extends React.Component {
    state = {
        dataset: {
            train_x: [],
            train_y: [],
            trueCoeff: 1.0,
            trueBias: 0.0,
            noiseFac: 0.25,
            numPoints: 25,
        },
        trueCoeff: "1",
        trueBias: "0",
        noiseFac: 0.25,
        numPoints: 25,
        lossLandscape: { testPoints: [], lossValues: [] },
        numEpochs: React.createRef(),
        learningRate: React.createRef(),
        trainResult: {},
        isLoading: false,
    };

    componentDidMount() {
        this.regenerateDataset();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    regenerateDataset = () => {
        const [train_x, train_y] = generateLinearDataset(
            [this.state.dataset.trueCoeff],
            this.state.dataset.trueBias,
            -1.0,
            1.0,
            this.state.dataset.numPoints,
            this.state.dataset.noiseFac
        );

        this.setState((prevState) => ({
            ...prevState,
            dataset: {
                ...prevState.dataset,
                train_x: train_x,
                train_y: train_y,
            },
            trainResult: {},
        }));
    };

    /**
     * Reacting to input changes for a type='number' input field should
     * ideally allow for arbitrarily typing of negative symbols, empty etc.
     * given that the dataset is updated live. This is why there are separate
     * handlers for onChange.
     */
    handleInputChange = (event) => {
        this.setState(
            (prevState) => ({
                ...this.state,
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

    handleUpdateLossLandscape = (newLossLandscape) => {
        this.setState((prevState) => ({
            ...prevState,
            lossLandscape: newLossLandscape,
        }));
    };

    render() {
        const sections = [
            {
                id: "dataset",
                title: "Dataset",
                content: (
                    <DatasetSection
                        dataset={this.state.dataset}
                        handleInputChange={this.handleInputChange}
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
                content: (
                    <LossFunctionSection
                        dataset={this.state.dataset}
                        lossLandscape={this.state.lossLandscape}
                        updateLossLandscapeFunc={this.handleUpdateLossLandscape}
                    />
                ),
            },
            {
                id: "mean-squared-err",
                title: "Why Use Mean Squared Error?",
                content: <MeanSquaredErrorSection />,
            },
            {
                id: "gradient-descent",
                title: "Gradient Descent",
                content: <GradientDescentSection />,
            },
            {
                id: "calculating-gradient",
                title: "Calculating the Gradient",
                content: <CalculatingGradientSection />,
            },
            {
                id: "training-model",
                title: "Training the Model",
                content: (
                    <TrainingModelSection
                        dataset={this.state.dataset}
                        lossLandscape={this.state.lossLandscape}
                    />
                ),
            },
            {
                id: "direct-solution",
                title: "Analytical Solution",
                content: <AnalyticalSolutionSection />,
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
                    <h1 className="title">Univariate Linear Regression</h1>
                </div>
                <div className="container article">
                    <div className="content">
                        {sections.map((section) => (
                            <div
                                className="section"
                                id={section.id}
                                key={section.id}
                            >
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
