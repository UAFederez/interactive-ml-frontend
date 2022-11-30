import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const VectorizedImplementationSection = () => (
    <div>
        <StaticLatexSection>
            <p>
                An implementation which is much more computationally efficient
                can be achieved through <em>vectorization</em>, i.e, using the
                parallel processing capabilities of modern processors (CPU or
                GPU) to compute linear algebra calculations much faster than
                through loops.
            </p>
            <p>
                Let{" "}
                <MathJax inline>
                    {"\\(X\\in\\mathbb{R}^{n\\times m}\\)"}
                </MathJax>{" "}
                be defined as the <em>design matrix</em> contaning all values of{" "}
                <MathJax inline>{"\\(x_j^{(i)}\\)"}</MathJax> for all{" "}
                <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax> and{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n]\\)"}</MathJax>, and let{" "}
                <MathJax inline>{"\\(Y\\)"}</MathJax> be defined as a row vector
                containing all values of{" "}
                <MathJax inline>{"\\(y^{(i)}\\)"}</MathJax>
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[X=
                                    \\begin{bmatrix}
                                        x^{(1)}_1 & \\dots  & x^{(m)}_1 \\\\
                                        \\vdots    & \\ddots & \\vdots    \\\\
                                        x^{(1)}_n & \\dots  & x^{(m)}_n
                                    \\end{bmatrix}
                                    \\qquad
                                    Y=\\begin{bmatrix}y^{(1)}& \\dots &y^{(m)}\\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                Given parameters{" "}
                <MathJax inline>{"\\(w\\in\\mathbb{R}^{n}\\)"}</MathJax> and{" "}
                <MathJax inline>{"\\(b\\in\\mathbb{R}\\)"}</MathJax>, the vector
                containing all predicted values{" "}
                <MathJax inline>{"\\(\\hat{Y}\\)"}</MathJax> can be achieved
                with very little changes from the original equations,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\hat{Y}=w^\\top X+b\\]`}</MathJax>
            </div>
            <p>
                With that said, the variable{" "}
                <MathJax inline>{"\\(b\\)"}</MathJax> does not necessarily need
                to be a separate variable. Including a <em>dummy</em> feature{" "}
                <MathJax inline>{"\\(x^{(i)}_{j+1}=1\\)"}</MathJax> for all{" "}
                <MathJax inline>{"\\(i\\)"}</MathJax>, within the design matrix
                allows for an additional component to{" "}
                <MathJax inline>{"\\(w\\)"}</MathJax> as follows,
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
                                    w=\\begin{bmatrix}w_1\\\\\\vdots\\\\w_n\\\\b\\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                With this, the calculations for{" "}
                <MathJax inline>{"\\(\\nabla_{w}J(w)\\)"}</MathJax> remain
                equivalent (see gradient descent), and the equation for{" "}
                <MathJax inline>{"\\(\\hat{Y}\\)"}</MathJax> becomes
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\hat{Y}=w^\\top X\\]`}</MathJax>
            </div>
        </StaticLatexSection>
    </div>
);

export default VectorizedImplementationSection;
