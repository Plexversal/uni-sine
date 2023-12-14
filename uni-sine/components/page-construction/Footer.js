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
                    <Link href='/terms-of-use'>Terms of Use</Link>

                </div>
                <div>
                    <h4>LINKS</h4>
                    <Link href='/courses'>Courses</Link>
                    <Link href='/calculators'>Calculators and tools</Link>
                    <Link href='/questions'>Practice Questions</Link>

                </div>
                <div>
                    <h4>INFO</h4>
                    <Link href='/#prices'>Pricing</Link>
                    <Link href='/about'>About us</Link>
                </div>


            </div>
            <p><strong>Uni-Sine</strong> Copyright ©</p>
        </footer>)
} 