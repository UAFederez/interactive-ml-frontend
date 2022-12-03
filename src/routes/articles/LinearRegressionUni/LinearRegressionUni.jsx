import React from "react";
import Plot from "react-plotly.js";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
    evalMeanSquaredError,
    generateLinearDataset,
} from "../../../utils/linear_regression_utils";
import { generateRange } from "../../../utils/math";
import "../Article.css";
import AnalyticalSolutionSection from "./AnalyticalSolutionSection";
import CalculatingGradientSection from "./CalculatingGradientSection";
import GradientDescentSection from "./GradientDescentSection";
import DatasetSection from "./DatasetSection";
import LossFunctionSection from "./LossFunctionSection";
import ProblemStatementSection from "./ProblemStatementSection";
import styles from "./LinearRegressionUni.module.css";
import TrainingModelSection from "./TrainingModelSection";

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
                        <div className="section" id="dataset">
                            <h2>Dataset</h2>
                            <DatasetSection
                                dataset={this.state.dataset}
                                handleInputChange={this.handleInputChange}
                            />
                        </div>
                        <div id="problem-statement" className="section">
                            <h2>Problem Statement</h2>
                            <ProblemStatementSection />
                        </div>
                        <div id="cost-function" className="section">
                            <h2>Cost Function</h2>
                            <LossFunctionSection
                                dataset={this.state.dataset}
                                lossLandscape={this.state.lossLandscape}
                                updateLossLandscapeFunc={
                                    this.handleUpdateLossLandscape
                                }
                            />
                        </div>
                        <div id="gradient-descent" className="section">
                            <h2>Gradient Descent</h2>
                            <GradientDescentSection />
                        </div>
                        <div id="calculating-gradient" className="section">
                            <h2>Calculating the Gradient</h2>
                            <CalculatingGradientSection />
                        </div>
                        <div id="training-model" className="section">
                            <h2>Training the Model</h2>
                            <TrainingModelSection
                                dataset={this.state.dataset}
                                lossLandscape={this.state.lossLandscape}
                            />
                        </div>
                        <div className="section" id="direct-solution">
                            <h2>Analytical Solution</h2>
                            <AnalyticalSolutionSection />
                        </div>
                    </div>
                    <div className="bookmarksContainer">
                        <div>
                            <p className="bookmarkTitle">In this article</p>
                            <ul>
                                <li>
                                    <a href="#dataset">
                                        <p>Dataset</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#problem-statement">
                                        <p>Problem Statement</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#cost-function">
                                        <p>Cost Function</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#gradient-descent">
                                        <p>Gradient Descent</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#calculating-gradient">
                                        <p>Calculating the Gradient</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#training-model">
                                        <p>Training the Model</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#direct-solution">
                                        <p>Analytical Solution</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
