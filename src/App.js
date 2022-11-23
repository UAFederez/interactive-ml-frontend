import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LinearRegressionUni from "./routes/articles/LinearRegressionUni/LinearRegressionUni";
import Navbar from "./components/Navbar/Navbar";
import { MathJaxContext } from "better-react-mathjax";
import LandingPage from "./routes/LandingPage/LandingPage";

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
                    </Route>
                </Routes>
            </BrowserRouter>
        </MathJaxContext>
    );
}

export default App;
