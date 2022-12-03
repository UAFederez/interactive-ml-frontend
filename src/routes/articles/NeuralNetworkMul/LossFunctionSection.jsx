import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const LossFunctionSection = (props) => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    The most common loss function used for multiclass
                    classification using the Softmax activation function is
                    known as the <strong>categorical cross-entropy</strong>{" "}
                    function, defined as follows
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[L(S(z),y^{(i)})=-\\log(S(z)_j)\\quad\\text{for }y^{(i)}=C_j\\]`}</MathJax>
                </div>
                <p>
                    Since both <MathJax inline>{"\\(S(z)\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(y^{(i)}\\)"}</MathJax> are now both
                    vectors, where for{" "}
                    <MathJax inline>{"\\(j\\in[1,\\ldots,k]\\)"}</MathJax>,{" "}
                    <MathJax inline>{"\\(y^{(i)}_j=1\\)"}</MathJax> if the true
                    class is <MathJax inline>{"\\(C_k\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(y^{(i)}_j=0\\)"}</MathJax> otherwise.
                    This means that the loss can be defined as,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[L(S(z),y^{(i)})=-\\sum_{j=1}^{n_c}y^{(i)}_j\\log\\left(S(z^{(i)})_j\\right)\\]`}</MathJax>
                </div>
                <h3>Similarity to logistic regression</h3>
                <p>
                    Note the similarity with the binary cross entropy loss used
                    for logistic regression, showing that Softmax is indeed a
                    generalization to <MathJax inline>{"\\(n_c>1\\)"}</MathJax>{" "}
                    classes. Assuming a binary classification task where Softmax
                    is used with <MathJax inline>{"\\(n_c=2\\)"}</MathJax>, the
                    following below uses{" "}
                    <MathJax inline>{"\\(S(z)_0\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(y^{(i)}_0\\)"}</MathJax> to denote the
                    component corresponding to the negative class. If we let{" "}
                    <MathJax inline>
                        {"\\(S(z)_1=\\hat{y}=\\mathbb{P}(y^{(i)}=1\\mid x)\\)"}
                    </MathJax>{" "}
                    similar to the logistic regression definition of the
                    probability of the positive class,
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`\\[\\begin{align*}
                        L(S(z),y^{(i)})
                        &=-\\left[y^{(i)}_1\\log\\left(S(z^{(i)})_1\\right)+y^{(i)}_0\\log\\left(S(z^{(i)})_0\\right)\\right]\\\\
                        &=-\\left[y^{(i)}_1\\log\\left(S(z^{(i)})_1\\right)+\\left(1-y^{(i)}\\right)\\log\\left(1-S(z^{(i)})_1\\right)\\right]\\\\
                        &=-\\left[y^{(i)}_1\\log\\left(\\hat{y}^{(i)}\\right)+\\left(1-y^{(i)}\\right)\\log\\left(1-\\hat{y}^{(i)}\\right)\\right]\\\\
                        \\end{align*}\\]`}
                    </MathJax>
                </div>
            </StaticLatexSection>
        </div>
    );
};

export default LossFunctionSection;
