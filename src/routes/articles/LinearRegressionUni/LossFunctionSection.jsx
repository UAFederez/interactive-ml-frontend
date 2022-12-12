import { MathJax } from "better-react-mathjax";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import StaticLatexSection from "../../../components/StaticLatexSection";
import { evalMeanSquaredError } from "../../../utils/linearRegressionUtils";
import { generateRange } from "../../../utils/math";

const LossFunctionSection = (props) => {
    const [testPoints3d, setTestPoints3d] = useState({ x: [], y: [], z: [] });
    const computeLossLandscape = () => {
        const SIZE = 25;
        const test_points = generateRange(-10, 10, SIZE);
        let testPointsX = [];
        let testPointsY = [];
        let testPointsZ = [];
        const loss_values = test_points.map((x_i) => {
            return test_points.map((x_j) => {
                const cost = evalMeanSquaredError([x_i], x_j, props.dataset);
                testPointsX.push(x_i);
                testPointsY.push(x_j);
                testPointsZ.push(cost);

                return cost;
            });
        });

        setTestPoints3d({
            x: testPointsX,
            y: testPointsY,
            z: testPointsZ,
        });

        props.updateLossLandscapeFunc({
            testPoints: test_points,
            lossValues: loss_values,
        });
    };

    useEffect(() => {
        computeLossLandscape();
    }, [props.dataset]);

    return (
        <div>
            <StaticLatexSection>
                <p>
                    It helps to provide a precise measure of how{" "}
                    <em>far off</em> the predicted outputs are from the expected
                    output. This can be formalized as a cost function{" "}
                    <MathJax inline>{"\\(J\\)"}</MathJax>. A useful cost
                    function for linear regression is the{" "}
                    <em>mean squared error</em>,
                </p>

                <MathJax className="displayLatex">
                    {
                        "\\[J(w,b)=\\frac{1}{2m}\\sum_{i=1}^{m}\\left(\\hat{y}^{(i)} - y^{(i)}\\right)^2\\]"
                    }
                </MathJax>

                <p>
                    One of the benefits of the{" "}
                    <MathJax inline>{"\\(\\frac{1}{m}\\)"}</MathJax> is that
                    without it, as <MathJax inline>{"\\(m\\)"}</MathJax> gets
                    larger, the value of the cost function gets larger as well.
                    Therefore it helps to build a cost function that does not
                    change significantly just because the size of the dataset
                    increases. The <MathJax inline>{"\\(2\\)"}</MathJax> in{" "}
                    <MathJax inline>{"\\(2m\\)"}</MathJax> simplifies the
                    calculation of the gradient later on given that the minimum
                    of <MathJax inline>{"\\(f(x)\\)"}</MathJax> is the same as
                    the minimum of{" "}
                    <MathJax inline>{"\\(\\frac{1}{2}f(x)\\)"}</MathJax>. Given
                    the cost function, the goal is to find optimal parameters{" "}
                    <MathJax inline>{"\\(w^*\\)"}</MathJax> and{" "}
                    <MathJax inline>{"\\(b^*\\)"}</MathJax> which minimize{" "}
                    <MathJax inline>{"\\(J(w,b)\\)"}</MathJax>.
                </p>
                <br />
                <p>
                    Take a look at the contour plot of the loss function below.
                    Observe that the plot looks somewhat convex, with the
                    deepest point being wherever the true coefficient and
                    intercept was set above. This is precisely the optimal point
                    to minimize the mean squared error cost function.
                </p>
            </StaticLatexSection>

            <div className="datasetPlot">
                <Plot
                    data={[
                        {
                            opacity: 0.8,
                            color: "rgb(300,100,200)",
                            x: props.lossLandscape.testPoints,
                            y: props.lossLandscape.testPoints,
                            z: props.lossLandscape.lossValues,
                            type: "contour",
                            colorbar: {
                                orientation: "h",
                            },
                            colorscale: "Portland",
                        },
                        {
                            x: [props.dataset.trueBias],
                            y: [props.dataset.trueCoeff],
                            type: "scatter",
                            mode: "markers",
                            name: "True parameters",
                            marker: {
                                color: "#f2f2f2",
                                size: 10,
                                line: { width: 1 },
                            },
                        },
                    ]}
                    layout={{
                        xaxis: {
                            title: { text: "intercept" },
                            range: [-10, 10],
                        },
                        yaxis: {
                            title: { text: "coefficient" },
                            range: [-10, 10],
                        },
                        height: 600,
                        margin: {
                            l: 30,
                            r: 30,
                            t: 60,
                            b: 60,
                        },
                        showlegend: true,
                        legend: {
                            x: 0,
                            xanchor: "left",
                            y: 0,
                            bgcolor: "rgba(255, 255, 255, 0.5)",
                        },
                        autosize: true,
                        title: "Contour plot of the loss function",
                    }}
                    useResizeHandler
                    config={{
                        displayModeBar: false,
                    }}
                />
            </div>
            <p>
                The convex nature of the function itself is more apparent and
                easily visualizable given another 3-dimensional plot as you can
                see below. As before, the <em>lowest</em> point can be
                identified based on the location of the minimum point and is
                based on whatever values you may have set above. Any other{" "}
                <em>guess</em> by the model will incur additional loss.
            </p>
            <div className="datasetPlot">
                <Plot
                    data={[
                        {
                            opacity: 0.8,
                            color: "rgb(300,100,200)",
                            x: testPoints3d.x,
                            y: testPoints3d.y,
                            z: testPoints3d.z,
                            type: "mesh3d",
                            intensity: testPoints3d.z,
                            showscale: false,
                            colorscale: "Portland",
                        },
                        {
                            x: [props.dataset.trueBias],
                            y: [props.dataset.trueCoeff],
                            z: [
                                evalMeanSquaredError(
                                    [props.dataset.trueCoeff],
                                    props.dataset.trueBias,
                                    props.dataset
                                ),
                            ],
                            type: "scatter3d",
                            mode: "markers",
                            name: "True parameters",
                            marker: {
                                color: "#f2f2f2",
                                size: 5,
                                line: { width: 1 },
                            },
                        },
                    ]}
                    layout={{
                        xaxis: {
                            title: { text: "intercept" },
                            range: [-10, 10],
                        },
                        yaxis: {
                            title: { text: "coefficient" },
                            range: [-10, 10],
                        },
                        height: 600,
                        margin: {
                            l: 30,
                            r: 30,
                            t: 60,
                            b: 60,
                        },
                        showlegend: true,
                        legend: {
                            x: 0,
                            xanchor: "left",
                            y: 0,
                            bgcolor: "rgba(255, 255, 255, 0.5)",
                        },
                        autosize: true,
                        title: "3D mesh plot of the loss function",
                    }}
                    useResizeHandler
                    config={{
                        displayModeBar: false,
                    }}
                />
            </div>
        </div>
    );
};

export default LossFunctionSection;
