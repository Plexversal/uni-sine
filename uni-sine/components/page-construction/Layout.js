import Nav from "./Nav";
import Footer from './Footer'
import SidePanel from "./SidePanel";
import styles from '../../styles/Layout.module.css'
const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <div className={styles.container}>
                <SidePanel />
                <main className={styles.main}>
                    <div className={styles['content-wrapper']}>{children}</div>
                    <Footer />

                </main>
            </div>
        </>
    )
}

export default Layout;