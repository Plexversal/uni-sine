import Path from "../../components/Path"
import SecondaryBanner from '../../components/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"

function GF() {
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
            <SecondaryBanner title='Gravitational fields and forces' subheader={`${minsToRead()} · Updated 22/03/2022`} />
            <Path />
            <article id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Gravitational force equation</h2>
                    <p>Gravitational fields are relevant when there are bodies of mass. You can work out different things with the force of gravity and when objects are placed within the gravitational field of a mass.</p>
                    <p>Using Newton&rsquo;s law of gravitation, you can work out a <strong>vector</strong> value of the attraction between to masses, generally this applies to masses that are uniform spheres as the equation requires the radius to calculate. You can presume large objects such planets are uniform spheres.</p>
                    <p>The force acting between two masses:</p>
                    <img src="/static/physics/gravitation-fields/image047.png" className={styles['equation']}></img>
                    <p>Where <strong>G</strong> is the gravitational constant (6.67 * 10<sup>-11</sup>) and <strong>r</strong> is the distance between the 2 masses.</p>
                    <p>This equation follows an inverse square law so as r increases F decreases according to the inverse square law formula.</p>
                    <h2>Example using Earth</h2>
                    <p>So to use this equation to determine the force between the sun and the earth, we would need both masses and the distance between them.</p>
                    <p>G = 6.67 x 10<sub>&shy;</sub>&shy;<sup>-11</sup> Nm<sup>2</sup>kg<sup>-2</sup></p>
                    <p>Mass of Earth = 5.9722 x 10<sup>24 </sup>kg</p>
                    <p>Mass of Sun = 1.989 &times; 10<sup>30</sup>&nbsp;kg</p>
                    <p>Average distance of Sun from Earth = 1.4786 x 10<sup>11</sup> m</p>
                    <img src="/static/physics/gravitation-fields/image048.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image049.png" className={styles['equation']}></img>
                    <p>So we have worked out the force of Gravity between the sun and the earth.</p>
                    <p>The force experienced by an object placed in the field of gravity of a larger mass can be calculated using:</p>
                    <img src="/static/physics/gravitation-fields/image050.png" className={styles['equation']}></img>
                    <p>Where g can be calculated using:</p>
                    <img src="/static/physics/gravitation-fields/image051.png" className={styles['equation']}></img>
                    <p>These equations are used for working out things such as force of gravity acting on objects near or on the surface of masses such as planets.</p>
                    <p>Using the above equation to work out the gravitational field strength of earth we can use the values of earths mass and its radius.</p>
                    <p>Earth radius = 6371000 m</p>
                    <p>Earth Mass = 5.9722 x 10<sup>24 </sup>kg</p>
                    <p>G = 6.67 x 10<sub>&shy;</sub>&shy;<sup>-11</sup> Nm<sup>2</sup>kg<sup>-2</sup></p>
                    <img src="/static/physics/gravitation-fields/image051.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image052.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image053.png" className={styles['equation']}></img>
                    <p>This value can be used in the equation above that with other masses on earth such as a human, for example if we take the average mass of a human to be about 65kg and plug this into the equation:</p>
                    <img src="/static/physics/gravitation-fields/image050.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image054.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image055.png" className={styles['equation']}></img>
                    <p>So, the gravitational force acting on a human in a downwards direction constantly is 638 N. Obviously this varies when the mass varies but from this we can tell larger masses will experience more gravitational pull.</p>
                    <p>This also means that the force will be different on other objects and planets. For example, if we do this same process for the moon:</p>
                    <p>Mass of Moon = 7.34767309 &times; 10<sup>22 </sup>kg</p>
                    <p>Radius of Moon = 1737400 m</p>
                    <p>G = 6.67 x 10<sub>&shy;</sub>&shy;<sup>-11</sup> Nm<sup>2</sup>kg<sup>-2</sup></p>
                    <img src="/static/physics/gravitation-fields/image051.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image056.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image057.png" className={styles['equation']}></img>
                    <p>Taking the same mass we used for average human:</p>
                    <img src="/static/physics/gravitation-fields/image050.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image058.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitation-fields/image059.png" className={styles['equation']}></img>
                    <p>This is much lower force for the same person and this is different on every planet depending on its mass, mars will have a different force, so will Venus, so will the moon of Jupiter.</p>
                    <p>So, with this value of g, you can use it in a variety of other equations, for example working out how high you can jump, how high projectiles can go before falling or using this to work out weight of an object on any mass which is simply g x m. So it has many applications and is used in physics all the time.</p>

                </div>


            </article>
        </>
    )
}

export default GF