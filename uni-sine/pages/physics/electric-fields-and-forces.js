import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import ElectricField from "../../components/calculators/ElectricFields"
function EF() {

    let [dom, setDom] = useState([])


    useEffect(() => {
        const getParagraphText = () => {
            const elems = document.body.getElementsByTagName('p');
            for (let i = 0; i < elems.length; i++) {
                setDom(a => [...a, elems[i].textContent]);
            }
        };

        if (typeof window !== 'undefined') {
            getParagraphText();
        }
    }, [])

    function minsToRead() {
        let text = dom.join(' ')
        let time = Math.ceil((text.length / 25) / 60) + 1 // all paragraph characters with 25 char per second read time plus 1 for images
        return `${time} minute read`
    }

    return (
        <>
            <SecondaryBanner title='Electric Fields and Forces' subheader={`${minsToRead()} · Updated 22/03/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Electric Field Equations</h2>
                    <ElectricField />

                    <p>Electric fields relate to objects that have charge, when an object has charge it has an electric field, much like an object with mass has a gravitational field. When another charged object is placed in and electric field it will experience a non-contact force.</p>
                    <p>Opposite charges attract and the same charges repel, just like a standard north pole and south pole magnet.</p>
                    <p>You can calculate the force of attraction or repulsion using coulombs law, which is similar to the force of gravity but has a few changes.</p>
                    <p>Coulombs law:</p>
                    <img alt=''src="/static/physics/electric-fields/image001.png" className={styles['equation']}></img>
                    <p>Since the first part of this equation is a constant, meaning it has no variables, it can be denoted as a simple letter, we can use <strong>k</strong></p>
                    <img alt=''src="/static/physics/electric-fields/image002.png" className={styles['equation']}></img>

                    <p>The value of k is coulomb&rsquo;s constant and can be calculated just by inputting the values into a calculator.</p>
                    <p>&epsilon;<sub>0</sub>is the permittivity of free space and is equal to 8.85418782 x 10<sup>-12</sup> m<sup>-3</sup> kg<sup>-1</sup> s<sup>4</sup> A<sup>2</sup></p>
                    <p>So, with this we can work out the rest as we know pi and the others are just whole numbers:</p>
                    <img alt=''src="/static/physics/electric-fields/image001-fix.png" className={styles['equation']}></img>
                    <p>Using all this information we can work out the force acting between two charges.</p>
                    <h2>Electric potential and work</h2>
                    <p>Electric potential is simply defined as the electric potential energy per unit charge and is in the units of volts. It can be calculated as kinetic energy in Joules divided by charge in Coulombs. Volts in this case would then be Joules per Coulomb. Potential energy is denoted with the letter V</p>
                    <img alt=''src="/static/physics/electric-fields/image004.png" className={styles['equation']}></img>
                    <p>Work is simply the change in energy. Energy is measured in Joules. Work is calculated as force multiplied distance multiplied cosine the angle of the force. Work is denoted with the letter W.</p>
                    <img alt=''src="/static/physics/electric-fields/image005.png" className={styles['equation']}></img>
                    <p>For example, a particle accelerated with an external force (F) in an electric field multiplied by the distance in which the particle had travelled is equal to the work done in this equation.</p>
                    <p>The distance in this case is equal to the same distance used in the force equation. Additionally, if the force is the same direction with no additional angle, then cosine theta is simply equal to 1. so, we can cancel out a 1 unit of distance and multiple by 1 leaving the following equation:</p>
                    <img alt=''src="/static/physics/electric-fields/image006.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image007.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image008.png" className={styles['equation']}></img>
                    <p>This is also equal to the electric potential energy and is denoted by U and distance is usually referenced as r:</p>
                    <img alt=''src="/static/physics/electric-fields/image009.png" className={styles['equation']}></img>
                    <h2>Field strength of radial electric fields</h2>
                    <p>Radial field strength relates to the electric field strength created by a sphere point charge, for example the proton can be visualised as having an electric field all around it, and for any other charge that enters the field, will experience a force.</p>
                    <p>The strength of this electric field can be calculated using the equation below:</p>
                    <img alt=''src="/static/physics/electric-fields/image010.png" className={styles['equation']}></img>
                    <p>Where <strong>F</strong> is the force experienced by the particle in the field and <strong>Q</strong> is the charge of the particle.</p>
                    <p>The units for this field strength are Newtons/Coulombs. It is also a unit vector with a magnitude and direction.</p>
                    <p>Since Q is divided and cancelled out due to being used in F then we can rewrite the above equation to be the following:</p>
                    <img alt=''src="/static/physics/electric-fields/image011.png" className={styles['equation']}></img>
                    <h2>Field strength of uniform electric fields</h2>
                    <p>Uniform electric fields are formed when you have two parallel metal plates connected to either end of a battery. Forming a negative and positive charge on the plates respectively. The electric field is formed in a direction towards one end of the plate from the other.</p>
                    <p>The electric field strength of this can be calculated using the following equation:</p>
                    <img alt=''src="/static/physics/electric-fields/image012.png" className={styles['equation']}></img>
                    <p>Where <strong>V</strong> is the voltage applied, and <strong>d</strong> is the distance between the plates.</p>
                    <h2>Example question</h2>
                    <p>So as an example, below is a question using the methods from alpha decay and binding energy and using values to find an electric field strength.</p>
                    
                    <p>An alpha particle with atomic mass of 4.001506179127 and Uranium-234 atom with atomic mass of 234.040950 has been released during alpha decay of a Plutonium-238 with atomic mass of 238.04956. The alpha particle is on a trajectory towards a Lead-206 atom. Using the information that 1 proton is equal to 1.9 x 10&shy;<sup>-19</sup> Coulombs, work out the following questions:</p>
                       
                    <ol type="a">
                        <li>What is the kinetic energy of the alpha particle (in Joules) as it released from the parent nucleus?</li>
                        <li>What is the closest distance the alpha particle will reach towards the Lead-206 Nucleus?</li>
                        <li>Using the distance found in part B, calculate the magnitude of the electrostatic force and the direction of the alpha particle.</li>
                    </ol>
                    
                    <ol type="a">
                        <li>For this question, we can use the energy data we get from the alpha decay equation. The equation for the decay can be written as:</li>
                    </ol>
                    <img alt=''src="/static/physics/electric-fields/image013.png" className={styles['equation']}></img>
                    
                    <p>&nbsp;</p>
                    <p>The Q value in this equation relates to the energy released during the decay process and can be used to calculate the kinetic energy of the alpha particle. The Q value is also the mass defect in energy form.</p>
                    <img alt=''src="/static/physics/electric-fields/image014.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image015.png" className={styles['equation']}></img>
                    <p>This equation is currently in atomic units (u) and will need to be converted into Kg in order to convert to MeV. 1u = 1.66054 x 10<sup>-27</sup>.</p>
                    <img alt=''src="/static/physics/electric-fields/image016.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image017.png" className={styles['equation']}></img>

                    <p>This can also be converted into MeV:</p>
                    <img alt=''src="/static/physics/electric-fields/image018.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image019.png" className={styles['equation']}></img>
                    <ol type="a" start={2}>
                        <li>For part B we need to use the equations relating to electric field strength and to find the closest approach towards the stated lead atom. Now we have the energy of the alpha particle in Joules we can complete this question.</li>
                    </ol>
                    <p>We know that both particles are positively charged so we can imagine this as the alpha particle shooting towards the Lead particle and at a certain point slowing down, reaching a net force of zero and then repelling away with a certain amount of force. We want to find when this force is zero.</p>
                    <p>The first step is to find how much electric potential the alpha particle is:</p>
                    <img alt=''src="/static/physics/electric-fields/image020.png" className={styles['equation']}></img>
                    <p>We know the work done is going to be the kinetic energy that it has from the decay process which is 1.0601877 x 10<sup>-12</sup>. The charge of the alpha particle (Q) is going to be the charge of the 2 protons that make up the nucleus which is 2 x 1.9 x 10&shy;<sup>-19</sup>.</p>
                    <img alt=''src="/static/physics/electric-fields/image021.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image022.png" className={styles['equation']}></img>
                    <p>Now we have the alpha potential, we now need to work out when the potential of the Lead atom is equal to the same potential of the alpha particle as this is when the forces cancel out and repulsion occurs.</p>
                    <p>We know the general formula for absolute electric potential in a radial field of an electric charge:</p>
                    <img alt=''src="/static/physics/electric-fields/image023.png" className={styles['equation']}></img>
                    <p>We know that the potential is going to be the same as what we just calculated, the charge to be 82 x 1.9 x 10<sup>-19</sup> and we know k to be 9.988 x 10<sup>9</sup>.</p>
                    <img alt=''src="/static/physics/electric-fields/image002-fix.png" className={styles['equation']}></img>
                    <p>So now we can solve for r, which is the closest distance the particles get to each other:</p>
                    <img alt=''src="/static/physics/electric-fields/image003-fix.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image004-fix.png" className={styles['equation']}></img>
                    <ol type="a" start={3}>
                        <li>For part C, this is quite simple now as we have all the values we need from the previous parts. We just input the 2 charges of each particle and the distance into the electric force equation for the magnitude and determine if its negative or positive for the direction.</li>
                    </ol>
                    <img alt=''src="/static/physics/electric-fields/image001.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image005-fix.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/electric-fields/image006-fix.png" className={styles['equation']}></img>
                    <p>As the 2 electric fields are positive then the alpha particle will repel and so the direction is away from the Lead atom.</p>

                </div>


            </article>
        </>
    )
}

export default EF