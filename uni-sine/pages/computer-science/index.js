import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import Selection from '../../components/page-construction/Selection'
import styles from '../../styles/Content.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function CompScience({  }) {

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


    const [dataTopic, setDataTopic] = useState(null)
    const [programmingTopic, setProgrammingTopic] = useState(null)
    const [networkingTopic, setNetworkingTopic] = useState(null)
    const [hardwareTopic, setHardwareTopic] = useState(null)


    const [noResults, setNoResults] = useState(false)


    useEffect(() => {
        setDataTopic(document.getElementById('data-topic-wrapper').children.length > 0)
        setProgrammingTopic(document.getElementById('programming-topic-wrapper').children.length > 0)
        setNetworkingTopic(document.getElementById('networking-topic-wrapper').children.length > 0)
        setHardwareTopic(document.getElementById('hardware-topic-wrapper').children.length > 0)

        let collection = document.getElementById('middle-content-container').children
        setNoResults(Array.from(collection).some(e => e.tagName === 'H2'))

    })
    const [documentsContentListArray, setList] = useState([
        {
            title: 'Data Types',
            description: 'Understand what data types are and how they are used as the basis for controlling data in code',
            category: 'Data principles and databases',
            path: 'data-types'
        },
        {
            title: 'Binary search trees',
            description: 'Explore the visual aspect of a common sorting algorithm, binary search trees (BST). Used for sorting data effectively.',
            category: 'Data principles and databases',
            path: 'binary-search-trees'
        },
        {
            title: 'Sorting Algorithms',
            description: 'Learn the primary characteristics of sorting algorithms and the math behind the time complexity that makes certain algorithms better than others.',
            category: 'Programming',
            path: 'sorting-algorithms'
        },
        {
            title: 'Functions and Scope',
            description: 'Understand how functional programming works by using blocks of code to create highly complex algorithms and sequences.',
            category: 'Programming',
            path: 'functions-and-scope'
        },
        {
            title: 'Conditional and Logical statements',
            description: 'See how to program decision making and how code can take a path of execution based on true or false statements.',
            category: 'Programming',
            path: 'conditional-and-logical-statements'
        },
        {
            title: 'Hash tables and dictionaries',
            description: 'Understand the math and code behind hash tables and how data is handled using these coding techniques as well as the use of dictionaries.',
            category: 'Data principles and databases',
            path: 'hash-tables-and-dictionaries'
        },
        {
            title: 'TCP/IP model',
            description: 'Explore the TCP/IP model, its layered architecture, and its crucial role in modern computer networking, enabling flexibility, scalability, and reliability.',
            category: 'Networking',
            path: 'tcp-ip-model'
        },
        {
            title: 'TLS/SSL Encryption',
            description: 'See how the nature of Math can help to encrypt data online and protect people when authenticating and transmitting sensitive data.',
            category: 'Networking',
            path: 'tls-ssl-encryption'
        },
        {
            title: 'How the internet works',
            description: 'Basic understanding of how a network of computers around the world can form the basis for the most dependant information and communication service',
            category: 'Networking',
            path: 'the-internet'
        },
        {
            title: 'Central Processing Unit',
            description: 'Learn the mathematical process involved within a CPU and the constituent parts that make it up. See how CPU\'s interact with other computer components.',
            category: 'Hardware',
            path: 'central-processing-unit'
        },
        {
            title: 'Random Access Memory',
            description: 'See how RAM can store temporary data to quickly access and be processed by a CPU and how RAM is physically read from the smallest level.',
            category: 'Hardware',
            path: 'random-access-memory'
        },
        {
            title: 'Storage Devices',
            description: 'Learn how data can be stored permanently when there is a loss of power and the physics behind reading and writing data.',
            category: 'Hardware',
            path: 'storage-devices'
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
                        link={`${router.route}/${documentsContentListArray[i].path}`}
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
                            link={`${router.route}/${documentsContentListArray[i].path}`}
                            title={documentsContentListArray[i].title}
                            description={documentsContentListArray[i].description}
                        />


                    }

                }
            }
        }
        )
    }

    function searchComponent () {
        return (<div className={styles['search-content-wrapper']}>
        <input placeholder='Browse topics below or search' className={styles['user-topic-search']} id='user-search-topic' onChange={e => searchQuery(e)} type='text'></input>
    </div>)
    }

    return (
        <>
            <SecondaryBanner title='Computer Science' search={searchComponent} subheader={`${documentsContentListArray.length} Articles · Updated 25/06/2022`} />
            <div className={styles['content-container']}>

                {!noResults ? <h2>No topics match search criteria</h2> : <></>}

                        <div id='middle-content-container' className={styles['middle-content-container']}>
                            {dataTopic ? <h2 id='data-topic-title'>Data principles and databases</h2> : <></>}
                            <div id='data-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Data principles and databases')}
                            </div>
                            {programmingTopic ? <h2 id='programming-topic-title'>Programming</h2> : <></>}
                            <div id='programming-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Programming')}
                            </div>
                            {networkingTopic ? <h2 id='networking-topic-title'>Networking</h2> : <></>}
                            <div id='networking-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Networking')}
                            </div>
                            {hardwareTopic ? <h2 id='hardware-topic-title'>Hardware</h2> : <></>}
                            <div id='hardware-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Hardware')}
                            </div>   
                        </div>
                
            </div>
        </>
    )
}