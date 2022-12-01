import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

export const VectorizedImplementationSection = () => (
    <div>
        <StaticLatexSection>
            <p>
                Given the design matrix <MathJax inline>{"\\(X\\)"}</MathJax>{" "}
                and parameters <MathJax inline>{"\\(w\\)"}</MathJax> (with{" "}
                <MathJax inline>{"\\(b\\)"}</MathJax> included) defined
                similarly as before, a vectorized implementation of{" "}
                <MathJax inline>{"\\(\\nabla_{w}J(w)\\)"}</MathJax> can be
                calculated as follows:
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[X=
        \\begin{bmatrix}
            x^{(1)}_1 & \\dots  & x^{(m)}_1 \\\\
            \\vdots    & \\ddots & \\vdots    \\\\
            x^{(1)}_n & \\dots  & x^{(m)}_n \\\\
            1 & \\dots & 1
        \\end{bmatrix}
        \\qquad
        w=\\begin{bmatrix}w_1\\\\ \\vdots\\\\ w_n\\\\ b\\end{bmatrix}\\]`}</MathJax>
            </div>

            <p>
                A matrix-vector product would then yield the intermediate
                variable <MathJax inline>{"\\(Z\\)"}</MathJax> for the logistic
                function <MathJax inline>{"\\(\\sigma(Z)\\)"}</MathJax> (note
                that <MathJax inline>{"\\(\\sigma(Z)\\)"}</MathJax> operates
                component-wise, i.e,{" "}
                <MathJax inline>{"\\(\\hat{Y}_i=\\sigma(Z_i)\\)"}</MathJax> for{" "}
                <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax>)
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[Z=w^\\top X\\qquad\\text{and}\\qquad\\hat{Y}=\\sigma(Z)\\]`}</MathJax>
            </div>

            <p>
                The residuals <MathJax inline>{"\\(\\hat{Y}-Y\\)"}</MathJax> can
                be obtained simply by subtracting the two vectors. After which,
                the vector can be transposed leading to,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[(\\hat{Y}-Y)^\\top=\\begin{bmatrix}\\hat{y}^{(1)}-y^{(1)}\\\\ \\vdots\\\\ \\hat{y}^{(m)}-y^{(m)}\\end{bmatrix}\\]`}</MathJax>
            </div>

            <p>
                Recall that the design matrix{" "}
                <MathJax inline>{"\\(X\\)"}</MathJax> is defined as
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[X=
        \\begin{bmatrix}
            x^{(1)}_1 & \\dots  & x^{(m)}_1 \\\\
            \\vdots    & \\ddots & \\vdots    \\\\
            x^{(1)}_n & \\dots  & x^{(m)}_n \\\\
            1 & \\dots & 1
        \\end{bmatrix}\\]`}</MathJax>
            </div>

            <p>
                With this, the gradient{" "}
                <MathJax inline>{"\\(\\nabla_{w}J(w)\\)"}</MathJax> can simply
                be calculated as a matrix-vector product,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\nabla_{w}J(w)=\\frac{X(\\hat{Y}-Y)^\\top}{m}\\]`}</MathJax>
            </div>

            <p>
                To see that this is valid, note that each component,{" "}
                <MathJax inline>{"\\(\\nabla_{w}J(w)_j\\)"}</MathJax> for{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n]\\)"}</MathJax> evaluates
                to
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\nabla_{w}J(w)_j=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot x^{(i)}_j\\]`}</MathJax>
            </div>
        </StaticLatexSection>
    </div>
);
