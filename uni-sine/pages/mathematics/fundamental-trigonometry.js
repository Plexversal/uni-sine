import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5Trig from  '../../components/p5-interactions/P5TrigTriangle'


function Trig() {

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
            <SecondaryBanner title='Fundamental Trigonometry' subheader={`${minsToRead()} · Updated 21/08/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h1>Fundamental Trigonometry</h1>
                    <P5Trig {...{custom: true}}/>

                    <h2>Right-angled triangles</h2>
                    <p>Right angled triangles have at least one 90-degree angle and the formulas used to calculate missing angles or sides in these triangles are specific to right-angled triangles only.</p>
                    <p>There are 3 formulas for working with sides and angles in these triangles:</p>
                    <img alt=''src="/static/maths/trig/image001.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image002.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image003.png" className={styles['equation']}></img>
                    <p>This is often abbreviated to SOH CAH TOA.</p>
                    <p>The sides of a triangle include the opposite, adjacent and the hypotenuse:</p>
                    <ul>
                        <li>Opposite side is the side of the triangle which is opposite the angle given.</li>
                        <li>Adjacent side is the side next to the angle given.</li>
                        <li>Hypotenuse is the side opposite the right angle.</li>
                    </ul>
                    <p>Theta (&Theta;) represents the angle between the sides of the triangle. This can be given or missing to work out sides or angles depending on the question at hand.</p>
                    <p>You can inverse all of these trigonometric functions to find actual angle values. The inverse of each trigonometric function is the following:</p>
                    <img alt=''src="/static/maths/trig/image004.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image005.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image006.png" className={styles['equation']}></img>
                    <p>Another rule for working with right angled triangles is the Pythagorean theorem:</p>
                    <img alt=''src="/static/maths/trig/image007.png" className={styles['equation']}></img>
                    <p>This rule dictates that the hypotenuse of a triangle (c) is equal to the sum of the other sides squared.</p>
                    <p>To solve a question relating to triangle geometry, you can follow the steps below:</p>
                    <ol>
                        <li>Identify the type of triangle, if it is a right-angled triangle or not. Or if the triangle could be split into right-angled triangles and if that would be helpful.</li>
                        <li>Identify which sides are present and which are missing out of the hypotenuse, adjacent and opposite.</li>
                        <li>Identify which angles are given and which should be used to solve the question. In right-angled triangles there will always be a 90-degree angle but this is not used in the formulas.</li>
                        <li>Input the values into the correct formula and rearrange to solve for the missing variable.</li>
                    </ol>
                    <h3>Examples</h3>
                    <p>These rules are best represented with examples so here are some examples of finding the sides and angles of right-angled triangles:</p>
                    <ol start={1}>
                        <li>Find the missing angle theta in radians for the below triangle:</li>
                    </ol>
                    <P5Trig {...{point1x: 2.27, point1y: 2, point2x: 8.27, point2y: 2, point3x: 2.27, point3y: 7, 
                        showSidea: false, showSideb: true, showSidec: true, showAngleA: false, showAngleB: true, showAngleC: false, hideB: true }}/>
                    <p>Firstly, we can identify the sides relative to the angle.</p>
                    <p>Hypotenuse = side c as it is <strong>opposite the right angle</strong> and we know the value to be 7.81.</p>
                    <p>Opposite side = side b as it is <strong>opposite the missing angle</strong>, and we know the value to be 6.</p>
                    <p>Adjacent side = side a as it is <strong>next to </strong>the angle. The value is not given.</p>
                    <p>So, we have the opposite side and the hypotenuse, the relevant formula for dealing with both of these sides is SOH:</p>
                    <img alt=''src="/static/maths/trig/image001.png" className={styles['equation']}></img>
                    <p>We can now substitute:</p>
                    <img alt=''src="/static/maths/trig/image008.png" className={styles['equation']}></img>
                    <p>Using the inverse of the sin function we can get the value of theta:</p>
                    <img alt=''src="/static/maths/trig/image009.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image010.png" className={styles['equation']}></img>
                    <ol start={2}>
                        <li>Find the value for side c for the below right-angled triangle:</li>
                    </ol>
                    <P5Trig {...{point1x: 6, point1y: 1.9475, point2x: 1, point2y: 1.9475, point3x: 6, point3y: 6.4475, 
                    showSidea: true, showSideb: true, showSidec: true, showAngleA: false, showAngleB: false, showAngleC: false, hidec: true }}/>

                    <p>This question has one missing side so we can use the Pythagorean theorem to work out the missing side:</p>
                    <img alt=''src="/static/maths/trig/image007.png" className={styles['equation']}></img>
                    
                    <p>The missing side is the hypotenuse so we do not have to rearrange the equation to solve for a different side as c is the hypotenuse.</p>
                    <p>We can simply substitute:</p>
                    <img alt=''src="/static/maths/trig/image011.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image012.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image013.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image014.png" className={styles['equation']}></img>
                    <ol start={3}>
                        <li>Find the value for side b for the below triangle:</li>
                    </ol>
                    <P5Trig {...{point1x: 7.2, point1y: 7, point2x: 7.2, point2y: 2.2, point3x: 1.2, point3y: 7, 
                    showSidea: true, showSideb: true, showSidec: false, showAngleA: true, showAngleB: false, showAngleC: false, hideb: true}}/>

                    <p>There is only one side given in this question so it rules out the ability to use the Pythagorean theorem as that would leave 2 missing variables and we need to solve for one.</p>
                    <p>We have an angle given in the triangle as well as one side. The side given is the opposite side as it is <strong>opposite</strong> the given angle.</p>
                    <p>The side to work out is the adjacent side as it is <strong>next to</strong> the angle.</p>
                    <p>The trigonometric formula for dealing with Adjacent sides is TOA:</p>
                    <img alt=''src="/static/maths/trig/image003.png" className={styles['equation']}></img>

                    <p>We don&rsquo;t have the opposite side but we do have the angle. We can substitute and rearrange:</p>
                    <img alt=''src="/static/maths/trig/image015.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image016.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image017.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image018.png" className={styles['equation']}></img>

                    
                    <h2>Unit circle</h2>
                    <p>The term unit circle simply means a circle with radius 1 of any unit.</p>
                    <p>The visual representation of the unit circle can help to understand the units of radians and how a triangle can have radians specified in terms of pi radians.</p>
                    <p><em>Insert picture</em></p>
                    <p>If we draw a right-angled triangle in this circle, we can establish that it has 2 unknown point on the circle that have individual x and y values.</p>
                    <p>We know however that this is a unit circle and the radius is 1, so the hypotenuse of this triangle is 1. We also have the angle, so to work out the first point we know that the length of the adjacent side is going to also be the x value.</p>
                    <p>Using trigonometric functions, we know that cosine of the angle is the adjacent divided by the hypotenuse:</p>
                    <img alt=''src="/static/maths/trig/image019.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image020.png" className={styles['equation']}></img>
                    <p>So, if b is the length and also the x value, we can equate the following:</p>
                    <img alt=''src="/static/maths/trig/image021.png" className={styles['equation']}></img>
                    <p>We can do the same for the y value. Since the y value will be the length of the opposite side, a, then we know that we just need to use trigonometric functions relevant to it. In this case it is sine of the angle equal to the opposite side over hypotenuse:</p>
                    <img alt=''src="/static/maths/trig/image022.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image023.png" className={styles['equation']}></img>
                    <p>So, if a is the length and also the y value, we can equate the following:</p>
                    <img alt=''src="/static/maths/trig/image024.png" className={styles['equation']}></img>

                    <p>This is important because it now expands the values of sine and cosine outside of triangles and within a circle instead, allowing angles of more than 180 degrees or pi.</p>
                    <p>Using this we can also establish how radians work.</p>
                    <p>Radians are not a unit of measure but rather a ratio between the arc length and the radius of the circle. Knowing that the arc length of the entire circle is going to be 2*pi*r and this being the unit circle r is just 1, then arc length is just 2pi.</p>
                    <img alt=''src="/static/maths/trig/image025.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image026.png" className={styles['equation']}></img>
                    <p>With this we can also work out other angles such as half a circle:</p>
                    <img alt=''src="/static/maths/trig/image027.png" className={styles['equation']}></img>

                    <p><em>Insert image</em></p>
                    <p>This can continue for any angle you like and all the angles in radians are in terms of pi based on this unit circle. The radius of the circle does not affect the angle as all circles are the same shape. This gives a universal measure of how radians can be used to describe angles of any kind.</p>
                    <h2>Sine rule</h2>
                    <img alt=''src="/static/maths/trig/image028.png" className={styles['equation']}></img>
                    <p>You can calculate sides and angles of any triangle if you are given specific angles and sides using the sine rule. This is regardless of if the triangle is a right-angled triangle or not.</p>
                    <p>If you are given a side and the angle opposite as well as another side or angle with its opposing side or angle missing, you can use the sine rule to calculate this.</p>
                    <p>Remember that the side opposite has the angle name relevant to that side name. For example, side a will always have angle A opposite. The same is for the others.</p>
                    <p>Derivation of the sine rule:</p>
                    <p>We can use the trigonometric equations to prove the sine rule by splitting any triangle into 2 right-angled triangles by the altitude (h) and introducing a new point X:</p>
                    <p>Using the following trigonometric equation for both triangles we get the following substitution:</p>
                    <img alt=''src="/static/maths/trig/image001.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image030.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image031.png" className={styles['equation']}></img>

                    <p>So, we can solve for h using all these variables:</p>
                    <img alt=''src="/static/maths/trig/image032.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image033.png" className={styles['equation']}></img>

                    <p>Therefore:</p>
                    <img alt=''src="/static/maths/trig/image034.png" className={styles['equation']}></img>

                    <p>We can then rearrange the equation for opposite sides and angles being together:</p>
                    <img alt=''src="/static/maths/trig/image035.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image036.png" className={styles['equation']}></img>
                    
                    <p>The same applies for angle C and side if you change the altitude to incorporate the angle as well with the same methods above, thus giving:</p>
                    <img alt=''src="/static/maths/trig/image028.png" className={styles['equation']}></img>

                    <h3>Examples</h3>
                    <ol>
                        <li>Find the value for side length a in the below triangle:</li>
                    </ol>
                    <P5Trig {...{point1x: 2.03, point1y: 3.4075, point2x: 7.77, point2y: 2.6475, point3x: 4.85, point3y: 6.9075,
                    showSidea: true, showSideb: true, showSidec: false, showAngleA: true, showAngleB: true, showAngleC: false, hidea: true }}/>

                    <p>Firstly, we can identify what rule to use based on the missing sides and given sides/angles. In this example, we have side b, angle B and angle A. So, we can use the sine rule to workout side a:</p>
                    <img alt=''src="/static/maths/trig/image001edit (1).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (2).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (3).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (4).png" className={styles['equation']}></img>
                    <ol start="2">
                        <li>Find the value for angle C in the below triangle:</li>
                    </ol>
                    <P5Trig {...{point1x: 8.19, point1y: 6.8075, point2x: 5.05, point2y: 2.4475, point3x: 1.23, point3y: 4.0275,
                    showSidea: false, showSideb: true, showSidec: true, showAngleA: false, showAngleB: true, showAngleC: false, hideC: true }}/>

                    <p>Identifying the sides and angles given, we can see that we have side c which is opposite the angle and we also have side b with its corresponding angle B.</p>
                    <p>Using this information, we can substitute the values:</p>
                    <img alt=''src="/static/maths/trig/image001edit (5).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (6).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (7).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (8).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (9).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (10).png" className={styles['equation']}></img>


                    <h2>Cosine rule</h2>
                    <img alt=''src="/static/maths/trig/image046.png" className={styles['equation']}></img>
                    <p>Rewriting this equation can give you the angle:</p>
                    <img alt=''src="/static/maths/trig/image047.png" className={styles['equation']}></img>
                    <p>These equations can help find an angle when given all its sides and an opposite side when given 2 sides and an included angle.</p>
                    <p>The angle being worked out in the formula about is the angle between sides a and b, this however can be rearranged to find a different included angle if named differently.</p>
                    <p>Derivation of the cosine rule:</p>
                    <p>Using the trigonometric equations, we can define how cosine can help so solve sides and angles of triangles.</p>
                    <p>We can then split any triangle using the altitude of the triangle (h):</p>
                    <p>Side a is then split into 2 lengths:</p>
                    <img alt=''src="/static/maths/trig/image048.png" className={styles['equation']}></img>

                    <p>If we take substitute into Pythagoras&rsquo; theorem, we can find side h:</p>
                    <img alt=''src="/static/maths/trig/image049.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image050.png" className={styles['equation']}></img>

                    <p>We can also find side b using the same method:</p>
                    <img alt=''src="/static/maths/trig/image051.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image052.png" className={styles['equation']}></img>
                    <p>Thus:</p>
                    <img alt=''src="/static/maths/trig/image053.png" className={styles['equation']}></img>

                    <p>Expanding the brackets gives:</p>
                    <img alt=''src="/static/maths/trig/image054.png" className={styles['equation']}></img>

                    <p>Simplifying:</p>
                    <img alt=''src="/static/maths/trig/image055.png" className={styles['equation']}></img>

                    <p>Now we can find a1 in terms of angles and sides using the relevant trigonometric equation:</p>
                    <img alt=''src="/static/maths/trig/image002.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image056.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image057.png" className={styles['equation']}></img>
                    <p>Substituting backing to the equation:</p>
                    <img alt=''src="/static/maths/trig/image058.png" className={styles['equation']}></img>
                    <p>This can be rearranged to solve for a different angle:</p>
                    <img alt=''src="/static/maths/trig/image059.png" className={styles['equation']}></img>
                    <p>This is the original cosine rule.</p>
                    <h3>Examples:</h3>
                    <ol>
                        <li>Find the missing angle in the below triangle:</li>
                    </ol>
                    <P5Trig {...{point1x: 1.31, point1y: 5.5275, point2x: 8.87, point2y: 2.7275, point3x: 5.25, point3y: 6.8875,
                    showSidea: true, showSideb: true, showSidec: true, showAngleA: false, showAngleB: false, showAngleC: true, hideC: true }}/>

                    <p>We have been given the sides <strong>between</strong> a missing angle and <strong>all</strong> sides are given. So, we know we can use the cosine rule to work out the missing angle.</p>
                    <p>The formula requires just the sides to work out this angle. Side c in the formula would be the side <strong>opposite</strong> the missing angle so now we can substitute knowing these facts:</p>
                    <img alt=''src="/static/maths/trig/image001edit (11).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (12).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (13).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (14).png" className={styles['equation']}></img>


                    <ol start={2}>
                        <li >Find the missing side in the below triangle:</li>
                    </ol>
                    <P5Trig {...{point1x: 1.31, point1y: 5.5275, point2x: 1.71, point2y: 1.7675, point3x: 8.15, point3y: 8.1075,
                    showSidea: true, showSideb: true, showSidec: true, showAngleA: true, showAngleB: false, showAngleC: false, hidea: true  }}/>
                    
                    <p>In this triangle with have values for side b and c but not a, however this does not change the equation. Because the sides and angles do not correlate with the equation. Angle A is between sides b and c and so we can use the equation as normal to solve for side a:</p>
                    <img alt=''src="/static/maths/trig/image001edit (15).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (16).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (17).png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image001edit (18).png" className={styles['equation']}></img>

                    <h2>Trigonometric identities</h2>
                    <p>Trigonometric identities equate different Pythagorean where they are true for any value, which make it an identity. They help break down different trigonometric functions into known functions.</p>
                    <p>The fundamental identities to know are the following:</p>
                    <p><strong>Reciprocals:</strong></p>
                    <img alt=''src="/static/maths/trig/image066.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image067.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image068.png" className={styles['equation']}></img>

                    <p><strong>Ratios:</strong></p>
                    <img alt=''src="/static/maths/trig/image069.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image070.png" className={styles['equation']}></img>

                    <p><strong>Compliments: </strong></p>
                    <img alt=''src="/static/maths/trig/image071.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image072.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image073.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image074.png" className={styles['equation']}></img>

                    <p><strong>Pythagorean identity</strong></p>
                    <p>Given the equation for a circle is the following:</p>
                    <img alt=''src="/static/maths/trig/image075.png" className={styles['equation']}></img>

                    <p>The unit circle has the radius 1 and we know that x and y can be substituted with trigonometric functions instead giving the following formula:</p>
                    <img alt=''src="/static/maths/trig/image076.png" className={styles['equation']}></img>

                    <p>This is useful because it can now use the previous rules and convert to many useful identities:</p>
                    <p>If we rearrange, we get the following:</p>
                    <img alt=''src="/static/maths/trig/image077.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image078.png" className={styles['equation']}></img>

                    <p>If we divide through by cos theta we get:</p>
                    <img alt=''src="/static/maths/trig/image079.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image080.png" className={styles['equation']}></img>

                    <p>If we divide through by sin theta we get:</p>
                    <img alt=''src="/static/maths/trig/image081.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image082.png" className={styles['equation']}></img>

                    <p><strong>Compound angle identities:</strong></p>
                    <img alt=''src="/static/maths/trig/image083.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image084.png" className={styles['equation']}></img>

                    <p>Using the above formulas, we can work out the same compound angle formula for cosine and tangent.</p>
                    <p>Using the compliment identity, we can work out terms in sine:</p>
                    <img alt=''src="/static/maths/trig/image085.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image086.png" className={styles['equation']}></img>
                    <p>Simplified using compliments:</p>
                    <img alt=''src="/static/maths/trig/image087.png" className={styles['equation']}></img>
                    <p>The signs can be switch to give the following:</p>
                    <img alt=''src="/static/maths/trig/image088.png" className={styles['equation']}></img>
                    <p>For tan, given we have an identity that links sine and cosine with tan we can rewrite the formula in these terms:</p>
                    <img alt=''src="/static/maths/trig/image089.png" className={styles['equation']}></img>

                    <p>The terms we have now directly relate to the identities we established above and so we can substitute and work with that:</p>
                    <img alt=''src="/static/maths/trig/image090.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image091.png" className={styles['equation']}></img>

                    <p>Using the tan ratio identity, it provides the following:</p>
                    <img alt=''src="/static/maths/trig/image092.png" className={styles['equation']}></img>

                    <p>You can inverse the signs for the following:</p>
                    <img alt=''src="/static/maths/trig/image093.png" className={styles['equation']}></img>

                    <p><strong>Double angle identities:</strong></p>
                    <p>Using the above compound angle identities, we can let alpha and beta be the same giving 2x of the angle.</p>
                    <p>For sine double angle identity:</p>
                    <img alt=''src="/static/maths/trig/image094.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image095.png" className={styles['equation']}></img>

                    <p>For cosine, there are multiple that can be derived using multiple identity rules:</p>
                    <img alt=''src="/static/maths/trig/image096.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image097.png" className={styles['equation']}></img>

                    <p>Given that:</p>
                    <img alt=''src="/static/maths/trig/image076.png" className={styles['equation']}></img>

                    <p>We can rearrange for sine and cosine:</p>
                    <img alt=''src="/static/maths/trig/image078.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image077.png" className={styles['equation']}></img>

                    <p>We can substitute these into the formula we derived for 2 other solutions in terms of cosine and sine only:</p>
                    <img alt=''src="/static/maths/trig/image098.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image099.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image100.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image101.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image102.png" className={styles['equation']}></img>

                    <p>For tangent double angle identity:</p>
                    <img alt=''src="/static/maths/trig/image103.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig/image104.png" className={styles['equation']}></img>

                </div>
            </article>
        </>
    )
}

export default Trig