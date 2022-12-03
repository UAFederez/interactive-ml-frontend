import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const ProblemStatementSection = () => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    Given a set of <MathJax inline>{"\\(m\\)"}</MathJax>{" "}
                    training examples{" "}
                    <MathJax inline>
                        {"\\(\\left(x^{(i)}, y^{(i)}\\right)\\)"}
                    </MathJax>{" "}
                    for all{" "}
                    <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>, a
                    linear regression model is a supervised learning regression
                    model which expresses{" "}
                    <MathJax inline>
                        {"\\(f(x^{(i)})=\\hat{y}^{(i)}\\)"}
                    </MathJax>{" "}
                    as a linear function of{" "}
                    <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax> given parameters{" "}
                    <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(b\\)"}</MathJax> as follows:
                </p>
                <p>
                    <MathJax className="displayLatex">
                        {"\\[\\hat{y}^{(i)}=w\\cdot x^{(i)}+b\\]"}
                    </MathJax>
                    The model is a supervised learning model because the
                    training set contains the "<em>right</em>" or expected
                    output value for the target variable for every{" "}
                    <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>, and a
                    regression model because the model outputs a continuous
                    value. Linear regression with one variable is known as a{" "}
                    <em>univariate</em> linear regression, i.e,{" "}
                    <MathJax inline>{"\\(x^{(i)}\\in\\mathbb{R}\\)"}</MathJax>{" "}
                    while <em>multivariate</em> linear regression is one wherein{" "}
                    <MathJax inline>
                        {"\\(x^{(i)}\\in\\mathbb{R}^{n}\\)"}
                    </MathJax>{" "}
                    for <MathJax inline>{"\\(n>1\\)"}</MathJax> features.
                </p>
                <p>
                    The goal of the linear regression model then is to find
                    optimal parameters <MathJax inline>{"\\(w\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(b\\)"}</MathJax> such that for every
                    training example{" "}
                    <MathJax inline>
                        {"\\(\\left(x^{(i)}, y^{(i)}\\right)\\)"}
                    </MathJax>{" "}
                    for <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>
                </p>
                <MathJax className="displayLatex">
                    {"\\[f(x^{(i)})\\approx y^{(i)}\\]"}
                </MathJax>
            </StaticLatexSection>
        </div>
    );
};

export default ProblemStatementSection;
