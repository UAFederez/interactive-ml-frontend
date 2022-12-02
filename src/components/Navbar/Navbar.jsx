import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [isVisible, setVisible] = useState(false);
    const links = [
        { text: "Home", to: "/" },
        { text: "About", to: "/" },
        { text: "Contact", to: "/" },
    ];
    return (
        <div className={styles.navContainer}>
            <div>
                <span className={styles.navLogo}>
                    Interactive Machine Learning
                </span>
                <button
                    className={styles.menuBtn}
                    onClick={() => {
                        setVisible((vis) => {
                            if (!vis) {
                                document.body.classList.add("no-scroll-y");
                            } else {
                                document.body.classList.remove("no-scroll-y");
                            }
                            return !vis;
                        });
                    }}
                >
                    <svg
                        className={styles.hamburger}
                        viewBox="0 0 100 100"
                        width="32"
                    >
                        <rect
                            className=""
                            width="75"
                            height="8"
                            x="15"
                            y="25"
                            fill="#2f2f2f"
                        ></rect>
                        <rect
                            className=""
                            width="75"
                            height="8"
                            x="15"
                            y="50"
                            fill="#2f2f2f"
                        ></rect>
                        <rect
                            className=""
                            width="75"
                            height="8"
                            x="15"
                            y="75"
                            fill="#2f2f2f"
                        ></rect>
                    </svg>
                </button>
            </div>
            <nav className={styles.navDesktop}>
                <ul>
                    {links.map((link) => (
                        <li key={link.text}>
                            <Link to={link.to}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <nav
                className={`${isVisible ? styles.navVis : styles.navHidden} ${
                    styles.navMobile
                }`}
            >
                <ul>
                    {links.map((link) => (
                        <li key={link.text}>
                            <Link to={link.to}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
