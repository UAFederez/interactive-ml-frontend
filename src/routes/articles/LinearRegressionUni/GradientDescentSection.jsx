import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const GradientDescentSection = () => (
    <StaticLatexSection>
        <p>
            Gradient descent is an iterative algorithm that allows for a linear
            regression model &mdash; and many other more complex deep learning
            models &mdash; to arrive at a minimum of any continuous and
            differentiable function.
        </p>
        <p>
            The idea is that given <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
            <MathJax inline>{"\\(b\\)"}</MathJax> which are initialized in any
            manner, the algorithm will continuously update these parameters in
            the steepest direction (negative of the gradient) towards a minimum
            of the cost function. This iteration is repeated until convergence.
        </p>
        <p>
            Note that since the mean squared error cost function is{" "}
            <em>convex</em>, any local minimum is also the global minimum. This
            is not necessarily true for other cost functions, leading to
            multiple local minima depending on the initial starting point.
        </p>
        <p>
            The parameters <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
            <MathJax inline>{"\\(b\\)"}</MathJax> on the{" "}
            <MathJax inline>{"\\(k\\)"}</MathJax>-th iteration are continuously
            updated (simultaneously) as follows,
        </p>

        <MathJax className="displayLatex">
            {
                "\\[\\begin{align*}w^{[k+1]}&\\leftarrow w^{[k]}-\\alpha\\frac{\\partial J(w^{[k]},b^{[k]})}{\\partial w^{[k]}}\\\\b^{[k+1]}&\\leftarrow b{[k]}-\\alpha\\frac{\\partial J(w^{[k]},b^{[k]})}{\\partial b^{[k]}}\\end{align*}\\]"
            }
        </MathJax>

        <p>
            where <MathJax inline>{"\\(\\alpha\\)"}</MathJax> describes the{" "}
            <em>learning rate</em>, essentially a hyperparameter.
        </p>
    </StaticLatexSection>
);

export default GradientDescentSection;
