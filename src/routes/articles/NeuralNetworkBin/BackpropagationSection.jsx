import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

export const BackpropagationSection = () => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    After the cost is computed it comes necessary to compute the
                    gradients of the cost w.r.t the parameters{" "}
                    <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(b^{[l]}\\)"}</MathJax> for all{" "}
                    <MathJax inline>{"\\(l\\in[1,\\ldots,L]\\)"}</MathJax>.{" "}
                </p>

                <p>
                    The idea behind backpropagation is that the gradients are
                    computed starting from the outputs of the last layer{" "}
                    <MathJax inline>{"\\(l=L\\)"}</MathJax>, after which
                    gradients are propagated backwards. It is necessary to
                    calculate and propagate backwards because of the{" "}
                    <em>chain rule</em>.{" "}
                </p>

                <p>
                    In order to simplify the calculations, subsequent
                    derivations show how to calculate the gradient of the{" "}
                    <em>loss</em> of any training example. As an example, given
                    a particular weight{" "}
                    <MathJax inline>{"\\(w^{[l]}_{j,k}\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\nabla_{w^{[l]}_{j,k}}L(\\hat{y}^{(i)},y^{(i)})\\\\
    =\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial w^{[l]}_{j,k}}\\\\
    =\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_k}\\cdot\\frac{\\partial a^{[l]}_k}{\\partial w^{[l]}_{j,k}}\\]`}</MathJax>
                </div>

                <p>
                    The first factor is a component of{" "}
                    <MathJax inline>
                        {"\\(\\frac{\\partial J(W)}{\\partial a^{[l]}}\\)"}
                    </MathJax>
                    , the <em>gradient</em> propagated backwards from layers
                    that come after layer <MathJax inline>{"\\(l\\)"}</MathJax>.
                    In order to simplify the calculations of the gradient, the
                    aforementioned <em>upstream</em> gradient will be denoted as
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\delta^{[l]}=\\nabla_{a^{[l]}}L(\\hat{y}^{(i)},y^{(i)})
    =\\begin{bmatrix}
        \\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_1}, & \\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_2}, & \\dots, & \\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_{n_l}}
    \\end{bmatrix}^\\top\\]`}</MathJax>
                </div>
                <p>
                    Note that since{" "}
                    <MathJax inline>{"\\(a^{[l]}_k\\)"}</MathJax> can affect the
                    activations of all other neurons in layer{" "}
                    <MathJax inline>{"\\(l+1\\)"}</MathJax>, a complete
                    definition of{" "}
                    <MathJax inline>{"\\(\\delta^{[l]}_k\\)"}</MathJax> is
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\begin{align*}
    \\delta^{[l]}_k
    &=\\sum_{j=1}^{n_{l+1}}\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{a^{[l+1]}_j}\\cdot\\frac{\\partial a^{[l+1]}_j}{a^{[l]}_k}\\\\
    &=\\sum_{j=1}^{n_{l+1}}\\delta^{[l+1]}_j\\cdot\\frac{\\partial a^{[l+1]}_j}{a^{[l]}_k}\\\\
    \\end{align*}\\]`}</MathJax>
                </div>

                <p>
                    For a particular weight{" "}
                    <MathJax inline>{"\\(w^{[l]}_{j,k}\\)"}</MathJax>, the
                    gradient of the loss w.r.t such weight was previously
                    defined as,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial w^{[l]}_{j,k}}
    &=\\delta^{[l]}_k\\cdot\\frac{\\partial a^{[l]}_k}{\\partial w^{[l]}_{j,k}}\\\\
    &=\\delta^{[l]}_k\\cdot\\frac{\\partial a^{[l]}_k}{\\partial z^{[l]}_k}\\cdot\\frac{\\partial z^{[l]}_k}{\\partial w^{[l]}_{j,k}}
    \\end{align*}\\]`}</MathJax>
                </div>

                <p>
                    Recall from the definition of{" "}
                    <MathJax inline>{"\\(z^{[l]}_k\\)"}</MathJax>,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[z^{[l]}_k=w^{[l]}_{1,1}a^{[l-1]}_1+\\dots+w^{[l]}_{j,k}a^{[l-1]}_j+\\dots+b_k\\]`}</MathJax>
                </div>

                <p>
                    Thus the partial derivative of{" "}
                    <MathJax inline>{"\\(z^{[l]}_k\\)"}</MathJax> w.r.t{" "}
                    <MathJax inline>{"\\(w^{[l]}_{j,k}\\)"}</MathJax>,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\frac{\\partial z^{[l]}_k}{\\partial w^{[l]}_{j,k}}=a^{[l-1]}_j\\]`}</MathJax>
                </div>
                <p>
                    This holds for any{" "}
                    <MathJax inline>{"\\(k\\in[1,\\ldots,n_{l}]\\)"}</MathJax>,
                    thus the gradient of{" "}
                    <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax> w.r.t{" "}
                    <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> can be
                    determined by carrying out the rest of the calculation of
                    the partial derivatives,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\nabla_{w^{[l]}}z^{[l]}
    =\\begin{bmatrix}
        a^{[l-1]}_1 & \\dots & a^{[l-1]}_1 \\\\
        \\vdots & \\ddots & \\vdots \\\\
        a^{[l-1]}_{n_{l-1}} & \\dots & a^{[l-1]}_{n_{l-1}} \\\\
    \\end{bmatrix}\\]`}</MathJax>
                </div>
                <p>
                    The gradient of <MathJax inline>{"\\(a^{[l]}\\)"}</MathJax>{" "}
                    w.r.t <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax> is
                    essentially the derivative of the respective activation
                    function <MathJax inline>{"\\(g'(z^{[l]})\\)"}</MathJax>
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\nabla_{z^{[l]}}a^{[l]}
    =g'(z^{[l]})=\\begin{bmatrix}g'(z^{[l]}_1), & \\dots, & g'(z^{[l]}_{n_l})\\end{bmatrix}^\\top\\]`}</MathJax>
                </div>
                <p>
                    Thus the gradient of the loss w.r.t the weight becomes{" "}
                    <MathJax inline>{"\\(w^{[l]}_{j,k}\\)"}</MathJax>,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial w^{[l]}_{j,k}}
    =\\delta^{[l]}_k\\cdot g'(z^{[l]}_k)\\cdot a^{[l-1]}_j\\]`}</MathJax>
                </div>
                <p>
                    Likewise, the gradient of the loss w.r.t the bias{" "}
                    <MathJax inline>{"\\(b^{[l]}_k\\)"}</MathJax> is
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial b^{[l]}_k}
    =\\delta^{[l]}_k\\cdot g'(z^{[l]}_k)\\]`}</MathJax>
                </div>

                <p>
                    It is also important to find the gradient of the loss w.r.t
                    the <em>activations</em> of the previous layer, i.e,{" "}
                    <MathJax inline>{"\\(\\delta^{[l-1]}\\)"}</MathJax> as this
                    is necessary for the subsequent step in backpropagation.
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\begin{align*}
    \\delta^{[l-1]}_j
    &=\\sum_{k=1}^{n_l}\\delta^{[l]}_k\\cdot\\frac{\\partial a^{[l]}_k}{z^{[l]}_k}\\cdot\\frac{\\partial z^{[l]}_k}{\\partial a^{[l-1]}_j}\\\\
    &=\\sum_{k=1}^{n_l}\\delta^{[l]}_k\\cdot g'(z^{[l]}_k)\\cdot\\frac{\\partial z^{[l]}_k}{\\partial a^{[l-1]}_j}
    \\end{align*}\\]`}</MathJax>
                </div>

                <p>
                    Recall from the definition of{" "}
                    <MathJax inline>{"\\(z^{[l]}_k\\)"}</MathJax>,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[z^{[l]}_k=w^{[l]}_{1,1}a^{[l-1]}_1+\\dots+w^{[l]}_{j,k}a^{[l-1]}_j+\\dots+b_k\\]`}</MathJax>
                </div>

                <p>
                    Thus the partial derivative of{" "}
                    <MathJax inline>{"\\(z^{[l]}_k\\)"}</MathJax> w.r.t to an
                    activation <MathJax inline>{"\\(a^{[l-1]}_j\\)"}</MathJax>{" "}
                    is,
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\frac{\\partial z^{[l]}_k}{\\partial a^{[l-1]}_k}=w^{[l]}_{j,k}\\]`}</MathJax>
                </div>

                <p>
                    And <MathJax inline>{"\\(\\delta^{[l-1]}_j\\)"}</MathJax>{" "}
                    for{" "}
                    <MathJax inline>{"\\(j\\in[1,\\dots,n_{l-1}]\\)"}</MathJax>{" "}
                    becomes
                </p>
                <div className="displayLatex">
                    <MathJax>{`\\[\\delta^{[l-1]}_j=\\sum_{k=1}^{n_l}\\delta^{[l]}_k\\cdot g'(z^{[l]}_k)\\cdot w^{[l]}_{j,k}\\]`}</MathJax>
                </div>
            </StaticLatexSection>
        </div>
    );
};
