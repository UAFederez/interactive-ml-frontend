import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

export const AnalyticalSolutionSection = () => (
    <StaticLatexSection>
        <p>
            Given that the mean squared error cost function is a convex
            function, the minimum can be solved directly by writing the
            derivatives as a system of equations with two unknowns and finding
            the solution for{" "}
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
            Distributing the summation and transposing constants to the right
            hand side
        </p>

        <MathJax className="displayLatex">
            {`\\[\\begin{alignat*}{3}
                            &(1)\\quad w\\sum_{i=1}^{m}(x^{(i)})^2&&+b\\sum_{i=1}^{m}x^{(i)}&&=\\sum_{i=1}^{m}y^{(i)}x^{(i)}\\\\
                            &(2)\\quad w\\sum_{i=1}^{m}x^{(i)}&&+bm&&=\\sum_{i=1}^{m}y^{(i)}
                            \\end{alignat*}\\]`}
        </MathJax>

        <h3>
            Solving for <MathJax inline>{"\\(w\\)"}</MathJax>
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
            Solving for <MathJax inline>{"\\(w\\)"}</MathJax>,
        </p>

        <MathJax className="displayLatex">
            {`\\[w\\left[\\frac{m\\sum_{i=1}^{m}(x^{(i)})^2-\\left(\\sum_{i=1}^{m}x^{(i)}\\right)^2}{m}\\right]=\\frac{m\\sum_{i=1}^{m}y^{(i)}x^{(i)}-\\sum_{i=1}^{m}y^{(i)}\\sum_{i=1}^{m}x^{(i)}}{m}\\]`}
            {`\\[w=\\frac{m\\sum_{i}y^{(i)}x^{(i)}-\\sum_{i}y^{(i)}\\sum_{i}x^{(i)}}{m\\sum_{i}(x^{(i)})^2-\\left(\\sum_{i}x^{(i)}\\right)^2}\\]`}
        </MathJax>

        <h3>
            Solving for <MathJax inline>{"\\(b\\)"}</MathJax>
        </h3>
        <p>
            Solve for <MathJax inline>{"\\(w\\)"}</MathJax> from equation (2)
            and substitute into equation (1):
        </p>

        <MathJax className="displayLatex">{`\\[w=\\frac{\\sum_{i}y^{(i)}-bm}{\\sum_{i}x^{(i)}}\\]`}</MathJax>

        <p>
            Solving for <MathJax inline>{"\\(b\\)"}</MathJax>,
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
);

export default AnalyticalSolutionSection;
