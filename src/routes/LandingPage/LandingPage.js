import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./LandingPage-styles.css";

const LandingPage = () => {
    const supervisedLearningArticles = [
        {
            title: "Univariate Linear Regression",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/linear-regression",
        },
        {
            title: "Multivariate Linear Regression",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/linear-regression-mul",
        },
        {
            title: "Logistic Regression",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/logistic-regression",
        },
        {
            title: "Neural networks for binary classification",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/neural-network-bin",
        },
        {
            title: "Neural networks for multi-class classification",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/",
        },
        {
            title: "Decision trees for classification",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/",
        },
    ];

    const unsupervisedLearningArticles = [
        {
            title: "K-means Clustering",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/",
        },
    ];

    return (
        <div>
            <main>
                <div className="hero-container">
                    <div className="hero text-center container">
                        <div>
                            <h1 className="fs-xl ff-serif-primary">
                                Machine learning in action
                            </h1>
                            <p className="ff-sans-secondary">
                                An interactive website for experimenting with
                                machine learning models.
                            </p>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="container main-content">
                    <h1 className="ff-sans-secondary fs-300 text-center letter-space-md">
                        ARTICLES
                    </h1>
                    <h1 className="ff-sans-primary section-title">
                        Supervised Learning
                    </h1>
                    <ul className="articles-list">
                        {supervisedLearningArticles.map((article) => (
                            <li className="article-item" key={article.title}>
                                <Link
                                    to={article.link}
                                    className="article-item-link"
                                >
                                    <div>
                                        <div className="card-header"></div>
                                        <div className="card-content">
                                            <h2 className="title">
                                                {article.title}
                                            </h2>

                                            <p className="description">
                                                {article.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <h1 className="ff-sans-primary section-title">
                        Unsupervised Learning
                    </h1>
                    <ul className="articles-list">
                        {unsupervisedLearningArticles.map((article) => (
                            <li className="article-item" key={article.title}>
                                <Link
                                    to={article.link}
                                    className="article-item-link"
                                >
                                    <div>
                                        <div className="card-header"></div>
                                        <div className="card-content">
                                            <h2 className="title">
                                                {article.title}
                                            </h2>

                                            <p className="description">
                                                {article.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
