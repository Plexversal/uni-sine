import Nav from "./Nav";
import Footer from './Footer'
import SidePanel from "./SidePanel";
import styles from '../../styles/Layout.module.css'
import AiChat from "./AiChat";
import CookieBanner from "./CookieBanner";

const Layout = ({ children }) => {
    return (
        <>
            <CookieBanner />
            <Nav />
            <div className={styles.container}>
                <SidePanel />
                <main className={styles.main}>
                    <div className={styles['content-wrapper']}>{children}</div>

                    <Footer />
                    

                </main>
                <AiChat />
            </div>
        </>
    )
}

export default Layout;