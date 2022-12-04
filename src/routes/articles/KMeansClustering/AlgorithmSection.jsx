import { MathJax } from "better-react-mathjax";
import { useEffect } from "react";
import StaticLatexSection from "../../../components/StaticLatexSection";

const AlgorithmSection = () => {
    return (
        <StaticLatexSection>
            <ol>
                <li>
                    <p>
                        Randomly initialize{" "}
                        <MathJax inline>{"\\(K\\)"}</MathJax> cluster centroids,
                        denoted as <MathJax inline>{"\\(\\mu_j\\)"}</MathJax>{" "}
                        for{" "}
                        <MathJax inline>{"\\(j\\in[1,\\ldots,K]\\)"}</MathJax>
                    </p>
                </li>

                <li>
                    <p>
                        Compute the distances of each data point. This is
                        typically measured using the Euclidean distance. This
                        can be represented as a distance matrix{" "}
                        <MathJax inline>
                            {"\\(D\\in\\mathbb{R}^{m\\times K}\\)"}
                        </MathJax>{" "}
                        where
                    </p>
                    <MathJax>{`\\[        D_{i,j}=||x^{(i)} - \\mu_j||^2\\]`}</MathJax>
                </li>

                <li>
                    <p>
                        Assign the datapoint to the cluster centroid closest to
                        it, denoted as{" "}
                        <MathJax inline>{"\\(\\mu_{x^{(i)}}\\)"}</MathJax>.
                    </p>
                    <MathJax>{`\\[    \\mu_{x^{(i)}}=\\underset{j}{\\operatorname{arg min}} D_{i,j}=\\underset{j}{\\operatorname{arg min}} ||x^{(i)} - \\mu_j||^2\\]`}</MathJax>
                </li>

                <li>
                    <p>
                        Recompute the new cluster centroid by taking the mean of
                        the data points assigned to it
                    </p>
                </li>

                <li>
                    <p>
                        Repeat step <MathJax inline>{"\\(2\\)"}</MathJax> until{" "}
                        <em>convergence</em>.{" "}
                    </p>
                </li>
            </ol>
        </StaticLatexSection>
    );
};

export default AlgorithmSection;
