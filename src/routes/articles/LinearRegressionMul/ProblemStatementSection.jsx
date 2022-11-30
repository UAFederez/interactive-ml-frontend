import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const ProblemStatementSection = () => (
    <div>
        <StaticLatexSection>
            <p>
                This can now represent a multivariate linear regression problem,
                where{" "}
                <MathJax inline>{"\\(x^{(i)}\\in\\mathbb{R}^n\\)"}</MathJax>,
                for <MathJax inline>{"\\(n\\)"}</MathJax> features with{" "}
                <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>. In this
                particular case, <MathJax inline>{"\\(n=4\\)"}</MathJax>. The{" "}
                <MathJax inline>{"\\(j\\)"}</MathJax>-th input feature, where{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n]\\)"}</MathJax>. for the{" "}
                <MathJax inline>{"\\(i\\)"}</MathJax>
                -th training example, where{" "}
                <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>, shall be
                denoted as <MathJax inline>{"\\(x_j^{(i)}\\)"}</MathJax>
            </p>
        </StaticLatexSection>
        <p>The model for linear regression can now be expressed as,</p>
        <div className="displayLatex">
            <MathJax>
                {
                    "\\[f(x^{(i)})=w_1x_1^{(i)}+w_2x_2^{(i)}+\\dots+w_jx_j^{(i)}+b\\]"
                }
            </MathJax>
        </div>
        <p>
            A more compact notation uses vectors to represent{" "}
            <MathJax inline>{"\\(w\\in\\mathbb{R}^n\\)"}</MathJax> and{" "}
            <MathJax inline>{"\\(x^{(i)}\\)"}</MathJax>, with{" "}
            <MathJax inline>{"\\(b\\in\\mathbb{R}\\)"}</MathJax>, such that
        </p>
        <div className="displayLatex">
            <MathJax>
                {
                    "\\[w=\\begin{bmatrix}w_1\\\\ \\vdots \\\\w_j\\end{bmatrix}\\quad x^{(i)}=\\begin{bmatrix}x_1^{(i)}\\\\ \\vdots \\\\ x_j^{(i)}\\end{bmatrix}\\]"
                }
            </MathJax>
        </div>
        <p>And the linear regression model can be rewritten as,</p>
        <div className="displayLatex">
            <MathJax>{"\\[f(x^{(i)})=w^\\top x^{(i)}+b\\]"}</MathJax>
        </div>
    </div>
);
export default ProblemStatementSection;
