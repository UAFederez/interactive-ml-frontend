import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const NormalEquationsSection = () => (
    <div>
        <StaticLatexSection>
            <p>
                Aside from gradient descent, there is also a direct or
                analytical method for calculating parameters{" "}
                <MathJax inline>{"\\(w\\)"}</MathJax> for multiple linear
                regression. The equation for this is known as the{" "}
                <em>normal equation</em>. The normal equation for calculating
                the optimal parameters <MathJax inline>{"\\(w^*\\)"}</MathJax>{" "}
                is given by,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[w^*=\\left(XX^\\top\\right)^{-1}XY^\\top\\]`}</MathJax>
            </div>
            <p>
                <em>Proof</em>:
            </p>
            <p>
                As before, the goal is to find parameters{" "}
                <MathJax inline>
                    {"\\(w\\in\\mathbb{R}^{n\\times 1}\\)"}
                </MathJax>{" "}
                which minimizes the mean squared error across all training
                examples{" "}
                <MathJax inline>
                    {"\\(Y\\in\\mathbb{R}^{1\\times m}\\)"}
                </MathJax>{" "}
                given{" "}
                <MathJax inline>
                    {"\\(X\\in\\mathbb{R}^{n\\times m}\\)"}
                </MathJax>
                , in a multivariable scenario, this is expressed as{" "}
                <MathJax inline>{"\\(J(w)\\)"}</MathJax>,
            </p>
            <div className="displayLatex">
                <MathJax>
                    {`\\[\\begin{align*}
                                    J(w)
                                    &=\\frac{1}{2m}\\left(w^\\top X-Y\\right)^\\top\\left(w^\\top X-Y\\right)\\\\
                                    &=\\frac{1}{2m}\\left[\\left(w^\\top X\\right)^\\top-Y^\\top\\right]\\left(w^\\top X-Y\\right)\\\\
                                    &=\\frac{1}{2m}\\left[(w^\\top X)(w^\\top X)^\\top-w^\\top XY^\\top -Y(w^\\top X)^\\top +Y^\\top Y\\right]\\\\
                                    &=\\frac{1}{2m}\\left[w^\\top XX^\\top w-2Y\\left(w^\\top X\\right)^\\top+Y^\\top Y\\right]\\\\
                                    \\end{align*}\\]`}
                </MathJax>
            </div>
            <p>
                We must then calculate the gradient of the cost w.r.t the
                weights <MathJax inline>{"\\(w\\)"}</MathJax> as follows
            </p>
            <div className="displayLatex">
                <MathJax>
                    {`\\[\\begin{align*}
                                        \\frac{\\partial J(w)}{\\partial w}
                                        &=\\frac{1}{2m}\\cdot\\frac{\\partial}{\\partial w}\\left[w^\\top XX^\\top w-2Y\\left(w^\\top X\\right)^\\top+Y^\\top Y\\right]\\\\
                                        \\end{align*}\\]`}
                </MathJax>
            </div>
            <p>
                We shall derive each term separately for simplification.
                Starting with the third term.
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\frac{\\partial}{\\partial w}Y^\\top Y=0\\]`}</MathJax>
            </div>
            <p>For the second term, recall the structure of both vectors,</p>
            <div className="displayLatex">
                <MathJax>{`\\[Y=\\begin{bmatrix}y^{(1)} & \\dots & y^{(m)}\\end{bmatrix}
    \\quad
    \\text{and}
    \\quad
    \\left(w^\\top X\\right)^\\top=\\begin{bmatrix}
        w_1x^{(1)}_1+\\ldots+w_nx^{(1)}_n \\\\
        \\vdots \\\\
        w_1x^{(m)}_1+\\ldots+w_nx^{(m)}_n
    \\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>Therefore, the dot product is</p>
            <div className="displayLatex">
                <MathJax>{`\\[Y\\left(w^\\top X\\right)^\\top
    =y^{(1)}\\left(w_1x^{(1)}_1+\\ldots+w_nx^{(1)}_n\\right)+\\ldots+y^{(m)}\\left(w_1x^{(m)}_1+\\ldots+w_nx^{(m)}_n\\right)\\]`}</MathJax>
            </div>
            <p>
                Thus the partial derivative w.r.t a weight{" "}
                <MathJax inline>{"\\(w_j\\)"}</MathJax> would be defined as
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\frac{\\partial }{w_j}Y\\left(w^\\top X\\right)^\\top=\\sum_{i=1}^{m}y^{(i)}x^{(i)}_{j}\\]`}</MathJax>
            </div>
            <p>This can be expressed as a matrix vector multiplication</p>
            <div className="displayLatex">
                <MathJax>{`\\[\\frac{\\partial }{w_j}2Y\\left(w^\\top X\\right)^\\top=2XY^\\top\\]`}</MathJax>
            </div>
            <p>
                To see that this is valid, note that each element in this vector
                result is,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[(XY^\\top)_{j}=\\sum_{i=1}^{m}y^{(i)}x^{(i)}_j\\]`}</MathJax>
            </div>
            <p>
                To simplify the calculation of the first term, note that by the
                associativity of matrix multiplication, we can multiply{" "}
                <MathJax inline>
                    {"\\(XX^\\top\\in\\mathbb{R}^{n\\times n}\\)"}
                </MathJax>{" "}
                to obtain a square and symmetric matrix, further denoted as{" "}
                <MathJax inline>{"\\(A\\)"}</MathJax> where
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[A_{j,k}=\\left(XX^\\top\\right)_{j,k}=\\sum_{i=1}^{m}X_{j,i}X^\\top_{i,k}\\]`}</MathJax>
            </div>
            <p>
                Note that <MathJax inline>{"\\(XX^\\top w\\)"}</MathJax> becomes
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[XX^\\top w=Aw=\\begin{bmatrix}
        w_1A_{1,1}+\\ldots+w_nA_{1,n} \\\\
        \\vdots \\\\
        w_1A_{n,1}+\\ldots+w_nA_{n,n} \\\\
    \\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                Thus the full product,{" "}
                <MathJax inline>{"\\(w^\\top XX^\\top w\\)"}</MathJax>, becomes
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[w^\\top XX^\\top w=w^\\top Aw=w_1\\left(w_1A_{1,1}+\\ldots+w_nA_{1,n}\\right)+\\dots+w_n\\left(w_1A_{n,1}+\\ldots+w_nA_{n,n}\\right)\\]`}</MathJax>
            </div>
            <p>
                Calculating the partial derivative w.r.t a weight{" "}
                <MathJax inline>{"\\(w_1\\)"}</MathJax> for example becomes the
                following, note that <MathJax inline>{"\\(A\\)"}</MathJax> is
                symmetric, therefore an element such as{" "}
                <MathJax inline>{"\\(A_{2,1}=A_{1,2}\\)"}</MathJax>
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial w^\\top Aw}{w_1}
    &=2w_1A_{1,1}+2w_2A_{1,2}+\\ldots+2w_nA_{1,n}\\\\
    &=2\\left(w_1A_{1,1}+w_2A_{1,2}+\\ldots+w_nA_{1,n}\\right)
    \\end{align*}\\]`}</MathJax>
            </div>
            <p>
                The same holds for the partial derivative with respect to other
                weights <MathJax inline>{"\\(w_j\\)"}</MathJax>. This can
                therefore be expressed as the following matrix vector
                multiplication
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\frac{\\partial}{\\partial w}w^\\top XX^\\top w=2XX^\\top w\\]`}</MathJax>
            </div>
            <p>The full equation becomes the following</p>
            <div className="displayLatex">
                <MathJax>{`\\[\\begin{align*}
    \\nabla J(w)
    &=\\frac{1}{2m}\\left(2XX^\\top w-2XY^\\top\\right)\\\\
    &=\\frac{1}{m}\\left(XX^\\top w-XY^\\top\\right)\\\\
    \\end{align*}\\]`}</MathJax>
            </div>
            <p>
                Setting this equation to <MathJax inline>{"\\(0\\)"}</MathJax>{" "}
                and solving for <MathJax inline>{"\\(w\\)"}</MathJax> becomes
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\begin{align*}
        \\frac{1}{m}\\left(XX^\\top w-XY^\\top\\right)&=0\\\\
        XX^\\top w-XY^\\top&=0\\\\
        XX^\\top w&=XY^\\top\\\\
        w&=\\left(XX^\\top\\right)^{-1}XY^\\top
    \\end{align*}\\]`}</MathJax>
            </div>
        </StaticLatexSection>
    </div>
);

export default NormalEquationsSection;
