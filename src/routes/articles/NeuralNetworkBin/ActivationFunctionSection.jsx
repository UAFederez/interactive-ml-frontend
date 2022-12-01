import { MathJax } from "better-react-mathjax";

export const ActivationFunctionSection = () => {
    return (
        <div>
            <p>
                The activation function <MathJax inline>{"\\(g(z)\\)"}</MathJax>{" "}
                for neural networks represents a nonlinear output or signal from
                a neuron given it's inputs. Common choices for these activation
                functions vary depending on the application but the ones
                typically used for the hidden layers are the{" "}
                <strong>ReLU</strong>, denoted as{" "}
                <MathJax inline>{"\\(\\text{ReLU}(z)\\)"}</MathJax> and{" "}
                <strong>sigmoid</strong>, denoted here as{" "}
                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax>
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\text{ReLU}(z)=\\max(0,z)\\quad\\text{and}\\quad\\sigma(z)=\\frac{1}{1+e^{-z}}\\]`}</MathJax>
            </div>
            <p>
                But why must the activation function be nonlinear in the first
                place? Suppose that the activation function <em>was</em> linear,
                e.g., the identity function, simply the output of{" "}
                <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax>. The bias vector is
                removed for simplification.
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[a^{[l]}=z^{[l]}=w^{[l]\\top}a^{[l-1]}\\]`}</MathJax>
            </div>
            <p>
                Note that <MathJax inline>{"\\(a^{[l-1]}\\)"}</MathJax> can then
                be expanded as,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\begin{align*}
    a^{[l]}
    &=w^{[l]\\top}\\left(w^{[l-1]\\top}a^{[l-2]}\\right)\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top})a^{[l-2]}\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top})\\left(w^{[l-2]\\top}a^{[l-3]}\\right)\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top}w^{[l-2]\\top})a^{[l-3]}\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top}w^{[l-2]\\top}\\ldots w^{[1]\\top})a^{[0]}
    \\end{align*}\\]`}</MathJax>
            </div>
            <p>
                The entire model reduces down to a linear function of the input
                activation <MathJax inline>{"\\(a^{[0]}\\)"}</MathJax>,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[a^{[L]}=Wa^{[0]}\\]`}</MathJax>
            </div>
            <p>
                Where <MathJax inline>{"\\(W\\)"}</MathJax> is the product of
                all the matrices,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[W=\\left(w^{[L]\\top}w^{[L-1]\\top}w^{[L-2]\\top}\\ldots w^{[1]\\top}\\right)\\]`}</MathJax>
            </div>
            <p>
                This removes any ability for the model to learn more complex
                nonlinear relationships as seen in real-world data as the
                underlying assumption that the model makes is that the data can
                be represented as a linear function of the inputs.
            </p>
            <p>
                It is also useful later on to determine the derivatives of the
                activation functions such as{" "}
                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax> and{" "}
                <MathJax inline>{"\\(\\text{ReLU}(z)\\)"}</MathJax>. As
                previously shown, the derivative of the logistic or sigmoid
                function is,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\frac{d\\sigma(z)}{dz}=\\sigma(z)\\left(1-\\sigma(z)\\right)\\]`}</MathJax>
            </div>
            <p>
                On the other hand, to find the derivative of{" "}
                <MathJax inline>{"\\(\\text{ReLU}(z)\\)"}</MathJax>, it helps to
                consider its definition as a piecewise function
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\text{ReLU}(z)=\\begin{cases}
        0 & z \\leq 0 \\\\
        x & z > 0
    \\end{cases}\\]`}</MathJax>
            </div>
            <p>
                This provides the definition of the derivative of{" "}
                <MathJax inline>{"\\(\\text{ReLU}(z)\\)"}</MathJax>, noting that
                since the derivatives do not approach the same value from both
                sides as <MathJax inline>{"\\(z\\to 0\\)"}</MathJax>, then the
                derivative of{" "}
                <MathJax inline>{"\\(\\text{ReLU}(z)\\)"}</MathJax> at{" "}
                <MathJax inline>{"\\(z=0\\)"}</MathJax> is{" "}
                <MathJax inline>{"\\(\\text{undefined}\\)"}</MathJax>. In
                practice, this is very rare and many software implementations
                typically define it arbitrarily such as{" "}
                <MathJax inline>{"\\(0\\)"}</MathJax> or{" "}
                <MathJax inline>{"\\(1\\)"}</MathJax>.
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\frac{d\\text{ReLU}(z)}{dz}=\\begin{cases}
        0 & z < 0 \\\\
        1 & z > 0 \\\\
        \\text{undefined} & z = 0
    \\end{cases}\\]`}</MathJax>
            </div>
            ;{" "}
        </div>
    );
};
