import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const BackgroundSection = (props) => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    Suppose that instead the dataset consisted of features that
                    involved the output of a class with more than one possible
                    value from a finite and discrete set of categories, i.e,
                    there are <MathJax inline>{"\\(n_c\\)"}</MathJax> classes
                    for which <MathJax inline>{"\\(C_k\\)"}</MathJax> is the{" "}
                    <MathJax inline>{"\\(k\\)"}</MathJax>-th class label and{" "}
                    <MathJax inline>
                        {"\\(y^{(i)}\\in\\{C_1,C_2,\\ldots,C_{n_c}\\}\\)"}
                    </MathJax>
                    .
                </p>
                <p>
                    One option to use for multiclass classification is a
                    generalization of the logistic regression model for{" "}
                    <MathJax inline>{"\\(n_c>1\\)"}</MathJax> classes. This is
                    known as the <strong>Softmax</strong> function.
                </p>

                <p>
                    The Softmax function is a function that converts a vector of{" "}
                    <MathJax inline>{"\\(k\\)"}</MathJax> values into a
                    probability distribution of{" "}
                    <MathJax inline>{"\\(k\\)"}</MathJax> outcomes, i.e., given
                    a vector{" "}
                    <MathJax inline>{"\\(z\\in\\mathbb{R}^{n_c}\\)"}</MathJax>,
                    the Softmax, denoted{" "}
                    <MathJax inline>{"\\(S(z)\\)"}</MathJax> has components{" "}
                    <MathJax inline>{"\\(S(z)_j\\)"}</MathJax> for{" "}
                    <MathJax inline>{"\\(j\\in[1,\\ldots,n_c]\\)"}</MathJax> and
                    is defined as
                </p>

                <div className="display-latex">
                    <MathJax>{`\\[S(z)_j=\\frac{e^{z_j}}{\\sum_{n=1}^{n_c}e^{z}_n}\\]`}</MathJax>
                </div>

                <p>
                    One thing to note about the Softmax function is that given
                    that the denominator for all components is{" "}
                    <MathJax inline>{"\\(\\sum_{n=1}^{n_c}e^{z}_n\\)"}</MathJax>
                    ,
                </p>
                <div className="display-latex">
                    <MathJax>{`\\[\\sum_{j=1}^{n_c}S(z)_j=1\\]`}</MathJax>
                </div>
            </StaticLatexSection>
        </div>
    );
};

export default BackgroundSection;
