import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import BackgroundSection from "./BackgroundSection";
import DatasetSection from "./DatasetSection";
import GradientDescentSection from "./GradientDescentSection";
import LossFunctionSection from "./LossFunctionSection";

export default class NeuralNetworkMul extends React.Component {
    state = {};

    render() {
        const sections = [
            { id: "dataset", title: "Dataset", content: <DatasetSection /> },
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
        ];
        return (
            <main>
                <div className="container article-header">
                    <div>
                        <Link to="/">
                            <p className="back">&#8249; Back</p>
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

                    <div className="bookmarks-container">
                        <div className="bookmarks">
                            <p className="bookmark-title">In this article</p>
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

                <Footer />
            </main>
        );
    }
}
