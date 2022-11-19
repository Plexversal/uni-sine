import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"

function GP() {
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
            <SecondaryBanner title='Gravitational potential' subheader={`${minsToRead()} · Updated 22/03/2022`} />
            <Path />
            <article id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Gravitational potential</h2>
                    <p>Gravitational potential is related to the amount energy a mass has based on its location within a gravitational field.</p>
                    <p>Gravitational potential is generally denoted by the letter V, the equations closely match electric field potential energy too.</p>
                    <p>Gravitational potential can be calculated by:</p>
                    <img src="/static/physics/gravitational-potential/image060.png" className={styles['equation']}></img>
                    <p>Where <strong>G</strong> is the gravitational constant, <strong>M</strong> is the mass of the object causing the gravitational field and <strong>r</strong> is the distance of the centre of the object you are trying to measure the potential energy for.</p>
                    <p>The equation is also negative because an object is always attracted towards the centre of the mass, also known as point mass, it requires work done to separate the 2 masses.</p>
                    <p>Gravitational field strength can be calculated using this gravitational potential energy.</p>
                    <img src="/static/physics/gravitational-potential/image061.png" className={styles['equation']}></img>
                    <p>So, with these two equations you can work out the gravitational field strength of a given mass, remember the distance (r) is in relation to a mass (m) from the centre of the original mass. So to work out the gravitational potential of the surface of a mass, r would simply be the radius of the mass, provided it was a uniform sphere.</p>
                    <p>Gravitational potential energy is different to gravitational potential and can be worked out in 2 ways. If you are working out a question where g is treated more as a constant, such as taking measurements of masses on the surface of a planet, you use:</p>
                    <img src="/static/physics/gravitational-potential/image062.png" className={styles['equation']}></img>
                    <p>Where m is the mass of the object you are wanting to find the potential energy of, g is the gravitational field strength and h is the height at which the object is placed relative to the surface of the object creating the field.</p>
                    <p>To work out gravitational potential energy between larger distances and more massive objects you use:</p>
                    <img src="/static/physics/gravitational-potential/image063.png" className={styles['equation']}></img>
                    <p>Where G is the gravitation constant, M is the first mass, m is the second mass and r is the distance between the centres of the masses.</p>
                    <p>Example gravitational potential energy:</p>
                    <p>Using the equations above we can work out the potential energy a given mass has relative to another mass. So as an example, we can work out the potential energy of the Moon with respect to Earth (units will be included during working out to show how the various units cancel and have a more comprehensible view):</p>
                    <p>G (gravitational constant) = 6.67408 x 10<sup>-11</sup> m<sup>3 </sup>kg<sup>-1 </sup>s<sup>-2</sup></p>
                    <p>M (mass of Earth) = 5.9722 x 10<sup>24 </sup>kg</p>
                    <p>m (mass of Moon) = 7.34767309 x 10<sup>22 </sup>kg</p>
                    <p>r (distance between two masses from the centres) = 34400 km</p>
                    <img src="/static/physics/gravitational-potential/image063.png" className={styles['equation']}></img>
                    <p>Input the values we have into the standard equation and multiply r by 1000 to get meters as G is also using meters:</p>
                    <img src="/static/physics/gravitational-potential/image064.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitational-potential/image065.png" className={styles['equation']}></img>
                    <img src="/static/physics/gravitational-potential/image066.png" className={styles['equation']}></img>
                    <p>You should also be aware that as we are calculating energy, the units would be in Joules. Joules are the SI unit for energy:</p>
                    <img src="/static/physics/gravitational-potential/image067.png" className={styles['equation']}></img>
                    <p>So potential energy of moon in relation to earth:</p>
                    <img src="/static/physics/gravitational-potential/image068.png" className={styles['equation']}></img>
                    <p>Gravitational potential difference, this is energy that is needed to move a unit mass from one point in the gravitational field to another point against the field direction. The equations are similar to electric field potential difference.</p>
                    <p>Energy needed is in relation to the amount of mass being moved and the potential difference moved through.</p>
                    <p>To work out gravitational potential difference energy:</p>
                    <img src="/static/physics/gravitational-potential/image069.png" className={styles['equation']}></img>
                    <p>The force of gravity (being negative due to work being done against the field) between two objects multiplied by the distance is equal to the mass times the potential difference:</p>
                    <img src="/static/physics/gravitational-potential/image070.png" className={styles['equation']}></img>
                    <p>Work done is also equal to mass times the potential difference:</p>
                    <img src="/static/physics/gravitational-potential/image071.png" className={styles['equation']}></img>

                </div>


            </article>
        </>
    )
}

export default GP