import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import Selection from '../../components/page-construction/Selection'
import styles from '../../styles/Content.module.css'


/*

This should probably be changed to client side rendering using useEffect. 
This would allow local loading in search function which makes more sense as loading all this data may not be required for every load

*/
export async function getStaticProps() {
    let data = await fetch('http://localhost:3000/mathematics/probability').then(r => r.text())

    let data2 = await fetch('http://localhost:3000/mathematics/fundamental-trigonometry').then(r => r.text())
        
    let data3 = await fetch('http://localhost:3000/mathematics/graphing-cubic-functions').then(r => r.text())

    return {
        props: {
            prob: data,
            trig: data2
        }
    }
}

export default function Maths({prob, trig}) {

  let documentsContentListArray = [
    {
        title: 'Laws of exponents', 
        description: 'Learn the fundamentals of powers and how to calculate results when using all the math operations with exponents involved.'
    },
    {
        title: 'Fraction laws', 
        description: 'Learn the rules governing how to add, subtract, multiply and divide fractions as well as all the relevant terminology. '
    },
    {
        title: 'Fundamental Probability',
        description: 'The basics of probability including how to construct probability trees and Venn diagrams with correct notation.'
    },
    {
        title: 'Binomial and Normal distributions',
        description: 'Expand on the knowledge of probability and learn how real world data can be represented in probability distributions.'
    },
    {
        title: 'Vectors',
        description: ''
    },
    {
        title: 'Graphing Linear functions',
        description: ''
    },
    {
        title: 'Graphing Quadratic functions',
        description: ''
    },
    {
        title: 'Graphing Cubic functions',
        description: ''
    },
    {
        title: 'Graphing inequalities',
        description: ''
    },
    {
        title: 'Graphing radicals',
        description: ''
    },
    {
        title: 'Graphing Logarithms and exponentials',
        description: ''
    },
    {
        title: 'Fundamental Trigonometry',
        description: ''
    },
    {
        title: "Triangle area and sectors",
        description: ''
    },
    {
        title: "Logarithms",
        description: ''
    },
    {
        title: "Differentiation",
        description: ''
    },
    {
        title: 'Integration',
        description: ''
    },
    ]
    console.log(prob, trig)
    return (
        <>
            <SecondaryBanner title='Mathematics' subheader={`${documentsContentListArray.length} Articles · Updated 25/06/2022`} />
            <div className={styles['content-container']}>
                <div className={styles['search-content-wrapper']}>
                    <h3>Browse topics below or search</h3>
                    <input type='text'></input>
                </div>
                <div className={styles['middle-content-container']}>
                    {documentsContentListArray.map((a, i) =>
                        <Selection key={i}
                            link={`/mathematics/${documentsContentListArray[i].title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                            title={documentsContentListArray[i].title}
                            description={documentsContentListArray[i].description}
                        />
                    )}

                </div>
            </div>
        </>
    )
}