import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const MeanSquaredErrorSection = (props) => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    The mean squared error cost function comes from a
                    statistical method known as{" "}
                    <em>maximum likelihood estimation</em>. Recall that the
                    underlying assumption for linear regression is that the data
                    is accurately modelled with a linear function. The error
                    terms are assumed to be{" "}
                    <MathJax inline>{"\\(\\text{i.i.d}\\)"}</MathJax> from a
                    normal distribution with mean{" "}
                    <MathJax inline>{"\\(0\\)"}</MathJax> and constant variance{" "}
                    <MathJax inline>{"\\(\\sigma^2\\)"}</MathJax>, i.e for all{" "}
                    <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>,
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`\\[\\begin{align*}
                \\hat{y}^{(i)}
                &=w_{\\text{true}}x^{(i)}+b_{\\text{true}}+\\epsilon\\quad\\text{where }\\epsilon\\overset{i.i.d}{\\sim}\\mathcal{N}(0,\\sigma^2)\\\\
                \\hat{y}^{(i)}&=y^{(i)}+\\epsilon\\\\
                \\epsilon&=\\hat{y}^{(i)}-y^{(i)}
                \\end{align*}\\]`}
                    </MathJax>
                </div>
                <p>
                    Thus the probability density function of the error terms for
                    each sample{" "}
                    <MathJax inline>{"\\(\\epsilon^{(i)}\\)"}</MathJax> for{" "}
                    <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax> are
                    represented with a Gaussian or normal distribution with
                    parameters <MathJax inline>{"\\(\\mu=0\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(\\theta_2=\\sigma^2\\)"}</MathJax> as
                    follows
                    <MathJax>{`\\[f(\\epsilon^{(i)};0,\\theta_2)=\\frac{1}{\\sqrt{\\theta_2}\\sqrt{2\\pi}}\\exp\\left[-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]\\]`}</MathJax>
                    The <em>likelihood</em>, represents the joint probability
                    density fuction of observing the data that was gathered.
                    Assuming that all samples are independent this is simply the
                    product of all the probability density fuctions for{" "}
                    <MathJax inline>{"\\(\\epsilon\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`\\[\\begin{align*}
                    L(\\theta_2)
                    &=f(x_1;0,\\theta_2)\\cdot f(x_2;0,\\theta_2)\\cdot\\dots\\cdot f(x_n;0,\\theta_2)\\\\
                    &=\\prod_{i=1}^{m}f(\\hat{y}^{(i)}-y^{(i)};0,\\theta_2)
                    \\end{align*}\\]`}
                    </MathJax>
                </div>
                <p>
                    The goal is to find the value{" "}
                    <MathJax inline>{"\\(\\theta_2\\)"}</MathJax> which{" "}
                    <em>maximizes</em> the likelihood of seeing the data that
                    was gathered given these parameters. In this case, given the
                    probability density function of the normally distributed
                    error terms
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`\\[\\begin{align*}
                L(\\theta_2)
                =\\prod_{i=1}^{m}\\left(\\frac{1}{\\sqrt{\\theta_2}\\sqrt{2\\pi}}\\exp\\left[-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]\\right)\\\\
                =\\theta_2^{-{\\frac{m}{2}}}(2\\pi)^{-{\\frac{m}{2}}}\\exp\\left[\\sum_{i=1}^{m}-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]
                \\end{align*}\\]`}
                    </MathJax>
                </div>
                <p>
                    Given that the <MathJax inline>{"\\(\\log(x)\\)"}</MathJax>{" "}
                    is a strictly increasingly monotic function, i.e, for every{" "}
                    <MathJax inline>{"\\(x_1<x_2\\)"}</MathJax>,{" "}
                    <MathJax inline>{"\\(f(x_1)<f(x_2)\\)"}</MathJax>, then the
                    maximum of <MathJax inline>{"\\(L(\\theta_2)\\)"}</MathJax>{" "}
                    is also a maximum of the{" "}
                    <MathJax inline>
                        {"\\(\\log\\left(L(\\theta_2)\\right)\\)"}
                    </MathJax>
                    . This allows the derivation to be more convenient based on
                    the properties of <MathJax inline>{"\\(\\log\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`\\[\\begin{align*}
                \\log\\left(L(\\theta_2)\\right)
                &=\\log\\left(\\theta_2^{-{\\frac{m}{2}}}(2\\pi)^{-{\\frac{m}{2}}}\\exp\\left[\\sum_{i=1}^{m}-\\frac{1}{2}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}\\right]\\right)\\\\
                &=-\\frac{m}{2}\\log(\\theta_2)-\\frac{m}{2}\\log(2\\pi)-\\frac{1}{2m}\\sum_{i=1}^{m}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{\\theta_2}
                \\end{align*}\\]`}
                    </MathJax>
                </div>
                <p>
                    Taking the partial derviative w.r.t to{" "}
                    <MathJax inline>{"\\(\\theta_2\\)"}</MathJax> and setting it
                    to <MathJax inline>{"\\(0\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`$$\\begin{align*}
                \\frac{\\partial\\log\\left(L(\\theta_2)\\right)}{\\partial \\theta_2}
                &=-\\frac{m}{2\\theta_2}+\\sum_{i=1}^{m}\\frac{\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2}{2{\\theta_2}^2}\\\\
                0\\times 2\\theta_2^2&=\\left(-\\frac{m}{2\\theta_2}+\\frac{1}{2{\\theta_2}^2}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\right)\\times 2{\\theta_2}^2\\\\
                0&=-{\\theta_2 m}+\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2
                \\end{align*}
                $$`}
                    </MathJax>
                </div>
                <p>
                    Setting the equation to{" "}
                    <MathJax inline>{"\\(0\\)"}</MathJax> allows us to solve for{" "}
                    <MathJax inline>{"\\(\\theta_2\\)"}</MathJax>, i.e, the
                    maximum likelihood estimator for the variance of the error
                    terms.
                </p>
                <div className="displayLatex">
                    <MathJax>
                        {`\\[\\begin{align*}
                    0&=-{\\theta_2 m}+\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2\\\\
                    \\theta_2&=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)^2
                    \\end{align*}\\]`}
                    </MathJax>
                </div>
            </StaticLatexSection>
        </div>
    );
};

export default MeanSquaredErrorSection;
