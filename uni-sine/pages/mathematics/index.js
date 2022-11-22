import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import Selection from '../../components/page-construction/Selection'
import styles from '../../styles/Content.module.css'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import fs from 'fs/promises'
import util from 'util'
import path from 'path'

export async function getStaticProps() {
    let paths1 = await fs.readdir('../uni-sine/pages/mathematics')
    let paths = paths1.map((e, i) =>
        e.replace(/\.[^\/.]+$/, "")

    ).filter(e => e != `index`)
    return {
        props: {
            paths
        }
    }
}

export default function Maths({ paths }) {

    const [currentDir, setCurrentDir] = useState(null)
    useEffect(() => {
        setCurrentDir(window.location.pathname)
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
            path: 'probability'

        },
        {
            title: 'Binomial and Normal distributions',
            description: 'Expand on the knowledge of probability and learn how real world data can be represented in probability distributions.',
            category: 'Probability',
            path: ''
        },
        {
            title: 'Vectors',
            description: '',
            category: 'Vectors',
            path: ''
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
        {
            title: 'Graphing inequalities',
            description: '',
            category: 'Graphing equations',
            path: ''
        },
        {
            title: 'Graphing radicals',
            description: '',
            category: 'Graphing equations',
            path: ''
        },
        {
            title: 'Graphing Logarithms and exponentials',
            description: '',
            category: 'Graphing equations',
            path: ''
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
            description: '',
            category: 'Algebra',
            path: ''
        },
        {
            title: "Differentiation",
            description: '',
            category: 'Calculus',
            path: ''
        },
        {
            title: 'Integration',
            description: '',
            category: 'Calculus',
            path: ''
        },
    ])

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [searchTerm, setSearchTerm] = useState(null)

    function searchQuery(e) {
        // fetch all pages available in maths and store all the html data locally for the client
        setSearchTerm(e.target.value)
        if (!(data.length > 0)) {
            setLoading(true)
            paths.forEach(e => {
                fetch(`http://localhost:3000/mathematics/${e}`)
                    .then(r => r.text())
                    .then((data) => {
                        setData(oldArray => [...oldArray, { [e]: data }])
                        setLoading(false)
                    })
            })
        }


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
                        link={`${currentDir}/${documentsContentListArray[i].title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                        title={documentsContentListArray[i].title}
                        description={documentsContentListArray[i].description} />
                } else {
                    // loop through fetched data, check if the path of current topic looped through is equal to the to path in data
                    data.forEach(e => Object.keys(e).forEach((key, index) => {
                        if (e[key].toLowerCase().includes(searchTerm)) {
                            if (a.path == key) return check = true
                        }
                    })
                    )
                    if (a.title.toLowerCase().includes(searchTerm?.toLowerCase()) || check) {

                        return <Selection key={i}
                            link={`${currentDir}/${documentsContentListArray[i].title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                            title={documentsContentListArray[i].title}
                            description={documentsContentListArray[i].description}
                        />


                    }

                }
            }
        }
        )
    }


    return (
        <>
            <SecondaryBanner title='Mathematics' subheader={`${documentsContentListArray.length} Articles · Updated 25/06/2022`} />
            <div className={styles['content-container']}>
                <div className={styles['search-content-wrapper']}>
                    <h3>Browse topics below or search</h3>
                    <input placeholder='Search topics' className={styles['user-topic-search']} id='user-search-topic' onChange={e => searchQuery(e)} type='text'></input>
                </div>
                {


                    isLoading ? <p>Loading</p> :
                        <div className={styles['middle-content-container']}>
                            <h2>Algebra</h2>
                            <div className={styles['middle-content-wrapper']}>
                                {displayTopic('Algebra')}
                            </div>
                            <h2>Calculus</h2>
                            <div className={styles['middle-content-wrapper']}>
                                {displayTopic('Calculus')}
                            </div>
                            <h2>Probability</h2>
                            <div className={styles['middle-content-wrapper']}>
                                {displayTopic('Probability')}
                            </div>
                            <h2>Graphing equations</h2>
                            <div className={styles['middle-content-wrapper']}>
                                {displayTopic('Graphing equations')}
                            </div>
                            <h2>Trigonometry</h2>
                            <div className={styles['middle-content-wrapper']}>
                                {displayTopic('Trigonometry')}
                            </div>
                        </div>
                }
            </div>
        </>
    )
}