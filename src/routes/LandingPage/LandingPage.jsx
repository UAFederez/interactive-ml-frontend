import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    const supervisedLearningArticles = [
        {
            title: "Univariate Linear Regression",
            description:
                "One of the most fundamental machine learning problems is fitting a straight line to data to observe a potential linear relationship. Univariate linear regression shows how this is done for datasets with one independent variable.",
            link: "/linear-regression",
        },
        {
            title: "Multivariate Linear Regression",
            description:
                "A natural extension of linear regression is to introduce more independent variables. Multivariate logistic regression shows how this is done through both iterative and analytical methods, namely gradient descent and the normal equations.",
            link: "/linear-regression-mul",
        },
        {
            title: "Logistic Regression",
            description:
                "Yes or no. True or false. 1 or 0. Often times the target variable is a binary label. Logistic regression provides a special linear model that is able to provide a useful method for binary classification.",
            link: "/logistic-regression",
        },
        {
            title: "Neural networks for binary classification",
            description:
                "A relatively recent but important development in the modern age of machine learning. Neural networks aim to provide a way of constructing a model that has the ability to learn complex non-linear relationships. See how it applies to binary classification.",
            link: "/neural-network-bin",
        },
        {
            title: "Neural networks for multi-class classification",
            description:
                "In some cases, the task requires to distinguish between classes from discrete categories. Animal breeds, faces, objects, you name it.See how the capabilities of neural networks lend themselves well to also be useful in this context.",
            link: "/neural-network-mul",
        },
        {
            title: "Decision trees for classification",
            description:
                "If it looks like a duck, swims like a duck, and quacks like a duck, then the model predicts an 80.24% chance that it is a duck. Decision trees provide a model that classifies records through a series of decisions about each of its most 'defining' aspects.",
            link: "/",
        },
    ];

    const unsupervisedLearningArticles = [
        {
            title: "K-means Clustering",
            description:
                "Birds of a feather flock together. K-means clustering is a model that aims to provide answers to such questions without a definitive or known classification of data to instead find discernable groupings or clusters within the data.",
            link: "/",
        },
    ];

    return (
        <div>
            <header className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <div>
                        <span className={styles.headingText}>
                            Machine learning in action.
                        </span>
                        <p>
                            Experiment with various machine learning models and
                            find out how they work under the hood in this series
                            of interactive articles explaining both the math as
                            well as the implementation. Play around with the
                            parameters of AI models and see how machines can be
                            programmed to <em>learn</em>.
                        </p>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <div></div>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className={styles.sectionHead}>
                        <h2>Supervised Learning</h2>
                    </div>
                    <div className={styles.articleContainer}>
                        {supervisedLearningArticles.map((article) => (
                            <div className={styles.article} key={article.title}>
                                <div>
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                </div>
                                <Link to={article.link}>
                                    <span className={styles.readMore}>
                                        Read More
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container">
                    <div className={styles.sectionHead}>
                        <h2>Unsupervised Learning</h2>
                    </div>
                    <div className={styles.articleContainer}>
                        {unsupervisedLearningArticles.map((article) => (
                            <div className={styles.article} key={article.title}>
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <Link to={article.link}>
                                    <span className={styles.readMore}>
                                        Read More
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
