import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5Graph from  '../../components/p5-interactions/P5QuadraticGraph'


function quadratic() {

    let [dom, setDom] = useState([])


    useEffect(() => {
        var elems = document.body.getElementsByTagName("p");
        for (var i = 0; i < elems.length; i++) {
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
            <SecondaryBanner title='Graphing Quadratic functions' subheader={`${minsToRead()} · Updated 26/06/2022`} />
            <Path />
            <article id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>

                    <h2 >Properties of quadratic graphs</h2>
                    <p >Quadratic equations can easily be identified as an x term is always squared. The general format for a quadratic equation is:</p>
                    <img src="/static/maths/quadratic-equations/image001.png" className={styles['equation']}></img>
                    <p >You can also identify a quadratic graph quite easily when looking at it. It has a distinct U-shape or &cap;-shape when negative.</p>
                    <p >A quadratic equation generally has two x-intercepts and to find these you can use the quadratic formula:</p>
                    <img src="/static/maths/quadratic-equations/image002.png" className={styles['equation']}></img>
                    <p >Inputting the values into this equation first for the positive and then for the negative gives two values which can be plotted on the graph.</p>
                    <h2 >Real roots</h2>
                    <img src="/static/maths/quadratic-equations/image003.png" className={styles['equation']}></img>
                    <p >You may notice that the discriminant which is the value under the square root sign may give a negative number, in this case the equation has no real roots and does not cross x-axis. The value would end up being an imaginary number.</p>
                    <p >If the discriminant is 0 then it touches the x-axis and has just the point which is the minimum or maximum of the curve (gradient = 0) at this point.</p>
                    <p >So, to summarise mathematically:</p>
                    <img src="/static/maths/quadratic-equations/image004.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image005.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image006.png" className={styles['equation']}></img>
                    <h2 >Finding the minimum/maximum</h2>
                    <p >The point where the curve has a gradient of 0 and switches direction is the maximum or minimum depending on the shape of the graph. This point can be calculated using the axis of symmetry determined by the following formula:</p>
                    <img src="/static/maths/quadratic-equations/image007.png" className={styles['equation']}></img>
                    <p >So, if we use this to determine the x value, the y value would simply be this value substituted into the original equation.</p>
                    <p >Technically this is all the information we need to graph the curve now. You can get more points of the curve by choosing a value for x, substituting into the equation and then seeing what value is given for y.</p>
                    <h2 >How to sketch a quadratic graph</h2>
                    <p >Taking into account the above, here are the steps to sketching a quadratic and getting all the information you need</p>
                    <ol >
                        <li>Determine the shape of the graph based on the x squared term&rsquo;s sign.</li>
                        <li>Find the minimum/maximum of the curve using the formula for x and substituting for y</li>
                        <li>Find the X-intercept and Y-intercept. The X-intercept may have two values and you use the quadratic formula to determine these two values. If the discriminant is negative then it has no real roots and does not cross the x-axis</li>
                        <li>Determine some points close the minimum/maximum point to help plot the graph</li>
                    </ol>
                    <p >Let&rsquo;s consider the following quadratic equation:</p>
                    <img src="/static/maths/quadratic-equations/image008.png" className={styles['equation']}></img>
                    <p >If you see the term f(x) it means the function of x and is basically equal to the y value.</p>
                    <p ><strong>Step 1) Determine the shape</strong></p>
                    <p >The shape of this graph is based on the coefficient of the x<sub>&shy;</sub>&shy;<sup>2</sup> term, also known as A. The coefficient is 1 is no other value representing A. This is positive and so that mean the shape will be U shaped.</p>
                    <p ><strong>Step 2) Find the minimum</strong></p>
                    <p >We are finding the minimum here because the A term is positive if it was negative, we find the maximum.</p>
                    <p >The minimum for x part of the coordinate is as follows:</p>
                    <img src="/static/maths/quadratic-equations/image007.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image009.png" className={styles['equation']}></img>
                    <p >The minimum for y part of the coordinate is as follows:</p>
                    <img src="/static/maths/quadratic-equations/image010.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image011.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image012.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image013.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image014.png" className={styles['equation']}></img>

                    <p >So, the coordinate for the minimum value of this quadratic is:</p>
                    <img src="/static/maths/quadratic-equations/image015.png" className={styles['equation']}></img>

                    <p ><strong>Step 3) Find the X-intercepts of the equation</strong></p>
                    <p >If you just require graphing the equation so far you can actually skip to the next step for plotting additional points, however if you are asked a question involving finding real roots then this is required.</p>
                    <p >We can simply substitute the values we have into the quadratic formula:</p>
                    <img src="/static/maths/quadratic-equations/image002.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image016.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image017.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image018.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image019.png" className={styles['equation']}></img>

                    <p >We have simplified enough here to determine a value for both the plus and minus sign:</p>
                    <img src="/static/maths/quadratic-equations/image020.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image021.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image022.png" className={styles['equation']}></img>

                    <p >Now for the minus:</p>
                    <img src="/static/maths/quadratic-equations/image023.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image024.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image025.png" className={styles['equation']}></img>

                    <p >So, x = 1 and 4, when y = 0</p>
                    <p >So right now, we have 3 points we can put on a graph which are the following:</p>
                    <img src="/static/maths/quadratic-equations/image026.png" className={styles['equation']}></img>
                    <p >On a graph it looks like this:</p>
                    <P5Graph  {...{showControls: false, showFunction: true, showIntercepts: false, a: 1, b: -5, c: 4}}/>

                    <p ><strong>Step 4) find some more points</strong></p>
                    <p >The last step is quite simple. All you have to do is choose at least 2 values where is x is close to the minimum x we found earlier and you could use the x-intercepts we found for reference as well. They don&rsquo;t have to be fractions like the x value; we can pick any integer.</p>
                    <p >So, in our example, 5/2 is the x value, this is just 2.5. The intercepts we found have x values of 1 and 4, so we could start with x = 0 and x = 5 and determine the relevant y values by substituting into the original equation so let&rsquo;s do that:</p>
                    <img src="/static/maths/quadratic-equations/image027.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image028.png" className={styles['equation']}></img>

                    <p >Now for x=5:</p>
                    <img src="/static/maths/quadratic-equations/image029.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image030.png" className={styles['equation']}></img>
                    <img src="/static/maths/quadratic-equations/image031.png" className={styles['equation']}></img>

                    <p >You will notice that the y value is the same for both of these values. This isn&rsquo;t a coincidence, the graph is a parabola and has a line of symmetry going through the gradient 0 point, so any value we pick at equal distance apart from the minimum is going to have equal y value.</p>
                    <p >So now we have two more points to plot:</p>
                    <img src="/static/maths/quadratic-equations/image032.png" className={styles['equation']}></img>

                    <p >In total we can plot the following points:</p>
                    <img src="/static/maths/quadratic-equations/image033.png" className={styles['equation']}></img>

                    <p >This is more than enough to draw the graph but you can keep choosing more x values if you want a more accurate graph but it will probably go off the page as the graph gets big quite quickly.</p>
                    <p >So here are the points on the graph:</p>
                    <p >Now all that is left to do is sketch the curve through these points:</p>
                    <P5Graph  {...{showControls: false, showFunction: false, showIntercepts: false, a: 1, b: -5, c: 4}}/>
                    <p >And that&rsquo;s it! It may seem like a lot of steps but if you remember the 4 steps from before in short form and practice sketching graphs with these rules it will be easy to remember. A lot of this requires visually understanding a graph and why it creates a curve too.</p>

                </div>


            </article>
        </>
    )
}

export default quadratic