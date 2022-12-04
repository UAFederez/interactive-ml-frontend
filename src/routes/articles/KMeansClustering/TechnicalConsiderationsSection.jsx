import { MathJax } from "better-react-mathjax";
import StaticLatexSection from "../../../components/StaticLatexSection";

const TechnicalConsiderationsSection = () => {
    return (
        <div>
            <StaticLatexSection>
                <p>
                    The algorithm for K-means clustering can &mdash; depending
                    on certain logic in the implementation &mdash; run into
                    certain pitfalls that affect the quality of the resulting
                    clusters. While this section is not a comprehensive
                    discussion on the matter, it is an interesting point to
                    consider when implemetning this algorithm.
                </p>
                <h3>Termination</h3>
                <p>
                    Stopping the iterations of updating the cluster centroids
                    can be handled in multiple ways. Two of the most commonly
                    used strategies is either simply to set a hard limit on the
                    number of iterations that must take place. Another common
                    strategy is to stop the iteration when centroids have
                    essentially <em>converged</em> to a particular location.
                    This itself may be identified in multiple ways
                </p>
                <ul>
                    <li>
                        <p>
                            The distance that the centroid has moved from the
                            previous iteration has fallen below a certain
                            threshold.
                        </p>
                    </li>
                    <li>
                        <p>
                            Cluster assignments have not changed between
                            iterations.
                        </p>
                    </li>
                </ul>
                <h3>Empty Clusters</h3>
                <p>
                    One potential pitfall is the scenario wherein a particular
                    centroid has not been assigned any members, i.e, there are
                    no data points whose closest centroid is the one in
                    question. While this is most probably the result of poor
                    initialization there are a few mitigating strategies to use
                    in such an event.
                </p>
                <ul>
                    <li>
                        <p>
                            One of the commonly recommended strategies to avoid
                            such a scenario in the first place lies in the
                            initialization. A common strategy is to initialize
                            the <MathJax inline>{"\\(k\\)"}</MathJax> centroids
                            by sampling <MathJax inline>{"\\(k\\)"}</MathJax>{" "}
                            data points without replacement.
                        </p>
                    </li>
                    <li>
                        <p>
                            One of the simplest strategies is to use a previous
                            state of the centroid in question. Perhaps later
                            iterations can allow for this centroid to find
                            members for a cluster.
                        </p>
                    </li>
                    <li>
                        <p>
                            Perhaps another easy, but not necessarily viable
                            solution is to simply ignore the cluster in
                            question.
                        </p>
                    </li>
                </ul>
            </StaticLatexSection>
        </div>
    );
};

export default TechnicalConsiderationsSection;
