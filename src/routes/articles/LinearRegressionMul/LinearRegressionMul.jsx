import React from "react";
import { Link } from "react-router-dom";
import { generateLinearDataset } from "../../../utils/linear_regression_utils";
import DatasetSection from "./DatasetSection";
import GradientDescentSection from "./GradientDescentSection";
import NormalEquationsSection from "./NormalEquationsSection";
import ProblemStatementSection from "./ProblemStatementSection";
import VectorizedImplementationSection from "./VectorizedImplementationSection";
import "../Article.css";
import TrainingModelSection from "./TrainingModelSection";

export default class LinearRegressionMul extends React.Component {
    state = {
        // A simpler dataset with 2 coefficients and 1 bias to make it simpler
        // to visualize in 3D. ALthough, regardless of any dataset for multiple regression,
        // visualizing the loss function is going to be technically impossible
        simpleDataset: {
            trueCoeffs: ["0.25", "0.25"],
            trueIntercept: "0",

            // TODO:
            // Maybe cache the previous results of generateLinearDataset to at least
            // avoid this given that the bounds are constant
            trainX: [],
            trainY: [],
            trainZ: [],
            numPoints: 15,
            noiseFactor: 0.25,
        },
        trainResult: {},
    };

    componentDidMount() {
        this.regenerateDataset();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    regenerateDataset = () => {
        const [trainPoints, trainZ] = generateLinearDataset(
            this.state.simpleDataset.trueCoeffs.map((coeff) => Number(coeff)),
            Number(this.state.simpleDataset.trueIntercept),
            -5.0,
            5.0,
            this.state.simpleDataset.numPoints,
            this.state.simpleDataset.noiseFactor
        );
        this.setState((prevState) => ({
            ...prevState,
            simpleDataset: {
                ...prevState.simpleDataset,
                trainX: trainPoints.map((point) => point[0]),
                trainY: trainPoints.map((point) => point[1]),
                trainZ: trainZ,
            },
        }));
    };

    updateDatasetParams = (coeffs, intercept, noiseFactor, numPoints) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                simpleDataset: {
                    ...prevState.simpleDataset,
                    trueCoeffs: coeffs,
                    trueIntercept: intercept,
                    noiseFactor: noiseFactor,
                    numPoints: numPoints,
                },
                trainResult: {},
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
                        simpleDataset={this.state.simpleDataset}
                        updateParamsFunc={this.updateDatasetParams}
                    />
                ),
            },
            {
                id: "problem-statement",
                title: "Problem Statement",
                content: <ProblemStatementSection />,
            },
            {
                id: "vectorized-impl",
                title: "Vectorized Implementation",
                content: <VectorizedImplementationSection />,
            },
            {
                id: "gradient-descent",
                title: "Gradient Descent",
                content: <GradientDescentSection />,
            },
            {
                id: "training-model",
                title: "Training the Model",
                content: (
                    <TrainingModelSection
                        simpleDataset={this.state.simpleDataset}
                        trainResult={this.state.trainResult}
                        updateTrainResultFunc={(result) => {
                            this.setState((prevState) => ({
                                ...prevState,
                                trainResult: result,
                            }));
                        }}
                    />
                ),
            },
            {
                id: "normal-equations",
                title: "The Normal Equations",
                content: <NormalEquationsSection />,
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
                    <h1 className="title">Multivariate Linear Regression</h1>
                </div>

                {/** Content */}
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
                        <div className="bookmarks">
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
