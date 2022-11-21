import { Link } from "react-router-dom";
import "../styles/nav-style.css";

const Navigation = () => (
    <div className="nav-container">
        <h1 className="logo-text">Interactive ML</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/">About</Link>
                </li>
                <li>
                    <Link to="/">AI Models</Link>
                </li>
            </ul>
        </nav>
    </div>
);

export default Navigation;
