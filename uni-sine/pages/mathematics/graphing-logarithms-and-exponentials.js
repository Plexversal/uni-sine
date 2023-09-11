import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5Graph from "../../components/p5-interactions/P5CustomGraph"



function GraphExp() {

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
            <SecondaryBanner title='Graphing Logarithms and Exponential functions' subheader={`${minsToRead()} · Updated 26/06/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>

                    <h2 >Properties of logarithmic graphs</h2>
                    <P5Graph {...{ preset: 'log'}}/>
                    <p>Logarithmic and exponential graphs are related because a logarithmic graph can be used to show the inverse relationship between a variable and its logarithm.</p>
                    <p>The two graphs are related in that the logarithmic graph is the inverse of the exponential graph. This means that when one graph increases, the other decreases.</p>
                    <p>Graphs of logs and exponentials are symmetrical along the line of y = x as they are inverse functions of each other.</p>
                    <p>Graphs of log<sub>a</sub>(x) have a vertical asymptote approaching y = 0 and so never touches or cross the y axis.</p>
                    <p>Graphs of a<sup>x</sup> have a horizontal asymptote approaching x = 0 and so never touches or crosses the x axis.</p>
                    <img alt=''src="/static/maths/logs/logs_1.png" className={styles['equation']}></img>

                    <p>In order to graph log functions, you can simply take a value of y and input into the equation given and create points to form a sketch.</p>
                    <p>For example, sketching log<sub>2</sub>(x) would have the following points:</p>
                    
                    <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody>
                        <tr>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/logs/image044.png" className={styles['equation']}></img>


                        </td>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}>0.5</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>1</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>2</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>3</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>4</p>
                        </td>
                    </tr>
                    <tr>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/logs/image045.png" className={styles['equation']}></img>


                        </td>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/logs/image046.png" className={styles['equation']}></img>

                        </td>
                        <td width="200" valign="top">  
                        <img alt=''src="/static/maths/logs/image047.png" className={styles['equation']}></img>

                        </td>
                        <td width="200" valign="top">  
                        <img alt=''src="/static/maths/logs/image048.png" className={styles['equation']}></img>

                        </td>
                        <td width="200" valign="top">  
                        <img alt=''src="/static/maths/logs/image049.png" className={styles['equation']}></img>

                        </td>
                        <td width="200" valign="top">  
                        <img alt=''src="/static/maths/logs/image050.png" className={styles['equation']}></img>

                        </td>
                    </tr>

                    </tbody></table>
                   
                    <p>&nbsp;</p>
                    <p>If you input values of x &le; 0 then you will get undefined as no number raised to the power of a base number can equal 0 or less than zero.</p>
                    <p>You can find the Y-intercept by setting x = 0:</p>
                    <img alt=''src="/static/maths/logs/image051.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image052.png" className={styles['equation']}></img>

                    <p>There is no Y-intercept for this equation, but other equations may have it.</p>
                    <p>You can find the X-intercept by setting y = 0:</p>
                    <img alt=''src="/static/maths/logs/image053.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image054.png" className={styles['equation']}></img>

                    <p>Now we have enough points to sketch a graph:</p>
                    <img alt=''src="/static/maths/logs/logs_2.png" className={styles['equation']}></img>


                    <h3>Example</h3>
                    <p>Sketch the graph of the following equation:</p>
                    <img alt=''src="/static/maths/logs/image055.png" className={styles['equation']}></img>
                    
                    <p><em>Answer:</em></p>
                    <p>First plot various points of x:</p>
                  
                    <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody>
                        <tr>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/logs/image044.png" className={styles['equation']}></img>


                        </td>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}>-1</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>1</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>2</p>
                        </td>

                    </tr>
                    <tr>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/logs/image045.png" className={styles['equation']}></img>


                        </td>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/logs/image056.png" className={styles['equation']}></img>

                        </td>
                        <td width="200" valign="top">  
                        <img alt=''src="/static/maths/logs/image057.png" className={styles['equation']}></img>

                        </td>
                        <td width="200" valign="top">  
                        <img alt=''src="/static/maths/logs/image058.png" className={styles['equation']}></img>

                        </td>
 
                    </tr>

                    </tbody></table>
                    
                    <p>&nbsp;</p>
                    <p>Next find the y-intercept:</p>
                    <img alt=''src="/static/maths/logs/image059.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image060.png" className={styles['equation']}></img>

                    <p>Next find the x-intercept:</p>
                    <img alt=''src="/static/maths/logs/image061.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image062.png" className={styles['equation']}></img>

                    <p>Using ln = log base e:</p>
                    <img alt=''src="/static/maths/logs/image063.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image064.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/logs/image065.png" className={styles['equation']}></img>

                    <p>Now sketch the graph with intercepts and plotted points:</p>
                    <img alt=''src="/static/maths/logs/logs_3.png" className={styles['equation']}></img>


                </div>

            </article>
        </>
    )
}

export default GraphExp