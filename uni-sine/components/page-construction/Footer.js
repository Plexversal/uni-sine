import styles from '../../styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles['footer']}>
            <div>
                <div>
                    <h4>LEGAL</h4>
                    <a href='https://uni-sine.com/privacy-policy'>Privacy Policy</a>
                    <a href='https://uni-sine.com/privacy-policy'>Cookie Policy</a>
                </div>
                <div>
                    <h4>INFO</h4>
                    <a>Pricing</a>
                    <a>About Us</a>
                </div>
                <div>
                    <h4>ATTRIBUTES</h4>
                    <a></a>
                </div>
            </div>
            <p><strong>Uni-Sine</strong> Copyright ©</p>
        </footer>)
} 