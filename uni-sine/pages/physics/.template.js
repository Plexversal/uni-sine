import Path from "../../components/Path"
import SecondaryBanner from '../../components/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"


function template() {
 
    let [dom, setDom] = useState([])


    useEffect(() => { 
        var elems = document.body.getElementsByTagName("p");
        for(var i=0;i < elems.length; i++){
            setDom(a => [...a, elems[i].textContent])
         }
    }, []) 

    function minsToRead() {
        let text = dom.join(' ')
        let time = Math.ceil((text.length / 25) / 60) + 1 // all paragraph characters with 25 char per second read time plus 1 for images
        return `${time} minute read`
    }
    return (
        <>
            <SecondaryBanner title='Exponential decay and half-life' subheader={`${minsToRead()} · Updated 22/03/2022`}  />
            <Path />
            <article id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}> 
                    <h2>template</h2>
                    <p>This is a template</p>
                    <img src="/static/physics/balancing-nuclear-equations/image009.png" className={styles['equation']}></img>
                    <h2>Template</h2>

                </div>


            </article>
        </>
    )
}

//export default template