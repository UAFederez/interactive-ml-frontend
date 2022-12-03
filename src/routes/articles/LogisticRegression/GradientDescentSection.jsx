import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

export const GradientDescentSection = () => (
    <div>
        <StaticLatexSection>
            <p>
                Given the formula for the cost function{" "}
                <MathJax inline>{"\\(J(w)\\)"}</MathJax>, the gradient of the
                cost function w.r.t the weights{" "}
                <MathJax inline>{"\\(\\nabla_{w}J(w)\\)"}</MathJax> can be
                calculated similarly as before:
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\nabla_{w}J(w)=\\begin{bmatrix}\\frac{\\partial J(w)}{\\partial w_1} & \\dots & \\frac{\\partial J(w)}{\\partial w_n}\\end{bmatrix}^\\top\\]`}</MathJax>
            </div>

            <p>
                To simplify the calculation of the derivative{" "}
                <MathJax inline>
                    {"\\(\\frac{\\partial J(w)}{\\partial w_j}\\)"}
                </MathJax>
                , it is helpful to note that by the chain rule,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\frac{\\partial J(w)}{\\partial w_j}=\\frac{1}{m}\\sum_{i=1}^{m}\\frac{\\partial L(\\hat{y}^{(i)}, y^{(i)})}{\\partial\\hat{y}^{(i)}}\\cdot\\frac{\\partial \\hat{y}^{(i)}}{\\partial w_j}\\]`}</MathJax>
            </div>
            <p>
                The partial derivative of the loss w.r.t a particular output{" "}
                <MathJax inline>{"\\(\\hat{y}^{(i)}\\)"}</MathJax> for{" "}
                <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax> is,
            </p>
            <div className="displayLatex">
                <MathJax>
                    {`\\[\\begin{align*}
                                    \\frac{\\partial L(\\hat{y}^{(i)}, y^{(i)})}{\\partial\\hat{y}^{(i)}}
                                    &=\\frac{\\partial}{\\partial\\hat{y}^{(i)}}\\left[-\\left(y^{(i)}\\log(\\hat{y}^{(i)})+(1-y^{(i)})\\log(1-\\hat{y}^{(i)})\\right)\\right]\\\\
                                    &=-\\left[\\frac{y^{(i)}}{\\hat{y}^{(i)}}+\\frac{(1-y^{(i)})}{(1-\\hat{y}^{(i)})}(-1)\\right]\\\\
                                    &=-\\left(\\frac{y^{(i)}(1-\\hat{y}^{(i)})-\\hat{y}(1-y^{(i)})}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    &=-\\left(\\frac{y^{(i)}-y^{(i)}\\hat{y}^{(i)}-\\hat{y}^{(i)}+y^{(i)}\\hat{y}^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    &=\\left(\\frac{\\hat{y}^{(i)}-y^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    &=\\left(\\frac{\\hat{y}^{(i)}-y^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\\\
                                    \\end{align*}\\]`}
                </MathJax>
            </div>

            <p>
                The partial derivative of the predicted value{" "}
                <MathJax inline>{"\\(\\hat{y}^{(i)}\\)"}</MathJax> for{" "}
                <MathJax inline>{"\\(i\\in[1,\\ldots,m]\\)"}</MathJax> w.r.t a
                particular weight <MathJax inline>{"\\(w_j\\)"}</MathJax> for{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n]\\)"}</MathJax> is,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial\\hat{y}^{(i)}}{\\partial w_j}
    &=\\frac{\\partial\\sigma(z^{(i)})}{\\partial z^{(i)}}\\cdot\\frac{\\partial z^{(i)}}{\\partial w_j}
    \\end{align*}\\]`}</MathJax>
            </div>

            <p>
                The first factor, i.e., the derivative of the logistic function
                w.r.t <MathJax inline>{"\\(z\\)"}</MathJax> is,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial\\sigma(z^{(i)})}{\\partial z^{(i)}}
    &=\\frac{\\partial}{\\partial z^{(i)}}\\left(\\frac{1}{1+e^{-z^{(i)}}}\\right)\\\\  
    &=-\\frac{1}{(1+e^{-z^{(i)}})^2}\\left(e^{-z^{(i)}}\\right)\\left(-1\\right)\\\\    
    &=\\frac{e^{-z^{(i)}}}{(1+e^{-z^{(i)}})^2}\\\\  
    &=\\frac{1-1+e^{-z^{(i)}}}{(1+e^{-z^{(i)}})^2}\\\\  
    &=\\frac{1+e^{-z^{(i)}}}{(1+e^{-z^{(i)}})^2}-\\frac{1}{(1+e^{-z^{(i)}})^2}\\\\  
    &=\\frac{1}{1+e^{-z^{(i)}}}\\left(\\frac{1+e^{-z^{(i)}}}{1+e^{-z^{(i)}}}-\\frac{1}{1+e^{-z^{(i)}}}\\right)\\\\  
    &=\\frac{1}{1+e^{-z^{(i)}}}\\left(1-\\frac{1}{1+e^{-z^{(i)}}}\\right)\\\\   
    &=\\sigma(z^{(i)})(1-\\sigma(z^{(i)}))=\\hat{y}^{(i)}(1-\\hat{y}^{(i)})
    \\end{align*}\\]`}</MathJax>
            </div>

            <p>
                The partial derivative of <MathJax inline>{"\\(z\\)"}</MathJax>{" "}
                w.r.t to a particular weight{" "}
                <MathJax inline>{"\\(w_j\\)"}</MathJax> is,
            </p>
            <div className="displayLatex">
                <MathJax>{`\\[\\frac{\\partial z^{(i)}}{w_j}=\\frac{\\partial}{\\partial w_j}(w^\\top x^{(i)})=x^{(i)}_j\\]`}</MathJax>
            </div>

            <p>Combining all the derivatives for the cost function,</p>
            <div className="displayLatex">
                <MathJax>{`\\[\\begin{align*}
    \\frac{\\partial J(w)}{\\partial w_j}
    &=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\frac{\\hat{y}^{(i)}-y^{(i)}}{\\hat{y}^{(i)}(1-\\hat{y}^{(i)})}\\right)\\cdot\\hat{y}^{(i)}(1-\\hat{y}^{(i)})\\cdot x^{(i)}_j\\\\
    &=\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)}-y^{(i)}\\right)\\cdot x^{(i)}_j
    \\end{align*}\\]`}</MathJax>
            </div>
        </StaticLatexSection>
    </div>
);
