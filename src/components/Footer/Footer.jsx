import styles from "./Footer.module.css";

const Footer = () => (
    <footer className={styles.footer}>
        <div className="container">
            <div>
                <p>Built by</p>
                <p>Uriel Federez</p>
            </div>
            <div>
                <p>Built with</p>
                <p>ReactJS</p>
                <p>Plotly JS</p>
                <p>better-react-mathjax</p>
                <p>Flask RESTful</p>
                <p>NumPy</p>
            </div>
            <div>
                <p>Contact</p>
                <p>
                    <a href="mailto:urielfederez@gmail.com">
                        urielfederez@gmail.com
                    </a>
                </p>
                <p>
                    <a href="https://github.com/UAFederez" target="_blank">
                        GitHub
                    </a>
                </p>
                <p>
                    <a
                        href="https://github.com/UAFederez/interactive-ml-frontend"
                        target="_blank"
                    >
                        GitHub Repo (Frontend)
                    </a>
                </p>
                <p>
                    <a
                        href="https://github.com/UAFederez/interactive-ml-backend"
                        target="_blank"
                    >
                        GitHub Repo (API)
                    </a>
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
