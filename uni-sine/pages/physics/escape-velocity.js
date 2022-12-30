import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"

function EV() {
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
            <SecondaryBanner title='Escape velocity' subheader={`${minsToRead()} · Updated 22/03/2022`}  />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}> 
                    <h2>Escape velocity equation</h2>
                    <p>There is an equation to work out escape velocity of a gravitational field, which is how fast a mass must travel to escape the field. When the equation gives the object negative potential energy it has escaped the gravitational field.</p>
                    <p>This is deriving the escape velocity from equations we have looked at before and using kinetic energy equation:</p>
                    <img src="/static/physics/escape-velocity/image072.png" className={styles['equation']}></img>
                    <img src="/static/physics/escape-velocity/image073.png" className={styles['equation']}></img>
                    <img src="/static/physics/escape-velocity/image074.png" className={styles['equation']}></img>
                    <img src="/static/physics/escape-velocity/image075.png" className={styles['equation']}></img>
                    <img src="/static/physics/escape-velocity/image076.png" className={styles['equation']}></img>
                    <h2>Example of Earth's escape velocity</h2>
                    <p>We can work out the escape velocity of earth using the escape velocity equation. For this example, we will ignore air resistance but for any given mass the escape velocity can be worked out as the following (units will be included during working out to show how the various units cancel and have a more comprehensible view):</p>
                    <p>G (gravitational constant) = 6.67408 x 10<sup>-11</sup> m<sup>3 </sup>kg<sup>-1 </sup>s<sup>-2</sup></p>
                    <p>r (radius of Earth/distance from centre of mass to surface) = 6371 km</p>
                    <p>M (mass of Earth) = 5.9722 x 10<sup>24 </sup>kg</p>
                    <img src="/static/physics/escape-velocity/image076.png" className={styles['equation']}></img>
                    <p>Input the values we have into the standard equation and multiply r by 1000 to get meters as G is also using meters:</p>
                    <img src="/static/physics/escape-velocity/image077.png" className={styles['equation']}></img>
                    <p>Multiply all parts of top part of fraction to get overall units for one number:</p>
                    <img src="/static/physics/escape-velocity/image078.png" className={styles['equation']}></img>
                    <p>Complete the rest of the equation cancelling units when needed:</p>
                    <img src="/static/physics/escape-velocity/image079.png" className={styles['equation']}></img>
                    <p>Escape velocity from the surface of the earth:</p>
                    <img src="/static/physics/escape-velocity/image080.png" className={styles['equation']}></img>
                    <p>You can now divide that by 1000 to get units in km for easier understanding:</p>
                    <img src="/static/physics/escape-velocity/image081.png" className={styles['equation']}></img>





                </div>
            </article>
        </>
    )
}

export default EV