import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const GradientDescentSection = (props) => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    Much of the calculations derived for gradient descent remain
                    similar to those previously shown. In this case, it becomes
                    important to find the gradient of the Softmax output w.r.t
                    to its inputs. This introduces more complexity given that
                    the output is now a vector as opposed to a scalar.
                </p>

                <h3>Derivatives of the Softmax Function</h3>
                <p>
                    To start, suppose that we want to derive{" "}
                    <MathJax inline>{"\\(\\frac{S(z)_k}{z_j}\\)"}</MathJax> for
                    any <MathJax inline>{"\\(j\\)"}</MathJax>,{" "}
                    <MathJax inline>{"\\(k\\)"}</MathJax>. There are essentially
                    two cases: either <MathJax inline>{"\\(j=k\\)"}</MathJax> or{" "}
                    <MathJax inline>{"\\(j\\neq k\\)"}</MathJax>.
                </p>

                <p>
                    In the scenario where{" "}
                    <MathJax inline>{"\\(j=k\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[    \\begin{align*}
    \\frac{\\partial S(z)_k}{\\partial z_j}
    &=\\frac{\\partial}{\\partial z_j}\\left(\\frac{e^{z_j}}{\\sum_{n=1}^{n_c}e^{z}_n}\\right)\\\\
    &=\\frac{\\frac{\\partial}{\\partial z_j}e^{z_j}\\left(\\sum_{n=1}^{n_c}e^{z_n}\\right)-e^{z_j}\\frac{\\partial}{\\partial z_j}\\left(\\sum_{n=1}^{n_c}e^{z_n}\\right)}{\\left(\\sum_{n=1}^{n_c}e^{z_n}\\right)^2}\\\\
    &=\\frac{e^{z_j}\\left(\\sum_{n=1}^{n_c}e^{z_n}\\right)-e^{2z_j}}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)^2}\\\\
    &=e^{z_j}\\left[\\frac{\\left(\\sum_{n=1}^{n_c}e^{z_n}\\right)-e^{z_j}}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)^2}\\right]\\\\
    &=e^{z_j}\\left[\\frac{\\left(\\sum_{n=1}^{n_c}e^{z_n}\\right)}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)^2}-\\frac{e^{z_j}}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)^2}\\right]\\\\
    &=e^{z_j}\\left[1-\\frac{e^{z_j}}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)^2}\\right]\\\\
    &=S(z)_j\\left(1-S(z)_j\\right)
    \\end{align*}\\]`}</MathJax>
                </div>

                <p>
                    In the scenario where{" "}
                    <MathJax inline>{"\\(j\\neq k\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[    \\begin{align*}
    \\frac{\\partial S(z)_k}{\\partial z_j}
    &=\\frac{\\partial}{\\partial z_j}\\left(\\frac{e^{z_k}}{\\sum_{n=1}^{n_c}e^{z}_n}\\right)\\\\
    &=e^{z_k}\\cdot\\frac{\\partial}{\\partial z_j}\\left(\\frac{1}{\\sum_{n=1}^{n_c}e^{z}_n}\\right)\\\\
    &=-\\frac{e^{z_j}e^{z_k}}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)^2}\\\\
    &=-\\frac{e^{z_j}}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)}\\cdot\\frac{e^{z_k}}{\\left(\\sum_{n=1}^{n_c}e^{z}_n\\right)}\\\\
    &=-S(z)_jS(z)_k
    \\end{align*}\\]`}</MathJax>
                </div>

                <p>
                    For a vector-valued function{" "}
                    <MathJax inline>
                        {"\\(S(z):\\mathbb{R}^{n_c}\\to\\mathbb{R}^{n_c}\\)"}
                    </MathJax>
                    , these first-order partial derivatives can be represented
                    in a Jacobian matrix{" "}
                    <MathJax inline>
                        {"\\(J\\in\\mathbb{R}^{n_c\\times n_c}\\)"}
                    </MathJax>{" "}
                    defined as follows,
                </p>

                <div className="displayLatex">
                    <MathJax>
                        {`\\[    J
                    =\\begin{bmatrix}
                    \\frac{\\partial S(z)_1}{\\partial z_1}, & \\dots & \\frac{\\partial S(z)_1}{\\partial z_{n_c}} \\\\
                    \\vdots & \\ddots & \\vdots \\\\
                    \\frac{\\partial S(z)_{n_c}}{\\partial z_1}, & \\dots & \\frac{\\partial S(z)_{n_c}}{\\partial z_{n_c}} \\\\
                    \\end{bmatrix}
                    =\\begin{bmatrix}
                    S(z)_1\\left(1-S(z)_1\\right), & \\dots & -S(z)_1S(z)_{n_c} \\\\
                    \\vdots & \\ddots & \\vdots \\\\
                    -S(z)_1S(z)_{n_c}, & \\dots & S(z)_{n_c}\\left(1-S(z)_{n_c}\\right)
                    \\end{bmatrix}\\]`}
                    </MathJax>
                </div>

                <p>
                    Note that the sum along its rows{" "}
                    <MathJax inline>{"\\(k\\in[1,\\ldots,n_c]\\)"}</MathJax> for
                    each column{" "}
                    <MathJax inline>{"\\(m\\in[1,\\ldots,n_c]\\)"}</MathJax>{" "}
                    results in,
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`\\[    \\begin{align*}
                    \\sum_{m=1}^{n_c}J_{k, m}
                    &=S(z)_k\\left(1-S(z)_k\\right)-S(z)_kS(z)_2-\\ldots-S(z)_kS(z)_{n_c}\\\\
                    &=S(z)_k\\left[1-S(z)_k-S(z)_2-\\ldots-S(z)_{n_c}\\right]\\\\
                    &=S(z)_k\\left[1-\\sum_{m=1}^{n_c}S(z)_m\\right]\\\\
                    &=S(z)_k\\left[1-1\\right]\\\\
                    &=S(z)_k\\cdot 0\\\\
                    &=0
                    \\end{align*}\\]`}
                    </MathJax>
                </div>
                <p>
                    The same holds true for the sum along the columns of this
                    matrix.
                </p>

                <h3>
                    Gradients of the loss w.r.t the input vector of the Softmax
                    function
                </h3>
                <p>
                    Suppose that we want to find the gradients of the{" "}
                    <em>loss</em> w.r.t a particular input to the Softmax
                    function <MathJax inline>{"\\(z^{[L]}_{k}\\)"}</MathJax>.
                    Because <MathJax inline>{"\\(z^{[L]}_k\\)"}</MathJax> for
                    all <MathJax inline>{"\\(k\\in[1,\\ldots,n_c]\\)"}</MathJax>{" "}
                    is affects every component of the vector-valued function{" "}
                    <MathJax inline>{"\\(S(z^{[L]})\\)"}</MathJax> then this
                    partial derivative is essentially a sum across the partial
                    derivatives of the loss w.r.t the value of all other neurons
                    dependent on <MathJax inline>{"\\(z^{[L]}_j\\)"}</MathJax>.
                    Similar to before, this sum can be decomposed to two cases
                    where <MathJax inline>{"\\(t=k\\)"}</MathJax> and where{" "}
                    <MathJax inline>{"\\(t\\neq k\\)"}</MathJax> for all{" "}
                    <MathJax inline>{"\\(t\\in[1,\\ldots,n_c]\\)"}</MathJax>
                </p>

                <div className="displayLatex">
                    <MathJax>
                        {`\\[    \\begin{align*}
                    \\frac{\\partial L}{\\partial z^{[l]}_k}
                    &=\\sum_{t=1}^{n_c}\\left[\\frac{\\partial L\\left(S\\left(z^{(i)}\\right)_t, y^{(i)}\\right)}{\\partial S\\left(z^{(i)}\\right)_t}\\cdot
                    \\frac{\\partial S\\left(z^{(i)}\\right)_t}{z^{(i)}_k}\\right]\\\\
                    &=\\sum_{t=1}^{n_c}
                    \\left[-\\frac{y^{(i)}_t}{S(z^{(i)})_t}\\cdot\\frac{\\partial S\\left(z^{(i)}\\right)_t}{z^{(i)}_k}\\right]\\\\
                    &=
                    -\\frac{y^{(i)}_k}{S(z^{(i)})_k}\\cdot S(z^{(i)})_k\\left(1-S(z^{(i)})_k\\right)+\\sum_{t=1,\\;t\\neq k}^{n_c}\\left[-\\frac{y^{(i)}_t}{S(z^{(i)})_t}\\cdot\\left(-S(z^{(i)})_tS(z^{(i)})_k\\right)\\right]\\\\
                    &=
                    -y^{(i)}_k+y^{(i)}_kS(z^{(i)})_k+\\sum_{t=1,\\;t\\neq k}^{n_c}\\left[y^{(i)}_t S(z^{(i)})_k\\right]
                    \\\\
                    &=
                    -y^{(i)}_k+\\sum_{t=1}^{n_c}\\left[y^{(i)}_t S(z^{(i)})_k\\right]
                    \\quad\\scriptsize{\\text{include 2nd term back in the summation because it is not different}}\\\\
                    &=
                    -y^{(i)}_k+S(z^{(i)})_k\\sum_{t=1}^{n_c}y^{(i)}_t
                    \\\\
                    &=
                    -y^{(i)}_k+S(z^{(i)})_k
                    \\quad\\quad\\scriptsize{\\sum_{t=1}^{n_c}y^{(i)}_t=1\\text{ because of one-hot encoding}}\\\\
                    &=\\left(S(z^{(i)})-y^{(i)}\\right)_k
                    \\end{align*}\\]`}
                    </MathJax>
                </div>
            </StaticLatexSection>
        </div>
    );
};

export default GradientDescentSection;
