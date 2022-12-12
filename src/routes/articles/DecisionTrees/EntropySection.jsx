import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const EntropySection = (props) => {
  return (
    <div>
      <StaticLatexSection>
        <p>
          In a binary classification task, we consider{" "}
          <MathJax inline>{`\\(X\\)`}</MathJax> to be a random variable{" "}
          <MathJax inline>{`\\(x\\in\\{0,1\\}\\)`}</MathJax> for all outcomes{" "}
          <MathJax inline>{`\\(x\\)`}</MathJax>, sampled from a Bernoulli
          distribution parameterized by the success rate{" "}
          <MathJax inline>{`\\(p\\)`}</MathJax>, i.e.,{" "}
          <MathJax inline>{`\\(X\\sim\\text{Bern}(p)\\)`}</MathJax>. This can be
          expressed as follows.
        </p>
        <MathJax>{`\\[P(x)=p^x\\cdot(1-p)^{1-x}\\]`}</MathJax>
        <p>
          Given the definition of entropy, the entropy of a Bernoulli
          distribution can be modelled as
        </p>
        <MathJax>
          {`\\[\\begin{align*}
            H(x)&=-\\left[\\log\\left(p^x\\cdot(1-p)^{1-x}\\right)\\right]\\\\
            &=-\\left[x\\log(p)+(1-x)\\log({1-p})\\right]
            \\end{align*}
            \\]`}
        </MathJax>
      </StaticLatexSection>
    </div>
  );
};

export default EntropySection;
