import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5Graph from "../../components/p5-interactions/P5LogsGraph"


function Logs() {

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
            <SecondaryBanner title='Logarithms' subheader={`${minsToRead()} · Updated December 2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Notation, terminology and laws</h2>
                    <p>Logarithms are mathematical operations that calculate the exponent that a base number must be raised to in order to obtain a given number.</p>
                    <p>Logarithms and exponents are related because a logarithm can be used to find the exponent of a number, and an exponent can be used to find the logarithm of a number.</p>
                    <img alt=''src="/static/maths/logs/image001.png" className={styles['equation']}></img>

                    <p>A logarithm needs a <strong>base</strong> number, in the case above that is the variable &lsquo;a&rsquo;. The base number is the number in which you are raising powers to.</p>
                    <p>The laws for working with logarithms are the inverse of the laws of exponents. They are as follows:</p>
                    <p><strong>Adding logs:</strong></p>
                    <img alt=''src="/static/maths/logs/image002.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image003.png" className={styles['equation']}></img>

                    <p><strong>Subtracting logs:</strong></p>
                    <img alt=''src="/static/maths/logs/image004.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image005.png" className={styles['equation']}></img>

                    <p><strong>Logs raised to powers:</strong></p>
                    <img alt=''src="/static/maths/logs/image006.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image007.png" className={styles['equation']}></img>

                    <p><strong>Same base logs:</strong></p>
                    <img alt=''src="/static/maths/logs/image008.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image009.png" className={styles['equation']}></img>

                    <p><strong>Log of 1:</strong></p>
                    <img alt=''src="/static/maths/logs/image010.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image011.png" className={styles['equation']}></img>

                    <h3>Example (simple)</h3>
                    <ol>
                        <li>Simplify the following logarithm:</li>
                        
                    </ol>
                    <img alt=''src="/static/maths/logs/image012.png" className={styles['equation']}></img>

                    <p><em>Answer:</em></p>
                    <p>Simplifying a logarithm means to put the log in its smallest form, this can be done by combining the logs using the logs laws:</p>
                    <img alt=''src="/static/maths/logs/image013.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image014.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image015.png" className={styles['equation']}></img>

                    <h3>Example (advanced)</h3>
                    <ul>
                        <li>Solve the below equation for variable x, where x &gt; 1:</li>
                    </ul>
                    <img alt=''src="/static/maths/logs/image016.png" className={styles['equation']}></img>

                    <p><em>Answer:</em></p>
                    <p>The equation uses a variety of log laws as well as additional algebra such as quadratic equations to solve for x. First step is to combine the logs as they have the same base:</p>
                    <img alt=''src="/static/maths/logs/image017.png" className={styles['equation']}></img>

                    <p>The logs cancel by using 8 raised to the power of both sides leaving the following quadratic:</p>
                    <img alt=''src="/static/maths/logs/image018.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image019.png" className={styles['equation']}></img>

                    <p>Simplifying the quadratic:</p>
                    <img alt=''src="/static/maths/logs/image020.png" className={styles['equation']}></img>

                    <p>Using quadratic formula to get the values of x:</p>
                    <img alt=''src="/static/maths/logs/image021.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image022.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image023.png" className={styles['equation']}></img>

                    <p>Since x is positive, the answer has to be x = 1.</p>
                    <p>&nbsp;</p>
                    <h2>Natural Logs (ln)</h2>
                    <p>Natural logarithms are logarithms with base e, commonly referred to as logarithms to the base e. (2.71828). They are mostly utilised in calculus and are implemented in exponential growth and decay questions. Natural logarithms are more beneficial for exponential growth and decay problems as well calculus applications than conventional logarithms, which are logarithms to the base 10.</p>
                    <p>Natural logs being just the normal logs with a base of Euler&lsquo;s number but rewritten in natural log form:</p>
                    <img alt=''src="/static/maths/logs/image024.png" className={styles['equation']}></img>

                    <p>The natural log and e are inverses of each other so the following statements would cancel and give you x on its own:</p>
                    <img alt=''src="/static/maths/logs/image025.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image026.png" className={styles['equation']}></img>

                    <p>Natural logs can be used in the same way as logs to work out exponential equations:</p>
                    <img alt=''src="/static/maths/logs/image027.png" className={styles['equation']}></img>

                    <p>This is derived using the normal log laws:</p>
                    <img alt=''src="/static/maths/logs/image028.png" className={styles['equation']}></img>

                    <p>Take natural log of both sides:</p>
                    <img alt=''src="/static/maths/logs/image029.png" className={styles['equation']}></img>

                    <p>Using exponential log laws, the x can be brought to the front:</p>
                    <img alt=''src="/static/maths/logs/image030.png" className={styles['equation']}></img>

                    <p>Dividing both sides by the natural log of a gives x:</p>
                    <img alt=''src="/static/maths/logs/image031.png" className={styles['equation']}></img>

                    <h3>Example (simple)</h3>
                    <ol>
                        <li>Solve the below equation for variable x to 3 significant figures:</li>
                    </ol>
                    <img alt=''src="/static/maths/logs/image032.png" className={styles['equation']}></img>

                    <p><em>Answer:</em></p>
                    <p>As the equation uses e, we can take the natural logarithm of both sides. The natural log of e to an exponent simply leaves the exponent on its own:</p>
                    <img alt=''src="/static/maths/logs/image033.png" className={styles['equation']}></img>

                    <p>Then rearrange for x:</p>
                    <img alt=''src="/static/maths/logs/image034.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image035.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image036.png" className={styles['equation']}></img>

                    <h3>Example (Advanced)</h3>
                    <ol>
                        <li>Solve the below equation for variable x to 3 significant figures:</li>
                    </ol>
                    <img alt=''src="/static/maths/logs/image037.png" className={styles['equation']}></img>

                    <p>Answer:</p>
                    <p>First step is to take the natural logarithm of both sides in order to get x out of exponent:</p>
                    <img alt=''src="/static/maths/logs/image038.png" className={styles['equation']}></img>

                    <p>Expand the right side:</p>
                    <img alt=''src="/static/maths/logs/image039.png" className={styles['equation']}></img>

                    <p>Get all variables to one side:</p>
                    <img alt=''src="/static/maths/logs/image040.png" className={styles['equation']}></img>

                    <p>Factorise the left side:</p>
                    <img alt=''src="/static/maths/logs/image041.png" className={styles['equation']}></img>

                    <p>Solve for x:</p>
                    <img alt=''src="/static/maths/logs/image042.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image043.png" className={styles['equation']}></img>


                </div>


            </article>
        </>
    )
}

export default Logs