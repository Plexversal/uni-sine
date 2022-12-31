import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"

function ED() {
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
            <SecondaryBanner title='Exponential decay and half-life' subheader={`${minsToRead()} · Updated 22/03/2022`}  />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}> 
                    <h2>Half-life equation</h2>
                    <p>The decay of a single radioactive isotope cannot be predicted individually and is considered to be completely random. However, with an initial set amount of radioactive substance, we can calculate the time taken for how much of that substance has decayed into half of its original amount, this is called half-life.</p>
                    <p>The equation for calculating half-life is: </p>
                    <img alt=''src="/static/physics/half-life/image031.png" className={styles['equation']}></img>
                    <p>Written as:</p>
                    <img alt=''src="/static/physics/half-life/image032.png" className={styles['equation']}></img>
                    <p>To determine half-life and depending on the question, you will be given other information about the isotope you are working with in order to find the decay constant to complete the equation.</p>
                    <p>Each radioactive isotope has its own decay constant which can be calculated via various methods.</p>
                    <p>To calculate the decay constant/lambda when given an activity reading in becquerels (Bq) You would use:</p>
                    <img alt=''src="/static/physics/half-life/image033.png" className={styles['equation']}></img>
                    <p>Written as:</p>
                    <img alt=''src="/static/physics/half-life/image034.png" className={styles['equation']}></img>
                    <p>This equation can be rearranged of course depending on what variables or constants you are initially given from the question and what you are trying to solve.</p>
                    <p>Background activity needs to be taken into account before doing this equation however, which is simply calculated as:</p>
                    <img alt=''src="/static/physics/half-life/image035.png" className={styles['equation']}></img>
                    <p>Then the above equations can be completed properly with the consideration of background activity affecting the source of radioactive substance.</p>
                    <p>To calculate number of unstable nuclei remaining in a sample, you can use:</p>
                    <img alt=''src="/static/physics/half-life/image036.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/half-life/image037.png" className={styles['equation']}></img>
                    <p>The equation above of course can be rearranged to either find the decay constant itself if you are already given the half life time. For example:</p>
                    <img alt=''src="/static/physics/half-life/image038.png" className={styles['equation']}></img>
                    <p>Since N/N0 is equal to ½ and is the half life itself.</p>
                    <h2>Examples of calculating half-life</h2>
                    <p>A good example problem is to use the half-life of the radioactive isotope of carbon-14. This element is common to be used in these types of questions because it is actually related to how we find out how old a living organism was when we discover the remains of it.</p>
                    <p>Suppose we find a fossil that contains a set amount of carbon-14, say, 500g. The half-life of carbon-14 is approximately 5730 years. A living organism of the same kind is measured containing 900g of carbon-14. How old is the fossil?</p>
                    <p>We first need to find the decay constant:</p>
                    <img alt=''src="/static/physics/half-life/image039.png" className={styles['equation']}></img>
                    <p>Substituting the values, we get:</p>
                    <img alt=''src="/static/physics/half-life/image040.png" className={styles['equation']}></img>
                    <p>Using the equation for solving the number of unstable nuclei remaining, we can rearrange to solve for t (time):</p>
                    <img alt=''src="/static/physics/half-life/image041.png" className={styles['equation']}></img>
                    <p>Substituting the values, we get:</p>
                    <img alt=''src="/static/physics/half-life/image042.png" className={styles['equation']}></img>
                    <p>Rearrange the equation to solve for t:</p>
                    <img alt=''src="/static/physics/half-life/image043.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/half-life/image044.png" className={styles['equation']}></img>
                    <img alt=''src="/static/physics/half-life/image045.png" className={styles['equation']}></img>
                    <p>After rearranging and solving we get the time in years:</p>
                    <img alt=''src="/static/physics/half-life/image046.png" className={styles['equation']}></img>
                    <p>It’s important to note that the natural log of the samples difference is always going to be a negative number, if not, the result will be negative and you cannot have negative time. So, if the answer you get is negative when solving for time then something has gone wrong and you should check the answer.</p>
                    <p>Another thing to note is that as the natural log of the ratio between the sample and initial sample approaches zero, the time is also expected to become zero meaning that the sample is practically the same age, so it’s a good way to visualise the expected result of an equation like this based on the sample amounts.</p>
                    
                </div>


            </article>
        </>
    )
}

export default ED