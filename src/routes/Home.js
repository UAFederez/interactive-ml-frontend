import React from "react";
import { Link } from "react-router-dom";
import "./../styles/landing-page-styles.css";

export default class Home extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="hero-container">
                    <div className="hero-content">
                        <Link to="/linear-regression">Linear Regression</Link>
                    </div>
                </div>
            </div>
        );
    }
}
