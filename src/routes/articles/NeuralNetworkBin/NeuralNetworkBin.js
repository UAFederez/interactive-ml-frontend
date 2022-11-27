import { MathJax } from "better-react-mathjax";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";

export default class NeuralNetworkBinary extends React.Component {
    state = {};
    render() {
        return (
            <main>
                {/** Header */}
                <div className="container article-header">
                    <div>
                        <Link to="/">
                            <p className="back">&#8249; Back</p>
                        </Link>
                    </div>
                    <h1 className="title">
                        Neural Networks for Binary Classification
                    </h1>
                </div>

                <div className="container article">
                    <div className="content">
                        {/** Dataset Section -- Content */}
                        <div className="section" id="dataset">
                            <h2>Dataset</h2>
                            <span className="lead">
                                Experiment with the values below to generate a
                                dataset.
                            </span>
                        </div>

                        {/** Dataset Section -- Content */}
                        <div className="section" id="dataset">
                            <h2>Background</h2>
                            <p>
                                The fundamental building block of neural
                                networks are <em>neurons</em> or layers of
                                neurons which allow for deep-layer architectures
                                to learn complex functions associated with more
                                complex data. A neuron is essentially a unit
                                which computes and learns the optimal parameters
                                for an <em>activation function</em> in such a
                                way so as to minimize the total loss of the
                                network as a whole given the dataset. This
                                demonstrates an application of simple
                                feedforward neural networks.
                            </p>
                        </div>

                        <div className="section" id="archi-notation">
                            <h2>Architecture and Notation</h2>
                            <p>
                                The architecture of a deep neural network is
                                composed of <em>layers</em> of neurons. Let{" "}
                                <MathJax inline>
                                    {"\\(l\\in[0,\\ldots,L]\\)"}
                                </MathJax>{" "}
                                denote the index of a particular layer where{" "}
                                <MathJax inline>{"\\(l=0\\)"}</MathJax> denotes
                                the <em>input</em> layer and{" "}
                                <MathJax inline>{"\\(l=L\\)"}</MathJax> denotes
                                the output layer. The{" "}
                                <MathJax inline>{"\\(l\\)"}</MathJax>-lth layer
                                is denoted to have{" "}
                                <MathJax inline>{"\\(n_{l}\\)"}</MathJax>{" "}
                                neurons. The <em>hidden</em> layers represent
                                layers{" "}
                                <MathJax inline>
                                    {"\\(l\\in[1,\\ldots,L-1]\\)"}
                                </MathJax>
                                .
                            </p>
                            <p>
                                The activations of all neurons in a layer are
                                denoted by{" "}
                                <MathJax inline>
                                    {"\\(a^{[l]}\\in\\mathbb{R}^{n_l}\\)"}
                                </MathJax>
                                . individual neurons are denoted as{" "}
                                <MathJax inline>{"\\(a_j^{[l]}\\)"}</MathJax>{" "}
                                where{" "}
                                <MathJax inline>
                                    {"\\(j\\in[1,\\ldots,n_{l}]\\)"}
                                </MathJax>
                                .
                            </p>
                            <p>
                                The connections of neurons are described by the
                                <em>weight matrix</em>{" "}
                                <MathJax inline>
                                    {
                                        "\\(w^{[l]}\\in\\mathbb{R}^{n_{l}\\times n_{l+1}}\\)"
                                    }
                                </MathJax>
                                , where{" "}
                                <MathJax inline>
                                    {"\\(w^{(l)}_{j,k}\\)"}
                                </MathJax>{" "}
                                denotes the connection of the{" "}
                                <MathJax inline>{"\\(j\\)"}</MathJax>-th neuron
                                for{" "}
                                <MathJax inline>
                                    {"\\(j\\in[1,\\ldots,n_l]\\)"}
                                </MathJax>
                                , the previous layer, to the{" "}
                                <MathJax inline>{"\\(k\\)"}</MathJax>-th neuron
                                for{" "}
                                <MathJax inline>
                                    {"\\(k\\in[1,\\ldots,n_{l+1}]\\)"}
                                </MathJax>
                                , the next layer. The bias is also a vector,{" "}
                                <MathJax inline>
                                    {"\\(b\\in\\mathbb{R}^{n_{l+1}}\\)"}
                                </MathJax>
                                .
                            </p>

                            <p>
                                The activation of a layer{" "}
                                <MathJax inline>{"\\(l\\)"}</MathJax> is
                                computed as the output of the activation
                                function{" "}
                                <MathJax inline>{"\\(g(z^{[l]})\\)"}</MathJax>{" "}
                                whose input{" "}
                                <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax> is a
                                linear combination of the activations of the
                                previous layer with the weights{" "}
                                <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax>,
                                i.e,
                            </p>

                            <div className="display-latex">
                                <MathJax>{`\\[z^{[l]}=w^\\top a^{[l-1]}+b\\quad\\text{and}\\quad a^{[l]}=g(z^{[l]})\\]`}</MathJax>
                            </div>
                        </div>

                        <div className="section" id="activation-func">
                            <h2>Activation Function</h2>
                            <p>
                                The activation function{" "}
                                <MathJax inline>{"\\(g(z)\\)"}</MathJax> for
                                neural networks represents a nonlinear output or
                                signal from a neuron given it's inputs. Common
                                choices for these activation functions vary
                                depending on the application but the ones
                                typically used for the hidden layers are the{" "}
                                <strong>ReLU</strong>, denoted as{" "}
                                <MathJax inline>
                                    {"\\(\\text{ReLU}(z)\\)"}
                                </MathJax>{" "}
                                and <strong>sigmoid</strong>, denoted here as{" "}
                                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax>
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\text{ReLU}(z)=\\max(0,z)\\quad\\text{and}\\quad\\sigma(z)=\\frac{1}{1+e^{-z}}\\]`}</MathJax>
                            </div>
                            <p>
                                But why must the activation function be
                                nonlinear in the first place? Suppose that the
                                activation function <em>was</em> linear, e.g.,
                                the identity function, simply the output of{" "}
                                <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax>. The
                                bias vector is removed for simplification.
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[a^{[l]}=z^{[l]}=w^{[l]\\top}a^{[l-1]}\\]`}</MathJax>
                            </div>
                            <p>
                                Note that{" "}
                                <MathJax inline>{"\\(a^{[l-1]}\\)"}</MathJax>{" "}
                                can then be expanded as,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
    a^{[l]}
    &=w^{[l]\\top}\\left(w^{[l-1]\\top}a^{[l-2]}\\right)\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top})a^{[l-2]}\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top})\\left(w^{[l-2]\\top}a^{[l-3]}\\right)\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top}w^{[l-2]\\top})a^{[l-3]}\\\\
    &=(w^{[l]\\top}w^{[l-1]\\top}w^{[l-2]\\top}\\ldots w^{[1]\\top})a^{[0]}
    \\end{align*}\\]`}</MathJax>
                            </div>
                            <p>
                                The entire model reduces down to a linear
                                function of the input activation{" "}
                                <MathJax inline>{"\\(a^{[0]}\\)"}</MathJax>,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[a^{[L]}=Wa^{[0]}\\]`}</MathJax>
                            </div>
                            <p>
                                Where <MathJax inline>{"\\(W\\)"}</MathJax> is
                                the product of all the matrices,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[W=\\left(w^{[L]\\top}w^{[L-1]\\top}w^{[L-2]\\top}\\ldots w^{[1]\\top}\\right)\\]`}</MathJax>
                            </div>
                            <p>
                                This removes any ability for the model to learn
                                more complex nonlinear relationships as seen in
                                real-world data as the underlying assumption
                                that the model makes is that the data can be
                                represented as a linear function of the inputs.
                            </p>

                            <p>
                                It is also useful later on to determine the
                                derivatives of the activation functions such as{" "}
                                <MathJax inline>{"\\(\\sigma(z)\\)"}</MathJax>{" "}
                                and{" "}
                                <MathJax inline>
                                    {"\\(\\text{ReLU}(z)\\)"}
                                </MathJax>
                                . As previously shown, the derivative of the
                                logistic or sigmoid function is,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{d\\sigma(z)}{dz}=\\sigma(z)\\left(1-\\sigma(z)\\right)\\]`}</MathJax>
                            </div>

                            <p>
                                On the other hand, to find the derivative of{" "}
                                <MathJax inline>
                                    {"\\(\\text{ReLU}(z)\\)"}
                                </MathJax>
                                , it helps to consider its definition as a
                                piecewise function
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\text{ReLU}(z)=\\begin{cases}
        0 & z \\leq 0 \\\\
        x & z > 0
    \\end{cases}\\]`}</MathJax>
                            </div>
                            <p>
                                This provides the definition of the derivative
                                of{" "}
                                <MathJax inline>
                                    {"\\(\\text{ReLU}(z)\\)"}
                                </MathJax>
                                , noting that since the derivatives do not
                                approach the same value from both sides as{" "}
                                <MathJax inline>{"\\(z\\to 0\\)"}</MathJax>,
                                then the derivative of{" "}
                                <MathJax inline>
                                    {"\\(\\text{ReLU}(z)\\)"}
                                </MathJax>{" "}
                                at <MathJax inline>{"\\(z=0\\)"}</MathJax> is{" "}
                                <MathJax inline>
                                    {"\\(\\text{undefined}\\)"}
                                </MathJax>
                                . In practice, this is very rare and many
                                software implementations typically define it
                                arbitrarily such as{" "}
                                <MathJax inline>{"\\(0\\)"}</MathJax> or{" "}
                                <MathJax inline>{"\\(1\\)"}</MathJax>.
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\frac{d\\text{ReLU}(z)}{dz}=\\begin{cases}
        0 & z < 0 \\\\
        1 & z > 0 \\\\
        \\text{undefined} & z = 0
    \\end{cases}\\]`}</MathJax>
                            </div>
                        </div>

                        <div className="section" id="forward-prop">
                            <h2>Forward Propagation</h2>

                            <p>
                                The forward propagation phase is simply carrying
                                out the sequential output of the network given
                                its current configurations of parameters{" "}
                                <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> and{" "}
                                <MathJax inline>{"\\(b^{[l]}\\)"}</MathJax>
                            </p>

                            <div className="display-latex">
                                <MathJax>
                                    {`\\[    \\begin{align*}
                                    z^{[1]}&=w^{[1]\\top}a^{[0]}+b^{[1]}\\\\
                                    a^{[1]}&=g(z^{[1]})\\\\
                                    z^{[2]}&=w^{[2]\\top}a^{[1]}+b^{[2]}\\\\
                                    a^{[2]}&=g(z^{[2]})\\\\
                                    z^{[3]}&=w^{[3]\\top}a^{[2]}+b^{[3]}\\\\
                                    a^{[3]}&=g(z^{[3]})\\\\
                                    &\\vdots\\\\
                                    z^{[L]}&=w^{[L]\\top}a^{[L-1]}+b^{[L]}\\\\
                                    a^{[L]}&=g(z^{[L]})
                                    \\end{align*}\\]`}
                                </MathJax>
                            </div>

                            <p>
                                In a supervised learning task, the outputs of
                                the final layer{" "}
                                <MathJax inline>{"\\(a^{[L]}\\)"}</MathJax>{" "}
                                would then represent the predicted value{" "}
                                <MathJax inline>{"\\(\\hat{y}\\)"}</MathJax> and
                                carrying out the learning process requires
                                finding out the cost given the current
                                parameters on the training set.
                            </p>

                            <p>
                                Similar to before, the model learns the optimal
                                parameters{" "}
                                <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> and{" "}
                                <MathJax inline>{"\\(b^{[l]}\\)"}</MathJax> so
                                as to minimize the cost function{" "}
                                <MathJax inline>
                                    {
                                        "\\(J(w^{[0]},b^{[0]},w^{[1]},b^{[1]},\\ldots)\\)"
                                    }
                                </MathJax>
                                , where all parameters will be denoted simply as{" "}
                                <MathJax inline>{"\\(J(W)\\)"}</MathJax>. The
                                optimal parameters are denoted as{" "}
                                <MathJax inline>{"\\(W^*\\)"}</MathJax>. In a
                                supervised learning model, this can still be
                                defined similar to before.
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    W^{*}=\\min_{W}J(W)=\\min_{W}\\frac{1}{m}\\sum_{i=1}^{m}L(\\hat{y}^{(i)},y^{(i)})\\]`}</MathJax>
                            </div>

                            <p>
                                The loss function{" "}
                                <MathJax inline>
                                    {"\\(L(\\hat{y}^{(i)},y^{(i)})\\)"}
                                </MathJax>{" "}
                                still depends on the problem, but for this case,
                                the binary classification task necessitates the
                                use of the binary cross-entropy loss
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    L(\\hat{y}^{(i)},y^{(i)})=-\\left(y^{(i)}\\log(\\hat{y}^{(i)})+(1-y^{(i)})\\log(1-\\hat{y}^{(i)}\\right)\\]`}</MathJax>
                            </div>
                            <p>
                                The algorithm for training remains similar to
                                before. But for neural networks, it is necessary
                                to carry out <em>gradient descent</em> with{" "}
                                <em>backpropagation</em>.
                            </p>
                        </div>

                        <div className="section" id="backprop">
                            <h2>Backpropagation</h2>
                            <p>
                                After the cost is computed it comes necessary to
                                compute the gradients of the cost w.r.t the
                                parameters{" "}
                                <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> and{" "}
                                <MathJax inline>{"\\(b^{[l]}\\)"}</MathJax> for
                                all{" "}
                                <MathJax inline>
                                    {"\\(l\\in[1,\\ldots,L]\\)"}
                                </MathJax>
                                .{" "}
                            </p>

                            <p>
                                The idea behind backpropagation is that the
                                gradients are computed starting from the outputs
                                of the last layer{" "}
                                <MathJax inline>{"\\(l=L\\)"}</MathJax>, after
                                which gradients are propagated backwards. It is
                                necessary to calculate and propagate backwards
                                because of the <em>chain rule</em>.{" "}
                            </p>

                            <p>
                                In order to simplify the calculations,
                                subsequent derivations calculated the gradient
                                of the <em>loss</em> of any training example. As
                                an example, given a particular weight{" "}
                                <MathJax inline>
                                    {"\\(w^{[l]}_{j,k}\\)"}
                                </MathJax>
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\nabla_{w^{[l]}_{j,k}}L(\\hat{y}^{(i)},y^{(i)})\\\\
    =\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial w^{[l]}_{j,k}}\\\\
    =\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_k}\\cdot\\frac{\\partial a^{[l]}_k}{\\partial w^{[l]}_{j,k}}\\]`}</MathJax>
                            </div>

                            <p>
                                The first factor is a component of{" "}
                                <MathJax inline>
                                    {
                                        "\\(\\frac{\\partial J(W)}{\\partial a^{[l]}}\\)"
                                    }
                                </MathJax>
                                , the <em>gradient</em> propagated backwards
                                from layers that come after layer{" "}
                                <MathJax inline>{"\\(l\\)"}</MathJax>. In order
                                to simplify the calculations of the gradient,
                                the aforementioned <em>upstream</em> gradient
                                will be denoted as
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\delta^{[l]}=\\nabla_{a^{[l]}}L(\\hat{y}^{(i)},y^{(i)})
    =\\begin{bmatrix}
        \\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_1}, & \\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_2}, & \\dots, & \\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial a^{[l]}_{n_l}}
    \\end{bmatrix}^\\top\\]`}</MathJax>
                            </div>
                            <p>
                                Note that since{" "}
                                <MathJax inline>{"\\(a^{[l]}_k\\)"}</MathJax>{" "}
                                can affect the activations of all other neurons
                                in layer <MathJax inline>{"\\(l+1\\)"}</MathJax>
                                , a complete definition of{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[l]}_k\\)"}
                                </MathJax>{" "}
                                is
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\begin{align*}
    \\delta^{[l]}_k
    &=\\sum_{j=1}^{n_{l+1}}\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{a^{[l+1]}_j}\\cdot\\frac{\\partial a^{[l+1]}_j}{a^{[l]}_k}\\\\
    &=\\sum_{j=1}^{n_{l+1}}\\delta^{[l+1]}_j\\cdot\\frac{\\partial a^{[l+1]}_j}{a^{[l]}_k}\\\\
    \\end{align*}\\]`}</MathJax>
                            </div>

                            <p>
                                A particular weight{" "}
                                <MathJax inline>
                                    {"\\(w^{[l]}_{j,k}\\)"}
                                </MathJax>
                                , the gradient of the loss w.r.t such weight was
                                previously defined as,
                            </p>
                            <div className="display-latex">
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
                            <div className="display-latex">
                                <MathJax>{`\\[z^{[l]}_k=w^{[l]}_{1,1}a^{[l-1]}_1+\\dots+w^{[l]}_{j,k}a^{[l-1]}_j+\\dots+b_k\\]`}</MathJax>
                            </div>

                            <p>
                                Thus the partial of{" "}
                                <MathJax inline>{"\\(z^{[l]}_k\\)"}</MathJax>{" "}
                                w.r.t{" "}
                                <MathJax inline>
                                    {"\\(w^{[l]}_{j,k}\\)"}
                                </MathJax>
                                ,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial z^{[l]}_k}{\\partial w^{[l]}_{j,k}}=a^{[l-1]}_j\\]`}</MathJax>
                            </div>
                            <p>
                                This holds for any{" "}
                                <MathJax inline>
                                    {"\\(k\\in[1,\\ldots,n_{l}]\\)"}
                                </MathJax>
                                , thus the gradient of{" "}
                                <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax>{" "}
                                w.r.t{" "}
                                <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax> can
                                be determined by carrying out the rest of the
                                calculation of the partial derivatives,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\nabla_{w^{[l]}}z^{[l]}
    =\\begin{bmatrix}
        a^{[l-1]}_1 & \\dots & a^{[l-1]}_1 \\\\
        \\vdots & \\ddots & \\vdots \\\\
        a^{[l-1]}_{n_{l-1}} & \\dots & a^{[l-1]}_{n_{l-1}} \\\\
    \\end{bmatrix}\\]`}</MathJax>
                            </div>
                            <p>
                                The gradient of{" "}
                                <MathJax inline>{"\\(a^{[l]}\\)"}</MathJax>{" "}
                                w.r.t{" "}
                                <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax> is
                                essentially the derivative of the respective
                                activation function{" "}
                                <MathJax inline>{"\\(g'(z^{[l]})\\)"}</MathJax>
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\nabla_{z^{[l]}}a^{[l]}
    =g'(z^{[l]})=\\begin{bmatrix}g'(z^{[l]}_1), & \\dots, & g'(z^{[l]}_{n_l})\\end{bmatrix}^\\top\\]`}</MathJax>
                            </div>
                            <p>
                                Thus the gradient of the loss w.r.t the weight
                                becomes{" "}
                                <MathJax inline>
                                    {"\\(w^{[l]}_{j,k}\\)"}
                                </MathJax>
                                ,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial w^{[l]}_{j,k}}
    =\\delta^{[l]}_k\\cdot g'(z^{[l]}_k)\\cdot a^{[l-1]}_j\\]`}</MathJax>
                            </div>
                            <p>
                                Likewise, the gradient of the loss w.r.t the
                                bias{" "}
                                <MathJax inline>{"\\(b^{[l]}_k\\)"}</MathJax> is
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial L(\\hat{y}^{(i)},y^{(i)})}{\\partial b^{[l]}_k}
    =\\delta^{[l]}_k\\cdot g'(z^{[l]}_k)\\]`}</MathJax>
                            </div>

                            <p>
                                It is also important to find the gradient of the
                                loss w.r.t the <em>activations</em> of the
                                previous layer, i.e,{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[l-1]}\\)"}
                                </MathJax>{" "}
                                as this is necessary for the backpropagation.
                            </p>
                            <div className="display-latex">
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
                            <div className="display-latex">
                                <MathJax>{`\\[z^{[l]}_k=w^{[l]}_{1,1}a^{[l-1]}_1+\\dots+w^{[l]}_{j,k}a^{[l-1]}_j+\\dots+b_k\\]`}</MathJax>
                            </div>

                            <p>
                                Thus the partial of{" "}
                                <MathJax inline>{"\\(z^{[l]}_k\\)"}</MathJax>{" "}
                                w.r.t to an activation{" "}
                                <MathJax inline>{"\\(a^{[l-1]}_j\\)"}</MathJax>{" "}
                                is,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\frac{\\partial z^{[l]}_k}{\\partial a^{[l-1]}_k}=w^{[l]}_{j,k}\\]`}</MathJax>
                            </div>

                            <p>
                                And{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[l-1]}_j\\)"}
                                </MathJax>{" "}
                                for{" "}
                                <MathJax inline>
                                    {"\\(j\\in[1,\\dots,n_{l-1}]\\)"}
                                </MathJax>{" "}
                                becomes
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[\\delta^{[l-1]}_j=\\sum_{k=1}^{n_l}\\delta^{[l]}_k\\cdot g'(z^{[l]}_k)\\cdot w^{[l]}_{j,k}\\]`}</MathJax>
                            </div>
                        </div>

                        <div className="section" id="vectorized-impl">
                            <h2>Vectorized Implementation</h2>

                            <p>
                                As before, it is more efficient to carry out a
                                vectorized implementation as opposed to solely
                                relying on loops. While it is not possible to
                                vectorize across multiple layers given the
                                presence of the nonlinear activation function,
                                it is possible to compute all of the activations
                                of neurons on the <em>entire training set</em>{" "}
                                for a particular layer.
                            </p>
                            <p>
                                Let{" "}
                                <MathJax inline>
                                    {
                                        "\\(A^{[0]}\\in\\mathbb{R}^{n\\times m}\\)"
                                    }
                                </MathJax>{" "}
                                be the design matrix containing all of the{" "}
                                <MathJax inline>{"\\(m\\)"}</MathJax> training
                                examples, each with{" "}
                                <MathJax inline>{"\\(n\\)"}</MathJax> input
                                features. The weight matrix for a particular
                                layer{" "}
                                <MathJax inline>
                                    {
                                        "\\(w^{[l]}\\in\\mathbb{R}^{n_l\\times n_{l+1}}\\)"
                                    }
                                </MathJax>{" "}
                                is defined similarly to before. The dummy
                                feature would not be used for now as it requires
                                an additional row of{" "}
                                <MathJax inline>{"\\(1\\)"}</MathJax>'s to each
                                layer for every layer computation.
                            </p>
                            <div className="display-latex">
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
                                The linear combinations of all the inputs in a
                                particular layer{" "}
                                <MathJax inline>{"\\(l\\)"}</MathJax> with the
                                weights, denoted by{" "}
                                <MathJax inline>{"\\(Z^{[l]}\\)"}</MathJax>, and
                                the subsequent activations of the neurons,
                                denoted as{" "}
                                <MathJax inline>{"\\(A^{[l]}\\)"}</MathJax> for
                                all training examples can then be calculated as
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\begin{align*}
    Z^{[l]}&=w^{[l]\\top}A^{[l-1]}+b^{[l]}\\\\
    A^{[l]}&=g(Z^{[l]})
    \\end{align*}\\]`}</MathJax>
                            </div>
                            <p>
                                The activations of the output layer{" "}
                                <MathJax inline>{"\\(A^{[L]}\\)"}</MathJax> can
                                then be used to calculate the loss given the{" "}
                                <MathJax inline>{"\\(Y\\)"}</MathJax> matrix,{" "}
                                <MathJax inline>
                                    {"\\(L(A^{[L]}, Y)\\)"}
                                </MathJax>
                                . After which{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[L]}\\)"}
                                </MathJax>{" "}
                                can then be computed. Both these computations
                                will vary depending on the loss function,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\delta^{[L]}=\\frac{\\partial L\\left(A^{[L]}, Y\\right)}{\\partial A^{[L]}}\\]`}</MathJax>
                            </div>
                            <p>
                                Note that because{" "}
                                <MathJax inline>{"\\(A^{[L]}\\)"}</MathJax> and{" "}
                                <MathJax inline>{"\\(Y\\)"}</MathJax> are both
                                matrices in{" "}
                                <MathJax inline>
                                    {"\\(\\mathbb{R}^{n_L\\times m}\\)"}
                                </MathJax>
                                , the same is true for{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[L]}\\)"}
                                </MathJax>
                            </p>
                            <p>
                                The gradients of the activation function,{" "}
                                <MathJax inline>{"\\(g'(Z^{[l]})\\)"}</MathJax>,
                                and{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[l]}\\)"}
                                </MathJax>{" "}
                                being defined as follows,
                            </p>
                            <div className="display-latex">
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
                                Taking the element-wise product leads to the
                                resulting matrix in still{" "}
                                <MathJax inline>
                                    {"\\(\\mathbb{R}^{n_l\\times m}\\)"}
                                </MathJax>{" "}
                                since both are only multiplied element-wise,
                            </p>
                            <div className="display-latex">
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
                                    {
                                        "\\(A^{[l-1]}\\in\\mathbb{R}^{n_{l-1}\\times m}\\)"
                                    }
                                </MathJax>{" "}
                                is defined as,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    A^{[l-1]}
    =\\begin{bmatrix}
    a^{[l-1]}_{1,1}, & \\dots & a^{[l-1]}_{1,m} \\\\
    \\vdots & \\ddots & \\vdots \\\\
    a^{[l-1]}_{n_{l-1},1}, & \\dots & a^{[l-1]}_{n_{l-1},m} \\\\
    \\end{bmatrix}\\]`}</MathJax>
                            </div>
                            <p>
                                The gradient of the <em>cost</em> (since the
                                matrices already include all training samples)
                                w.r.t the weights can then be calculated as
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\nabla_{w^{[l]}}J(W)=\\frac{A^{[l-1]}\\left(g'(Z^{[l]})\\odot\\delta^{[l]}\\right)^\\top}{m}\\]`}</MathJax>
                            </div>
                            <p>
                                To see that this is valid, note that each
                                component of this gradient is defined as
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\nabla_{w^{[l]}}J(W)_{j,k}=\\frac{1}{m}\\sum_{i=1}^{m}\\delta^{[l-1]}_{k,i}\\cdot g'(z^{[l-1]}_{k,i})\\cdot a^{[l-1]}_{j,i}\\]`}</MathJax>
                            </div>
                            <h3>Calculating the gradients for layer biases</h3>
                            <p>
                                Likewise, the gradient of the cost w.r.t the
                                bias{" "}
                                <MathJax inline>
                                    {
                                        "\\(\\nabla_{b^{[l]}}J(W)\\in\\mathbb{R}^{n_l}\\)"
                                    }
                                </MathJax>{" "}
                                is simply the <strong>mean</strong> of{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[l]}\\odot g'(Z^{[l]})\\)"}
                                </MathJax>{" "}
                                along its <strong>rows</strong>, i.e,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\quad\\nabla_{b^{[l]}}J(W)_k
    =\\frac{1}{m}\\sum_{i=1}^{m}\\left(\\delta^{[l]}\\odot g'(Z^{[l]})\\right)_{k,i}\\]`}</MathJax>
                            </div>
                            <h3>
                                Calculating the gradients for subsequent
                                backpropagation
                            </h3>

                            <p>
                                For the gradients to be passed to the previous
                                layer for backpropagation, recall the definition
                                of{" "}
                                <MathJax inline>
                                    {
                                        "\\(w^{[l]}\\in\\mathbb{R}^{n_{l-1}\\times n_l}\\)"
                                    }
                                </MathJax>
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    w^{[l]}
    =\\begin{bmatrix}
    w^{[l]}_{1, 1}, & \\dots & w^{[l]}_{1, n_l} \\\\
    \\vdots & \\ddots & \\vdots \\\\
    w^{[l]}_{n_{l-1}, 1}, & \\dots & w^{[l]}_{n_{l-1}, n_l}
    \\end{bmatrix}\\]`}</MathJax>
                            </div>
                            <p>
                                The gradients for the previous layer can then be
                                calculated as{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[l-1]}\\)"}
                                </MathJax>
                                ,
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\delta^{[l-1]}=w^{[l]}\\left(\\delta^{[l]}\\odot g'(Z^{[l]})\\right)\\]`}</MathJax>
                            </div>
                            <p>
                                To see that this is valid, note that each
                                element{" "}
                                <MathJax inline>
                                    {"\\(\\delta^{[l-1]}_{j,i}\\)"}
                                </MathJax>{" "}
                                for{" "}
                                <MathJax inline>
                                    {"\\(j\\in[1,\\ldots,n_l]\\)"}
                                </MathJax>{" "}
                                and{" "}
                                <MathJax inline>
                                    {"\\(i\\in[1,\\ldots,m]\\)"}
                                </MathJax>{" "}
                                is defined as
                            </p>
                            <div className="display-latex">
                                <MathJax>{`\\[    \\delta^{[l-1]}_{j,i}=\\sum_{k=1}^{n_{l}}\\delta^{[l]}_{k,i}\\cdot g'(z^{[l]}_{k,i})\\cdot w^{[l]}_{j,k}\\]`}</MathJax>
                            </div>
                        </div>
                    </div>

                    <div className="bookmarks-container">
                        <div className="bookmarks">
                            <p className="bookmark-title">In this article</p>
                            <ul>
                                <li>
                                    <a href="#dataset">
                                        <p>Dataset</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#archi-notation">
                                        <p>Architecture and Notation</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#activation-func">
                                        <p>Activation Function</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#forward-prop">
                                        <p>Forward Propagation</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#backprop">
                                        <p>Backpropagation</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#vectorized-impl">
                                        <p>Vectorized Implementation</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }
}
