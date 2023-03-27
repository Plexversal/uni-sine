import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"


function Trig2() {

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
            <SecondaryBanner title='Triangle area and sectors' subheader={`${minsToRead()} · Updated 21/08/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h1>Area of a triangle, sectors, segments and arc length</h1>
                    <h2>Area of a triangle</h2>
                    <p>The area of a triangle can be calculated in a variety of ways depending on what attributes of the triangle are available to work with.</p>
                    <p><em>Insert area picture</em></p>
                    <img alt=''src="/static/maths/trig2/image001.png" className={styles['equation']}></img>
                    <h3>Area of an isosceles and scalene triangle:</h3>
                    <p><em>Insert area picture</em></p>                 
                    <p>Derivation of the area of isosceles and scalene triangles:</p>
                    <p>These triangles can have an acute angle, obtuse angle and right-angle, all of which have the same result but have different methods in getting there.</p>
                    <p>A right triangle is the easiest to derive as if you reflect the same shape on the hypotenuse, you will get a rectangle. The area of a rectangle is base x height. So, half of this will give the right-angle triangle area:</p>
                    <img alt=''src="/static/maths/trig2/image002.png" className={styles['equation']}></img>
                    <p>An acute angled triangle can be split into two right-angled triangles. Doing this splits the base into two separate values, in this case we can call them x and y.</p>
                    <p>So,</p>
                    <img alt=''src="/static/maths/trig2/image003.png" className={styles['equation']}></img>
                    <p>Substituting the base of each triangle into the original formula for the area of a triangle we get the following:</p>
                    <img alt=''src="/static/maths/trig2/image004.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image005.png" className={styles['equation']}></img>
                    <p>Hence,</p>
                    <img alt=''src="/static/maths/trig2/image006.png" className={styles['equation']}></img>
                    <p>An obtuse angled triangle can have an additional right-angled triangle added onto the original to make a new whole right-angled triangle.</p>
                    <p>There is a new base which can now be split into two variables.</p>
                    <p>Substituting into the area equation and taking off the additional area we find the equation is still the same:</p>
                    <img alt=''src="/static/maths/trig2/image007.png" className={styles['equation']}></img>
                    <p>Expand the brackets:</p>
                    <img alt=''src="/static/maths/trig2/image008.png" className={styles['equation']}></img>
                    <p>The final two terms cancel leaving the original formula:</p>   
                    <img alt=''src="/static/maths/trig2/image006.png" className={styles['equation']}></img>
                    <h3>Area of an equilateral triangle:</h3>
                    <p><em>Insert area triangle</em></p>
                    <img alt=''src="/static/maths/trig2/image009.png" className={styles['equation']}></img>
                    <p>Derivation of the area of an equilateral triangle:</p>
                    <p>We can substitute the same values into the original formula using a as the base and the height being the altitude from the base to the peak:</p>
                    <img alt=''src="/static/maths/trig2/image010.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image011.png" className={styles['equation']}></img>
                    <p>The height can be found using the Pythagorean theorem and splitting the triangle into two right-angled triangles.</p>
                    <p>The base would become half of a, c is simply a because sides are equal and so we can solve for h:</p>
                    <img alt=''src="/static/maths/trig2/image012.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image013.png" className={styles['equation']}></img>
                    <p>Square root every term for h:</p>
                    <img alt=''src="/static/maths/trig2/image014.png" className={styles['equation']}></img>
                    <p>This can now be substituted back into the original formula:</p>
                    <img alt=''src="/static/maths/trig2/image015.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image009.png" className={styles['equation']}></img>
                    <h3>Area of any triangle with an angle between 2 given sides:</h3>
                    <p><em>Insert area picture </em></p>
                    <img alt=''src="/static/maths/trig2/image016.png" className={styles['equation']}></img>
                    <p>Derivation of the area of a triangle with included angle:</p>
                    <p>We can use trigonometric functions substituted into the original area of the triangle formula to derive this formula.</p>
                    <p>If we begin drawing an altitude, h, we can work out the length of the side if given the angle:</p>
                    <img alt=''src="/static/maths/trig2/image017.png" className={styles['equation']}></img>
                    <p>Solving for h:</p>
                    <img alt=''src="/static/maths/trig2/image018.png" className={styles['equation']}></img>
                    <p>Substituting this into the original formula we get:</p>
                    <img alt=''src="/static/maths/trig2/image019.png" className={styles['equation']}></img>
                    <p>Rewritten gives the formula to begin with:</p>
                    <img alt=''src="/static/maths/trig2/image016.png" className={styles['equation']}></img>
                    <h3>Area of any triangle given only sides and no height or angles using Heron&rsquo;s formula:</h3>
                    <img alt=''src="/static/maths/trig2/image020.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image021.png" className={styles['equation']}></img>

                    <p>Derivation of Heron&rsquo;s formula:</p>
                    <p>Heron&rsquo;s formula uses the same formula for the area of a triangle in terms of only sides. You can work out the altitude (h) in terms of the all the other sides and then use algebra to simplify the expression.</p>
                    <img alt=''src="/static/maths/trig2/image006.png" className={styles['equation']}></img>
                    <p>We can split the base into 2 parts:</p>
                    <img alt=''src="/static/maths/trig2/image022.png" className={styles['equation']}></img>
                    <p>Using the Pythagorean theorem, we can express sides a and b with terms of h:</p>
                    <img alt=''src="/static/maths/trig2/image023.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image024.png" className={styles['equation']}></img>
                    <p>If we solve for either of the split bases in terms of just a b and c, we can use this to work out h in the same way.</p>
                    <p>We can start by taking away the equations from each other making the h cancel:</p>
                    <img alt=''src="/static/maths/trig2/image025.png" className={styles['equation']}></img>
                    <p>Knowing that both sides are the difference between two squares we can establish that one of the terms with both b&rsquo;s will equal to the b term we established earlier which is:</p>
                    <img alt=''src="/static/maths/trig2/image022.png" className={styles['equation']}></img>
                    <p>Now we can solve for any of the b&rsquo;s, in this case we will solve for b<sub>2</sub>:</p>
                    <img alt=''src="/static/maths/trig2/image026.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image027.png" className={styles['equation']}></img>
                    <p>We can now divide through by b:</p>
                    <img alt=''src="/static/maths/trig2/image028.png" className={styles['equation']}></img>
                    <p>If:</p>
                    <img alt=''src="/static/maths/trig2/image022.png" className={styles['equation']}></img>
                    <p>We can add the equations so solve for b<sub>2</sub>:</p>
                    <img alt=''src="/static/maths/trig2/image030.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image031.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image032.png" className={styles['equation']}></img>
                    <p>Now we have the value for one of the part bases in terms of all the known sides, we can now solve for h:</p>
                    <p>We have h in terms of part of a base already, which is b<sub>2</sub> from earlier:</p>
                    <img alt=''src="/static/maths/trig2/image023.png" className={styles['equation']}></img>
                    <p>Rearranging for h only:</p>
                    <img alt=''src="/static/maths/trig2/image033.png" className={styles['equation']}></img>
                    <p>Substituting b2 into this equation provides h in terms of all the sides which is what we needed:</p>
                    <img alt=''src="/static/maths/trig2/image034.png" className={styles['equation']}></img>
                    <p>We can now substitute this back into the original area formula:</p>
                    <img alt=''src="/static/maths/trig2/image035.png" className={styles['equation']}></img>
                    <p>We can simplify this a lot to get to the original heron&rsquo;s formula.</p>
                    <p>Firstly, we can remove the 2b from the top of the first fraction:</p>
                    <img alt=''src="/static/maths/trig2/image036.png" className={styles['equation']}></img>
                    <p>We can now put everything in one square root and use the difference of 2 squares:</p>
                    <img alt=''src="/static/maths/trig2/image037.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image038.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image039.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image040.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image041.png" className={styles['equation']}></img>
                    <p>As there are 4 terms within the square root, we can divide the 1/16 through equally:</p>
                    <img alt=''src="/static/maths/trig2/image042.png" className={styles['equation']}></img>
                    <p>If we take the semi-perimeter to be S:</p>
                    <img alt=''src="/static/maths/trig2/image043.png" className={styles['equation']}></img>
                    <p>Then we can use that for the first term:</p>
                    <img alt=''src="/static/maths/trig2/image044.png" className={styles['equation']}></img>
                    <p>If we take the first term:</p>
                    <img alt=''src="/static/maths/trig2/image045.png" className={styles['equation']}></img>
                    <p>This is equal to the following:</p>
                    <img alt=''src="/static/maths/trig2/image046.png" className={styles['equation']}></img>
                    <p>Hence:</p>
                    <img alt=''src="/static/maths/trig2/image047.png" className={styles['equation']}></img>
                    <p>The remaining terms are same but for the different sides and we can rearrange for the original formula:</p>
                    <img alt=''src="/static/maths/trig2/image048.png" className={styles['equation']}></img>


                    <h2>Sector, segments and arcs of a circle</h2>
                    <h3>Arc length</h3>
                    <p><em>Insert arc length picture</em></p>
                    <img alt=''src="/static/maths/trig2/image049.png" className={styles['equation']}></img>

                    <p>The arc length is a portion of the circumference of a circle. The formula is simple to define as it is simply the angle between the two radius lines multiplied by the radius. The arc length is usually denoted with an s.</p>
                    <p>Derivation of arc length:</p>
                    <p>If we use the fact that the circumference of a circle is the following:</p>
                    <img alt=''src="/static/maths/trig2/image050.png" className={styles['equation']}></img>

                    <p>Part of this circumference would simply be the scale value in which the angle will describe how short it is.</p>
                    <p>Multiplying the circumference by the angle in radians over the circumference angle we get the following:</p>
                    <img alt=''src="/static/maths/trig2/image051.png" className={styles['equation']}></img>
                    <p>This cancels to give the circumference. But if we changed the angle to be half of the circle for example which is 2pi/2 which is just pi we get the following:</p>
                    <img alt=''src="/static/maths/trig2/image052.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image053.png" className={styles['equation']}></img>

                    <p>This can continue for any angle and satisfies the original statement.</p>
                    <h4>Example</h4>
                    <p>Calculate the following distance of the curve AB for the diagram below:</p>
                    <p>We are given the angle which is in radians and the two sides which would be the radius of the circle as they are both equal. Simply substitute into the formula:</p>
                    <img alt=''src="/static/maths/trig2/image054.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image055.png" className={styles['equation']}></img>
                    <h3>Sector area</h3>
                    <p><em>Insert sector picture</em></p>
                    <img alt=''src="/static/maths/trig2/image056.png" className={styles['equation']}></img>
                    <p>The area of a sector is just a portion of the area of a whole circle. The angle is used in the formula as a scale factor to how big the sector is compared to the whole circle.</p>
                    <p>Derivation of the sector area:</p>
                    <p>Given the area of a circle to be:</p>
                    <img alt=''src="/static/maths/trig2/image057.png" className={styles['equation']}></img>
                    <p>Then we can use this as the base area and simply times it by the scale factor of what the sector is, which is defined by the angle itself.</p>
                    <p>The angle scale factor is the angle given divided by the entire angle of the circle:</p>
                    <img alt=''src="/static/maths/trig2/image058.png" className={styles['equation']}></img>
                    <p>So:</p>
                    <img alt=''src="/static/maths/trig2/image059.png" className={styles['equation']}></img>
                    <p>This can cancel to the original formula:</p>
                    <img alt=''src="/static/maths/trig2/image060.png" className={styles['equation']}></img>
                    <h4>Example</h4>
                    <p>Calculate the area of the given sector in the diagram below:</p>
                    <p>The angle and radius are provided so we can simply substitute the values into the formula:</p>
                    <img alt=''src="/static/maths/trig2/image061.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image062.png" className={styles['equation']}></img>
                    <h3>Segment area</h3>
                    <p><em>Insert segment picture</em></p>
                    <img alt=''src="/static/maths/trig2/image063.png" className={styles['equation']}></img>
                    <p>The area of a segment when inspected closely is simply the area of a sector minus the area of the triangle formed within that sector. The segment area uses the same angle properties to determine the difference of areas.</p>
                    <p>Derivation of the segment area;</p>
                    <p>Given the sector area to be:</p>
                    <img alt=''src="/static/maths/trig2/image064.png" className={styles['equation']}></img>
                    <p>And the triangle area to be:</p>
                    <img alt=''src="/static/maths/trig2/image065.png" className={styles['equation']}></img>
                    <p>The difference between them provides the segment area:</p>
                    <img alt=''src="/static/maths/trig2/image066.png" className={styles['equation']}></img>
                    <p>Given that a and b in the triangle portion/second term of this equation is the radius and C is the angle between the radius which is the common angle theta, we can substitute these values:</p>
                    <img alt=''src="/static/maths/trig2/image067.png" className={styles['equation']}></img>
                    <p>Simplifying gives the original formula:</p>
                    <img alt=''src="/static/maths/trig2/image063.png" className={styles['equation']}></img>
                    <h4>Example</h4>
                    <p>Calculate the shaded area of the diagram below:</p>
                    <p>We are given the angle and radius here so we can substitute the values into the equation for segment area:</p>
                    <img alt=''src="/static/maths/trig2/image068.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image069.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/trig2/image070.png" className={styles['equation']}></img>
                </div>
            </article>
        </>
    )
}

export default Trig2