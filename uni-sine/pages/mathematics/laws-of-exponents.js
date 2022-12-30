import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"


function exponents() {

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
            <SecondaryBanner title='Laws of exponents' subheader={`${minsToRead()} · Updated 30/06/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Laws of exponents</h2>
                    <p>There are a few laws of exponents that are very important to understand in order to functionally apply to most mathematical equations.</p>
                    <p>Exponents may be called powers or indices and mean the same thing.</p>
                    <p>First rule for multiplying indices:</p>
                    <p>Simply add the powers together when the base number is the same</p>
                    <img src="/static/maths/exponents/image001.png" className={styles['equation']}></img>
                    <p>E.g.</p>
                    <img src="/static/maths/exponents/image002.png" className={styles['equation']}></img>
                    <p>Second rule for dividing indices:</p>
                    <p>Subtract the powers when dividing with the same base number</p>
                    <img src="/static/maths/exponents/image003.png" className={styles['equation']}></img>
                    <p>E.g.</p>
                    <img src="/static/maths/exponents/image004.png" className={styles['equation']}></img>
                    <p>Third rule for raising indices to another power:</p>
                    <p>A power raised to a power such as when in parenthesis, you can simply multiple the powers together</p>
                    <img src="/static/maths/exponents/image005.png" className={styles['equation']}></img>
                    <p>E.g.</p>
                    <img src="/static/maths/exponents/image006.png" className={styles['equation']}></img>
                    <p>Forth rule for any number raised to power of zero:</p>
                    <p>Any base number raised to the power of 0 always equals 1</p>
                    <img src="/static/maths/exponents/image007.png" className={styles['equation']}></img>
                    <p>E.g.</p>
                    <img src="/static/maths/exponents/image008.png" className={styles['equation']}></img>
                    <p>Fifth rule for interpreting fractional powers with 1 as numerator as roots:</p>
                    <p>Numbers raised to a fraction means a root is involved, when its 1 then the denominator determines the root power.</p>
                    <img src="/static/maths/exponents/image009.png" className={styles['equation']}></img>
                    <p>E.g.</p>
                    <img src="/static/maths/exponents/image010.png" className={styles['equation']}></img>
                    <p>Sixth rule for varying fractal powers:</p>
                    <p>Numbers with a numerator larger than 1, the numerator becomes the power raised to the base and then the root power is the denominator.</p>
                    <img src="/static/maths/exponents/image011.png" className={styles['equation']}></img>
                    <p>E.g.</p>
                    <img src="/static/maths/exponents/image012.png" className={styles['equation']}></img>
                    <p>Final rule for negative indices:</p>
                    <p>Negative powers mean the result is a fraction and the base is still raised to the initial power but its now positive.</p>
                    <img src="/static/maths/exponents/image013.png" className={styles['equation']}></img>
                    <p>E.g.</p>
                    <img src="/static/maths/exponents/image014.png" className={styles['equation']}></img>
                </div>


            </article>
        </>
    )
}

export default exponents