import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LinearRegressionUni from "./routes/articles/LinearRegressionUni/LinearRegressionUni";
import Navbar from "./components/Navbar/Navbar";
import { MathJaxContext } from "better-react-mathjax";
import LandingPage from "./routes/LandingPage/LandingPage";
import LinearRegressionMul from "./routes/articles/LinearRegressionMul/LinearRegressionMul";
import LogisticRegression from "./routes/articles/LogisticRegression/LogisticRegression";

function App() {
    return (
        <MathJaxContext>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/">
                        <Route index element={<LandingPage />} />
                        <Route
                            path="linear-regression"
                            element={<LinearRegressionUni />}
                        />
                        <Route
                            path="linear-regression-mul"
                            element={<LinearRegressionMul />}
                        />
                        <Route
                            path="logistic-regression"
                            element={<LogisticRegression />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </MathJaxContext>
    );
}

export default App;
