import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"


function Fractions() {

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
            <SecondaryBanner title='Fraction laws' subheader={`${minsToRead()} · Updated 30/06/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Terms of a fraction</h2>
                    <p>There are two terms when it comes to fractions. One is the denominator and the other is the numerator.</p>
                    <p>The numerator is the top number of a fraction and the denominator is the bottom part of the fraction.</p>
                    <h2>Multiplying fractions</h2>
                    <p>Multiplying fractions is probably the easiest operation when it comes to working with fractions.</p>
                    <p>There are two things to consider, which is simply are you multiplying a fraction against a whole number or multiplying a fraction with another fraction. Below are the formulas for both.</p>
                    <p>The first being for multiplying against a whole number:</p>
                    <img alt=''src="/static/maths/fraction-laws/image001.png" className={styles['equation']}></img>
                    <p>Second, multiplying two fractions together:</p>
                    <img alt=''src="/static/maths/fraction-laws/image002.png" className={styles['equation']}></img>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image003.png" className={styles['equation']}></img>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image004.png" className={styles['equation']}></img>
                    <p>Simplifying a fraction, like what is done above, means that the two numbers in the fraction are common factors such as 3 and 6. You can determine how many times the numerator goes into itself and how many times the numerator goes into the denominator to find the simplest form of the fraction. The result doesn&rsquo;t change.</p>
                    <h2>Dividing fractions</h2>
                    <p>Dividing fractions will use methods from multiplication except with a couple additional steps.</p>
                    <p>We can use something called the keep, change, flip method. You keep the first fraction the same. Change the sign from divide to multiply. Flip the numerator and denominator of the second fraction. After that, it&rsquo;s a simple multiply method.</p>
                    <img alt=''src="/static/maths/fraction-laws/image005.png" className={styles['equation']}></img>
                    <p>When it comes to dividing fractions by whole numbers. You can simply think of the whole number as being a fraction over 1. Because 1 goes into the whole number as many times as itself.</p>
                    <img alt=''src="/static/maths/fraction-laws/image006.png" className={styles['equation']}></img>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image007.png" className={styles['equation']}></img>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image008.png" className={styles['equation']}></img>
                    <h2>Subtracting fractions</h2>
                    <p>Subtracting fractions is a little more complicated than other operations. This is because subtraction and addition are quite opposite to division and multiplication.</p>
                    <p>Subtracting and addition is practically the same operation except you change the signs relative to if its subtraction or addition.</p>
                    <p>When it comes to subtracting whole numbers from fractions, you need to multiply the denominator and the whole number and take it away from the numerator. Then you put that result over the original denominator:</p>
                    <img alt=''src="/static/maths/fraction-laws/image009.png" className={styles['equation']}></img>
                    <p>As for subtracting other fractions from a fraction, it&rsquo;s a similar process except you multiply the first numerator with the second denominator and the first denominator with the second numerator. You can think of it like an X pattern when multiplying.</p>
                    <p>You subtract the first result from the second result and put that over the denominators multiplied together.</p>
                    <img alt=''src="/static/maths/fraction-laws/image010.png" className={styles['equation']}></img>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image011.png" className={styles['equation']}></img>
                    <p>If either the numerator or denominator become negative numbers, you can make the whole fraction negative by putting the sign before the fraction. You can leave it either at the top or bottom and it will still mean the same, but just for clarity.</p>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image012.png" className={styles['equation']}></img>
                    <h2>Adding fractions</h2>
                    <p>Adding fractions is just like subtraction with the signs changed to addition.</p>
                    <p>When it comes to Adding whole numbers to other fractions, you need to multiply the denominator and the whole number and add it to the numerator. Then you put that result over the original denominator.</p>
                    <img alt=''src="/static/maths/fraction-laws/image013.png" className={styles['equation']}></img>
                    <p>When adding fractions to other fractions, just like subtraction, you multiply the numerator with the second denominator and the first denominator with the second numerator.</p>
                    <p>Add the results together and divide over the denominators multiplied together.</p>
                    <img alt=''src="/static/maths/fraction-laws/image014.png" className={styles['equation']}></img>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image015.png" className={styles['equation']}></img>
                    <p>Example:</p>
                    <img alt=''src="/static/maths/fraction-laws/image016.png" className={styles['equation']}></img>

                </div>


            </article>
        </>
    )
}

export default Fractions