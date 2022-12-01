import { MathJax } from "better-react-mathjax";

export const ArchitectureNotationSection = () => {
    return (
        <div>
            <p>
                The architecture of a deep neural network is composed of{" "}
                <em>layers</em> of neurons. Let{" "}
                <MathJax inline>{"\\(l\\in[0,\\ldots,L]\\)"}</MathJax> denote
                the index of a particular layer where{" "}
                <MathJax inline>{"\\(l=0\\)"}</MathJax> denotes the{" "}
                <em>input</em> layer and <MathJax inline>{"\\(l=L\\)"}</MathJax>{" "}
                denotes the output layer. The{" "}
                <MathJax inline>{"\\(l\\)"}</MathJax>-lth layer is denoted to
                have <MathJax inline>{"\\(n_{l}\\)"}</MathJax> neurons. The{" "}
                <em>hidden</em> layers represent layers{" "}
                <MathJax inline>{"\\(l\\in[1,\\ldots,L-1]\\)"}</MathJax>.
            </p>
            <p>
                The activations of all neurons in a layer are denoted by{" "}
                <MathJax inline>{"\\(a^{[l]}\\in\\mathbb{R}^{n_l}\\)"}</MathJax>
                . individual neurons are denoted as{" "}
                <MathJax inline>{"\\(a_j^{[l]}\\)"}</MathJax> where{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n_{l}]\\)"}</MathJax>.
            </p>
            <p>
                The connections of neurons are described by the
                <em>weight matrix</em>{" "}
                <MathJax inline>
                    {"\\(w^{[l]}\\in\\mathbb{R}^{n_{l}\\times n_{l+1}}\\)"}
                </MathJax>
                , where <MathJax inline>{"\\(w^{(l)}_{j,k}\\)"}</MathJax>{" "}
                denotes the connection of the{" "}
                <MathJax inline>{"\\(j\\)"}</MathJax>-th neuron for{" "}
                <MathJax inline>{"\\(j\\in[1,\\ldots,n_l]\\)"}</MathJax>, the
                previous layer, to the <MathJax inline>{"\\(k\\)"}</MathJax>-th
                neuron for{" "}
                <MathJax inline>{"\\(k\\in[1,\\ldots,n_{l+1}]\\)"}</MathJax>,
                the next layer. The bias is also a vector,{" "}
                <MathJax inline>{"\\(b\\in\\mathbb{R}^{n_{l+1}}\\)"}</MathJax>.
            </p>

            <p>
                The activation of a layer <MathJax inline>{"\\(l\\)"}</MathJax>{" "}
                is computed as the output of the activation function{" "}
                <MathJax inline>{"\\(g(z^{[l]})\\)"}</MathJax> whose input{" "}
                <MathJax inline>{"\\(z^{[l]}\\)"}</MathJax> is a linear
                combination of the activations of the previous layer with the
                weights <MathJax inline>{"\\(w^{[l]}\\)"}</MathJax>, i.e,
            </p>

            <div className="displayLatex">
                <MathJax>{`\\[z^{[l]}=w^\\top a^{[l-1]}+b\\quad\\text{and}\\quad a^{[l]}=g(z^{[l]})\\]`}</MathJax>
            </div>
        </div>
    );
};
