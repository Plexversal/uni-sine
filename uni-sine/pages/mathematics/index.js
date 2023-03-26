import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import Selection from '../../components/page-construction/Selection'
import styles from '../../styles/Content.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Maths({  }) {

    const router = useRouter();
    const [pageData, setPageData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/page-data?currentRoute=${router.route}&absoluteURL=${`${window.location.protocol}//${window.location.host}${router.route}`}`);
        const data = await response.json();
        setPageData(data);
      };
      fetchData();
    }, [router.route]);


    const [algebraTopic, setAlgebraTopic] = useState(null)
    const [graphingTopic, setGraphingTopic] = useState(null)
    const [trigonometryTopic, setTrigonometryTopic] = useState(null)
    const [probabilityTopic, setProbabilityTopic] = useState(null)
    const [calculusTopic, setCalculusTopic] = useState(null)
    const [vectorsTopic, setVectorsTopic] = useState(null)

    const [noResults, setNoResults] = useState(false)


    useEffect(() => {
        setAlgebraTopic(document.getElementById('algebra-topic-wrapper').children.length > 0)
        setGraphingTopic(document.getElementById('graphing-topic-wrapper').children.length > 0)
        setTrigonometryTopic(document.getElementById('trigonometry-topic-wrapper').children.length > 0)
        setProbabilityTopic(document.getElementById('probability-topic-wrapper').children.length > 0)
        setCalculusTopic(document.getElementById('calculus-topic-wrapper').children.length > 0)
        setVectorsTopic(document.getElementById('vectors-topic-wrapper').children.length > 0)

        let collection = document.getElementById('middle-content-container').children
        setNoResults(Array.from(collection).some(e => e.tagName === 'H2'))

    })
    const [documentsContentListArray, setList] = useState([
        {
            title: 'Laws of exponents',
            description: 'Learn the fundamentals of powers and how to calculate results when using all the math operations with exponents involved.',
            category: 'Algebra',
            path: 'laws-of-exponents'
        },
        {
            title: 'Fraction laws',
            description: 'Learn the rules governing how to add, subtract, multiply and divide fractions as well as all the relevant terminology.',
            category: 'Algebra',
            path: 'fraction-laws'
        },
        {
            title: 'Fundamental Probability',
            description: 'The basics of probability including how to construct probability trees and Venn diagrams with correct notation.',
            category: 'Probability',
            path: 'fundamental-probability'

        },
        {
            title: 'Binomial and Normal distributions',
            description: 'Expand on the knowledge of probability and learn how real world data can be represented in probability distributions.',
            category: 'Probability',
            path: 'binomial-and-normal-distributions'
        },
        {
            title: 'Graphing Linear functions',
            description: 'Properties of graphs including intercepts and gradients. Various linear functions including point slope, slope intercept and standard form.',
            category: 'Graphing equations',
            path: 'graphing-linear-functions'
        },
        {
            title: 'Graphing Quadratic functions',
            description: 'Use the quadratic formula to find values of x and understand the properties of quadratic graphs such as minimum and maximum.',
            category: 'Graphing equations',
            path: 'graphing-quadratic-functions'
        },
        {
            title: 'Graphing Cubic functions',
            description: 'Expand on quadratic functions with cubic functions and learn how to differentiate cubic functions to find min and max.',
            category: 'Graphing equations',
            path: 'graphong-cubic-functions'
        },
        // {
        //     title: 'Graphing inequalities',
        //     description: '',
        //     category: 'Graphing equations',
        //     path: ''
        // },
        // {
        //     title: 'Graphing radicals',
        //     description: '',
        //     category: 'Graphing equations',
        //     path: ''
        // },
        {
            title: 'Graphing Logarithms and Exponentials',
            description: 'Use Exponential and logarithmic graphs to represent relationships between variables that are proportional over large ranges of values.',
            category: 'Graphing equations',
            path: 'graphing-logarithms-and-exponentials'
        },
        {
            title: 'Fundamental Trigonometry',
            description: 'Learn the basics of Trigonometry with cosine and sine rules, unit circles and Trigonometric identities.',
            category: 'Trigonometry',
            path: 'fundamental-trigonometry'
        },
        {
            title: "Triangle area and sectors",
            description: 'Calculate area of any triagle using a variety of techniques that range in complexity and expand knowledge of Trigonometry',
            category: 'Trigonometry',
            path: 'triangle-area-and-sectors'
        },
        {
            title: "Logarithms",
            description: 'Use logarithms to find variables in exponents and how to graph logarithmic functions. Explore the use of Eulers number with natural log.',
            category: 'Algebra',
            path: ''
        },
        {
            title: "Vectors",
            description: 'Using vectors to calculate direction and magnitude, incorporate properties of trigonometry and apply to real world situations.',
            category: 'Vectors',
            path: 'vectors'
        },
        // {
        //     title: "Differentiation",
        //     description: '',
        //     category: 'Calculus',
        //     path: ''
        // },
        // {
        //     title: 'Integration',
        //     description: '',
        //     category: 'Calculus',
        //     path: ''
        // },
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
                    pageData.forEach(e => Object.keys(e).forEach((key, index) => {
                        if (e[key].toLowerCase().includes(searchTerm.toLowerCase())) {
                            if (a.path == key) return check = true
                        }
                    })
                    )
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

    function searchComponent () {
        return (<div className={styles['search-content-wrapper']}>
        <input placeholder='Browse topics below or search' className={styles['user-topic-search']} id='user-search-topic' onChange={e => searchQuery(e)} type='text'></input>
    </div>)
    }

    return (
        <>
            <SecondaryBanner title='Mathematics' search={searchComponent} subheader={`${documentsContentListArray.length} Articles · Updated 25/06/2022`} />
            <div className={styles['content-container']}>

                {!noResults ? <h2>No topics match search criteria</h2> : <></>}

                        <div id='middle-content-container' className={styles['middle-content-container']}>
                            {algebraTopic ? <h2 id='algebra-topic-title'>Algebra</h2> : <></>}
                            <div id='algebra-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Algebra')}
                            </div>
                            {graphingTopic ? <h2 id='graphing-topic-title'>Graphing equations</h2> : <></>}
                            <div id='graphing-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Graphing equations')}
                            </div>
                            {trigonometryTopic ? <h2 id='trigonometry-topic-title'>Trigonometry</h2> : <></>}
                            <div id='trigonometry-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Trigonometry')}
                            </div>
                            {probabilityTopic ? <h2 id='probability-topic-title'>Probability</h2> : <></>}
                            <div id='probability-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Probability')}
                            </div>
                            {calculusTopic ? <h2 id='calculus-topic-title'>Calculus</h2> : <></>}
                            <div id='calculus-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Calculus')}
                            </div>
                            {vectorsTopic ? <h2 id='vectors-topic-title'>Vectors</h2> : <></>}
                            <div id='vectors-topic-wrapper' className={styles['middle-content-wrapper']}>
                                {displayTopic('Vectors')}
                            </div>
                        </div>
                
            </div>
        </>
    )
}