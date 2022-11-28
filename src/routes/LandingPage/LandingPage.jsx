import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    const supervisedLearningArticles = [
        {
            title: "Univariate Linear Regression",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar mi non justo laoreet volutpat. Sed varius iaculis massa in venenatis. Nunc arcu lacus, placerat quis ex ac, dapibus",
            link: "/linear-regression",
        },
        {
            title: "Multivariate Linear Regression",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar mi non justo laoreet volutpat. Sed varius iaculis massa in venenatis. Nunc arcu lacus, placerat quis ex ac, dapibus",
            link: "/linear-regression-mul",
        },
        {
            title: "Logistic Regression",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar mi non justo laoreet volutpat. Sed varius iaculis massa in venenatis. Nunc arcu lacus, placerat quis ex ac, dapibus",
            link: "/logistic-regression",
        },
        {
            title: "Neural networks for binary classification",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar mi non justo laoreet volutpat. Sed varius iaculis massa in venenatis. Nunc arcu lacus, placerat quis ex ac, dapibus",
            link: "/neural-network-bin",
        },
        {
            title: "Neural networks for multi-class classification",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar mi non justo laoreet volutpat. Sed varius iaculis massa in venenatis. Nunc arcu lacus, placerat quis ex ac, dapibus",
            link: "/neural-network-mul",
        },
        {
            title: "Decision trees for classification",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar mi non justo laoreet volutpat. Sed varius iaculis massa in venenatis. Nunc arcu lacus, placerat quis ex ac, dapibus",
            link: "/",
        },
    ];

    const unsupervisedLearningArticles = [
        {
            title: "K-means Clustering",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar mi non justo laoreet volutpat. Sed varius iaculis massa in venenatis. Nunc arcu lacus, placerat quis ex ac, dapibus",
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Etiam pulvinar mi non justo laoreet volutpat.
                            Sed varius iaculis massa in venenatis. Nunc arcu
                            lacus, placerat quis ex ac, dapibus tempor nulla.
                            Vestibulum sodales purus non nulla posuere, at
                            fermentum magna tincidunt. Morbi eros arcu, dapibus
                            eget ultricies ac, pellentesque vel leo. Donec sed
                            gravida enim.
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
