import "./App.css";
import Home from "./routes/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LinearRegression from "./routes/model-pages/LinearRegression";
import Navigation from "./components/Navigation";
import { MathJaxContext } from "better-react-mathjax";

function App() {
    return (
        <MathJaxContext>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route
                            path="linear-regression"
                            element={<LinearRegression />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </MathJaxContext>
    );
}

export default App;
