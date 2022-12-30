import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"

function KTL() {
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
            <SecondaryBanner title='Keplers third law' subheader={`${minsToRead()} · Updated 22/03/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Kepler's third law</h2>
                    <p>Kepler&rsquo;s third law indicates a direct relationship between a planets orbital period and the radius of the orbit. Specifically given by:</p>

                    <img src="/static/physics/keplers-third-law/image082.png" className={styles['equation']}></img>
                    <p>This means that as the radius increases, the orbital period increases.</p>
                    <p>We can also derive this law from newtons gravitational force equation:</p>
                    <img src="/static/physics/gravitation-fields/image047.png" className={styles['equation']}></img>
                    <p>For an object moving in circular motion, the force is given by:</p>
                    <img src="/static/physics/keplers-third-law/image083.png" className={styles['equation']}></img>
                    <p>Which means that this force is also equal to the gravitational force for an object orbiting in a circle.</p>
                    <img src="/static/physics/keplers-third-law/image084.png" className={styles['equation']}></img>
                    <p>M<sub>2</sub> is the mass of the planet and M<sub>1</sub> is mass of the sun</p>
                    <p>The velocity (v) is simply distance divided by time and the distance is the circumference of the orbit with time being the orbital period:</p>
                    <img src="/static/physics/keplers-third-law/image085.png" className={styles['equation']}></img>
                    <p>So, if we enter this into the force equation we get:</p>
                    <img src="/static/physics/keplers-third-law/image086.png" className={styles['equation']}></img>
                    <p>We can now simplify:</p>
                    <img src="/static/physics/keplers-third-law/image087.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image088.png" className={styles['equation']}></img>
                    <p>Solve for T squared:</p>
                    <img src="/static/physics/keplers-third-law/image089.png" className={styles['equation']}></img>
                    <p>For a circular orbit, r is the semimajor axis of the orbit and so this is the final equation for relating the force of gravity and orbital radius with newtons equations with the orbital period.</p>
                    <p>So, using the above equation we can solve the orbital period of let&rsquo;s say Jupiter using mean radius of orbit and the mass of the Sun.</p>
                    <p>M<sub>1 </sub>= 1.989 x 10<sup>30 </sup>kg</p>
                    <p>r = 7.78358 x 10<sup>11 </sup>m</p>
                    <p>G = 6.67408 x 10<sup>-11</sup> m<sup>3 </sup>kg<sup>-1 </sup>s<sup>-2</sup></p>
                    <img src="/static/physics/keplers-third-law/image089.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image090.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image091.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image092.png" className={styles['equation']}></img>
                    <p>You can do this for any planet or object in our solar system or even a different solar system, provided you have the mean distance between the objects and the mass of the star/centre orbiting object.</p>
                    <h2>Solving velocity of an orbiting satellite</h2>
                    <p>You can also rearrange this to solve for mass, for example to solve the mass of the sun:</p>
                    <p>Rearranging the original equation of force, you can also work out the velocity of a satellite.</p>
                    <p>To calculate velocity of an orbiting satellite:</p>
                    <img src="/static/physics/keplers-third-law/image093.png" className={styles['equation']}></img>
                    <p>Solve for v:</p>
                    <img src="/static/physics/keplers-third-law/image094.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image095.png" className={styles['equation']}></img>
                    <p>So, using this, let&rsquo;s work out the average orbital velocity of Jupiter using its average distance from the sun:</p>
                    <p>M<sub>1 </sub>= 1.989 x 10<sup>30 </sup>kg</p>
                    <p>r = 7.78358 x 10<sup>11</sup> m</p>
                    <p>G = 6.67408 x 10<sup>-11</sup> m<sup>3 </sup>kg<sup>-1 </sup>s<sup>-2</sup></p>
                    <img src="/static/physics/keplers-third-law/image095.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image096.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image097.png" className={styles['equation']}></img>
                    <p>So, the estimated orbital velocity of Jupiter is:</p>
                    <img src="/static/physics/keplers-third-law/image098.png" className={styles['equation']}></img>
                    <p>The reason this is an average is because it uses the average distance, Jupiter is orbiting as an ellipse and Kepler&rsquo;s laws tells us that the closer an orbiting body is to the mass its orbiting, the faster it will be, and so it will be slower the further away it is.</p>
                    <p>An orbit will have a max distance and a min distance from the sun during its orbit.</p>
                    <p>Again, this equation can also be rearranged to solve for a variety of things, for example the mass of the centre object in which the satellite is orbiting.</p>
                    <h2>Solving orbital periods</h2>
                    <p>It should also be noted that the ratio of the periods of two planets revolving around a mass is equal to the ratio of the mean distances cubed. The equation for this is as follows:</p>
                    <img src="/static/physics/keplers-third-law/image099.png" className={styles['equation']}></img>
                    <p>With this equation, if you have properties of two objects orbiting, you can find missing properties of one of the objects. Depending on the properties you are given or can calculate before-hand. You can calculate orbital periods of other objects relative to earth, distances between planets and their host star or other properties.</p>
                    <p>So, for example if we wanted to work out what the orbital period of Jupiter is given its mean distance and using the orbital period of earth, we can work out this value:</p>
                    <p>Earth mean distance = 1.296 x 10<sup>11</sup> m</p>
                    <p>Jupiter mean distance = 7.78358 x 10<sup>11 </sup>m</p>
                    <p>Earth orbital period = 365 days</p>
                    <img src="/static/physics/keplers-third-law/image099.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image100.png" className={styles['equation']}></img>
                    <p>Rearrange for T:</p>
                    <img src="/static/physics/keplers-third-law/image101.png" className={styles['equation']}></img>
                    <img src="/static/physics/keplers-third-law/image102.png" className={styles['equation']}></img>
                    <p>Solve for final number in days:</p>
                    <img src="/static/physics/keplers-third-law/image103.png" className={styles['equation']}></img>
                    <p>This is already in days because we used earth days relative to earths orbital period but you can convert to years doing the following:</p>
                    <img src="/static/physics/keplers-third-law/image104.png" className={styles['equation']}></img>


                </div>


            </article>
        </>
    )
}

export default KTL