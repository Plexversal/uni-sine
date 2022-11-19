import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import Selection from '../../components/page-construction/Selection'

import styles from '../../styles/Content.module.css'
import Link from 'next/link'

export default function Physics() {

    // implement ID scrolling for sub categories and replace link creation 

    let documentsContentListArray = [
        'Specific charge',
        {
            name: 'Balancing Nuclear Equations', 
            sub: ['Alpha Decay', 'Beta Decay', 'Electron Capture','Binding energy and mass defect']
        },
        'Exponential decay and half-life',
        'Electric Fields and forces',
        'Gravitational Fields and forces',
        {
            name: 'Binding energy and mass defect', 
            sub: ['Binding energy in MeV', 'Binding energy in joules/kg', 'Average binding energy per nucleon']
        },
        'Gravitational Potential',
        "Keplers third law",
        "Escape velocity"
    ]



    return (
        <>
            <SecondaryBanner title='Physics' subheader={`${documentsContentListArray.length} Articles · Updated 22/03/2022`}  />
            <div className={styles['content-container']}>
                <div className={styles['middle-content-container']}>
                    <Selection 
                    link={`/physics/${documentsContentListArray[0].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[0]}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[1].name.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[1].name}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[2].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[2]}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[3].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[3]}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[4].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[4]}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[5].name.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[5].name}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[6].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[6]}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[7].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[7]}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                    <Selection 
                    link={`/physics/${documentsContentListArray[8].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[8]}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                    </p>}/>
                </div>
            </div>
        </>
    )
}