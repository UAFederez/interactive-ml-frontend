import { MathJax } from "better-react-mathjax";

export const ForwardPropagationSection = () => {
    return (
        <div>
            <p>
                The forward propagation phase is simply carrying out the
                sequential output of the network given its current
                configurations of parameters{" "}
                <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> and{" "}
                <MathJax inline>{"\\(b^{[l]}\\)"}</MathJax>
            </p>

            <div className="displayLatex">
                <MathJax>
                    {`\\[    \\begin{align*}
                                    z^{[1]}&=w^{[1]\\top}a^{[0]}+b^{[1]}\\\\
                                    a^{[1]}&=g(z^{[1]})\\\\
                                    z^{[2]}&=w^{[2]\\top}a^{[1]}+b^{[2]}\\\\
                                    a^{[2]}&=g(z^{[2]})\\\\
                                    z^{[3]}&=w^{[3]\\top}a^{[2]}+b^{[3]}\\\\
                                    a^{[3]}&=g(z^{[3]})\\\\
                                    &\\vdots\\\\
                                    z^{[L]}&=w^{[L]\\top}a^{[L-1]}+b^{[L]}\\\\
                                    a^{[L]}&=g(z^{[L]})
                                    \\end{align*}\\]`}
                </MathJax>
            </div>

            <p>
                In a supervised learning task, the outputs of the final layer{" "}
                <MathJax inline>{"\\(a^{[L]}\\)"}</MathJax> would then represent
                the predicted value <MathJax inline>{"\\(\\hat{y}\\)"}</MathJax>{" "}
                and carrying out the learning process requires finding out the
                cost given the current parameters on the training set.
            </p>

            <p>
                Similar to before, the model learns the optimal parameters{" "}
                <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> and{" "}
                <MathJax inline>{"\\(b^{[l]}\\)"}</MathJax> so as to minimize
                the cost function{" "}
                <MathJax inline>
                    {"\\(J(w^{[0]},b^{[0]},w^{[1]},b^{[1]},\\ldots)\\)"}
                </MathJax>
                , where all parameters will be denoted simply as{" "}
                <MathJax inline>{"\\(J(W)\\)"}</MathJax>. The optimal parameters
                are denoted as <MathJax inline>{"\\(W^*\\)"}</MathJax>. In a
                supervised learning model, this can still be defined similar to
                before.
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    W^{*}=\\min_{W}J(W)=\\min_{W}\\frac{1}{m}\\sum_{i=1}^{m}L(\\hat{y}^{(i)},y^{(i)})\\]`}</MathJax>
            </div>

            <p>
                The loss function{" "}
                <MathJax inline>{"\\(L(\\hat{y}^{(i)},y^{(i)})\\)"}</MathJax>{" "}
                still depends on the problem, but for this case, the binary
                classification task necessitates the use of the binary
                cross-entropy loss
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    L(\\hat{y}^{(i)},y^{(i)})=-\\left(y^{(i)}\\log(\\hat{y}^{(i)})+(1-y^{(i)})\\log(1-\\hat{y}^{(i)}\\right)\\]`}</MathJax>
            </div>
            <p>
                The algorithm for training remains similar to before. But for
                neural networks, it is necessary to carry out{" "}
                <em>gradient descent</em> with <em>backpropagation</em>.
            </p>
        </div>
    );
};
