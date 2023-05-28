
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import Selection from '../../components/page-construction/Selection'
import styles from '../../styles/Content.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Physics({  }) {

    const router = useRouter();
    // const [pageData, setPageData] = useState([]);
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const response = await fetch(`/api/page-data?currentRoute=${router.route}&absoluteURL=${`${window.location.protocol}//${window.location.host}${router.route}`}`);
    //     const data = await response.json();
    //     setPageData(data);
    //   };
    //   fetchData();
    // }, [router.route]);

    const [forcesTopic, setForcesTopic] = useState(null)
    const [particlesTopic, setParticlesTopic] = useState(null)
    const [noResults, setNoResults] = useState(false)


    useEffect(() => {
        setForcesTopic(document.getElementById('forces-topic-wrapper').children.length > 0)
        setParticlesTopic(document.getElementById('particles-topic-wrapper').children.length > 0)


        let collection = document.getElementById('middle-content-container').children
        setNoResults(Array.from(collection).some(e => e.tagName === 'H2'))

    })

    const [documentsContentListArray, setList] = useState([
        {
            title: 'Specific charge',
            description: `Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.`,
            category: 'Particles',
            path: 'specific-charge'
        },
        {
            title: 'Balancing Nuclear Equations',
            description: 'Understand when particles decay and what results to expect. Including alpha, electron-capture and beta decay.',
            category: 'Particles',
            path: 'balancing-nuclear-equations'
        },
        {
            title: 'Exponential decay and half-life',
            description: 'Calculate half-life of a particular atom based on given samples and understand the decay constant.',
            category: 'Particles',
            path: 'exponential-decay-and-halflife'

        },
        {
            title: 'Electric Fields and forces',
            description: 'Force and field equations using Coulombs law, electric potential and work done.',
            category: 'Forces',
            path: 'electric-fields-and-forces'
        },
        {
            title: 'Gravitational Fields and forces',
            description: 'Force and field equations using Newtons laws of gravity and calculate the strength of a gravitational field',
            category: 'Forces',
            path: 'gravitational-fields-and-forces'
        },
        {
            title: 'Keplers third law',
            description: 'Combine Newtonian gravitational equations with Keplers orbital relationships to find velocity and orbital periods of celestial objects.',
            category: 'Forces',
            path: 'keplers-third-law'
        },
        {
            title: 'Escape velocity',
            description: 'Use Newtonian equations to work out the velocity objects require to escape a bodies gravitational pull.',
            category: 'Forces',
            path: 'escape-velocity'
        },
        {
            title: 'Gravitational Potential',
            description: 'Explore the inner workings of gravitational potential and how a mass body has energy based on its surrounding gravitational field',
            category: 'Forces',
            path: 'gravitational-potential'
        },
        {
            title: 'Binding energy and mass defect',
            description: 'Understand Einstein\'s energy equation and how all atoms contain large amounts of energy which can be converted in a variety of ways',
            category: 'Particles',
            path: 'binding-energy-and-mass-defect'
        },
    ])

    const [searchTerm, setSearchTerm] = useState(null)

    function searchQuery(e) {
        setSearchTerm(e.target.value)
    }

    function displayTopic(topic) {
        return documentsContentListArray.map((a, i) => {
            // User search functionality

            let check = false
            // only display if categories match
            if (a.category == topic) {
                // check if search term is present, if not, show all topics
                if (searchTerm == null || searchTerm == 0) {
                    return <Selection key={i}
                        link={`${router.route}/${documentsContentListArray[i].title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                        title={documentsContentListArray[i].title}
                        description={documentsContentListArray[i].description} />
                } else {
                    // loop through fetched data, check if the path of current topic looped through is equal to the to path in data
                    // pageData.forEach(e => Object.keys(e).forEach((key, index) => {
                    //     if (e[key].toLowerCase().includes(searchTerm.toLowerCase())) {
                    //         if (a.path == key) return check = true
                    //     }
                    // })
                    // )
                    if (a.title.toLowerCase().includes(searchTerm.toLowerCase()) || check) {

                        return <Selection key={i}
                            link={`${router.route}/${documentsContentListArray[i].title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                            title={documentsContentListArray[i].title}
                            description={documentsContentListArray[i].description}
                        />


                    }

                }
            }
        }
        )
    }
    function searchComponent() {
        return (<div className={styles['search-content-wrapper']}>
            <input placeholder='Browse topics below or search' className={styles['user-topic-search']} id='user-search-topic' onChange={e => searchQuery(e)} type='text'></input>
        </div>)
    }

    return (
        <>
            <SecondaryBanner title='Physics' search={true ? searchComponent : <div>Loading</div>} subheader={`${documentsContentListArray.length} Articles · Updated 25/06/2022`} />
            <div className={styles['content-container']}>
                {!noResults ? <h2>No topics match search criteria</h2> : <></>}

                <div id='middle-content-container' className={styles['middle-content-container']}>
                    {forcesTopic ? <h2 id='forces-topic-title'>Forces</h2> : <></>}
                    <div id='forces-topic-wrapper' className={styles['middle-content-wrapper']}>
                        {displayTopic('Forces')}
                    </div>
                    {particlesTopic ? <h2 id='particles-topic-title'>Particles</h2> : <></>}
                    <div id='particles-topic-wrapper' className={styles['middle-content-wrapper']}>
                        {displayTopic('Particles')}
                    </div>
                </div>

            </div>
        </>
    )
}