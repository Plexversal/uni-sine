import styles from '../../styles/Footer.module.css'
import Link from 'next/link'
export default function Footer() {
    return (
        <footer className={styles['footer']}>
            <div>
                <div>
                    <h4>LEGAL</h4>
                    <Link href='/privacy-policy'>Privacy Policy</Link>
                    <Link href='/privacy-policy'>Cookie Policy</Link>
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