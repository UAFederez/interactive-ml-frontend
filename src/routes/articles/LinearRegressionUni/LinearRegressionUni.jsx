import { MathJax } from "better-react-mathjax";
import React from "react";
import Plot from "react-plotly.js";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import StaticLatexSection from "../../../components/StaticLatexSection";
import {
    evalMeanSquaredError,
    generateLinearDataset,
} from "../../../utils/linear_regression_utils";
import { generateRange } from "../../../utils/math";
import "../Article.css";
import styles from "./LinearRegressionUni.module.css";

export default class LinearRegressionUni extends React.Component {
    state = {
        trueCoeff: "1",
        trueBias: "0",
        noiseFac: 0.25,
        numPoints: 25,
        dataset: { train_x: [], train_y: [] },
        loss_landscape: { test_points: [], loss_values: [] },
        numEpochs: React.createRef(),
        learningRate: React.createRef(),
        trainResult: {},
    };

    componentDidMount() {
        this.regenerate_dataset();
    }

    handle_model_submit = async (event) => {
        event.preventDefault();
        const result = await fetch(
            `${import.meta.env.VITE_API_URL}/api/linear-regression-uni`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    method: "gradient_descent",
                    train_x: this.state.dataset.train_x,
                    train_y: this.state.dataset.train_y,
                    epochs: Number(this.state.numEpochs.current.value),
                    learning_rate: Number(
                        this.state.learningRate.current.value
                    ),
                    include_hist: true,
                }),
            }
        );
        const response = await result.json();
        this.setState(
            {
                ...this.state,
                trainResult: response,
            },
            () => {
                this.compute_loss_landscape();
            }
        );
    };

    compute_loss_landscape = () => {
        const size = 25;
        const test_points = generateRange(-10, 10, size);
        const loss_values = test_points.map((x_i) =>
            test_points.map((x_j) =>
                evalMeanSquaredError([x_i], x_j, this.state.dataset)
            )
        );

        this.setState({
            ...this.state,
            loss_landscape: {
                test_points: test_points,
                loss_values: loss_values,
            },
        });
    };

    regenerate_dataset = () => {
        const trueCoeff =
            this.state.trueCoeff.length === 0
                ? 0
                : Number(this.state.trueCoeff);
        const trueBias =
            this.state.trueBias.length === 0 ? 0 : Number(this.state.trueBias);

        const [train_x, train_y] = generateLinearDataset(
            [trueCoeff],
            trueBias,
            -1.0,
            1.0,
            this.state.numPoints,
            this.state.noiseFac
        );

        this.setState(
            {
                ...this.state,
                train_x: train_x,
                train_y: train_y,
                dataset: {
                    train_x: train_x,
                    train_y: train_y,
                },
                trainResult: {},
            },
            () => {
                this.compute_loss_landscape();
            }
        );
    };

    /**
     * Reacting to input changes for a type='number' input field should
     * ideally allow for arbitrarily typing of negative symbols, empty etc.
     * given that the dataset is updated live. This is why there are separate
     * handlers for onChange.
     */
    handle_input_change = (event) => {
        this.setState(
            {
                ...this.state,
                [event.target.name]: event.target.value,
            },
            () => {
                this.regenerate_dataset();
            }
        );
    };

    handle_input_range_change = (event) => {
        this.setState(
            {
                ...this.state,
                [event.target.name]: Number(event.target.value),
            },
            () => {
                this.regenerate_dataset();
            }
        );
    };

    render() {
        let modelOutputContourData = [
            {
                opacity: 0.8,
                color: "rgb(300,100,200)",
                x: this.state.loss_landscape.test_points,
                y: this.state.loss_landscape.test_points,
                z: this.state.loss_landscape.loss_values,
                type: "contour",
                colorbar: {
                    orientation: "h",
                },
                colorscale: "Portland",
            },
        ];

        let modelOutputLineData = [
            {
                x: this.state.dataset.train_x,
                y: this.state.dataset.train_y,
                type: "scatter",
                mode: "markers",
                name: "data",
                marker: {
                    color: "#085454",
                },
            },
        ];

        if (Object.keys(this.state.trainResult).length !== 0) {
            const w = this.state.trainResult.weight;
            const b = this.state.trainResult.bias;
            modelOutputLineData.push({
                x: [
                    this.state.dataset.train_x[0],
                    this.state.dataset.train_x[
                        this.state.dataset.train_x.length - 1
                    ],
                ],
                y: [
                    w * this.state.dataset.train_x[0] + b,
                    w *
                        this.state.dataset.train_x[
                            this.state.dataset.train_x.length - 1
                        ] +
                        b,
                ],
                type: "lines",
                name: "fitted line",
                mode: "lines",
                marker: { color: "#18cedb" },
            });
            modelOutputContourData.push({
                x: this.state.trainResult.param_hist.b,
                y: this.state.trainResult.param_hist.w,
                type: "scatter",
                name: "Trajectory",
                mode: "lines+markers",
                marker: { color: "white" },
                line: { dash: "dash" },
            });
            modelOutputContourData.push({
                x: [this.state.trainResult.param_hist.b[0]],
                y: [this.state.trainResult.param_hist.w[0]],
                type: "scatter",
                name: "Start",
                mode: "lines+markers",
                marker: { color: "#00ff00", size: 10, line: { width: 1 } },
            });
            modelOutputContourData.push({
                x: [Number(this.state.trueBias)],
                y: [Number(this.state.trueCoeff)],
                type: "scatter",
                mode: "markers",
                name: "True parameters",
                marker: {
                    color: "#f22f2f",
                    size: 10,
                    line: { width: 1 },
                },
            });
        }

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
                            <span className="lead">
                                We'll see how linear regression works but first
                                we need a dataset. Experiment with the values
                                below to generate a dataset.
                            </span>
                            <div className={styles.paramInput}>
                                <div className="inputGroup">
                                    <label htmlFor="trueCoeff">
                                        True Coefficient:{" "}
                                    </label>
                                    <input
                                        name="trueCoeff"
                                        step="0.01"
                                        value={this.state.trueCoeff}
                                        type="number"
                                        onChange={this.handle_input_change}
                                    />
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="trueBias">
                                        True Intercept:{" "}
                                    </label>
                                    <input
                                        name="trueBias"
                                        step="0.01"
                                        value={this.state.trueBias}
                                        type="number"
                                        onChange={this.handle_input_change}
                                    />
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="noiseFac">
                                        Noise factor:{" "}
                                    </label>
                                    <div className="inputRangeGroup">
                                        <input
                                            min="0"
                                            max="1.0"
                                            step="0.01"
                                            value={this.state.noiseFac}
                                            name="noiseFac"
                                            type="range"
                                            onChange={
                                                this.handle_input_range_change
                                            }
                                        />
                                        <label>
                                            {this.state.noiseFac.toFixed(2)}
                                        </label>
                                    </div>
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="numPoints">
                                        Number of data points:{" "}
                                    </label>
                                    <div className="inputRangeGroup">
                                        <input
                                            min="3"
                                            max="50"
                                            step="1"
                                            value={this.state.numPoints}
                                            name="numPoints"
                                            type="range"
                                            onChange={
                                                this.handle_input_range_change
                                            }
                                        />
                                        <label>{this.state.numPoints}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="datasetPlot">
                            <Plot
                                data={[
                                    {
                                        x: this.state.dataset.train_x,
                                        y: this.state.dataset.train_y,
                                        type: "scatter",
                                        mode: "markers",
                                        marker: {
                                            color: "#085454",
                                        },
                                    },
                                ]}
                                layout={{
                                    title: "Scatterplot of the generated dataset",
                                    autosize: true,
                                    height: 600,
                                    margin: {
                                        l: 40,
                                        r: 40,
                                        t: 60,
                                        b: 60,
                                    },
                                }}
                                useResizeHandler
                                config={{
                                    displayModeBar: false,
                                }}
                            />
                        </div>
                        <div id="problem-statement" className="section">
                            <h2>Problem Statement</h2>
                            <StaticLatexSection>
                                <p>
                                    Given a set of{" "}
                                    <MathJax inline>{"\\(m\\)"}</MathJax>{" "}
                                    training examples{" "}
                                    <MathJax inline>
                                        {
                                            "\\(\\left(x^{(i)}, y^{(i)}\\right)\\)"
                                        }
                                    </MathJax>{" "}
                                    for all{" "}
                                    <MathJax inline>
                                        {"\\(i\\in[1,\\ldots,m]\\)"}
                                    </MathJax>
                                    , a linear regression model is a supervised
                                    learning regression model which expresses{" "}
                                    <MathJax inline>
                                        {"\\(f(x^{(i)})=\\hat{y}^{(i)}\\)"}
                                    </MathJax>{" "}
                                    as a linear function of{" "}
                                    <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>{" "}
                                    given parameters{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                                    <MathJax inline>{"\\(b\\)"}</MathJax> as
                                    follows:
                                </p>
                                <p>
                                    <MathJax className="displayLatex">
                                        {
                                            "\\[\\hat{y}^{(i)}=w\\cdot x^{(i)}+b\\]"
                                        }
                                    </MathJax>
                                    The model is a supervised learning model
                                    because the training set contains the "
                                    <em>right</em>" or expected output value for
                                    the target variable for every{" "}
                                    <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>,
                                    and a regression model because the model
                                    outputs a continuous value. Linear
                                    regression with one variable is known as a{" "}
                                    <em>univariate</em> linear regression, i.e,{" "}
                                    <MathJax inline>
                                        {"\\(x^{(i)}\\in\\mathbb{R}\\)"}
                                    </MathJax>{" "}
                                    while <em>multivariate</em> linear
                                    regression is one wherein{" "}
                                    <MathJax inline>
                                        {"\\(x^{(i)}\\in\\mathbb{R}^{n}\\)"}
                                    </MathJax>{" "}
                                    for <MathJax inline>{"\\(n>1\\)"}</MathJax>{" "}
                                    features.
                                </p>
                                <p>
                                    The goal of the linear regression model then
                                    is to find optimal parameters{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                                    <MathJax inline>{"\\(b\\)"}</MathJax> such
                                    that for every training example{" "}
                                    <MathJax inline>
                                        {
                                            "\\(\\left(x^{(i)}, y^{(i)}\\right)\\)"
                                        }
                                    </MathJax>{" "}
                                    for{" "}
                                    <MathJax inline>
                                        {"\\(i\\in[1,\\ldots,m]\\)"}
                                    </MathJax>
                                </p>
                                <MathJax className="displayLatex">
                                    {"\\[f(x^{(i)})\\approx y^{(i)}\\]"}
                                </MathJax>
                            </StaticLatexSection>
                        </div>
                        <div id="cost-function" className="section">
                            <StaticLatexSection>
                                <h2>Cost Function</h2>

                                <p>
                                    It helps to provide a precise measure of how{" "}
                                    <em>far off</em> the predicted outputs are
                                    from the expected output. This can be
                                    formalized as a cost function{" "}
                                    <MathJax inline>{"\\(J\\)"}</MathJax>. A
                                    useful cost function for linear regression
                                    is the <em>mean squared error</em>,
                                </p>

                                <MathJax className="displayLatex">
                                    {
                                        "\\[J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)} - y^{(i)}\\right)^2\\]"
                                    }
                                </MathJax>

                                <p>
                                    One of the benefits of the{" "}
                                    <MathJax inline>
                                        {"\\(\\frac{1}{m}\\)"}
                                    </MathJax>{" "}
                                    is that without it, as{" "}
                                    <MathJax inline>{"\\(m\\)"}</MathJax> gets
                                    larger, the value of the cost function gets
                                    larger as well. Therefore it helps to build
                                    a cost function that does not change
                                    significantly just because the size of the
                                    dataset increases. The{" "}
                                    <MathJax inline>{"\\(2\\)"}</MathJax> in{" "}
                                    <MathJax inline>{"\\(2m\\)"}</MathJax>{" "}
                                    simplifies the calculation of the gradient
                                    later on given that the minimum of{" "}
                                    <MathJax inline>{"\\(f(x)\\)"}</MathJax> is
                                    the same as the minimum of{" "}
                                    <MathJax inline>
                                        {"\\(\\frac{1}{2}f(x)\\)"}
                                    </MathJax>
                                    . Given the cost function, the goal is to
                                    find optimal parameters{" "}
                                    <MathJax inline>{"\\(w^*\\)"}</MathJax> and{" "}
                                    <MathJax inline>{"\\(b^*\\)"}</MathJax>{" "}
                                    which minimize{" "}
                                    <MathJax inline>{"\\(J(w,b)\\)"}</MathJax>.
                                </p>
                                <br />
                                <p>
                                    Take a look at the contour plot of the loss
                                    function below. Observe that the plot looks
                                    somewhat convex, with the deepest point
                                    being wherever the true coefficient and
                                    intercept was set above. This is precisely
                                    the optimal point to minimize the mean
                                    squared error cost function.
                                </p>
                            </StaticLatexSection>
                            <div className="datasetPlot">
                                <Plot
                                    data={[
                                        {
                                            opacity: 0.8,
                                            color: "rgb(300,100,200)",
                                            x: this.state.loss_landscape
                                                .test_points,
                                            y: this.state.loss_landscape
                                                .test_points,
                                            z: this.state.loss_landscape
                                                .loss_values,
                                            type: "contour",
                                            colorbar: {
                                                orientation: "h",
                                            },
                                            colorscale: "Portland",
                                        },
                                        {
                                            x: [Number(this.state.trueBias)],
                                            y: [Number(this.state.trueCoeff)],
                                            type: "scatter",
                                            mode: "markers",
                                            name: "True parameters",
                                            marker: {
                                                color: "#f2f2f2",
                                                size: 10,
                                                line: { width: 1 },
                                            },
                                        },
                                    ]}
                                    layout={{
                                        xaxis: {
                                            title: { text: "intercept" },
                                            range: [-10, 10],
                                        },
                                        yaxis: {
                                            title: { text: "coefficient" },
                                            range: [-10, 10],
                                        },
                                        height: 600,
                                        margin: {
                                            l: 30,
                                            r: 30,
                                            t: 60,
                                            b: 60,
                                        },
                                        showlegend: true,
                                        legend: {
                                            x: 0,
                                            xanchor: "left",
                                            y: 0,
                                            bgcolor: "rgba(255, 255, 255, 0.5)",
                                        },
                                        autosize: true,
                                        title: "Contour plot of the loss function",
                                    }}
                                    useResizeHandler
                                    config={{
                                        displayModeBar: false,
                                    }}
                                />
                            </div>
                        </div>
                        <div id="gradient-descent" className="section">
                            <StaticLatexSection>
                                <h2>Gradient Descent</h2>
                                <p>
                                    Gradient descent is an iterative algorithm
                                    that allows for a linear regression model
                                    &mdash; and many other more complex deep
                                    learning models &mdash; to arrive at a
                                    minimum of any continuous and differentiable
                                    function.
                                </p>
                                <p>
                                    The idea is that given{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                                    <MathJax inline>{"\\(b\\)"}</MathJax> which
                                    are initialized in any manner, the algorithm
                                    will continuously update these parameters in
                                    the steepest direction (negative of the
                                    gradient) towards a minimum of the cost
                                    function. This iteration is repeated until
                                    convergence.
                                </p>
                                <p>
                                    Note that since the mean squared error cost
                                    function is <em>convex</em>, any local
                                    minimum is also the global minimum. This is
                                    not necessarily true for other cost
                                    functions, leading to multiple local minima
                                    depending on the initial starting point.
                                </p>
                                <p>
                                    The parameters{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                                    <MathJax inline>{"\\(b\\)"}</MathJax> on the{" "}
                                    <MathJax inline>{"\\(k\\)"}</MathJax>-th
                                    iteration are continuously updated
                                    (simultaneously) as follows,
                                </p>

                                <MathJax className="displayLatex">
                                    {
                                        "\\[\\begin{align*}w^{[k+1]}&\\leftarrow w^{[k]}-\\alpha\\frac{\\partial J(w^{[k]},b^{[k]})}{\\partial w^{[k]}}\\\\b^{[k+1]}&\\leftarrow b{[k]}-\\alpha\\frac{\\partial J(w^{[k]},b^{[k]})}{\\partial b^{[k]}}\\end{align*}\\]"
                                    }
                                </MathJax>

                                <p>
                                    where{" "}
                                    <MathJax inline>{"\\(\\alpha\\)"}</MathJax>{" "}
                                    describes the <em>learning rate</em>,
                                    essentially a hyperparameter.
                                </p>
                            </StaticLatexSection>
                        </div>
                        <div id="calculating-gradient" className="section">
                            <StaticLatexSection>
                                <h2>Calculating the Gradient</h2>
                                <p>
                                    Given the cost function{" "}
                                    <MathJax inline>{"\\(J(w,b)\\)"}</MathJax>{" "}
                                    which has been previously defined as,
                                </p>

                                <MathJax className="displayLatex">
                                    {
                                        "\\[J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\]"
                                    }
                                </MathJax>

                                <p>
                                    The gradient of the cost function w.r.t the
                                    weights{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax> is
                                </p>

                                <MathJax className="displayLatex">
                                    {
                                        "\\[\\nabla_{w}J(w,b)=\\frac{\\partial J(w,b)}{\\partial w}\\]"
                                    }
                                </MathJax>

                                <p>
                                    The components of this gradient (where{" "}
                                    <MathJax inline>{"\\(w_j=w\\)"}</MathJax> in
                                    the univariate case and{" "}
                                    <MathJax inline>
                                        {"\\(j\\in[1,\\ldots,n]\\)"}
                                    </MathJax>{" "}
                                    for the multivariate case) can be calculated
                                    as,
                                </p>

                                <MathJax className="displayLatex">
                                    {`\\[\\begin{align*}\\frac{\\partial J(w,b)}{\\partial w}
                                    &=\\frac{\\partial}{\\partial w}\\left[\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\right]\\\\[1em]
                                    &=\\frac{1}{2m}\\cdot\\sum_{i=1}^{m}\\left[\\frac{\\partial}{\\partial w}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\right]\\\\[1em]
                                    &=\\frac{1}{2m}\\cdot\\sum_{i=1}^{m}\\left[2\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot\\frac{\\partial}{\\partial w_j}\\left(wx^{(i)}+b-y^{(i)}\\right)\\right]\\\\[1em]
                                    &=\\frac{1}{2m}\\sum_{i=1}^{m}\\left[2\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot x^{(i)}\\right]\\\\[1em]
                                    &=\\frac{1}{m}\\sum_{i=1}^{m}(\\hat{y}^{(i)}-y^{(i)})\\cdot x^{(i)}
                                    \\end{align*}\\]`}
                                </MathJax>

                                <p>
                                    Likewise,{" "}
                                    <MathJax inline>
                                        {"\\(\\frac{\\partial J(w,b)}{b}\\)"}
                                    </MathJax>{" "}
                                    can be calculated as
                                </p>

                                <MathJax className="displayLatex">
                                    {
                                        "\\[\\frac{\\partial J(w,b)}{\\partial b}=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\]"
                                    }
                                </MathJax>
                            </StaticLatexSection>
                        </div>
                        <div id="training-model" className="section">
                            <h2>Training the Model</h2>
                            <span className="lead">
                                Experiment with the values below to modify the
                                parameters of the linear regression model. Click
                                on the 'Train Model' button to start training
                                the linear model.
                            </span>
                            <form onSubmit={this.handle_model_submit}>
                                <div>
                                    <div className={styles.modelParamInput}>
                                        <div className={styles.inputFields}>
                                            <div className="inputGroup">
                                                <label htmlFor="learningRate">
                                                    Learning rate:{" "}
                                                </label>
                                                <input
                                                    name="learningRate"
                                                    ref={
                                                        this.state.learningRate
                                                    }
                                                    type="number"
                                                    required
                                                    step="0.01"
                                                    min="0.01"
                                                    defaultValue={0.1}
                                                />
                                            </div>
                                            <div className="inputGroup">
                                                <label htmlFor="numEpochs">
                                                    Number of iterations:{" "}
                                                </label>
                                                <input
                                                    defaultValue={50}
                                                    required
                                                    name="numEpochs"
                                                    type="number"
                                                    ref={this.state.numEpochs}
                                                    pattern="/\d+/"
                                                    min="1"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.buttonField}>
                                            <button
                                                type="submit"
                                                className="button"
                                            >
                                                Train Model
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {Object.keys(this.state.trainResult).length !==
                            0 ? (
                                <div>
                                    <p>
                                        The contour plot below shows the loss
                                        function again, but also overlays the
                                        trajectory of the coefficient and
                                        intercept parameters throughout the
                                        training phase of the model, with the
                                        green point showing the where it was
                                        (randomly) initialized and the red point
                                        being where it ended after the specified
                                        number of iterations.
                                    </p>
                                    <p>
                                        Try to play around with the learning
                                        rate and number of iterations to see the
                                        effect it has on what the path looks
                                        like. This shows just how important both
                                        hyperparameters are to the performance
                                        of the model, even for a convex
                                        function.
                                    </p>
                                    <div className="datasetPlot">
                                        <Plot
                                            data={modelOutputContourData}
                                            layout={{
                                                xaxis: {
                                                    title: {
                                                        text: "intercept",
                                                    },
                                                    range: [-10, 10],
                                                },
                                                yaxis: {
                                                    title: {
                                                        text: "coefficient",
                                                    },
                                                    range: [-10, 10],
                                                },
                                                margin: {
                                                    l: 40,
                                                    r: 40,
                                                    t: 60,
                                                    b: 60,
                                                },
                                                legend: {
                                                    x: 0,
                                                    xanchor: "left",
                                                    y: 0,
                                                    bgcolor:
                                                        "rgba(255, 255, 255, 0.5)",
                                                },
                                                height: 600,
                                                title: "Contour plot of the loss function",
                                            }}
                                            useResizeHandler
                                            config={{
                                                displayModeBar: false,
                                            }}
                                        />
                                    </div>
                                    <p>
                                        The plot below shows a scatterplot of
                                        the data points along with the best-fit
                                        line as determined through gradient
                                        descent.
                                    </p>
                                    <div className="datasetPlot">
                                        <Plot
                                            data={modelOutputLineData}
                                            layout={{
                                                xaxis: { title: { text: "x" } },
                                                yaxis: { title: { text: "y" } },
                                                autosize: true,
                                                height: 600,
                                                title: "Scatterplot of data points",
                                                margin: {
                                                    l: 40,
                                                    r: 40,
                                                    t: 60,
                                                    b: 60,
                                                },
                                                legend: {
                                                    x: 0,
                                                    xanchor: "left",
                                                    y: 1,
                                                    bgcolor:
                                                        "rgba(255, 255, 255, 0.5)",
                                                },
                                            }}
                                            useResizeHandler
                                            config={{
                                                displayModeBar: false,
                                            }}
                                        />
                                    </div>
                                    <p>
                                        The plot below shows a plot of the cost
                                        (MSE) values for each iteration of the
                                        training phase. Ideally, there should be
                                        a noticeable decline as iterations
                                        proceed which shows that the model is
                                        actually progressing towards the optimal
                                        parameters.
                                    </p>
                                    <div className="datasetPlot">
                                        <Plot
                                            data={[
                                                {
                                                    y: this.state.trainResult
                                                        .loss_hist,
                                                    type: "scatter",
                                                    mode: "lines+markers",
                                                    name: "data",
                                                    marker: {
                                                        color: "#18cedb",
                                                    },
                                                },
                                            ]}
                                            layout={{
                                                xaxis: {
                                                    title: { text: "epochs" },
                                                },
                                                yaxis: {
                                                    title: { text: "MSE" },
                                                },
                                                autosize: true,
                                                title: "Loss curve",
                                                height: 600,
                                                margin: {
                                                    l: 40,
                                                    r: 40,
                                                    t: 60,
                                                    b: 60,
                                                },
                                                legend: {
                                                    x: 0,
                                                    xanchor: "left",
                                                    y: 1,
                                                    bgcolor:
                                                        "rgba(255, 255, 255, 0.5)",
                                                },
                                            }}
                                            useResizeHandler
                                            config={{
                                                displayModeBar: false,
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className="section" id="direct-solution">
                            <StaticLatexSection>
                                <h2>Analytical Solution</h2>
                                <p>
                                    Given that the mean squared error cost
                                    function is a convex function, the minimum
                                    can be solved directly by writing the
                                    derivatives as a system of equations with
                                    two unknowns and finding the solution for{" "}
                                    <MathJax inline>
                                        {
                                            "\\(\\vec{\\theta}=\\begin{bmatrix}0, 0\\end{bmatrix}^\\top\\)"
                                        }
                                    </MathJax>
                                </p>

                                <MathJax className="displayLatex">
                                    {`\\[\\begin{align*}
                                 \\sum_{i=1}^{m}\\left[(w\\cdot x^{(i)}+b-y^{(i)})\\cdot x^{(i)}\\right]&=0\\\\
                                 \\sum_{i=1}^{m}(w\\cdot x^{(i)}+b-y^{(i)})       &=0\\\\
                                 \\end{align*}\\]`}
                                </MathJax>

                                <p>
                                    Distributing the summation and transposing
                                    constants to the right hand side
                                </p>

                                <MathJax className="displayLatex">
                                    {`\\[\\begin{alignat*}{3}
                            &(1)\\quad w\\sum_{i=1}^{m}(x^{(i)})^2&&+b\\sum_{i=1}^{m}x^{(i)}&&=\\sum_{i=1}^{m}y^{(i)}x^{(i)}\\\\
                            &(2)\\quad w\\sum_{i=1}^{m}x^{(i)}&&+bm&&=\\sum_{i=1}^{m}y^{(i)}
                            \\end{alignat*}\\]`}
                                </MathJax>

                                <h3>
                                    Solving for{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax>
                                </h3>
                                <p>Elimination of the second term,</p>

                                <MathJax className="displayLatex">
                                    {`\\[\\begin{align*}
                                     w\\sum_{i=1}^{m}(x^{(i)})^2+b\\sum_{i=1}^{m}x^{(i)}&=\\sum_{i=1}^{m}y^{(i)}x^{(i)}\\\\
                                     -\\frac{\\sum_{i=1}^{m}x^{(i)}}{m}(w\\sum_{i=1}^{m}x^{(i)}+mb       &=\\sum_{i=1}^{m}y^{(i)})\\\\
                                     \\end{align*}\\]`}
                                    {`\\[\\begin{align*}
                                    w\\sum_{i=1}^{m}(x^{(i)})^2+b\\sum_{i=1}^{m}x^{(i)}&=\\sum_{i=1}^{m}y^{(i)}x^{(i)}\\\\
                                    -w\\frac{\\left(\\sum_{i=1}^{m}x^{(i)}\\right)^2}{m}-b\\sum_{i=1}^{m}x^{(i)}&=-\\frac{\\sum_{i=1}^{m}y^{(i)}\\sum_{i=1}^{m}x^{(i)}}{m}
                                    \\end{align*}\\]`}
                                </MathJax>

                                <p>
                                    Solving for{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax>,
                                </p>

                                <MathJax className="displayLatex">
                                    {`\\[w\\left[\\frac{m\\sum_{i=1}^{m}(x^{(i)})^2-\\left(\\sum_{i=1}^{m}x^{(i)}\\right)^2}{m}\\right]=\\frac{m\\sum_{i=1}^{m}y^{(i)}x^{(i)}-\\sum_{i=1}^{m}y^{(i)}\\sum_{i=1}^{m}x^{(i)}}{m}\\]`}
                                    {`\\[w=\\frac{m\\sum_{i}y^{(i)}x^{(i)}-\\sum_{i}y^{(i)}\\sum_{i}x^{(i)}}{m\\sum_{i}(x^{(i)})^2-\\left(\\sum_{i}x^{(i)}\\right)^2}\\]`}
                                </MathJax>

                                <h3>
                                    Solving for{" "}
                                    <MathJax inline>{"\\(b\\)"}</MathJax>
                                </h3>
                                <p>
                                    Solve for{" "}
                                    <MathJax inline>{"\\(w\\)"}</MathJax> from
                                    equation (2) and substitute into equation
                                    (1):
                                </p>

                                <MathJax className="displayLatex">{`\\[w=\\frac{\\sum_{i}y^{(i)}-bm}{\\sum_{i}x^{(i)}}\\]`}</MathJax>

                                <p>
                                    Solving for{" "}
                                    <MathJax inline>{"\\(b\\)"}</MathJax>,
                                </p>

                                <MathJax className="displayLatex">
                                    {`\\[\\begin{align*}
                                \\left(\\frac{\\sum_{i}y^{(i)}-bm}{\\sum_{i}x^{(i)}}\\right)\\sum_{i}(x^{(i)})^2+b\\sum_{i}x^{(i)}&=\\sum_{i}y^{(i)}x^{(i)}\\\\[1em]
                                \\frac{\\sum_{i}y^{(i)}\\sum_{i}(x^{(i)})^2-mb\\sum_{i}(x^{(i)})^2+b\\left(\\sum_{i}x^{(i)}\\right)^2}{\\sum_{i}x^{(i)}}&=\\sum_{i}y^{(i)}x^                                   {(i)}\\\\[1em]
                                \\sum_{i}y^{(i)}\\sum_{i}(x^{(i)})^2-mb\\sum_{i}(x^{(i)})^2+b\\left(\\sum_{i}x^{(i)}\\right)^2&=\\sum_{i}y^{(i)}x^{(i)}\\cdot\\sum_{i}x^{(i)}                                  \\\\[1em]
                                -mb\\sum_{i}(x^{(i)})^2+b\\left(\\sum_{i}x^{(i)}\\right)^2&=\\sum_{i}y^{(i)}x^{(i)}\\cdot\\sum_{i}x^{(i)}-\\sum_{i}y^{(i)}\\cdot\\sum_{i}(x^                                   {(i)})^2\\\\[1em]
                                mb\\sum_{i}(x^{(i)})^2-b\\left(\\sum_{i}x^{(i)}\\right)^2&=\\sum_{i}y^{(i)}\\cdot\\sum_{i}(x^{(i)})^2-\\sum_{i=1}^{m}y^{(i)}x^{(i)}\\cdot\\sum_                                {i}x^{(i)}
                                \\end{align*}\\]`}
                                    {`\\[\\\\[2em]
                                        b=\\frac{\\sum_{i}y^{(i)}\\cdot\\sum_{i}(x^{(i)})^2-\\sum_{i=1}^{m}y^{(i)}x^{(i)}\\cdot\\sum_{i}x^{(i)}}{m\\sum_{i}(x^{(i)})^2-\\left(\\sum_{i}x^{(i)}\\right)^2}\\]`}
                                </MathJax>
                            </StaticLatexSection>
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
