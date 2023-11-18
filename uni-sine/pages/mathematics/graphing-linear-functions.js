import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5Graph from  '../../components/p5-interactions/P5CustomGraph'


function Linear() {

    let [dom, setDom] = useState([])


    useEffect(() => {
        const getParagraphText = () => {
            const elems = document.body.getElementsByTagName('p');
            for (let i = 0; i < elems.length; i++) {
                setDom(a => [...a, elems[i].textContent]);
            }
        };

        if (typeof window !== 'undefined') {
            getParagraphText();
        }
    }, [])

    function minsToRead() {
        let text = dom.join(' ')
        let time = Math.ceil((text.length / 25) / 60) + 1 // all paragraph characters with 25 char per second read time plus 1 for images
        return `${time} minute read`
    }
    return (
        <>
            <SecondaryBanner title='Graphing linear functions' subheader={`${minsToRead()} · Updated 25/06/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Properties of linear function graphs</h2>

                    <p >Linear equations are the simplest of equations to graph. When you see the terms linear, it means practically means constant rate and so you can imagine this graph as a straight-line graph.</p>
                    <p >There are some terms that one should know when graphing equations:</p>
                    <p ><strong>Y-intercept:</strong> This is related to when the line on the graph crosses a point where the X component is 0, the Y value at this point is the Y-intercept.</p>
                    <p ><strong>X-intercept:</strong> This is related to when the line on the graph crosses a point where the Y component is 0, the X value at this point is the X-intercept.</p>
                    <p ><strong>Slope/gradient:</strong> This calculated using something called rise over run. If you pick a point on the line and then another point on that same line, you can count how much you need to go up the Y component (rise) and how much you need to go across the X component (run) to meet that point. You divide these numbers for the gradient.</p>
                    <p >Slope can be written as the formula:</p>
                    <img alt=''src="/static/maths/linear-equations/image001.png" className={styles['equation']}></img>
                    <p >Linear equations can be identified by the fact they won&rsquo;t have exponents in the equation. They can also be identified based on the format they are written in.</p>
                    <p >There are 3 types of linear equations:</p>
                    <ul >
                        <li>Point slope form</li>
                        <li>Slope intercept form</li>
                        <li>Standard form</li>
                    </ul>
                    <p ><strong>Formula of Point slope form:</strong></p>
                    <img alt=''src="/static/maths/linear-equations/image002.png" className={styles['equation']}></img>
                    <p >Point slope is used to determine a single point and the slope of a line. The m term in the equation relates to the slope.</p>
                    <p ><strong>Formula for Slope intercept form:</strong></p>
                    <img alt=''src="/static/maths/linear-equations/image003.png" className={styles['equation']}></img>
                    <p >Slope intercept is used to determine the slope and y intercept of a line. The b term in the equation relates to the y intercept value (0, b). The m term in the equation relates to the slope.</p>
                    <p ><strong>Formula for standard form:</strong></p>
                    <img alt=''src="/static/maths/linear-equations/image004.png" className={styles['equation']}></img>
                    <p >Standard form is used to solve equations in this form and A cannot be a negative number. A, B and C are whole numbers.&nbsp;</p>
                    <p >The equations above are often interchangeable and you can work out specific things when you have solved one. For example, point slope form can be converted to slope intercept form for the y-intercept.</p>
                    <p ><strong>Examples:</strong></p>
                    <div >
                        <ol >
                            <li >Given two points: (2, 3) and (-3, 1), work out the gradient of the line.</li>
                        </ol>
                    </div>
                    <img alt=''src="/static/maths/linear-equations/image005.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image006.png" className={styles['equation']}></img>
                    <p >It doesn&rsquo;t matter how we substitute, if we made y&shy;&shy;<sub>2</sub> = 3 and x<sub>2</sub> = 2, the answer will still be the same as the negative signs in both the numerator and denominator would cancel.&nbsp;</p>
                    <p >This makes sense logically if you imagine a line with two points, you can select either point and the slope is still going to be the same angle on the graph.</p>
                    <div >
                        <ol start={2}>
                            <li >Given one point: (-3,4) and a slope of 3, work out an equation for the y-intercept.</li>
                        </ol>
                    </div>
                    <p >We can use the point slope form to work out an equation for the y-intercept when given one point and the slope. We just substitute the numbers.</p>
                    <img alt=''src="/static/maths/linear-equations/image007.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image008.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image009.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image010.png" className={styles['equation']}></img>

                    <p >If you refer back to the notes above in the y-intercept form, you will see this matches that exact equation, hence these equations being related:</p>
                    <img alt=''src="/static/maths/linear-equations/image003.png" className={styles['equation']}></img>
                    <p >If we make x = 0 in this equation, it will give us the exact y-intercept for this line</p>
                    <img alt=''src="/static/maths/linear-equations/image011.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image012.png" className={styles['equation']}></img>
                    <div >
                        <ol start={3}>
                            <li >Graph the equation y = 3x + 7</li>
                        </ol>
                    </div>
                    <p >This equation is in the form y = mx + b and so we know that the slope is going to be 3 (m) and the y intercept will be 7.</p>
                    <p >The slope is 3/1 and so that means you can go 3 units up the y axis and 1 unit across to get to the next point. So doing this will present the following graph:</p>
                    <img alt=''src="/static/maths/linear-equations/linear_1.png" className={styles['equation']}></img>

                    <div >
                        <ol start={4}>
                            <li >Graph the equation 2x &ndash; 4y = 8</li>
                        </ol>
                    </div>
                    <p >This equation is in the form of Ax + By = C and so we can start by finding by finding each intercept by making either the x value or y value 0 for each intercept.</p>
                    <img alt=''src="/static/maths/linear-equations/image013.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image014.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image015.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image016.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image017.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/linear-equations/image018.png" className={styles['equation']}></img>

                    <p >Now we have the values for both intercepts, we can draw the line connecting these points:&nbsp;</p>
                    <img alt=''src="/static/maths/linear-equations/linear_2.png" className={styles['equation']}></img>



                </div>


            </article>
        </>
    )
}

export default Linear