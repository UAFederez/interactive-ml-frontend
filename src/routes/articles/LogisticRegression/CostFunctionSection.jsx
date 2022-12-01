import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

export const CostFunctionSection = () => (
    <div>
        <StaticLatexSection>
            <p>
                The goal is to maximize the output of{" "}
                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax> whenever{" "}
                <MathJax inline>{"\\(y^{(i)}=1\\)"}</MathJax> and minimize{" "}
                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax> whenever{" "}
                <MathJax inline>{"\\(y^{(i)}=0\\)"}</MathJax>. Given the
                probabilistic interpretation of the logistic function. The
                optimal parameters <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                <MathJax inline>{"\\(b\\)"}</MathJax> can be found as follows:
            </p>

            <p>
                The probability that the output is the positive or negative
                class given the input features{" "}
                <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax> can be expressed as,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[P(y\\mid x)=\\hat{y}^y\\cdot(1-\\hat{y})^{(1-y)}\\]`}</MathJax>
            </div>
            <p>
                to see that this is valid, suppose the true label{" "}
                <MathJax inline>{"\\(y=1\\)"}</MathJax>,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[P(y=1\\mid x)=\\hat{y}\\cdot(1-1)^{(1-1)}=\\hat{y}\\]`}</MathJax>
            </div>
            <p>
                and if the true label <MathJax inline>{"\\(y=0\\)"}</MathJax>,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[P(y=0\\mid x)=\\hat{y}^0\\cdot(1-\\hat{y})^{(1-0)}=1-\\hat{y}\\]`}</MathJax>
            </div>

            <p>
                Therefore, the goal is to maximize{" "}
                <MathJax inline>{"\\(\\hat{y}\\)"}</MathJax> for this function.
            </p>

            <p>
                Because the <MathJax inline>{"\\(\\log(x)\\)"}</MathJax> is a
                strictly increasingly monotic function, any maximum of{" "}
                <MathJax inline>{"\\(x\\)"}</MathJax> is also a maximum of{" "}
                <MathJax inline>{"\\(\\log(x)\\)"}</MathJax>. Therefore, the
                equation can be written as
            </p>

            <div className="displayLatex">
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
                <MathJax inline>{"\\(\\log(P(y\\mid x))\\)"}</MathJax> is
                equivalent to minimizing the{" "}
                <MathJax inline>{"\\(-\\log(P(y\\mid x))\\)"}</MathJax>. This is
                also known as the <em>binary cross-entropy loss</em> function.{" "}
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[L(\\hat{y},y)=-\\left[y\\log(\\hat{y})+(1-y)\\log(1-\\hat{y})\\right]\\]`}</MathJax>
            </div>

            <p>The cost is simply defined similar to before</p>
            <div className="displayLatex">
                <MathJax>{`\\[J(w)=\\frac{1}{m}\\sum_{i=1}^{m}L(\\hat{y}^{(i)},y^{(i)})\\]`}</MathJax>
            </div>
        </StaticLatexSection>
    </div>
);
