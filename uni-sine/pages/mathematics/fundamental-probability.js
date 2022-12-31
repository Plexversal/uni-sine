import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5NormalDistribution from "../../components/p5-interactions/P5NormalDistribution"

function Probability() {

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
            <SecondaryBanner title='Fundamental Probability' subheader={`${minsToRead()} · Updated 12/11/2022`} />
            <Path />
            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>

                    <h2>Venn diagrams and probability notation</h2>
                    <img alt=''src="/static/maths/probability/image001.png" className={styles['equation']}></img>
                    <p>Probability is a measure of how likely random events can occur. There is the total possible outcomes and the desired events that can occur by chance. We can measure the chance of something using the formula above.</p>
                    <h3>Example</h3>
                    <p>What is the probability of picking an ace in a set of 52 playing cards?</p>
                    <img alt=''src="/static/maths/probability/image002.png" className={styles['equation']}></img>

                    <p>As there are 4 aces, there are 4 chances of this desired event occurring and so you divide this over all possible outcomes which is 52 cards.</p>

                    <p><br />Venn diagrams are a useful visual element to understanding how outcomes can occur for multiple events. Venn diagrams would need at least 2 events, which can be labelled event A and event B.</p>
                    <img alt=''src="/static/maths/probability/image003.png" className={styles['equation']}></img>
                    
                    <p>The individual event probabilities can simply use the notation P(A) or P(B) if you just need the outcomes of one event.</p>
                    <p>Events can also be described as <strong>not</strong> happening which can be the same event but with an apostrophe representing this as the <strong>compliment </strong>e.g., P(A&rsquo;) would be the probability of A not happening.</p>
                    <p>To describe the middle part of the Venn diagram, which describes the outcomes as satisfying both events, is shown as P(A <span >&cap;</span> B). This is called the <strong>intersection</strong>.</p>
                    <p>To describe any of the outcomes satisfying either of the events in the diagram, it is shown with P(A <span >&cup;</span> B). This is called the <strong>union</strong>.</p>
                    
                    <h3>Example</h3>
                    <p>Using the below Venn diagram, find the following probabilities:</p>
                    <p>P(A), P(B) P(A&rsquo;), P(B&rsquo;), P(A <span >&cup;</span> B), P(A <span >&cap;</span> B), P(A &rsquo;<span >&cup;</span> B) P(A &rsquo;<span >&cup;</span> B&rsquo;)</p>
                    <img alt=''src="/static/maths/probability/image004.png" className={styles['equation']}></img>
                    
                    <p>Before calculating, we can first determine that the number of all possible outcomes is the total of all numbers which is equal to 50.</p>
                    <p>We can now calculate the above probabilities:</p>
                    <img alt=''src="/static/maths/probability/image005.png" className={styles['equation']}></img>

                    <p>The probability of one event is the inclusion of the values in the intersection and so that is why the above event is 33 and not 26.</p>
                    <img alt=''src="/static/maths/probability/image006.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image007.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image008.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image009.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image010.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image011.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image012.png" className={styles['equation']}></img>
                    
                    
                    <h2>Tree Diagrams</h2>
                    <img alt=''src="/static/maths/probability/image013.png" className={styles['equation']}></img>
                    
                    <p>Tree diagrams are good way to calculate probability of chained events. The branches represent possible outcomes and the end of the branches represents the events. You can find the probability of a series of outcomes by multiplying the branches going across.</p>
                    <p>The probability of the branches should add up to 1 in one set of branches.</p>
                    <h3>Example</h3>
                    
                    <p>If we flip a coin once we have a 0.5 chance of flipping heads or tails, if we flip it again, we will have the same possible outcomes but the probability of flipping the same face is halved. We can represent this in a probability tree:</p>
                    <img alt=''src="/static/maths/probability/image014.png" className={styles['equation']}></img>
                    
                    <p>The probability of flipping heads twice in a row is the branches multiplied together. So, in this case:</p>
                    <img alt=''src="/static/maths/probability/image015.png" className={styles['equation']}></img>

                    <p>Tree diagrams are useful to visualise the probability of events that happen consecutively.</p>
                    <h2>Conditional probability</h2>
                    <img alt=''src="/static/maths/probability/image016.png" className={styles['equation']}></img>

                    <p>Conditional probability is the probability of an event given than another event has already happened. So, the events are linked. In the equation above, P(B|A) is the probability of B given that A has already happened.</p>
                    <p>The intersection of the two events in the formula P(A<span >&cap;</span>B) is the branches probability multiplied. The probability of just P(A) is the branches of all those events occurring multiplied and added together.</p>
                    <h3>Example</h3>
                    <ol>
                        <li>A box contains 4 white chocolates and 7 dark chocolates. Two chocolates are taken out one at a time randomly and eaten straight away.
                            <ol type="a">
                                <li>Draw a probability tree to represent the all the possible outcomes of eating specific types of chocolate.</li>
                                <li>Find the probability that at least one of the chocolates are white.</li>
                                <li>Find the probability that the second chocolate is white given that the first chocolate is dark.</li>
                            </ol>
                        </li>
                    </ol>

                        <p><strong>a)</strong> The probability tree can be represented with two starting branches followed by 2 more branches for each:</p>

                    <img alt=''src="/static/maths/probability/image017.png" className={styles['equation']}></img>

                    

                   <p><strong>b)</strong> The second question relates to finding all possibilities of at least one of the chocolates are white. One option will have the probability that the first chocolate is white meaning the second chocolate probability is irrelevant.</p>
                        <p>The first chocolate being dark means we just need to multiply this probability P(D) by the probability the second is white P(DW) and then add this to the probability that the first is white.</p>
    

                    <img alt=''src="/static/maths/probability/image018.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image019.png" className={styles['equation']}></img>

                    <p>This can also be rewritten as the probability of not choosing P(DD):</p>
                    <img alt=''src="/static/maths/probability/image020.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image021.png" className={styles['equation']}></img>

                        <p><strong>c)</strong> This question can use the conditional probability formula as the question asks for a probability given that something has already happened</p>
                    <img alt=''src="/static/maths/probability/image022.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image023.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image024.png" className={styles['equation']}></img>
    
                    <p>In this case, the probability that the second chocolate is white given the first is dark is simply the probability of that branch itself.</p>
                    
                    <h2>Mutually exclusive events</h2>
                    <img alt=''src="/static/maths/probability/image025.png" className={styles['equation']}></img>

                    <p>Events that are mutually exclusive mean they cannot occur together and so have no intersection.</p>
                    <h3>Example</h3>
                    <p>The probability of rolling a 4 on a dice and rolling a 6 on a dice both have the same probability of 1/6. They have no intersection as rolling both events are impossible and so they are mutually exclusive.</p>
                    <h2>Independent events</h2>
                    <img alt=''src="/static/maths/probability/image026.png" className={styles['equation']}></img>

                    <p>Independent events are events that do not depend on one another to affect their probability.</p>
                    <p>Given that the conditional probability formula provides an equation which uses the intersection of the events, we can substitute the equation above and find a simpler equation for conditional probability of independent events:</p>
                    <img alt=''src="/static/maths/probability/image027.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image028.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image029.png" className={styles['equation']}></img>


                    <h3>Example</h3>
                    <p>The probability that I go to work tomorrow (A) is 98%. The probability that it rains tomorrow is 26%. These events can happen at the same time but they are not dependent on each other and so they are independent events.</p>
                    <p>You can calculate this using the conditional probability formula.</p>
                    <p>If:</p>
                    <img alt=''src="/static/maths/probability/image029.png" className={styles['equation']}></img>

                    <p>Then they are independent.</p>
                    <img alt=''src="/static/maths/probability/image030.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image031.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image032.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image033.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image034.png" className={styles['equation']}></img>

                    <p>As shown, these events are independent.</p>
                    
                    
                    
                    <h2>Discrete random variables</h2>
                    <img alt=''src="/static/maths/probability/image035.png" className={styles['equation']}></img>

                    <p>Discrete random variables (X) are the values in which there are probabilities that these values can have. A discrete probability distribution can be represented as a tabular set of values showing all the possible values of X and their probabilities. All the probabilities add up to one.</p>
                    <h3>Example</h3>
                    <ol>
                        <li>The discrete random variable X takes the values 0, 1, 2 and 3 has the probability distribution in tabular form below.
                            <ol type="a"><li>Find the value of k</li></ol>
                        </li>
                        </ol>

                    <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody>
                        <tr>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/probability/image036.png" className={styles['equation']}></img>

                        </td>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}>0</p>
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
                    </tr>
                        <tr >
                            <td width="200" valign="top" >
                            <img alt=''src="/static/maths/probability/image037.png" className={styles['equation']}></img>

                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >0.3</p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >0.42
                                </p>
                            </td>
                            <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>0.19</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>k</p>
                        </td>
                        </tr>

                    </tbody></table>
                    
                    <p><strong>a)</strong> To find this value we can use the equation above that says the sum of all probabilities add up to 1. So,</p>
                    <img alt=''src="/static/maths/probability/image035.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image038.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image039.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image040.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image041.png" className={styles['equation']}></img>

                    
                    <p>The probability of X = x can be equal to a function in itself where introduction of other variables, usually denoted k, can be used to formulate probability values based on the X value and the k value.</p>
                    <p>For example:</p>
                    <img alt=''src="/static/maths/probability/image042.png" className={styles['equation']}></img>

                    <p>This means that the value of the probability of X would be some unknown value k multiplied by each value: x. Generally, this unknown value is found via the same formula from earlier as all the probabilities must add up to one.</p>
                    <h3>Example</h3>
                    <p>Find the value of k and the probability of P(X &lt; 2) and P(2 &ge; 3) for the probability function of the discrete random variable X. Where x = 0, 1, 2, 3</p>
                    <img alt=''src="/static/maths/probability/image043.png" className={styles['equation']}></img>

                    <p>The value of k can be found using the same methods from the previous example, except this time a table is not given so it can be constructed to make the problem easier to understand:</p>
                    
                    
                    
                    <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody>
                        <tr>
                        <td width="200" valign="top">
                        <img alt=''src="/static/maths/probability/image036.png" className={styles['equation']}></img>
                        </td>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}>0</p>
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
                    </tr>
                        <tr >
                            <td width="200" valign="top" >
                            <img alt=''src="/static/maths/probability/image037.png" className={styles['equation']}></img>
                            </td>
                            <td width="200" valign="top">
                            <img alt=''src="/static/maths/probability/image044.png" className={styles['equation']}></img>
                            </td>
                            <td width="200" valign="top">
                            <img alt=''src="/static/maths/probability/image045.png" className={styles['equation']}></img>
                            </td>
                            <td width="200" valign="top">  
                            <img alt=''src="/static/maths/probability/image046.png" className={styles['equation']}></img>
                        </td>
                        <td width="200" valign="top">  
                        <img alt=''src="/static/maths/probability/image047.png" className={styles['equation']}></img>
                        </td>
                        </tr>

                    </tbody></table>
                    
                    <p>Using the sum formula, we can rearrange the values to solve for k:</p>
                    <img alt=''src="/static/maths/probability/image035.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image048.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image049.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image050.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image051.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image052.png" className={styles['equation']}></img>


                    <p>For the inequality probabilities, this is simply the probabilities summed together in that specified range. So for P(X &lt; 2):</p>
                    <img alt=''src="/static/maths/probability/image053.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image054.png" className={styles['equation']}></img>

                    <p>And for P(2 &ge; 3):</p>

                    <img alt=''src="/static/maths/probability/image055.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image056.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image057.png" className={styles['equation']}></img>


                </div>


            </article>
        </>
    )
}

export default Probability