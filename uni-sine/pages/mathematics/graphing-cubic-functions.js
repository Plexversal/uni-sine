import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5Graph from '../../components/p5-interactions/P5CustomGraph'


function Cubics() {

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
        let time = Math.ceil((text.length / 25) / 60) + 3 // all paragraph characters with 25 char per second read time plus 1 for images
        return `${time} minute read`
    }
    return (
        <>
            <SecondaryBanner title='Graphing Cubic functions' subheader={`${minsToRead()} · Updated 24/07/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <P5Graph {...{preset: 'cubic'}}/>
                    <h2>Properties of Cubic&rsquo;s</h2>
                    <p>Cubic functions are identified by the fact that have an x term which is cubed. The general format for a cubic equation is:</p>
                    <img alt=''src="/static/maths/cubic-equations/image001.png" className={styles['equation']}></img>
                    <p>This can also be in a factorised form which still has the capability to be graphed without expanding as the process is a simple substation in most cases.</p>
                    <p>Cubic functions differ to quadratic functions in that the graph will always cross the x axis, this is because there is at least one real root in the equation.</p>
                    <h2>Local minimum and maximum</h2>
                    <p>Local minimum point refers to the point in which the point on the graph has a horizontal tangent of 0 slope. The local maximum is the same, the difference between the two points is that it indicates if the graph continues down the y-axis or up the y-axis dependant on the sign of the value.</p>
                    <p>The term local in this case refers to the local area of the graph as unlike other graphs, Cubic&rsquo;s will continue forever and cannot have an absolute maximum or minimum and so the term local is used.</p>
                    <p>Since a min and max point is simply the tangent at zero, we can use differentiation to determine a tangent point value at any x value. When we find the derivative, we actually want to ask the reverse question of when the tangent is zero what x value is that. The following steps will be taken to determine the value of the local min and max points:</p>
                    <ul>
                        <li>Differentiate the general cubic function to get a general quadratic equation</li>
                        <li>Use the quadratic equation within the quadratic formula to get the x values of the local minimum and maximum. (This works by setting the resultant quadratic equation to zero to find the roots)</li>
                        <li>Use the second derivative of the original equation to determine if the point is a min or max point based on the discriminates value.</li>
                        <li>Find additional points to help plot the graph such as the y-intercept (x = 0).</li>
                    </ul>
                    <h3>Example</h3>
                    <p>Find the local minimum and maximum of the cubic function f(x) = x<sup>3</sup> &ndash; 7x<sup>2</sup> + 10x + 4</p>
                    <p>Step 1) Differentiate the equation:</p>
                    <img alt=''src="/static/maths/cubic-equations/image002.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image003.png" className={styles['equation']}></img>
                    
                    <p>Step 2) Input this quadratic into the quadratic equation:</p>
                    <img alt=''src="/static/maths/cubic-equations/image004.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image005.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image006.png" className={styles['equation']}></img>
                    
                    <p>The discriminant is a none zero number and so there will be 2 answers for the x value and so a minimum and maximum will be present.</p>
                    <img alt=''src="/static/maths/cubic-equations/image007.png" className={styles['equation']}></img>
                    <p>The Y value for the above points can be found simply by putting these specific x values back into the cubic equation:</p>
                    <img alt=''src="/static/maths/cubic-equations/correction-image001.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/correction-image002.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/correction-image003.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/correction-image004.png" className={styles['equation']}></img>


                    <p>Step 3) find the second derivative of the quadratic equation and input the x values we just found:</p>
                    <img alt=''src="/static/maths/cubic-equations/image003.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image008.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image009.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image010.png" className={styles['equation']}></img>

                    <p>Now we know that for x at 3.8, the second derivative is positive meaning that this is a local minimum because the graph is set to go positive in the y axis on either side.</p>
                    <p>We also know that for x at 0.9, the second derivative is negative meaning that this is a local maximum because the graph is set to go negative in the y axis on either side.</p>
                    <p>Step 4) Find more values to help graph the equation.</p>
                    <p>The first easy one to graph is x = 0 as with most graphs.</p>
                    <img alt=''src="/static/maths/cubic-equations/image011.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image012.png" className={styles['equation']}></img>

                    <p>You may also choose points closest to the nearest integer of the min and max points. So, in this case x = 4 and x = 0. We already had x = 0 so x = 1 could work too.</p>
                    <p>So, plotting the points gives the following:</p>
                    <img alt=''src="/static/maths/cubic-equations/cubic_1.png" className={styles['equation']}></img>


                    <p>Connecting the graph should result in the following cubic:</p>
                    <img alt=''src="/static/maths/cubic-equations/cubic_2.png" className={styles['equation']}></img>

                    
                    <h2>Saddle point</h2>
                    <p>A saddle point is a cubic with just one real root in which one point at the graph has a tangent slope of 0.</p>
                    <p>You use the same methods above when finding min and max points but the discriminant will always be zero for a saddle point. This means only one x value from the quadratic formula.</p>
                    <h3>Example</h3>
                    <p>Find the slope of the tangent line equal to zero for the cubic function: f(x) = x<sup>3</sup> + 3</p>
                    <p>First differentiate the function:</p>
                    <img alt=''src="/static/maths/cubic-equations/image013.png" className={styles['equation']}></img>
                    
                    <p>Now substitute this into the quadratic formula:</p>
                    <img alt=''src="/static/maths/cubic-equations/image004.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image014.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image015.png" className={styles['equation']}></img>

                    <p>We didn&rsquo;t have to use the quadratic formula here because knowing that 3x<sup>2</sup> = 0, then x would have to be zero anyway but it&rsquo;s good to visualise how zero is the answer and the fact there is only one answer instead of 2 answers indicating this is indeed a saddle point.</p>
                    <p>Substituting x = 0 back into the original cubic function gives a y value of 3. So when x = 0, y = 3. This is our first point.</p>
                    <p>To graph this function, we can take an x point at either side of this saddle point and work out the y value.</p>
                    <p>The two values would be 1 and -1.</p>
                    <img alt=''src="/static/maths/cubic-equations/image016.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image017.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image018.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image019.png" className={styles['equation']}></img>

                    <p>You could use additional points such as -2 and 2 for more accuracy or even fractional x values but this should be enough to graph:</p>
                    <img alt=''src="/static/maths/cubic-equations/cubic_3.png" className={styles['equation']}></img>
                    
                    <h2>Factorised form</h2>
                    <p>Graph the equation: f(x) = (x + 2)<sup>3</sup></p>
                    <p>When in factorised form such as this it can be rewritten into the form below:</p>
                    <img alt=''src="/static/maths/cubic-equations/image020.png" className={styles['equation']}></img>

                    <p>When in this form it can be easier to work out what any y value is when we substitute an x value as we can just complete the equation.</p>
                    <p>We need to find points to plot on the graph, we need to know the point in which the graph curves and if it has a minimum, maximum or saddle point. It may also not have a point in which the gradient of the curve is zero and so we would need to know that too.</p>
                    <p>To find any points where the gradient is zero, we need to expand the factorised form to then use the methods mentioned before:</p>
                    <img alt=''src="/static/maths/cubic-equations/image021.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image022.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image023.png" className={styles['equation']}></img>

                    <p>Now we can find the first derivative of the above expression:</p>
                    <img alt=''src="/static/maths/cubic-equations/image024.png" className={styles['equation']}></img>

                    <p>Using the derived expression, we can use the quadratic formula to find the roots and determine where the graph will have any x values where the gradient of the tangent line equals zero.</p>
                    <img alt=''src="/static/maths/cubic-equations/image004.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image025.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image026.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image027.png" className={styles['equation']}></img>

                    <p>We now know that when x = -2, y = 0. We also know how this graph should look as it has just one point meaning a saddle point, it should rise and stop then rise again.</p>
                    <p>We can now calculate additional points such as x = -3 and x = -1 because these are close to the saddle point:</p>
                    <img alt=''src="/static/maths/cubic-equations/image028.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image029.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image030.png" className={styles['equation']}></img>

                    <p>When x = -3, y = -1</p>
                    <img alt=''src="/static/maths/cubic-equations/image031.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image032.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/cubic-equations/image033.png" className={styles['equation']}></img>

                    <p>When x = -1, y = 1</p>
                    <p>We should now have enough points to graph the equation, you could plot more using the same method for better accuracy.</p>
                    <img alt=''src="/static/maths/cubic-equations/cubic_4.png" className={styles['equation']}></img>

                    
       

                </div>


            </article>
        </>
    )
}

export default Cubics