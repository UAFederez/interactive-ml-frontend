import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const GradientDescentSection = () => (
    <div>
        <StaticLatexSection>
            <p>
                Given the cost function{" "}
                <MathJax inline>{"\\(J(w,b)\\)"}</MathJax> which has been
                previously defined as,
            </p>
            <MathJax className="displayLatex">
                {
                    "\\[J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\]"
                }
            </MathJax>
            <p>
                The gradient of the cost function w.r.t the weights{" "}
                <MathJax inline>{"\\(w\\)"}</MathJax> is
            </p>
            <MathJax className="displayLatex">
                {
                    "\\[\\nabla_{w}J(w,b)=\\frac{\\partial J(w,b)}{\\partial w}\\]"
                }
            </MathJax>
            <p>The components of this gradient can be calculated as,</p>
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
                <MathJax inline>{"\\(\\frac{\\partial J(w,b)}{b}\\)"}</MathJax>{" "}
                can be calculated as
            </p>
            <MathJax className="displayLatex">
                {
                    "\\[\\frac{\\partial J(w,b)}{\\partial b}=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\]"
                }
            </MathJax>
            <p>
                The residuals <MathJax inline>{"\\(\\hat{Y}-Y\\)"}</MathJax> can
                be obtained simply by subtracting the two vectors. After which,
                the vector can be transposed leading to,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[(\\hat{Y}-Y)^\\top=\\begin{bmatrix}\\hat{y}^{(1)}-y^{(1)}\\\\ \\vdots\\\\ \\hat{y}^{(m)}-y^{(m)}\\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                Recall that the design matrix{" "}
                <MathJax inline>{"\\(X\\)"}</MathJax> is defined as
            </p>
            <div className="displayLatex">
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
                <MathJax inline>{"\\(\\nabla_{w}J(w)\\)"}</MathJax> can simply
                be calculated as a matrix-vector product,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\nabla_{w}J(w)=\\frac{X(\\hat{Y}-Y)^\\top}{m}\\]`}</MathJax>
            </div>
            <p>
                To see that this is valid, note that each component,{" "}
                <MathJax inline>{"\\(\\nabla_{w}J(w)_j\\)"}</MathJax> for{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n]\\)"}</MathJax> evaluates
                to
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\nabla_{w}J(w)_j=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot x^{(i)}_j\\]`}</MathJax>
            </div>
        </StaticLatexSection>
    </div>
);

export default GradientDescentSection;
