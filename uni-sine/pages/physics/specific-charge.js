import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState, } from "react"
import P5NormalDistribution from "../../components/p5-interactions/P5NormalDistribution"


function SC() {

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
            <SecondaryBanner title='Specific charge' subheader={`${minsToRead()} · Updated 22/03/2022`}  />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id="article" className={`${styles['page-wrapper']} article`}>
            
            <div className={styles['article-container']}>
                <h2>Calculate specific charge</h2>
                <p>Specific charge of a particle, group of particles or entire atoms can be calculated using a simple equation. Specific charge is the ratio of the absolute charge to its mass. </p>
                <p>This calculation presumes you already have the mass and charge values of the particles you wish to calculate to hand. You only need to have the charge and mass values of the proton, neutron and electron to calculate specific charge of these or any other atom. The values are listed below.</p>
                <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody><tr>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}><strong>Particle</strong></p>
                        </td>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}><strong>Charge</strong> (coulombs)</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}><strong>Mass</strong> (kg)</p>
                        </td>
                    </tr>
                        <tr >
                            <td width="200" valign="top" >
                                <p className={styles["MsoNormal"]} >Proton</p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >1.60 x 10<sup>-19</sup></p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >1.67 x 10<sup>-27</sup>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td width="200" valign="top" >
                                <p className={styles["MsoNormal"]} >Neutron</p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >0</p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >1.67 x 10<sup>-27</sup></p>
                            </td>
                        </tr>
                        <tr>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >Electron</p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >-1.60 x 10<sup>-19</sup></p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >9.11 x 10<sup>-31</sup></p>
                            </td>
                        </tr>
                    </tbody></table>
                    <p>The absolute charge values were found using Robert Millikan's oil drop experiment.</p>
                    <p>The equation for finding specific charge:</p>
                    <img src="/static/physics/specific-charge/image005.png" className={styles['equation']}></img>
                    <p>So, for example if we want to find specific charge of an electron using the values in the table above:</p>
                    <img src="/static/physics/specific-charge/image006.png" className={styles['equation']}></img>
                    <p>using indices division laws to work out the final equation:</p>
                    <img src="/static/physics/specific-charge/image007.png" className={styles['equation']}></img>
                    <p>So, electron specific charge in its final form:</p>
                    <img src="/static/physics/specific-charge/image008.png" className={styles['equation']}></img>
                    <p>You can of course do this exact method for any of the other particles and it will work exactly the same to find specific charge for such particle.</p>
                    <br></br>
                </div>

            </article>
        </>
    )
}

export default SC