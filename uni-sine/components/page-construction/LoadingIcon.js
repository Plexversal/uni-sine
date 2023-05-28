import styles from '../../styles/Loading.module.css'

export default function LoadingIcon() {
    return <div className={styles['container']}>
        <div className={styles['lds-roller']}>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    </div>
}