import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"


function Vectors() {

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
            <SecondaryBanner title='Vectors' subheader={`${minsToRead()} · Updated December 2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Vector notation</h2>

                    <p>A vector is a quantity in mathematics that has both magnitude and direction. An arrow pointing in a certain direction is a common way to depict a vector, with the length of the arrow denoting the magnitude of the vector.</p>
                    <img src="/static/maths/vectors/image001.png" className={styles['equation']}></img>

                    <p>Vectors are often written in boldface, underlined or with an arrow above the symbol.</p>
                    <img src="/static/maths/vectors/image002.png" className={styles['equation']}></img>

                    <p>The purpose of doing this is to set them apart from scalars, which are objects that just have magnitude and no direction. For instance, a scalar quantity is a room's temperature, but a vector quantity is a moving object's velocity.</p>
                    <h3>Column vectors</h3>
                    <p>Column vectors are a way of writing the coordinates in which a vector is pointing towards. They can be written in 2D and 3D space.</p>
                    <p>A 2D column vector is a matrix consisting of a single column of numbers, with two elements. For example, the matrix:</p>
                    <p>is a 2D column vector. In this case, the vector could represent the coordinates (1, 2) in a two-dimensional coordinate system (x, y).</p>
                    <img src="/static/maths/vectors/image003.png" className={styles['equation']}></img>

                    <p>A 3D column vector is a matrix consisting of a single column of numbers, with three elements. For example, the matrix:</p>
                    <img src="/static/maths/vectors/image004.png" className={styles['equation']}></img>

                    <p>is a 3D column vector. In this case, the vector could represent the coordinates (1, 2, 3) in a three-dimensional coordinate system (x, y, z).</p>
                    <h3>Component form</h3>
                    <p>"i" and "j" are often used to represent the standard unit vectors in two-dimensional space. A unit vector is a vector with a magnitude of 1 that points in a specific direction.</p>
                    <p>The vector "i" is a unit vector that points in the positive x direction, and the vector "j" is a unit vector that points in the positive y direction.</p>
                    <p>For example:</p>
                    <img src="/static/maths/vectors/image005.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image006.png" className={styles['equation']}></img>

                    <h2>Magnitude and direction</h2>
                    <p>The magnitude of a vector is simply the length based on two points.</p>
                    <p>Magnitude is denoted as the vector in modulus, which is the same as absolute value because the size can never be less than zero:</p>
                    <img src="/static/maths/vectors/image007.png" className={styles['equation']}></img>
                    <p>We can set a base of the vector being the x axis and the height from the base to the tallest or lowest point which is the y axis. Using Pythagoras&rsquo; theorem, we can determine the length as its simply calculating one side of a right-angled triangle:</p>
                    <img src="/static/maths/vectors/image008.png" className={styles['equation']}></img>                    <img src="/static/maths/vectors/image009.png" className={styles['equation']}></img>
                    <p>The direction of a vector is the angle in degrees from the x-axis. If two points are given then you can use both points to find the direction with respect to both, if only one point is given, then it can be determined that x and y are 0.</p>
                    <p>Direction is denoted by theta and you can use trigonometry to find the angle.</p>
                    <p>The formula to use would be tangent as we don&rsquo;t have the hypotenuse:</p>
                    <img src="/static/maths/vectors/image010.png" className={styles['equation']}></img>
                    <p>The opposite side is the difference in y values and the adjacent side is the difference in x values:</p>
                    <img src="/static/maths/vectors/image011.png" className={styles['equation']}></img>
                    <p>Therefore, the direction is simply the inverse tan of this. The result would be in radians which can by converted to degrees by multiplying the result by 180/pi:</p>
                    <img src="/static/maths/vectors/image012.png" className={styles['equation']}></img>
                    <p>If given a magnitude and direction, then the vertical and horizontal components of the vector can be calculated using Pythagoras&rsquo; theorem as well.</p>
                    <p>The x component can be calculated using the following:</p>
                    <img src="/static/maths/vectors/image013.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image014.png" className={styles['equation']}></img>
                    <p>The y component can be calculated using the following:</p>
                    <img src="/static/maths/vectors/image015.png" className={styles['equation']}></img>                    <img src="/static/maths/vectors/image016.png" className={styles['equation']}></img>
                    <p>In both of these, the magnitude of the vector |v| is the hypotenuse.</p>
                    <p>Simplified then, the general formula for a vector with magnitude r and direction of theta can be written in component form as:</p>
                    <img src="/static/maths/vectors/image017.png" className={styles['equation']}></img>
                    <p>The direction should be calculated from the positive x axis and can go up to 360 degrees, so its important to note if the x or y is negative as this will impact on the direction and the angle can be obtuse.</p>
                    <h3>Example</h3>
                    <p>Calculate the magnitude and direction of the following vector:</p>
                    <img src="/static/maths/vectors/image018.png" className={styles['equation']}></img>
                    <p><em>Answer:</em></p>
                    <p>To answer this question, you can first start with magnitude. The magnitude can be calculated using Pythagoras&rsquo; theorem:</p>
                    <img src="/static/maths/vectors/image019.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image020.png" className={styles['equation']}></img>
                    <p>To answer the question on direction, it may be easier to draw a diagram first:</p>
                    <img src="/static/maths/vectors/image021.png" className={styles['equation']}></img>
                    <p>The length of the x component is always positive so the minus sign can be removed but it&rsquo;s drawn in the negative x plane.</p>
                    <p>We need to find the angle theta as that is the direction of the vector from the origin.</p>
                    <p>We can calculate alpha first using Pythagoras&rsquo; theorem again and then subtract this from 180 as its on a straight line:</p>
                    <img src="/static/maths/vectors/image022.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image023.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image024.png" className={styles['equation']}></img>
                    <p>Subtract this from 180:</p>
                    <img src="/static/maths/vectors/image025.png" className={styles['equation']}></img>
                    <p>Written in final form, the vector is:</p>
                    <img src="/static/maths/vectors/image026.png" className={styles['equation']}></img>
                    <h2>Angle between two vectors</h2>
                    <p>When given two different vectors you can calculate the angle between them using trigonometry. Specifically using the cosine rule which will work with both 2D and 3D vectors.</p>
                    <p>So, using the formula:</p>
                    <img src="/static/maths/vectors/image027.png" className={styles['equation']}></img>
                    <p>Where |v<sub>3</sub>| is the side opposite the angle.</p>
                    <p>Constructing a triangle to visually represent this information will make it easier to understand.</p>
                    <p>The angle can also be found using the dot product of vectors which results in a scaler that can be used in a formula to determine the angle.</p>
                    <p>The dot product vector rule is as follows:</p>
                    <img src="/static/maths/vectors/image028.png" className={styles['equation']}></img>
                    <p>To rearrange this for solving for angle between vectors, you can solve for cosine theta and ultimately the inverse of this:</p>
                    <img src="/static/maths/vectors/image029.png" className={styles['equation']}></img>
                    <p>The dot product (<strong>a</strong>*<strong>b</strong>) can be calculated by multiplying each term in the vector by the other vector. This works for both 2D and 3D vectors:</p>
                    <img src="/static/maths/vectors/image030.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image031.png" className={styles['equation']}></img>
                    <p>When substituting all these values into either formula and getting a result, the answer will be in radians and so this can be converted by multiplying the result by 180/pi.</p>
                    <h3>Example using dot product</h3>
                    <p>Find the angle between the vectors wa = 2i + j and b = 5i -3j</p>
                    <p>Answer:</p>
                    <p>We need to find the magnitudes of the vectors, the dot product of the vectors and substitute this into the formula for the angle:</p>
                    <img src="/static/maths/vectors/image032.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image033.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image034.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image035.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image036.png" className={styles['equation']}></img>
                    <p>The angle needs to be converted to degrees from radians:</p>
                    <img src="/static/maths/vectors/image037.png" className={styles['equation']}></img>
                    <h3>Example using cosine rule</h3>
                    <p>Find the angle between the vectors a = -6i + 13j and b = i + 10j</p>
                    <p>To use the cosine rule we need to find the magnitude of the vector that connects the two vectors to form a triangle then substitute all the values into the cosine formula.</p>
                    <p>First find the magnitudes of all vectors:</p>
                    <img src="/static/maths/vectors/image038.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image039.png" className={styles['equation']}></img>
                    <p>Calculate the connecting vector and its magnitude:</p>
                    <img src="/static/maths/vectors/image040.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image041.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image042.png" className={styles['equation']}></img>
                    <p>Now we can substitute into cosine formula:</p>
                    <img src="/static/maths/vectors/image043.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image044.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image045.png" className={styles['equation']}></img>

                    <p>To convert this to degrees, multiply by 180/pi:</p>
                    <img src="/static/maths/vectors/image046.png" className={styles['equation']}></img>
                    <h2>3D Vectors</h2>
                    <p>3D Vectors operate in 3D space and have direction and magnitude like 2D vectors. The magnitude of a 3D vector can also be calculated using the Pythagorean theorem, and the angle between two 3D vectors can be calculated using the dot product or the cosine function, similar to 2D vectors.</p>
                    <p>A 3D column vector has 3 components:</p>
                    <img src="/static/maths/vectors/image047.png" className={styles['equation']}></img>
                    <p>The letter used for the z value in component form is k, so the vector in component form is:</p>
                    <img src="/static/maths/vectors/image048.png" className={styles['equation']}></img>
                    <p>The magnitude of a 3D vector can be envisioned using a 3D space and calculating the sides already given and then finding the missing side for the vector itself:</p>
                    <br></br>
                    <img src="/static/maths/vectors/image049.png" className={styles['equation']}></img>
                    <p>When given all 3 dimensions in vector form, they can correlate to the sides of 3D space such as in a cube like above. Then you can formulate triangles from the sides and use the same Pythagorean formula to calculate the missing sides of the triangle and ultimately the vector magnitude.</p>
                    <h3>Example</h3>
                    <p>Find the angle between the two 3D vectors below:</p>
                    <img src="/static/maths/vectors/image050.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image051.png" className={styles['equation']}></img>
                    <p><em>Answer:</em></p>
                    <p>Just like in 2D vectors you would find the magnitude of both of these vectors and then use this in a particular angle formula. For this one, we will use the dot product rule:</p>
                    <img src="/static/maths/vectors/image052.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image053.png" className={styles['equation']}></img>
                    <p>The magnitude of each vector can be calculated using the Pythagorean formula:</p>
                    <img src="/static/maths/vectors/image054.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image055.png" className={styles['equation']}></img>
                    <p><br />We can now substitute into the dot product formula for finding the angle:</p>
                    <img src="/static/maths/vectors/image056.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image057.png" className={styles['equation']}></img>
                    <p>Solve for theta and convert to degrees:</p>
                    <img src="/static/maths/vectors/image058.png" className={styles['equation']}></img>
                    <img src="/static/maths/vectors/image059.png" className={styles['equation']}></img>
                    <p></p>

                </div>


            </article>
        </>
    )
}

export default Vectors