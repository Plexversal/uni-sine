import React, { useEffect, useState } from "react"
import styles from '../../styles/Path.module.css'
import Link from 'next/link'

function Path() {

    let [path, setPath] = useState([])

    useEffect(() => {
        let arr = window.location.pathname.split('/').slice(1) // ['path1', 'path2', ...]
        let arr1 = arr.map(e => '/' + e) // ['/path1', '/path2', ...]
        let arr2 = Array.from({ length: arr1.length }, (_, i) => arr1.slice(0, i + 1).join("")) // ['/path1', '/path1/path2', ...]
        arr2.unshift('/') // ['/', '/path1', '/path1/path2', ...]
        setPath(arr2.map((e, i) => <Link key={i} href={`${e}`}>{`${ e.length == 1 ? 'home' : e.split('/').slice(-1).pop()}`}</Link>))
     
    }, [])
  
    
    return (
      <div className={styles['path-container']}>
        <div className={styles['path']}>
            <div className={styles['path-child']}>
              <ul>
              {path.map((e, i) => (
                  <li key={`${i}`}>{e}</li>
                ))}
              </ul>
            </div>
            <div>Uni-Sine</div>
          </div>

      </div>
    )
  }

export default Path