import React from "react"
import Link from 'next/link'
import styles from '../../styles/Selection.module.css'

function Selection(props) {
    return (
    <Link href={props.link}><a className={styles['selection-container']}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
    </a></Link>
    )
  }

export default Selection