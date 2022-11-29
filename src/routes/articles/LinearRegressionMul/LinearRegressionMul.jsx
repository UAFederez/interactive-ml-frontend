import { MathJax } from "better-react-mathjax";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import StaticLatexSection from "../../../components/StaticLatexSection";
import "../Article.css";

export default class LinearRegressionMul extends React.Component {
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
                    <h1 className="title">Multivariate Linear Regression</h1>
                </div>

                {/** Content */}
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

                        {/** Dataset Section -- Content */}
                        <div className="section" id="problem-statement">
                            <h2>Problem Statement</h2>
                            <StaticLatexSection>
                                <p>
                                    This can now represent a multivariate linear
                                    regression problem, where{" "}
                                    <MathJax inline>
                                        {"\\(x^{(i)}\\in\\mathbb{R}^n\\)"}
                                    </MathJax>
                                    , for <MathJax inline>{"\\(n\\)"}</MathJax>{" "}
                                    features with{" "}
                                    <MathJax inline>
                                        {"\\(i\\in[1,\\ldots,m]\\)"}
                                    </MathJax>
                                    . In this particular case,{" "}
                                    <MathJax inline>{"\\(n=4\\)"}</MathJax>. The{" "}
                                    <MathJax inline>{"\\(j\\)"}</MathJax>-th
                                    input feature, where{" "}
                                    <MathJax inline>
                                        {"\\(j\\in[1,\\ldots,n]\\)"}
                                    </MathJax>
                                    . for the{" "}
                                    <MathJax inline>{"\\(i\\)"}</MathJax>
                                    -th training example, where{" "}
                                    <MathJax inline>
                                        {"\\(i\\in[1,\\ldots,m]\\)"}
                                    </MathJax>
                                    , shall be denoted as{" "}
                                    <MathJax inline>
                                        {"\\(x_j^{(i)}\\)"}
                                    </MathJax>
                                </p>
                            </StaticLatexSection>
                            <p>
                                The model for linear regression can now be
                                expressed as,
                            </p>
                            <div className="display-latex">
                                <MathJax>
                                    {
                                        "\\[f(x^{(i)})=w_1x_1^{(i)}+w_2x_2^{(i)}+\\dots+w_jx_j^{(i)}+b\\]"
                                    }
                                </MathJax>
                            </div>
                            <p>
                                A more compact notation uses vectors to
                                represent{" "}
                                <MathJax inline>
                                    {"\\(w\\in\\mathbb{R}^n\\)"}
                                </MathJax>{" "}
                                and <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>,
                                with{" "}
                                <MathJax inline>
                                    {"\\(b\\in\\mathbb{R}\\)"}
                                </MathJax>
                                , such that
                            </p>
                            <div className="display-latex">
                                <MathJax>
                                    {
                                        "\\[w=\\begin{bmatrix}w_1\\\\ \\vdots \\\\w_j\\end{bmatrix}\\quad x^{(i)}=\\begin{bmatrix}x_1^{(i)}\\\\ \\vdots \\\\ x_j^{(i)}\\end{bmatrix}\\]"
                                    }
                                </MathJax>
                            </div>
                            <p>
                                And the linear regression model can be rewritten
                                as,
                            </p>
                            <div className="display-latex">
                                <MathJax>
                                    {"\\[f(x^{(i)})=w^\\top x^{(i)}+b\\]"}
                                </MathJax>
                            </div>
                        </div>

                        {/** Vectorized Implementation -- Content */}
                        <div className="section" id="vectorized-impl">
                            <h2>Vectorized Implementation</h2>
                            <p>
                                An implementation which is much more
                                computationally efficient can be achieved
                                through <em>vectorization</em>, i.e, using the
                                parallel processing capabilities of modern
                                processors (CPU or GPU) to compute linear
                                algebra calculations much faster than through
                                loops.
                            </p>
                            <p>
                                Let{" "}
                                <MathJax inline>
                                    {"\\(X\\in\\mathbb{R}^{n\\times m}\\)"}
                                </MathJax>{" "}
                                be defined as the <em>design matrix</em>{" "}
                                contaning all values of{" "}
                                <MathJax inline>{"\\(x_j^{(i)}\\)"}</MathJax>{" "}
                                for all{" "}
                                <MathJax inline>
                                    {"\\(i\\in[1,\\ldots,m]\\)"}
                                </MathJax>{" "}
                                and{" "}
                                <MathJax inline>
                                    {"\\(j\\in[1,\\ldots,n]\\)"}
                                </MathJax>
                                , and let <MathJax inline>{"\\(Y\\)"}</MathJax>{" "}
                                be defined as a row vector containing all values
                                of <MathJax inline>{"\\(y^{(i)}\\)"}</MathJax>
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[X=
                                    \\begin{bmatrix}
                                        x^{(1)}_1 & \\dots  & x^{(m)}_1 \\\\
                                        \\vdots    & \\ddots & \\vdots    \\\\
                                        x^{(1)}_n & \\dots  & x^{(m)}_n
                                    \\end{bmatrix}
                                    \\qquad
                                    Y=\\begin{bmatrix}y^{(1)}& \\dots &y^{(m)}\\end{bmatrix}\\]`}</MathJax>
                            </div>
                            <p>
                                Given parameters{" "}
                                <MathJax inline>
                                    {"\\(w\\in\\mathbb{R}^{n}\\)"}
                                </MathJax>{" "}
                                and{" "}
                                <MathJax inline>
                                    {"\\(b\\in\\mathbb{R}\\)"}
                                </MathJax>
                                , the vector containing all predicted values{" "}
                                <MathJax inline>{"\\(\\hat{Y}\\)"}</MathJax> can
                                be achieved with very little changes from the
                                original equations,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\hat{Y}=w^\\top X+b\\]`}</MathJax>
                            </div>
                            <p>
                                With that said, the variable{" "}
                                <MathJax inline>{"\\(b\\)"}</MathJax> does not
                                necessarily need to be a separate variable.
                                Including a <em>dummy</em> feature{" "}
                                <MathJax inline>
                                    {"\\(x^{(i)}_{j+1}=1\\)"}
                                </MathJax>{" "}
                                for all <MathJax inline>{"\\(i\\)"}</MathJax>,
                                within the design matrix allows for an
                                additional component to{" "}
                                <MathJax inline>{"\\(w\\)"}</MathJax> as
                                follows,
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
                                    w=\\begin{bmatrix}w_1\\\\\\vdots\\\\w_n\\\\b\\end{bmatrix}\\]`}</MathJax>
                            </div>
                            <p>
                                With this, the calculations for{" "}
                                <MathJax inline>
                                    {"\\(\\nabla_{w}J(w)\\)"}
                                </MathJax>{" "}
                                remain equivalent (see gradient descent), and
                                the equation for{" "}
                                <MathJax inline>{"\\(\\hat{Y}\\)"}</MathJax>{" "}
                                becomes
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\hat{Y}=w^\\top X\\]`}</MathJax>
                            </div>
                        </div>

                        {/** Gradient Descent -- Content */}
                        <div className="section" id="gradient-descent">
                            <h2>Gradient Descent</h2>
                            <p>
                                Given the cost function{" "}
                                <MathJax inline>{"\\(J(w,b)\\)"}</MathJax> which
                                has been previously defined as,
                            </p>
                            <MathJax className="display-latex">
                                {
                                    "\\[J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\]"
                                }
                            </MathJax>
                            <p>
                                The gradient of the cost function w.r.t the
                                weights <MathJax inline>{"\\(w\\)"}</MathJax> is
                            </p>
                            <MathJax className="display-latex">
                                {
                                    "\\[\\nabla_{w}J(w,b)=\\frac{\\partial J(w,b)}{\\partial w}\\]"
                                }
                            </MathJax>
                            <p>
                                The components of this gradient can be
                                calculated as,
                            </p>
                            <MathJax className="display-latex">
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
                            <MathJax className="display-latex">
                                {
                                    "\\[\\frac{\\partial J(w,b)}{\\partial b}=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\]"
                                }
                            </MathJax>
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
                                        \\vdots    & \\ddots & \\vdots  \\\\
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

                        {/** Training the Model -- Content */}
                        <div className="section" id="training-model">
                            <h2>Training the Model</h2>
                        </div>

                        {/** The Normal Equation -- Content */}
                        <div className="section" id="normal-equations">
                            <h2>The Normal Equations</h2>
                            <p>
                                Aside from gradient descent, there is also a
                                direct or analytical method for calculating
                                parameters <MathJax inline>{"\\(w\\)"}</MathJax>{" "}
                                for multiple linear regression. The equation for
                                this is known as the <em>normal equation</em>.
                                The normal equation for calculating the optimal
                                parameters{" "}
                                <MathJax inline>{"\\(w^*\\)"}</MathJax> is given
                                by,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[w^*=\\left(XX^\\top\\right)^{-1}XY^\\top\\]`}</MathJax>
                            </div>
                            <p>
                                <em>Proof</em>:
                            </p>
                            <p>
                                As before, the goal is to find parameters{" "}
                                <MathJax inline>
                                    {"\\(w\\in\\mathbb{R}^{n\\times 1}\\)"}
                                </MathJax>{" "}
                                which minimizes the mean squared error across
                                all training examples{" "}
                                <MathJax inline>
                                    {"\\(Y\\in\\mathbb{R}^{1\\times m}\\)"}
                                </MathJax>{" "}
                                given{" "}
                                <MathJax inline>
                                    {"\\(X\\in\\mathbb{R}^{n\\times m}\\)"}
                                </MathJax>
                                , in a multivariable scenario, this is expressed
                                as <MathJax inline>{"\\(J(w)\\)"}</MathJax>,
                            </p>
                            <div className="display-latex">
                                <MathJax>
                                    {`\\[\\begin{align*}
                                    J(w)
                                    &=\\frac{1}{2m}\\left(w^\\top X-Y\\right)^\\top\\left(w^\\top X-Y\\right)\\\\
                                    &=\\frac{1}{2m}\\left[\\left(w^\\top X\\right)^\\top-Y^\\top\\right]\\left(w^\\top X-Y\\right)\\\\
                                    &=\\frac{1}{2m}\\left[(w^\\top X)(w^\\top X)^\\top-w^\\top XY^\\top -Y(w^\\top X)^\\top +Y^\\top Y\\right]\\\\
                                    &=\\frac{1}{2m}\\left[w^\\top XX^\\top w-2Y\\left(w^\\top X\\right)^\\top+Y^\\top Y\\right]\\\\
                                    \\end{align*}\\]`}
                                </MathJax>
                            </div>
                            <p>
                                We must then calculate the gradient of the cost
                                w.r.t the weights{" "}
                                <MathJax inline>{"\\(w\\)"}</MathJax> as follows
                            </p>
                            <div className="display-latex">
                                <MathJax>
                                    {`\\[\\begin{align*}
                                        \\frac{\\partial J(w)}{\\partial w}
                                        &=\\frac{1}{2m}\\cdot\\frac{\\partial}{\\partial w}\\left[w^\\top XX^\\top w-2Y\\left(w^\\top X\\right)^\\top+Y^\\top Y\\right]\\\\
                                        \\end{align*}\\]`}
                                </MathJax>
                            </div>
                            <p>
                                We shall derive each term separately for
                                simplification. Starting with the third term.
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial}{\\partial w}Y^\\top Y=0\\]`}</MathJax>
                            </div>
                            <p>
                                For the second term, recall the structure of
                                both vectors,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[Y=\\begin{bmatrix}y^{(1)} & \\dots & y^{(m)}\\end{bmatrix}
    \\quad
    \\text{and}
    \\quad
    \\left(w^\\top X\\right)^\\top=\\begin{bmatrix}
        w_1x^{(1)}_1+\\ldots+w_nx^{(1)}_n \\\\
        \\vdots \\\\
        w_1x^{(m)}_1+\\ldots+w_nx^{(m)}_n
    \\end{bmatrix}\\]`}</MathJax>
                            </div>
                            <p>Therefore, the dot product is</p>
                            <div className="display-latex">
                                <MathJax>{`\\[Y\\left(w^\\top X\\right)^\\top
    =y^{(1)}\\left(w_1x^{(1)}_1+\\ldots+w_nx^{(1)}_n\\right)+\\ldots+y^{(m)}\\left(w_1x^{(m)}_1+\\ldots+w_nx^{(m)}_n\\right)\\]`}</MathJax>
                            </div>
                            <p>
                                Thus the partial derivative w.r.t a weight{" "}
                                <MathJax inline>{"\\(w_j\\)"}</MathJax> would be
                                defined as
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial }{w_j}Y\\left(w^\\top X\\right)^\\top=\\sum_{i=1}^{m}y^{(i)}x^{(i)}_{j}\\]`}</MathJax>
                            </div>
                            <p>
                                This can be expressed as a matrix vector
                                multiplication
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial }{w_j}2Y\\left(w^\\top X\\right)^\\top=2XY^\\top\\]`}</MathJax>
                            </div>
                            <p>
                                To see that this is valid, note that each
                                element in this vector result is,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[(XY^\\top)_{j}=\\sum_{i=1}^{m}y^{(i)}x^{(i)}_j\\]`}</MathJax>
                            </div>
                            <p>
                                To simplify the calculation of the first term,
                                note that by the associativity of matrix
                                multiplication, we can multiply{" "}
                                <MathJax inline>
                                    {
                                        "\\(XX^\\top\\in\\mathbb{R}^{n\\times n}\\)"
                                    }
                                </MathJax>{" "}
                                to obtain a square and symmetric matrix, further
                                denoted as <MathJax inline>{"\\(A\\)"}</MathJax>{" "}
                                where
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[A_{j,k}=\\left(XX^\\top\\right)_{j,k}=\\sum_{i=1}^{m}X_{j,i}X^\\top_{i,k}\\]`}</MathJax>
                            </div>
                            <p>
                                Note that{" "}
                                <MathJax inline>{"\\(XX^\\top w\\)"}</MathJax>{" "}
                                becomes
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[XX^\\top w=Aw=\\begin{bmatrix}
        w_1A_{1,1}+\\ldots+w_nA_{1,n} \\\\
        \\vdots \\\\
        w_1A_{n,1}+\\ldots+w_nA_{n,n} \\\\
    \\end{bmatrix}\\]`}</MathJax>
                            </div>
                            <p>
                                Thus the full product,{" "}
                                <MathJax inline>
                                    {"\\(w^\\top XX^\\top w\\)"}
                                </MathJax>
                                , becomes
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[w^\\top XX^\\top w=w^\\top Aw=w_1\\left(w_1A_{1,1}+\\ldots+w_nA_{1,n}\\right)+\\dots+w_n\\left(w_1A_{n,1}+\\ldots+w_nA_{n,n}\\right)\\]`}</MathJax>
                            </div>
                            <p>
                                Calculating the partial derivative w.r.t a
                                weight <MathJax inline>{"\\(w_1\\)"}</MathJax>{" "}
                                for example becomes the following, note that{" "}
                                <MathJax inline>{"\\(A\\)"}</MathJax> is
                                symmetric, therefore an element such as{" "}
                                <MathJax inline>
                                    {"\\(A_{2,1}=A_{1,2}\\)"}
                                </MathJax>
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial w^\\top Aw}{w_1}
    &=2w_1A_{1,1}+2w_2A_{1,2}+\\ldots+2w_nA_{1,n}\\\\
    &=2\\left(w_1A_{1,1}+w_2A_{1,2}+\\ldots+w_nA_{1,n}\\right)
    \\end{align*}\\]`}</MathJax>
                            </div>
                            <p>
                                The same holds for the partial derivative with
                                respect to other weights{" "}
                                <MathJax inline>{"\\(w_j\\)"}</MathJax>. This
                                can therefore be expressed as the following
                                matrix vector multiplication
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial}{\\partial w}w^\\top XX^\\top w=2XX^\\top w\\]`}</MathJax>
                            </div>
                            <p>The full equation becomes the following</p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
    \\nabla J(w)
    &=\\frac{1}{2m}\\left(2XX^\\top w-2XY^\\top\\right)\\\\
    &=\\frac{1}{m}\\left(XX^\\top w-XY^\\top\\right)\\\\
    \\end{align*}\\]`}</MathJax>
                            </div>
                            <p>
                                Setting this equation to{" "}
                                <MathJax inline>{"\\(0\\)"}</MathJax> and
                                solving for{" "}
                                <MathJax inline>{"\\(w\\)"}</MathJax> becomes
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
        \\frac{1}{m}\\left(XX^\\top w-XY^\\top\\right)&=0\\\\
        XX^\\top w-XY^\\top&=0\\\\
        XX^\\top w&=XY^\\top\\\\
        w&=\\left(XX^\\top\\right)^{-1}XY^\\top
    \\end{align*}\\]`}</MathJax>
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
                                    <a href="#vectorized-impl">
                                        <p>Vectorized Implementation</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#gradient-descent">
                                        <p>Gradient Descent</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#training-model">
                                        <p>Training the Model</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#normal-equations">
                                        <p>The Normal Equations</p>
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
