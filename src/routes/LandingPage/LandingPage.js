import React from "react";
import { Link } from "react-router-dom";
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
            link: "/",
        },
        {
            title: "Logistic Regression",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/",
        },
        {
            title: "Neural networks for binary classification",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero",
            link: "/",
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
                            <li className="article" key={article.title}>
                                <div>
                                    <div className="card-header"></div>
                                    <div className="card-content">
                                        <Link to={article.link}>
                                            <h2 className="title">
                                                {article.title}
                                            </h2>
                                        </Link>
                                        <p className="description">
                                            {article.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h1 className="ff-sans-primary section-title">
                        Unsupervised Learning
                    </h1>
                    <ul className="articles-list">
                        {unsupervisedLearningArticles.map((article) => (
                            <li className="article" key={article.title}>
                                <div>
                                    <div className="card-header"></div>
                                    <div className="card-content">
                                        <Link to={article.link}>
                                            <h2 className="title">
                                                {article.title}
                                            </h2>
                                        </Link>
                                        <p className="description">
                                            {article.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <footer>
                <div className="container">
                    <div>
                        <p>Built by</p>
                        <p>Uriel Federez</p>
                    </div>
                    <div>
                        <p>Built with</p>
                        <p>ReactJS</p>
                        <p>Flask RESTful</p>
                        <p>Python</p>
                        <p>Numpy</p>
                        <p>Custom CSS</p>
                    </div>
                    <div>
                        <p>Contact</p>
                        <p>
                            <a href="mailto:urielfederez@gmail.com">
                                urielfederez@gmail.com
                            </a>
                        </p>
                        <p>
                            <a href="https://www.linkedin.com/in/uriel-federez-26598723b/">
                                LinkedIn
                            </a>
                        </p>
                        <p>
                            <a href="https://github.com/UAFederez">Github</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
