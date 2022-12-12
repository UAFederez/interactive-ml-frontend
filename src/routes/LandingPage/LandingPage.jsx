import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const supervisedLearningArticles = [
    {
      title: "Univariate Linear Regression",
      description: (
        <p>
          One of the most fundamental machine learning problems is fitting a
          straight line to data to observe a potential linear relationship.
          Univariate linear regression shows how this is done for datasets with
          one independent variable.
        </p>
      ),
      link: "/linear-regression",
    },
    {
      title: "Multivariate Linear Regression",
      description: (
        <p>
          A natural extension of linear regression is to introduce more
          independent variables. Multivariate logistic regression shows how this
          is done through both iterative and analytical methods, namely gradient
          descent and the normal equations.
        </p>
      ),
      link: "/linear-regression-mul",
    },
    {
      title: "Logistic Regression",
      description: (
        <p>
          Yes or no. True or false. 1 or 0. Often times the target variable is a
          binary label. Logistic regression provides a special linear model that
          is able to provide a useful method for binary classification.
        </p>
      ),
      link: "/logistic-regression",
    },
    {
      title: "Neural networks for binary classification",
      description: (
        <p>
          A relatively recent but important development in the modern age of
          machine learning. Neural networks aim to provide a way of constructing
          a model that has the ability to learn complex non-linear
          relationships. See how it applies to binary classification.
        </p>
      ),
      link: "/neural-network-bin",
    },
    {
      title: "Neural networks for multi-class classification",
      description: (
        <p>
          In some cases, the task requires to distinguish between classes from
          discrete categories. Animal breeds, objects, you name it.See how the
          capabilities of neural networks lend themselves well to also be useful
          in this context.
        </p>
      ),
      link: "/neural-network-mul",
    },
    {
      title: "Decision trees for classification",
      description: (
        <p>
          Another prominent and powerful tool commonly used in machine learning
          problems, decision trees provide a model that classifies records
          through a series of decisions about each of its features.
        </p>
      ),
      link: "/decision-trees",
    },
  ];

  const unsupervisedLearningArticles = [
    {
      title: "K-means Clustering",
      description: (
        <p>
          Birds of a feather flock together. K-means clustering is a model that
          aims to provide answers to such questions without a definitive or
          known classification of data to instead find discernable groupings or
          clusters within the data.
        </p>
      ),
      link: "/kmeans-clustering",
    },
  ];

  return (
    <div>
      <header className={styles.heroContainer}>
        <div className={`${styles.heroContent}`}>
          <div>
            <span className={styles.headingText}>
              Machine learning in action.
            </span>
            <p>
              Experiment with various machine learning models and find out how
              they work under the hood in this series of interactive articles
              showing derivations and visualizations. Play around with the
              parameters of AI models and see how machines can be programmed to{" "}
              <em>learn</em>.
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
                  {article.description}
                </div>
                {article.link ? (
                  <Link to={article.link}>
                    <span className={styles.readMore}>Read More</span>
                  </Link>
                ) : null}
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
                {article.description}
                <Link to={article.link}>
                  <span className={styles.readMore}>Read More</span>
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
