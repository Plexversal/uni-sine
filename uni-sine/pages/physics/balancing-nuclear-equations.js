import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"

function BNE() {

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
            <SecondaryBanner title='Balancing nuclear equations' subheader={`${minsToRead()} · Updated 22/03/2022`}  />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}> 
                    <h2>Structure of the Atom</h2>
                    <p>As you may have already heard, energy within particles has to be conserved and energy is not lost when reactions and emission takes place, but rather, energy is transferred to different states. There are different decay events that can happen for Nuclei which are covered in this section.</p>
                    <p>You must know the basics of the atom to understand decay types. Here is a quick rundown of how the atom is presented.</p>
                    <img src="/static/physics/balancing-nuclear-equations/image009.png" className={styles['equation']}></img>

                    <p>A: This is the mass number of the atom. This is the proton (atomic) number + the neutron number.</p>
                    <p>Z: This is the proton (atomic) number and represents the number of protons. This is also what determines what the atom is on the periodic table, if this changes, the atom changes.</p>
                    <p>X: This is element symbol you will recognise from the periodic table.</p>
                    <p>So, to put this together and represent what an atom of carbon is for example:</p>
                    <img src="/static/physics/balancing-nuclear-equations/image010.png" className={styles['equation']}></img>

                    <h2>Alpha Decay</h2>
                    <p>Alpha decay occurs in unstable nuclei. Large elements undergo alpha emission due to a tipping point in the strong nuclear force.</p>
                    <p>Alpha decay is one of the more simpler decay events to understand as it only gives off an alpha particle.</p>
                    <p>An alpha particle is practically a helium atom that has no electrons, so a helium nucleus.</p>
                    <img src="/static/physics/balancing-nuclear-equations/image011.png" className={styles['equation']}></img>
                    <p>Alpha decay equation example of uranium-238:</p>
                    <img src="/static/physics/balancing-nuclear-equations/image012.png" className={styles['equation']}></img>
                    <p>The uranium element has transmuted into thorium based as a result of the alpha decay. The Proton number is equal to 92 minus 2 and mass number is equal to 238 minus 4.</p>
                    
                    <h2>Beta-minus Decay</h2>
                    <p>Beta decay occurs when an element becomes unstable as a result of having too many neutrons. The nuclear binding energy Is what determines when an atom will decay via beta decay.</p>
                    <p>Since it is considered to have too many neutrons, the resulting decay products are that of an atom with one more proton and one less neutron. As well as an anti-neutrino. The antineutrino was found due to the lepton number not being conserved under initial observation.</p>
                    <p>Beta-minus decay example for carbon-14:</p>
                    <img src="/static/physics/balancing-nuclear-equations/image013.png" className={styles['equation']}></img>
                    <p>The carbon-14 element has transmuted into a nitrogen-14 atom and the emission of a beta particle (high energetic electron) and an electron-antineutrino.</p>
                    <p>The emission of an electron (beta particle) is able to occur due to the results of the change in flavour of quarks within a neutron that changes from two up quarks and one down quark to two down quarks and one up quark via the weak interaction.</p>

                    <h2 id="nuclear">Beta-plus Decay</h2>
                    <p>Beta-plus occurs when the nuclide is considered to have too many protons in relation to neutrons and so the atom becomes unstable and a positron is released changing the elements atomic number by -1 and also releases an electron neutrino in the process.</p>
                    <p>Beta-plus decay example for nitrogen-13:</p>
                    <img src="/static/physics/balancing-nuclear-equations/image014.png" className={styles['equation']}></img>
                    <p>The nitrogen element has transmuted into carbon-13 and emitted a positron and an electron neutrino.</p>
                    <p>The emission of a positron (beta-plus particle) is able to occur due to the results of the change in flavour of quarks within a proton that changes from two down quarks and one down quark to two up quarks and one down quark via the weak interaction.</p>

                    <h2>Electron-capture</h2>
                    <p>Electron capture occurs when there are too many protons. The nuclide needs to balance the charge to make the atom more stable. It can do this by capturing an electron, usually from a low energy electron orbit, and reacting with a proton to turn it into a neutron.</p>
                    <img src="/static/physics/balancing-nuclear-equations/image015.png" className={styles['equation']}></img>
                    <p>The transmutation result of the resultant atom is the same as in beta-plus decay but the process by which this has occurred is different as it has absorbed an electron rather than producing a positron.</p>



                </div>


            </article>
        </>
    )
}

export default BNE