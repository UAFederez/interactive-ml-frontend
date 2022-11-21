import React from "react";
import MathJax from "react-mathjax";

export default class LinearRegression extends React.Component {
    render() {
        return (
            <div>
                <h1>Linear Regression</h1>
                <MathJax.Provider>
                    Given a set of <MathJax.Node inline formula={"m"} />{" "}
                    training examples{" "}
                    <MathJax.Node
                        inline
                        formula={"\\left(x^{(i)}, y^{(i)}\\right)"}
                    />{" "}
                    for all{" "}
                    <MathJax.Node inline formula={"i\\in[1,\\ldots,m]"} />, a
                    linear regression model is a supervised learning regression
                    model which expresses{" "}
                    <MathJax.Node
                        inline
                        formula={"f(x^{(i)})=\\hat{y}^{(i)}"}
                    />{" "}
                    as a linear function of{" "}
                    <MathJax.Node inline formula={"x^{(i)}"} /> given parameters{" "}
                    <MathJax.Node inline formula={"w"} /> and{" "}
                    <MathJax.Node inline formula={"b"} /> as follows:
                    <MathJax.Node
                        formula={"\\hat{y}^{(i)}=w\\cdot x^{(i)}+b"}
                    />
                    The model is a supervised learning model because the
                    training set contains the "*right*" or expected output value
                    for the target variable for every{" "}
                    <MathJax.Node inline formula={"x^{(i)}"} />, and a
                    regression model because the model outputs a continuous
                    value. Linear regression with one variable is known as a
                    *univariate* linear regression, i.e,{" "}
                    <MathJax.Node inline formula={"x^{(i)}\\in\\mathbb{R}"} />{" "}
                    while *multivariate* linear regression is one wherein{" "}
                    <MathJax.Node
                        inline
                        formula={"x^{(i)}\\in\\mathbb{R}^{n}"}
                    />{" "}
                    for <MathJax.Node inline formula={"n>1"} /> features. ##
                    Cost Function The goal of the linear regression model is to
                    find optimal parameters{" "}
                    <MathJax.Node inline formula={"\\vec{w}"} /> and{" "}
                    <MathJax.Node inline formula={"b"} /> such that for every
                    training example{" "}
                    <MathJax.Node
                        inline
                        formula={"\\left(x^{(i)}, y^{(i)}\\right)"}
                    />{" "}
                    for <MathJax.Node inline formula={"i\\in[1,\\ldots,m]"} />
                    <MathJax.Node formula={"f(x^{(i)})\\approx y^{(i)}"} />
                    Therefore, it helps to provide a precise measure of how *far
                    off* the predicted outputs are from the expected output.
                    This can be formalized as a cost function{" "}
                    <MathJax.Node inline formula={"J"} />. A useful cost
                    function for linear regression is the *mean squared error*,
                    <MathJax.Node
                        formula={
                            "J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)} - y^{(i)}\\right)^2"
                        }
                    />
                    One of the benefits of the{" "}
                    <MathJax.Node inline formula={"\\frac{1}{m}"} /> is that
                    without it, as <MathJax.Node inline formula={"m"} /> gets
                    larger, the value of the cost function gets larger as well.
                    Therefore it helps to build a cost function that does not
                    change significantly just because the size of the dataset
                    increases. The <MathJax.Node inline formula={"2"} /> in{" "}
                    <MathJax.Node inline formula={"2m"} /> simplifies the
                    calculation of the gradient later on given that the minimum
                    of <MathJax.Node inline formula={"f(x)"} /> is the same as
                    the minimum of{" "}
                    <MathJax.Node inline formula={"\\frac{1}{2}f(x)"} />. Given
                    the cost function, the goal is to find optimal parameters{" "}
                    <MathJax.Node inline formula={"w^*"} /> and{" "}
                    <MathJax.Node inline formula={"b^*"} /> which minimize{" "}
                    <MathJax.Node inline formula={"J(w,b)"} />, i.e,
                    <MathJax.Node formula={"(w^*,b^*)=\\min_{w,b}J(w,b)"} />
                    <h2>Why Use the Mean Squared Error?</h2>
                    The mean squared error cost function comes from a
                    statistical method known as *maximum likelihood estimation*.
                    Recall that the underlying assumption for linear regression
                    is that the data is accurately modelled with a linear
                    function. The error terms are assumed to be{" "}
                    <MathJax.Node inline formula={"\\text{i.i.d}"} /> from a
                    normal distribution with mean{" "}
                    <MathJax.Node inline formula={"0"} /> and constant variance{" "}
                    <MathJax.Node inline formula={"\\sigma^2"} />, i.e for all{" "}
                    <MathJax.Node inline formula={"i\\in[1,\\ldots,m]"} />,
                    <MathJax.Node
                        formula={
                            "\\begin{align*}\\hat{y}^{(i)}&=w_{\\text{true}}x^{(i)}+b_{\\text{true}}+\\epsilon\\quad\\text{where }\\epsilon\\overset{i.i.d}{\\sim}\\mathcal{N}(0,\\sigma^2)\\\\\\hat{y}^{(i)}&=y^{(i)}+\\epsilon\\\\\\epsilon&=\\hat{y}^{(i)}-y^{(i)}\\end{align*}"
                        }
                    />
                    Thus the probability density function of the error terms for
                    each sample{" "}
                    <MathJax.Node inline formula={"\\epsilon^{(i)}"} /> for{" "}
                    <MathJax.Node inline formula={"i\\in[1,\\ldots,m]"} /> are
                    represented with a Gaussian or normal distribution with
                    parameters <MathJax.Node inline formula={"\\mu=0"} /> and{" "}
                    <MathJax.Node inline formula={"\\theta_2=\\sigma^2"} /> as
                    follows
                    <MathJax.Node
                        formula={
                            "f(\\epsilon^{(i)};0,\\theta_2)=\\frac{1}{\\sqrt{\\theta_2}\\sqrt{2\\pi}}\\exp\\left[-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]"
                        }
                    />
                    The *likelihood*, represents the joint probability density
                    fuction of observing the data that was gathered. Assuming
                    that all samples are independent this is simply the product
                    of all the probability density fuctions for{" "}
                    <MathJax.Node inline formula={"\\epsilon"} />
                    <MathJax.Node
                        formula={
                            "\\begin{align*}L(\\theta_2)&=f(x_1;0,\\theta_2)\\cdot f(x_2;0,\\theta_2)\\cdot\\dots\\cdot f(x_n;0,\\theta_2)\\\\&=\\prod_{i=1}^{m}f(\\hat{y}^{(i)}-y^{(i)};0,\\theta_2)\\end{align*}"
                        }
                    />
                    The goal is to find the value{" "}
                    <MathJax.Node inline formula={"\\theta_2"} /> which
                    *maximizes* the likelihood of seeing the data that was
                    gathered given these parameters. In this case, given the
                    probability density function of the normally distributed
                    error terms
                    <MathJax.Node
                        formula={
                            "\\begin{align*}L(\\theta_2)=\\prod_{i=1}^{m}\\left(\\frac{1}{\\sqrt{\\theta_2}\\sqrt{2\\pi}}\\exp\\left[-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]\\right)\\\\=\\theta_2^{-{\\frac{m}{2}}}(2\\pi)^{-{\\frac{m}{2}}}\\exp\\left[\\sum_{i=1}^{m}-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]\\end{align*}"
                        }
                    />
                    Given that the <MathJax.Node inline formula={"\\log(x)"} />{" "}
                    is a strictly increasingly monotic function, i.e, for every{" "}
                    <MathJax.Node inline formula={"x_1<x_2"} />,{" "}
                    <MathJax.Node inline formula={"f(x_1)<f(x_2)"} />, then the
                    maximum of <MathJax.Node inline formula={"L(\\theta_2)"} />{" "}
                    is also a maximum of the{" "}
                    <MathJax.Node
                        inline
                        formula={"\\log\\left(L(\\theta_2)\\right)"}
                    />
                    . This allows the derivation to be more convenient based on
                    the properties of <MathJax.Node inline formula={"\\log"} />
                    <MathJax.Node
                        formula={
                            "\\begin{align*}\\log\\left(L(\\theta_2)\\right)&=\\log\\left(\\theta_2^{-{\\frac{m}{2}}}(2\\pi)^{-{\\frac{m}{2}}}\\exp\\left[\\sum_{i=1}^{m}-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]\\right)\\\\&=-\\frac{m}{2}\\log(\\theta_2)-\\frac{m}{2}\\log(2\\pi)-\\frac{1}{2m}\\sum_{i=1}^{m}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\end{align*}"
                        }
                    />
                    Taking the partial derviative w.r.t to{" "}
                    <MathJax.Node inline formula={"\\theta_2"} /> and setting it
                    to <MathJax.Node inline formula={"0"} />
                    <MathJax.Node
                        formula={
                            "\\begin{align*}\\frac{\\partial\\log\\left(L(\\theta_2)\\right)}{\\partial \\theta_2}&=-\\frac{m}{2\\theta_2}+\\sum_{i=1}^{m}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{2{\\theta_2}^2}\\\\0\\times 2\\theta_2^2&=\\left(-\\frac{m}{2\\theta_2}+\\frac{1}{2{\\theta_2}^2}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\right)\\times 2{\\theta_2}^2\\\\0&=-{\\theta_2 m}+\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\end{align*}"
                        }
                    />
                    Setting the equation to{" "}
                    <MathJax.Node inline formula={"0"} /> allows us to solve for{" "}
                    <MathJax.Node inline formula={"\\theta_2"} />, i.e, the
                    maximum likelihood estimator for the variance of the error
                    terms.
                    <MathJax.Node
                        formula={
                            "\\begin{align*}0&=-{\\theta_2 m}+\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\\\\\theta_2&=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\end{align*}"
                        }
                    />
                </MathJax.Provider>
            </div>
        );
    }
}
