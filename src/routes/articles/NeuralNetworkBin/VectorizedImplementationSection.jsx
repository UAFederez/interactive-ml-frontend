import { MathJax } from "better-react-mathjax";

export const VectorizedImplementationSection = () => {
    return (
        <div>
            <p>
                As before, it is more efficient to carry out a vectorized
                implementation as opposed to solely relying on loops. While it
                is not possible to vectorize across multiple layers given the
                presence of the nonlinear activation function, it is possible to
                compute all of the activations of neurons on the{" "}
                <em>entire training set</em> for a particular layer.
            </p>
            <p>
                Let{" "}
                <MathJax inline>
                    {"\\(A^{[0]}\\in\\mathbb{R}^{n\\times m}\\)"}
                </MathJax>{" "}
                be the design matrix containing all of the{" "}
                <MathJax inline>{"\\(m\\)"}</MathJax> training examples, each
                with <MathJax inline>{"\\(n\\)"}</MathJax> input features. The
                weight matrix for a particular layer{" "}
                <MathJax inline>
                    {"\\(w^{[l]}\\in\\mathbb{R}^{n_l\\times n_{l+1}}\\)"}
                </MathJax>{" "}
                is defined similarly to before. The dummy feature would not be
                used for now as it requires an additional row of{" "}
                <MathJax inline>{"\\(1\\)"}</MathJax>'s to each layer for every
                layer computation.
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    A^{[0]}=\\begin{bmatrix}
    x^{(1)}_1, & \\dots  & x^{(m)}_1 \\\\
     \\vdots   & \\ddots & \\vdots \\\\
    x^{(1)}_n, & \\dots  & x^{(m)}_n
    \\end{bmatrix}
    \\quad
    w^{[l]}=\\begin{bmatrix}
    w^{[l]}_{1, 1}, & \\dots & w^{[l]}_{1, n_{l+1}} \\\\
    \\vdots   & \\ddots & \\vdots \\\\
    w^{[l]}_{n_l, 1}, & \\dots & w^{[l]}_{n_l, n_{l+1}} \\\\
    \\end{bmatrix}
    \\quad
    b^{[l]}=\\begin{bmatrix}b^{[l]}_1 \\\\\\vdots \\\\b^{[l]}_{n_{l+1}}\\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                The linear combinations of all the inputs in a particular layer{" "}
                <MathJax inline>{"\\(l\\)"}</MathJax> with the weights, denoted
                by <MathJax inline>{"\\(Z^{[l]}\\)"}</MathJax>, and the
                subsequent activations of the neurons, denoted as{" "}
                <MathJax inline>{"\\(A^{[l]}\\)"}</MathJax> for all training
                examples can then be calculated as
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\begin{align*}
    Z^{[l]}&=w^{[l]\\top}A^{[l-1]}+b^{[l]}\\\\
    A^{[l]}&=g(Z^{[l]})
    \\end{align*}\\]`}</MathJax>
            </div>
            <p>
                The activations of the output layer{" "}
                <MathJax inline>{"\\(A^{[L]}\\)"}</MathJax> can then be used to
                calculate the loss given the{" "}
                <MathJax inline>{"\\(Y\\)"}</MathJax> matrix,{" "}
                <MathJax inline>{"\\(L(A^{[L]}, Y)\\)"}</MathJax>. After which{" "}
                <MathJax inline>{"\\(\\delta^{[L]}\\)"}</MathJax> can then be
                computed. Both these computations will vary depending on the
                loss function,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\delta^{[L]}=\\frac{\\partial L\\left(A^{[L]}, Y\\right)}{\\partial A^{[L]}}\\]`}</MathJax>
            </div>
            <p>
                Note that because <MathJax inline>{"\\(A^{[L]}\\)"}</MathJax>{" "}
                and <MathJax inline>{"\\(Y\\)"}</MathJax> are both matrices in{" "}
                <MathJax inline>{"\\(\\mathbb{R}^{n_L\\times m}\\)"}</MathJax>,
                the same is true for{" "}
                <MathJax inline>{"\\(\\delta^{[L]}\\)"}</MathJax>
            </p>
            <p>
                The gradients of the activation function,{" "}
                <MathJax inline>{"\\(g'(Z^{[l]})\\)"}</MathJax>, and{" "}
                <MathJax inline>{"\\(\\delta^{[l]}\\)"}</MathJax> being defined
                as follows,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    g'(Z^{[l]})
    =\\begin{bmatrix}
    g'(z^{[l]}_{1,1}), & \\dots & g'(z^{[l]}_{1,m}) \\\\
    \\vdots & \\ddots & \\vdots \\\\
    g'(z^{[l]}_{n_l,1}), & \\dots & g'(z^{[l]}_{n_l,m}) \\\\
    \\end{bmatrix}
    \\qquad
    \\delta^{[l]}
    =\\begin{bmatrix}
    \\delta^{[l]}_{1,1}, & \\dots & \\delta^{[l]}_{1,m} \\\\
    \\vdots & \\ddots & \\vdots \\\\
    \\delta^{[l]}_{n_l,1}, & \\dots & \\delta^{[l]}_{n_l,m} \\\\
    \\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                Taking the element-wise product leads to the resulting matrix in
                still{" "}
                <MathJax inline>{"\\(\\mathbb{R}^{n_l\\times m}\\)"}</MathJax>{" "}
                since both are only multiplied element-wise,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\delta^{[l]}\\odot g'(Z^{[l]})
    =\\begin{bmatrix}
    \\delta^{[l]}_{1,1}\\cdot g'(z^{[l]}_{1,1}), & \\dots & \\delta^{[l]}_{1,m}\\cdot g'(z^{[l]}_{1,m}) \\\\
    \\vdots & \\ddots & \\vdots \\\\
    \\delta^{[l]}_{n_l,1}\\cdot g'(z^{[l]}_{n_l,1}), & \\dots & \\delta^{[l]}_{n_l,m}\\cdot g'(z^{[l]}_{n_l,m}) \\\\
    \\end{bmatrix}\\]`}</MathJax>
            </div>
            <h3>Calculating the gradients for layer weights</h3>
            <p>
                Recall that{" "}
                <MathJax inline>
                    {"\\(A^{[l-1]}\\in\\mathbb{R}^{n_{l-1}\\times m}\\)"}
                </MathJax>{" "}
                is defined as,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    A^{[l-1]}
    =\\begin{bmatrix}
    a^{[l-1]}_{1,1}, & \\dots & a^{[l-1]}_{1,m} \\\\
    \\vdots & \\ddots & \\vdots \\\\
    a^{[l-1]}_{n_{l-1},1}, & \\dots & a^{[l-1]}_{n_{l-1},m} \\\\
    \\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                The gradient of the <em>cost</em> (since the matrices already
                include all training samples) w.r.t the weights can then be
                calculated as
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\nabla_{w^{[l]}}J(W)=\\frac{A^{[l-1]}\\left(g'(Z^{[l]})\\odot\\delta^{[l]}\\right)^\\top}{m}\\]`}</MathJax>
            </div>
            <p>
                To see that this is valid, note that each component of this
                gradient is defined as
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\nabla_{w^{[l]}}J(W)_{j,k}=\\frac{1}{m}\\sum_{i=1}^{m}\\delta^{[l-1]}_{k,i}\\cdot g'(z^{[l-1]}_{k,i})\\cdot a^{[l-1]}_{j,i}\\]`}</MathJax>
            </div>
            <h3>Calculating the gradients for layer biases</h3>
            <p>
                Likewise, the gradient of the cost w.r.t the bias{" "}
                <MathJax inline>
                    {"\\(\\nabla_{b^{[l]}}J(W)\\in\\mathbb{R}^{n_l}\\)"}
                </MathJax>{" "}
                is simply the <strong>mean</strong> of{" "}
                <MathJax inline>
                    {"\\(\\delta^{[l]}\\odot g'(Z^{[l]})\\)"}
                </MathJax>{" "}
                along its <strong>rows</strong>, i.e,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\quad\\nabla_{b^{[l]}}J(W)_k
    =\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\delta^{[l]}\\odot g'(Z^{[l]})\\right)_{k,i}\\]`}</MathJax>
            </div>
            <h3>Calculating the gradients for subsequent backpropagation</h3>

            <p>
                For the gradients to be passed to the previous layer for
                backpropagation, recall the definition of{" "}
                <MathJax inline>
                    {"\\(w^{[l]}\\in\\mathbb{R}^{n_{l-1}\\times n_l}\\)"}
                </MathJax>
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    w^{[l]}
    =\\begin{bmatrix}
    w^{[l]}_{1, 1}, & \\dots & w^{[l]}_{1, n_l} \\\\
    \\vdots & \\ddots & \\vdots \\\\
    w^{[l]}_{n_{l-1}, 1}, & \\dots & w^{[l]}_{n_{l-1}, n_l}
    \\end{bmatrix}\\]`}</MathJax>
            </div>
            <p>
                The gradients for the previous layer can then be calculated as{" "}
                <MathJax inline>{"\\(\\delta^{[l-1]}\\)"}</MathJax>,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\delta^{[l-1]}=w^{[l]}\\left(\\delta^{[l]}\\odot g'(Z^{[l]})\\right)\\]`}</MathJax>
            </div>
            <p>
                To see that this is valid, note that each element{" "}
                <MathJax inline>{"\\(\\delta^{[l-1]}_{j,i}\\)"}</MathJax> for{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n_l]\\)"}</MathJax> and{" "}
                <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax> is
                defined as
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[    \\delta^{[l-1]}_{j,i}=\\sum_{k=1}^{n_{l}}\\delta^{[l]}_{k,i}\\cdot g'(z^{[l]}_{k,i})\\cdot w^{[l]}_{j,k}\\]`}</MathJax>
            </div>
        </div>
    );
};
