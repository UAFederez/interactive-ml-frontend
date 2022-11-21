import { MathJax } from "better-react-mathjax";
import React from "react";
import Plot from "react-plotly.js";
import "../../styles/article-style.css";
import "../../styles/linear-regression-uni-styles.css";

export default class LinearRegression extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trueCoeff: 1,
            trueBias: 0,
            noiseFac: 0.25,
            numPoints: 25,
            train_x: [],
            train_y: [],
            loss_x: [],
            loss_y: [],
            loss_z: [],
        };
    }

    componentDidMount() {
        this.regenerateDataset();
    }

    // Obtain a random variable that is approximately
    // distributed by a Gaussian (mu = 0, var = 1)
    // From: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
    boxMullerTransform = () => {
        let u = 1 - Math.random();
        let v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    computeLoss = () => {
        const size = 25;
        let x = new Array(size);
        let y = new Array(size);
        let z = new Array(size);

        const step = 10.0 / size;
        for (let i = 0; i < size; i++) {
            x[i] = y[i] = -5.0 + (i + 1.0) * step;
            z[i] = new Array(size);
        }

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let loss_ij = 0.0;
                for (let n = 0; n < this.state.numPoints; n++) {
                    const y_pred = x[i] * this.state.train_x[n] + y[j];
                    const y_true = this.state.train_y[n];
                    loss_ij += (y_pred - y_true) ** 2 / this.state.numPoints;
                }
                z[i][j] = loss_ij;
            }
        }

        this.setState({
            loss_x: x,
            loss_y: y,
            loss_z: z,
        });
    };

    regenerateDataset = () => {
        // Since the points range from [-1, 1], then the distance is 2
        const step = 2.0 / this.state.numPoints;
        let train_x = [];
        let train_y = [];
        for (let i = 0; i < this.state.numPoints; i++) {
            const x_val = -1.0 + (i + 1) * step;
            const noise = this.state.noiseFac * this.boxMullerTransform();
            train_x.push(x_val);
            train_y.push(
                this.state.trueCoeff * x_val + this.state.trueBias + noise
            );
        }

        this.setState(
            {
                train_x: train_x,
                train_y: train_y,
            },
            () => {
                this.computeLoss();
            }
        );
    };

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: Number(event.target.value),
            },
            () => {
                this.regenerateDataset();
            }
        );
    };

    render() {
        return (
            <div className="article content">
                <div>
                    <h1 className="title">Univariate Linear Regression</h1>
                    <p className="lead">
                        Experiment with the values below to generate a dataset.
                    </p>
                    <div className="paramInput">
                        <div>
                            <div>
                                <label htmlFor="trueCoeff">
                                    True Coefficient:{" "}
                                </label>
                                <input
                                    name="trueCoeff"
                                    value={this.state.trueCoeff}
                                    type="number"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="trueBias">True Bias: </label>
                                <input
                                    name="trueBias"
                                    value={this.state.trueBias}
                                    type="number"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="noiseFac">Noise factor: </label>
                                <div>
                                    <input
                                        min="0"
                                        max="1.0"
                                        step="0.01"
                                        value={this.state.noiseFac}
                                        name="noiseFac"
                                        type="range"
                                        onChange={this.handleChange}
                                    />
                                    <label>
                                        {this.state.noiseFac.toFixed(2)}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="numPoints">
                                    Number of data points:{" "}
                                </label>
                                <div>
                                    <input
                                        min="3"
                                        max="50"
                                        step="1"
                                        value={this.state.numPoints}
                                        name="numPoints"
                                        type="range"
                                        onChange={this.handleChange}
                                    />
                                    <label>{this.state.numPoints}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dataset-plot">
                        <Plot
                            data={[
                                {
                                    x: this.state.train_x,
                                    y: this.state.train_y,
                                    type: "scatter",
                                    mode: "markers",
                                    marker: { color: "red" },
                                },
                            ]}
                            layout={{
                                responsive: true,
                                title: "Scatterplot of data points",
                            }}
                            config={{
                                displayModeBar: false,
                            }}
                        />
                    </div>
                    <p>
                        Given a set of <MathJax inline>{"\\(m\\)"}</MathJax>{" "}
                        training examples{" "}
                        <MathJax inline>
                            {"\\(\\left(x^{(i)}, y^{(i)}\\right)\\)"}
                        </MathJax>{" "}
                        for all{" "}
                        <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>,
                        a linear regression model is a supervised learning
                        regression model which expresses{" "}
                        <MathJax inline>
                            {"\\(f(x^{(i)})=\\hat{y}^{(i)}\\)"}
                        </MathJax>{" "}
                        as a linear function of{" "}
                        <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax> given
                        parameters <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                        <MathJax inline>{"\\(b\\)"}</MathJax> as follows:
                    </p>
                    <p>
                        <MathJax>
                            {"\\[\\hat{y}^{(i)}=w\\cdot x^{(i)}+b\\]"}
                        </MathJax>
                        The model is a supervised learning model because the
                        training set contains the "<em>right</em>" or expected
                        output value for the target variable for every{" "}
                        <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>, and a
                        regression model because the model outputs a continuous
                        value. Linear regression with one variable is known as a{" "}
                        <em>univariate</em> linear regression, i.e,{" "}
                        <MathJax inline>
                            {"\\(x^{(i)}\\in\\mathbb{R}\\)"}
                        </MathJax>{" "}
                        while <em>multivariate</em> linear regression is one
                        wherein{" "}
                        <MathJax inline>
                            {"\\(x^{(i)}\\in\\mathbb{R}^{n}\\)"}
                        </MathJax>{" "}
                        for <MathJax inline>{"\\(n>1\\)"}</MathJax> features.
                    </p>
                    <h2>Cost Function</h2>
                    <p>
                        The goal of the linear regression model is to find
                        optimal parameters <MathJax inline>{"\\(w\\)"}</MathJax>{" "}
                        and <MathJax inline>{"\\(b\\)"}</MathJax> such that for
                        every training example{" "}
                        <MathJax inline>
                            {"\\(\\left(x^{(i)}, y^{(i)}\\right)\\)"}
                        </MathJax>{" "}
                        for{" "}
                        <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>
                    </p>
                    <p>
                        <MathJax>{"\\[f(x^{(i)})\\approx y^{(i)}\\]"}</MathJax>
                    </p>
                    <p>
                        Therefore, it helps to provide a precise measure of how{" "}
                        <em>far off</em> the predicted outputs are from the
                        expected output. This can be formalized as a cost
                        function <MathJax inline>{"\\(J\\)"}</MathJax>. A useful
                        cost function for linear regression is the{" "}
                        <em>mean squared error</em>,
                    </p>
                    <p>
                        <MathJax>
                            {
                                "\\[J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)} - y^{(i)}\\right)^2\\]"
                            }
                        </MathJax>
                    </p>
                    <p>
                        One of the benefits of the{" "}
                        <MathJax inline>{"\\(\\frac{1}{m}\\)"}</MathJax> is that
                        without it, as <MathJax inline>{"\\(m\\)"}</MathJax>{" "}
                        gets larger, the value of the cost function gets larger
                        as well. Therefore it helps to build a cost function
                        that does not change significantly just because the size
                        of the dataset increases. The{" "}
                        <MathJax inline>{"\\(2\\)"}</MathJax> in{" "}
                        <MathJax inline>{"\\(2m\\)"}</MathJax> simplifies the
                        calculation of the gradient later on given that the
                        minimum of <MathJax inline>{"\\(f(x)\\)"}</MathJax> is
                        the same as the minimum of{" "}
                        <MathJax inline>{"\\(\\frac{1}{2}f(x)\\)"}</MathJax>.
                        Given the cost function, the goal is to find optimal
                        parameters <MathJax inline>{"\\(w^*\\)"}</MathJax> and{" "}
                        <MathJax inline>{"\\(b^*\\)"}</MathJax> which minimize{" "}
                        <MathJax inline>{"\\(J(w,b)\\)"}</MathJax>.
                    </p>
                    <br />
                    <p className="lead">
                        Take a look at the contour plot of the loss function
                        below. Observe that the plot looks somewhat convex, with
                        the deepest point being wherever the true coefficient
                        and bias was set above. This is precisely the optimal
                        point to minimize the mean squared error cost function.
                    </p>
                    <div className="dataset-plot">
                        <Plot
                            data={[
                                {
                                    opacity: 0.8,
                                    color: "rgb(300,100,200)",
                                    x: this.state.loss_x,
                                    y: this.state.loss_y,
                                    z: this.state.loss_z,
                                    type: "contour",
                                },
                            ]}
                            layout={{
                                height: 600,
                                responsive: true,
                                title: "Contour plot of the loss function",
                            }}
                            config={{
                                displayModeBar: false,
                            }}
                        />
                    </div>
                    <h2>Gradient Descent</h2>
                    <p>
                        Gradient descent is an iterative algorithm that allows
                        for a linear regression model &mdash; and many other
                        more complex deep learning models &mdash; to arrive at a
                        minimum of any continuous and differentiable function.
                    </p>
                    <p>
                        The idea is that given{" "}
                        <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                        <MathJax inline>{"\\(b\\)"}</MathJax> which are
                        initialized in any manner, the algorithm will
                        continuously update these parameters in the steepest
                        direction (negative of the gradient) towards a minimum
                        of the cost function. This iteration is repeated until
                        convergence.
                    </p>
                    <p>
                        Note that since the mean squared error cost function is{" "}
                        <em>convex</em>, any local minimum is also the global
                        minimum. This is not necessarily true for other cost
                        functions, leading to multiple local minima depending on
                        the initial starting point.
                    </p>
                    <p>
                        The parameters <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                        <MathJax inline>{"\\(b\\)"}</MathJax> on the{" "}
                        <MathJax inline>{"\\(k\\)"}</MathJax>-th iteration are
                        continuously updated (simultaneously) as follows,
                        <MathJax>
                            {
                                "\\[\\begin{align*}w^{[k+1]}&\\leftarrow w^{[k]}-\\alpha\\frac{\\partial J(w^{[k]},b^{[k]})}{\\partial w^{[k]}}\\\\b^{[k+1]}&\\leftarrow b{[k]}-\\alpha\\frac{\\partial J(w^{[k]},b^{[k]})}{\\partial b^{[k]}}\\end{align*}\\]"
                            }
                        </MathJax>
                        where <MathJax inline>{"\\(\\alpha\\)"}</MathJax>{" "}
                        describes the <em>learning rate</em>, essentially a
                        hyperparameter.
                    </p>
                    <h2>Calculating the Gradient</h2>
                    <p>
                        Given the cost function{" "}
                        <MathJax inline>{"\\(J(w,b)\\)"}</MathJax> which has
                        been previously defined as,
                    </p>
                    <p>
                        <MathJax>
                            {
                                "\\[J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\]"
                            }
                        </MathJax>
                    </p>
                    <p>
                        The gradient of the cost function w.r.t the weights{" "}
                        <MathJax inline>{"\\(w\\)"}</MathJax> is
                    </p>
                    <p>
                        <MathJax>
                            {
                                "\\[\\nabla_{w}J(w,b)=\\frac{\\partial J(w,b)}{\\partial w}\\]"
                            }
                        </MathJax>
                    </p>
                    <p>
                        The components of this gradient (where{" "}
                        <MathJax inline>{"\\(w_j=w\\)"}</MathJax> in the
                        univariate case and{" "}
                        <MathJax inline>{"\\(j\\in[1,\\ldots,n]\\)"}</MathJax>{" "}
                        for the multivariate case) can be calculated as,
                    </p>
                    <p>
                        <MathJax>
                            {`\\[\\begin{align*}\\frac{\\partial J(w,b)}{\\partial w}
                                    &=\\frac{\\partial}{\\partial w}\\left[\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\right]\\\\[1em]
                                    &=\\frac{1}{2m}\\cdot\\sum_{i=1}^{m}\\left[\\frac{\\partial}{\\partial w}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\right]\\\\[1em]
                                    &=\\frac{1}{2m}\\cdot\\sum_{i=1}^{m}\\left[2\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot\\frac{\\partial}{\\partial w_j}\\left(wx^{(i)}+b-y^{(i)}\\right)\\right]\\\\[1em]
                                    &=\\frac{1}{2m}\\sum_{i=1}^{m}\\left[2\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot x^{(i)}\\right]\\\\[1em]
                                    &=\\frac{1}{m}\\sum_{i=1}^{m}(\\hat{y}^{(i)}-y^{(i)})\\cdot x^{(i)}
                                    \\end{align*}\\]`}
                        </MathJax>
                    </p>

                    <p>
                        Likewise,{" "}
                        <MathJax inline>
                            {"\\(\\frac{\\partial J(w,b)}{b}\\)"}
                        </MathJax>{" "}
                        can be calculated as
                        <MathJax>
                            {
                                "\\[\\frac{\\partial J(w,b)}{\\partial b}=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\]"
                            }
                        </MathJax>
                    </p>
                </div>
            </div>
        );
    }
}
