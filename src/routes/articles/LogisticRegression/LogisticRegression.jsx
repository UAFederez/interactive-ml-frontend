import { MathJax } from "better-react-mathjax";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";

export default class LogisticRegression extends React.Component {
    state = {};

    render() {
        return (
            <main>
                {/** Header */}
                <div className="container article-header">
                    <div>
                        <Link to="/">
                            <p className="back">&#8249; Back</p>
                        </Link>
                    </div>
                    <h1 className="title">Logistic Regression</h1>
                </div>

                {/** Container */}
                <div className="container article">
                    <div className="content">
                        {/** Dataset Section -- Content */}
                        <div className="section" id="dataset">
                            <h2>Dataset</h2>
                            <span className="lead">
                                Experiment with the values below to generate a
                                dataset.
                            </span>
                        </div>

                        {/** Problem Statement -- Content */}
                        <div className="section" id="problem-statement">
                            <h2>Problem Statement</h2>
                            <p>
                                Consider a <em>binary classification</em>{" "}
                                problem where, given a dataset of{" "}
                                <MathJax inline>{"\\(m\\)"}</MathJax> training
                                examples with{" "}
                                <MathJax inline>{"\\(n\\)"}</MathJax> features
                                per sample, the target or output variable is a
                                binary label{" "}
                                <MathJax inline>
                                    {"\\(y^{(i)}\\in\\{0,1\\}\\)"}
                                </MathJax>
                                . A suitable model for this problem is a
                                logistic regression model as opposed to linear
                                regression.
                            </p>

                            <p>
                                Logistic regression achieves this through the
                                use of a nonlinear function known as the{" "}
                                <em>logistic function</em> denoted here as{" "}
                                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax>,
                                also known as the <em>sigmoid</em> function
                                defined as,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\sigma(z)=\\frac{1}{1+e^{-z}}\\]`}</MathJax>
                            </div>
                            <p>
                                and the function is bounded between{" "}
                                <MathJax inline>{"\\(y=0\\)"}</MathJax> and{" "}
                                <MathJax inline>{"\\(y=1\\)"}</MathJax>
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\lim_{z\\to-\\infty}\\frac{1}{1+e^{-z}}=0\\quad\\text{and}\\quad\\lim_{z\\to\\infty}\\frac{1}{1+e^{-z}}=1\\]`}</MathJax>
                            </div>
                            <p>
                                The input to the logistic function is calculated
                                as a linear combination of weights{" "}
                                <MathJax inline>{"\\(w\\)"}</MathJax> and the
                                input features{" "}
                                <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>,
                                resulting in
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\sigma(z)=\\frac{1}{1+e^{-(w^\\top x)}}\\]`}</MathJax>
                            </div>
                            <p>
                                One interpretation of the output of the logistic
                                function is that it is the probability that the
                                class is the positive class given the input
                                features{" "}
                                <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>,
                                i.e,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[P(y=1\\mid x=x^{(i)})=\\hat{y}=\\frac{1}{1+e^{-(w^\\top x^{(i)})}}\\]`}</MathJax>
                            </div>
                        </div>

                        {/** Cost Functiont -- Content */}
                        <div className="section" id="cost-function">
                            <h2>Cost Function</h2>
                            <p>
                                The goal is to maximize the output of{" "}
                                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax>{" "}
                                whenever{" "}
                                <MathJax inline>{"\\(y^{(i)}=1\\)"}</MathJax>{" "}
                                and minimize{" "}
                                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax>{" "}
                                whenever{" "}
                                <MathJax inline>{"\\(y^{(i)}=0\\)"}</MathJax>.
                                Given the probabilistic interpretation of the
                                logistic function. The optimal parameters{" "}
                                <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                                <MathJax inline>{"\\(b\\)"}</MathJax> can be
                                found as follows:
                            </p>

                            <p>
                                The probability that the output is the positive
                                or negative class given the input features{" "}
                                <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax> can
                                be expressed as,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[P(y\\mid x)=\\hat{y}^y\\cdot(1-\\hat{y})^{(1-y)}\\]`}</MathJax>
                            </div>
                            <p>
                                to see that this is valid, suppose the true
                                label <MathJax inline>{"\\(y=1\\)"}</MathJax>,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[P(y=1\\mid x)=\\hat{y}\\cdot(1-1)^{(1-1)}=\\hat{y}\\]`}</MathJax>
                            </div>
                            <p>
                                and if the true label{" "}
                                <MathJax inline>{"\\(y=0\\)"}</MathJax>,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[P(y=0\\mid x)=\\hat{y}^0\\cdot(1-\\hat{y})^{(1-0)}=1-\\hat{y}\\]`}</MathJax>
                            </div>

                            <p>
                                Therefore, the goal is to maximize{" "}
                                <MathJax inline>{"\\(\\hat{y}\\)"}</MathJax> for
                                this function.
                            </p>

                            <p>
                                Because the{" "}
                                <MathJax inline>{"\\(\\log(x)\\)"}</MathJax> is
                                a strictly increasingly monotic function, any
                                maximum of <MathJax inline>{"\\(x\\)"}</MathJax>{" "}
                                is also a maximum of{" "}
                                <MathJax inline>{"\\(\\log(x)\\)"}</MathJax>.
                                Therefore, the equation can be written as
                            </p>

                            <div className="display-latex">
                                <MathJax>
                                    {`\\[\\begin{align*}
                                    \\log(P(y\\mid x))
                                    &=\\log\\left(\\hat{y}^{y}\\cdot(1-\\hat{y})^{(1-y)}\\right)\\\\
                                    &=\\log\\left(\\hat{y}^y\\right)+\\log\\left((1-\\hat{y})^{(1-y)}\\right)\\\\
                                    &=y\\log(\\hat{y})+(1-y)\\log(1-\\hat{y})
                                    \\end{align*}\\]`}
                                </MathJax>
                            </div>

                            <p>
                                Maximizing{" "}
                                <MathJax inline>
                                    {"\\(\\log(P(y\\mid x))\\)"}
                                </MathJax>{" "}
                                is equivalent to minimizing the{" "}
                                <MathJax inline>
                                    {"\\(-\\log(P(y\\mid x))\\)"}
                                </MathJax>
                                . This is also known as the{" "}
                                <em>binary cross-entropy loss</em> function.{" "}
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[L(\\hat{y},y)=-\\left[y\\log(\\hat{y})+(1-y)\\log(1-\\hat{y})\\right]\\]`}</MathJax>
                            </div>

                            <p>The cost is simply defined similar to before</p>
                            <div className="display-latex">
                                <MathJax>{`\\[J(w)=\\frac{1}{m}\\sum_{i=1}^{m}L(\\hat{y}^{(i)},y^{(i)})\\]`}</MathJax>
                            </div>
                        </div>

                        {/** Gradient Descent */}
                        <div className="section" id="gradient-descent">
                            <h2>Gradient Descent</h2>
                            <p>
                                Given the formula for the cost function{" "}
                                <MathJax inline>{"\\(J(w)\\)"}</MathJax>, the
                                gradient of the cost function w.r.t the weights{" "}
                                <MathJax inline>
                                    {"\\(\\nabla_{w}J(w)\\)"}
                                </MathJax>{" "}
                                can be calculated similarly as before:
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\nabla_{w}J(w)=\\begin{bmatrix}\\frac{\\partial J(w)}{\\partial w_1} & \\dots & \\frac{\\partial J(w)}{\\partial w_n}\\end{bmatrix}^\\top\\]`}</MathJax>
                            </div>

                            <p>
                                To simplify the calculation of the derivative{" "}
                                <MathJax inline>
                                    {
                                        "\\(\\frac{\\partial J(w)}{\\partial w_j}\\)"
                                    }
                                </MathJax>
                                , it is helpful to note that by the chain rule,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial J(w)}{\\partial w_j}=\\frac{1}{m}\\sum_{i=1}^{m}\\frac{\\partial L(\\hat{y}^{(i)}, y^{(i)})}{\\partial\\hat{y}^{(i)}}\\cdot\\frac{\\partial \\hat{y}^{(i)}}{\\partial w_j}\\]`}</MathJax>
                            </div>
                            <p>
                                The partial derivative of the loss w.r.t a
                                particular output{" "}
                                <MathJax inline>
                                    {"\\(\\hat{y}^{(i)}\\)"}
                                </MathJax>{" "}
                                for{" "}
                                <MathJax inline>
                                    {"\\(i\\in[1,\\ldots,m]\\)"}
                                </MathJax>{" "}
                                is,
                            </p>
                            <div className="display-latex">
                                <MathJax>
                                    {`\\[\\begin{align*}
                                    \\frac{\\partial L(\\hat{y}^{(i)}, y^{(i)})}{\\partial\\hat{y}^{(i)}}
                                    &=\\frac{\\partial}{\\partial\\hat{y}^{(i)}}\\left[-\\left(y^{(i)}\\log(\\hat{y}^{(i)})+(1-y^{(i)})\\log(1-\\hat{y}^{(i)})\\right)\\right]\\\\
                                    &=-\\left[\\frac{y^{(i)}}{\\hat{y}^{(i)}}+\\frac{(1-y^{(i)})}{(1-\\hat{y}^{(i)})}(-1)\\right]\\\\
                                    &=-\\left(\\frac{y^{(i)}(1-\\hat{y}^{(i)})-\\hat{y}(1-y^{(i)})}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    &=-\\left(\\frac{y^{(i)}-y^{(i)}\\hat{y}^{(i)}-\\hat{y}^{(i)}+y^{(i)}\\hat{y}^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    &=\\left(\\frac{\\hat{y}^{(i)}-y^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    &=\\left(\\frac{\\hat{y}^{(i)}-y^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    \\end{align*}\\]`}
                                </MathJax>
                            </div>

                            <p>
                                The partial derivative of the predicted value{" "}
                                <MathJax inline>
                                    {"\\(\\hat{y}^{(i)}\\)"}
                                </MathJax>{" "}
                                for{" "}
                                <MathJax inline>
                                    {"\\(i\\in[1,\\ldots,m]\\)"}
                                </MathJax>{" "}
                                w.r.t a particular weight{" "}
                                <MathJax inline>{"\\(w_j\\)"}</MathJax> for{" "}
                                <MathJax inline>
                                    {"\\(j\\in[1,\\ldots,n]\\)"}
                                </MathJax>{" "}
                                is,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial\\hat{y}^{(i)}}{\\partial w_j}
    &=\\frac{\\partial\\sigma(z^{(i)})}{\\partial z^{(i)}}\\cdot\\frac{\\partial z^{(i)}}{\\partial w_j}
    \\end{align*}\\]`}</MathJax>
                            </div>

                            <p>
                                The first factor, i.e., the derivative of the
                                logistic function is w.r.t{" "}
                                <MathJax inline>{"\\(z\\)"}</MathJax> is,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial\\sigma(z^{(i)})}{\\partial z^{(i)}}
    &=\\frac{\\partial}{\\partial z^{(i)}}\\left(\\frac{1}{1+e^{-z^{(i)}}}\\right)\\\\  
    &=-\\frac{1}{(1+e^{-z^{(i)}})^2}\\left(e^{-z^{(i)}}\\right)\\left(-1\\right)\\\\    
    &=\\frac{e^{-z^{(i)}}}{(1+e^{-z^{(i)}})^2}\\\\  
    &=\\frac{1-1+e^{-z^{(i)}}}{(1+e^{-z^{(i)}})^2}\\\\  
    &=\\frac{1+e^{-z^{(i)}}}{(1+e^{-z^{(i)}})^2}-\\frac{1}{(1+e^{-z^{(i)}})^2}\\\\  
    &=\\frac{1}{1+e^{-z^{(i)}}}\\left(\\frac{1+e^{-z^{(i)}}}{1+e^{-z^{(i)}}}-\\frac{1}{1+e^{-z^{(i)}}}\\right)\\\\  
    &=\\frac{1}{1+e^{-z^{(i)}}}\\left(1-\\frac{1}{1+e^{-z^{(i)}}}\\right)\\\\   
    &=\\sigma(z^{(i)})(1-\\sigma(z^{(i)}))=\\hat{y}^{(i)}(1-\\hat{y}^{(i)})
    \\end{align*}\\]`}</MathJax>
                            </div>

                            <p>
                                The partial derivative of{" "}
                                <MathJax inline>{"\\(z\\)"}</MathJax> w.r.t to a
                                particular weight{" "}
                                <MathJax inline>{"\\(w_j\\)"}</MathJax> is,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial z^{(i)}}{w_j}=\\frac{\\partial}{\\partial w_j}(w^\\top x^{(i)})=x^{(i)}_j\\]`}</MathJax>
                            </div>

                            <p>
                                Combining all the derivatives for the cost
                                function,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial J(w)}{\\partial w_j}
    &=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\frac{\\hat{y}^{(i)}-y^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\cdot\\hat{y}^{(i)}(1-\\hat{y}^{(i)})\\cdot x^{(i)}_j\\\\
    &=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot x^{(i)}_j
    \\end{align*}\\]`}</MathJax>
                            </div>
                        </div>

                        {/** Gradient Descent */}
                        <div className="section" id="vectorized-impl">
                            <h2>Vectorized Implementation</h2>
                            <p>
                                Given the design matrix{" "}
                                <MathJax inline>{"\\(X\\)"}</MathJax> and
                                parameters <MathJax inline>{"\\(w\\)"}</MathJax>{" "}
                                (with <MathJax inline>{"\\(b\\)"}</MathJax>{" "}
                                included) defined similarly as before, a
                                vectorized implementation of{" "}
                                <MathJax inline>
                                    {"\\(\\nabla_{w}J(w)\\)"}
                                </MathJax>{" "}
                                can be calculated as follows:
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[X=
        \\begin{bmatrix}
            x^{(1)}_1 & \\dots  & x^{(m)}_1 \\\\
            \\vdots    & \\ddots & \\vdots    \\\\
            x^{(1)}_n & \\dots  & x^{(m)}_n \\\\
            1 & \\dots & 1
        \\end{bmatrix}
        \\qquad
        w=\\begin{bmatrix}w_1\\\\ \\vdots\\\\ w_n\\\\ b\\end{bmatrix}\\]`}</MathJax>
                            </div>

                            <p>
                                A matrix-vector product would then yield the
                                intermediate variable{" "}
                                <MathJax inline>{"\\(Z\\)"}</MathJax> for the
                                logistic function{" "}
                                <MathJax inline>{"\\(\\sigma(Z)\\)"}</MathJax>{" "}
                                (note that{" "}
                                <MathJax inline>{"\\(\\sigma(Z)\\)"}</MathJax>{" "}
                                operates component-wise, i.e,{" "}
                                <MathJax inline>
                                    {"\\(\\hat{Y}_i=\\sigma(Z_i)\\)"}
                                </MathJax>{" "}
                                for{" "}
                                <MathJax inline>
                                    {"\\(i\\in[1,\\ldots,m]\\)"}
                                </MathJax>
                                )
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[Z=w^\\top X\\qquad\\text{and}\\qquad\\hat{Y}=\\sigma(Z)\\]`}</MathJax>
                            </div>

                            <p>
                                The residuals{" "}
                                <MathJax inline>{"\\(\\hat{Y}-Y\\)"}</MathJax>{" "}
                                can be obtained simply by subtracting the two
                                vectors. After which, the vector can be
                                transposed leading to,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[(\\hat{Y}-Y)^\\top=\\begin{bmatrix}\\hat{y}^{(1)}-y^{(1)}\\\\ \\vdots\\\\ \\hat{y}^{(m)}-y^{(m)}\\end{bmatrix}\\]`}</MathJax>
                            </div>

                            <p>
                                Recall that the design matrix{" "}
                                <MathJax inline>{"\\(X\\)"}</MathJax> is defined
                                as
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[X=
        \\begin{bmatrix}
            x^{(1)}_1 & \\dots  & x^{(m)}_1 \\\\
            \\vdots    & \\ddots & \\vdots    \\\\
            x^{(1)}_n & \\dots  & x^{(m)}_n \\\\
            1 & \\dots & 1
        \\end{bmatrix}\\]`}</MathJax>
                            </div>

                            <p>
                                With this, the gradient{" "}
                                <MathJax inline>
                                    {"\\(\\nabla_{w}J(w)\\)"}
                                </MathJax>{" "}
                                can simply be calculated as a matrix-vector
                                product,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\nabla_{w}J(w)=\\frac{X(\\hat{Y}-Y)^\\top}{m}\\]`}</MathJax>
                            </div>

                            <p>
                                To see that this is valid, note that each
                                component,{" "}
                                <MathJax inline>
                                    {"\\(\\nabla_{w}J(w)_j\\)"}
                                </MathJax>{" "}
                                for{" "}
                                <MathJax inline>
                                    {"\\(j\\in[1,\\ldots,n]\\)"}
                                </MathJax>{" "}
                                evaluates to
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\nabla_{w}J(w)_j=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot x^{(i)}_j\\]`}</MathJax>
                            </div>
                        </div>
                    </div>

                    <div className="bookmarks-container">
                        <div className="bookmarks">
                            <p className="bookmark-title">In this article</p>
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
                                    <a href="#vectorized-impl">
                                        <p>Vectorized Implementation</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }
}
