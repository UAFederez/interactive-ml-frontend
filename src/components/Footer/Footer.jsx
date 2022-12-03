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
                <p>Flask RESTful</p>
                <p>Python</p>
                <p>Numpy</p>
                <p>Custom CSS</p>
            </div>
            <div>
                <p>Contact</p>
                <p>
                    <a href="mailto:urielfederez@gmail.com">
                        urielfederez@gmail.com
                    </a>
                </p>
                <p>
                    <a href="https://github.com/UAFederez">GitHub</a>
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
