import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [isVisible, setVisible] = useState(false);
    const links = [
        { text: "Home", to: "/" },
        { text: "About", to: "/" },
        { text: "Articles", to: "/" },
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
                    onClick={() => setVisible(!isVisible)}
                >
                    MENU
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
