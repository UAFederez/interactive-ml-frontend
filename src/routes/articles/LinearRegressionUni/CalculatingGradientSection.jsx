import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const CalculatingGradientSection = () => (
    <StaticLatexSection>
        <p>
            Given the cost function <MathJax inline>{"\\(J(w,b)\\)"}</MathJax>{" "}
            which has been previously defined as,
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
            {"\\[\\nabla_{w}J(w,b)=\\frac{\\partial J(w,b)}{\\partial w}\\]"}
        </MathJax>

        <p>
            The components of this gradient (where{" "}
            <MathJax inline>{"\\(w_j=w\\)"}</MathJax> in the univariate case and{" "}
            <MathJax inline>{"\\(j\\in[1,\\ldots,n]\\)"}</MathJax> for the
            multivariate case) can be calculated as,
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
            <MathJax inline>{"\\(\\frac{\\partial J(w,b)}{b}\\)"}</MathJax> can
            be calculated as
        </p>

        <MathJax className="displayLatex">
            {
                "\\[\\frac{\\partial J(w,b)}{\\partial b}=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\]"
            }
        </MathJax>
    </StaticLatexSection>
);

export default CalculatingGradientSection;
