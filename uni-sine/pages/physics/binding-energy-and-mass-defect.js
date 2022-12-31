import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"

function BI() {
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
            <SecondaryBanner title='Binding energy and mass defect' subheader={`${minsToRead()} · Updated 22/03/2022`}  />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}> 

                    <h2>Binding energy in MeV</h2>
                    <p>Binding energy, usually measured in MeV, is the energy that is used to split an atom apart. The mass defect within an atom is the mass converted into energy to keep the nucleus together under the repelling force of the positively charged protons.</p>
                    <p>Binding energy is calculated using the values of an isotopes relative atomic mass, this is using the principles of E = mc<sup>2</sup> by converting mass values into energy values of MeV.</p>
                    <p>To work out the binding energy of an alpha particle for example, you need to know the number of neutrons and protons it has. In this case 2 neutrons and 2 protons as it&apos;s the nucleus of a helium atom.</p>
                    <p>You also need to know the specific mass value of both the proton and neutron.</p>
                    <ul>
                        <li>Proton mass = 1.00727647</li>
                        <li>Neutron mass = 1.008664915</li>
                    </ul>
                    <p>With this information we can start to calculate binding energy. The first step though is to calculate the mass defect. The mass defect of a nucleus is the difference between the total mass number of protons and neutrons and the relative atomic mass of the atom. If you calculate the mass of the protons and neutrons individually for a given element, which we will do here, the value will be less than that what we actually observe and record in experiments.</p>
                    <p>So, let&apos;s start by doing that, lets calculate the mass defect for an alpha particle:</p>
                    <img alt=''src="/static/physics/binding-energy/image016.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/binding-energy/image017.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/binding-energy/image018.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/binding-energy/image019.png" className={styles['equation']}></img>
                    <p>This next step requires knowing the relative atomic mass value of the isotope you are working with. The relative atomic mass of helium-4 is 4.002602</p>
                    <p>You can now resolve the mass defect:</p>
                    <img alt=''src="/static/physics/binding-energy/image020.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/binding-energy/image021.png" className={styles['equation']}></img>
                    <p>Now you can move on to calculating binding energy of an alpha particle in MeV:</p>
                    <img alt=''src="/static/physics/binding-energy/image022.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/binding-energy/image023.png" className={styles['equation']}></img>


                    <h2>Binding energy in joules/kg</h2>
                    <p>Binding energy may need to be calculated in joules rather than MeV. You will need to convert atomic mass units to kg:</p>
                    <img alt=''src="/static/physics/binding-energy/image024.png" className={styles['equation']}></img>

                    <p>Using the mass defect example of an alpha particle again, you simply convert the mass defect number which is already u by multiplying that value by the value of 1u in kg:</p>
                    <img alt=''src="/static/physics/binding-energy/image025.png" className={styles['equation']}></img>
                    <p>Now you have the mass defect value in kg, you can work out binding energy using E = mc<sup>2</sup>:</p>
                    <img alt=''src="/static/physics/binding-energy/image026.png" className={styles['equation']}></img>
                    <p>You can convert back into MeV by using:</p>
                    <img alt=''src="/static/physics/binding-energy/image027.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/binding-energy/image028.png" className={styles['equation']}></img>
                    <p>Which is the answer we got before so we know this method of conversion is correct.</p>


                    <h2>Average binding energy per nucleon</h2>
                    <p>You can find the average binding energy per nucleon in MeV using this general average formula:</p>
                    <img alt=''src="/static/physics/binding-energy/image029.png" className={styles['equation']}></img>
                    <p>So, if we use this formula to calculate the average binding energy per nucleon for the alpha particle:</p>
                    <img alt=''src="/static/physics/binding-energy/image030.png" className={styles['equation']}></img>
                    <p>If you did this for every element on the periodic table, you will get a trend of higher binding energy per nucleon for elements close to iron and becomes less for bigger elements. Iron is the element with the highest binding energy per nucleon and also links to the reason why stars fuse to only Iron. </p>
                </div>


            </article>
        </>
    )
}

export default BI