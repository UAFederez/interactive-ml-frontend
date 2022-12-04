import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const BackgroundSection = () => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    K-means clustering is an <em>unsupervised</em> learning
                    algorithm used to analyze a set of training examples{" "}
                    <MathJax inline>
                        {
                            "\\(\\left\\{x^{(1)},x^{(2)},\\ldots,x^{(m)}\\right\\}\\)"
                        }
                    </MathJax>{" "}
                    and obtain a set of <MathJax inline>{"\\(K\\)"}</MathJax>{" "}
                    clusters. The model is described as unsupervised due to the
                    fact that there isn't really a 'correct' label to predict.
                    Rather, algorithms of these sort attempt to analyze the
                    relationships present in the data in and of itself with no
                    explicit ground truth label. This can be represented as a
                    set of training examples.{" "}
                </p>
            </StaticLatexSection>
        </div>
    );
};

export default BackgroundSection;
