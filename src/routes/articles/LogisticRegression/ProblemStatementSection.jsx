import { MathJax } from "better-react-mathjax";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import StaticLatexSection from "../../../components/StaticLatexSection";
import { sigmoid } from "../../../utils/classificationUtils";
import {
    generateRandomBoxMuller,
    generateRange,
    randomUniform,
} from "../../../utils/math";
import "../Article.css";
import styles from "./LogisticRegression.module.css";

export const ProblemStatementSection = () => {
    const [weight, setWeight] = useState(-1.0);
    const [bias, setBias] = useState(0.5);

    const [sampleData, setSampleData] = useState({ x: [], y: [] });
    useEffect(() => {
        const xValues = generateRange(-10, 10, 50);
        const yValues = xValues.map((x) => (x < 0 ? 0.0 : 1.0));
        setSampleData({
            x: xValues.map((x) => x + generateRandomBoxMuller()),
            y: yValues,
        });
    }, []);

    const plotXValues = generateRange(-10, 10, 100);
    const plotYValues = plotXValues.map((x) => sigmoid(weight * x + bias));

    return (
        <div>
            <StaticLatexSection>
                <p>
                    Consider a <em>binary classification</em> problem where,
                    given a dataset of <MathJax inline>{"\\(m\\)"}</MathJax>{" "}
                    training examples with <MathJax inline>{"\\(n\\)"}</MathJax>{" "}
                    features per sample, the target or output variable is a
                    binary label{" "}
                    <MathJax inline>{"\\(y^{(i)}\\in\\{0,1\\}\\)"}</MathJax>. A
                    suitable model for this problem is a logistic regression
                    model as opposed to linear regression.
                </p>

                <p>
                    Logistic regression achieves this through the use of a
                    nonlinear function known as the <em>logistic function</em>{" "}
                    denoted here as{" "}
                    <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax>, also known
                    as the <em>sigmoid</em> function defined as,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\sigma(z)=\\frac{1}{1+e^{-z}}\\]`}</MathJax>
                </div>
                <p>
                    and the function is bounded between{" "}
                    <MathJax inline>{"\\(y=0\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(y=1\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\lim_{z\\to-\\infty}\\frac{1}{1+e^{-z}}=0\\quad\\text{and}\\quad\\lim_{z\\to\\infty}\\frac{1}{1+e^{-z}}=1\\]`}</MathJax>
                </div>
                <p>
                    The input to the logistic function is calculated as a linear
                    combination of weights <MathJax inline>{"\\(w\\)"}</MathJax>{" "}
                    and the input features{" "}
                    <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>, resulting in
                </p>

                <div className="displayLatex">
                    <MathJax>{`\\[\\sigma(z)=\\frac{1}{1+e^{-(w^\\top x)}}\\]`}</MathJax>
                </div>
                <p>
                    One interpretation of the output of the logistic function is
                    that it is the probability that the class is the positive
                    class given the input features{" "}
                    <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>, i.e,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[P(y=1\\mid x=x^{(i)})=\\hat{y}=\\frac{1}{1+e^{-(w^\\top x^{(i)})}}\\]`}</MathJax>
                </div>
                <p style={{ marginTop: "1rem" }}>
                    Let's work with the 1-dimensional case to get a better idea
                    of how the linear parameters affects the sigmoid function.
                    The plot below shows a sigmoid function with points at{" "}
                    <MathJax inline>{"\\(y\\)"}</MathJax>-values corresponding
                    to their <em>true</em> class, but are colored (
                    <em>classified</em> by the model) based on whether they meet
                    a certain threshold &mdash; in this case, whether its value
                    is at least <MathJax inline>{"\\(0.5\\)"}</MathJax> when{" "}
                    passed to the sigmoid function given the currently set
                    parameters.
                </p>
            </StaticLatexSection>
            <span className="lead" style={{ marginTop: "1rem" }}>
                Try to adjust the parameters in such a way that the sigmoid
                curve classifies the points as accurately as possible.
            </span>
            <div className={styles.inputFields}>
                <div className="inputGroup">
                    <label>Coefficient</label>
                    <div className="inputRangeGroup">
                        <input
                            type="range"
                            min="-5.0"
                            max="5.0"
                            step="0.01"
                            value={weight}
                            onChange={(event) =>
                                setWeight(Number(event.target.value))
                            }
                        />
                        <label>{weight.toFixed(2)}</label>
                    </div>
                </div>
                <div className="inputGroup">
                    <label>Intercept</label>
                    <div className="inputRangeGroup">
                        <input
                            type="range"
                            min="-10.0"
                            max="10.0"
                            step="0.01"
                            value={bias}
                            onChange={(event) =>
                                setBias(Number(event.target.value))
                            }
                        />
                        <label>{bias.toFixed(2)}</label>
                    </div>
                </div>
            </div>
            <div className="datasetPlot">
                <Plot
                    data={[
                        {
                            x: plotXValues,
                            y: plotYValues,
                            type: "scatter",
                            mode: "lines",
                        },
                        {
                            x: plotXValues,
                            y: plotXValues.map((x) => 0.5),
                            type: "scatter",
                            mode: "lines",
                            line: {
                                dash: "dash",
                                color: "#731dd8",
                            },
                        },
                        {
                            x: sampleData.x,
                            y: sampleData.y,
                            type: "scatter",
                            mode: "markers",
                            marker: {
                                colorscale: "Portland",
                                color: sampleData.x.map((x) =>
                                    Math.round(sigmoid(weight * x + bias))
                                ),
                            },
                        },
                    ]}
                    layout={{
                        height: 600,
                        margin: {
                            l: 30,
                            r: 30,
                            t: 60,
                            b: 60,
                        },
                        autosize: true,
                        title: "Scatterplot of the dataset",
                        yaxis: {
                            range: [-0.1, 1.1],
                        },
                        xaxis: {
                            range: [-10, 10],
                        },
                        showlegend: false,
                    }}
                    useResizeHandler
                    config={{
                        displayModeBar: false,
                    }}
                />
            </div>
        </div>
    );
};
