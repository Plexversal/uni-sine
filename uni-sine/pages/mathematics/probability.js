import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5NormalDistribution from "../../components/p5-interactions/P5NormalDistribution"

function probability() {

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
            <SecondaryBanner title='Probability' subheader={`${minsToRead()} · Updated 12/11/2022`} />
            <Path />
            <article id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h1>Probability</h1>

                    <h2>Venn diagrams and probability notation</h2>
                    <img src="/static/maths/probability/image001.png" className={styles['equation']}></img>
                    <p>Probability is a measure of how likely random events can occur. There is the total possible outcomes and the desired events that can occur by chance. We can measure the chance of something using the formula above.</p>
                    <h3>Example</h3>
                    <p>What is the probability of picking an ace in a set of 52 playing cards?</p>
                    <img src="/static/maths/probability/image002.png" className={styles['equation']}></img>

                    <p>As there are 4 aces, there are 4 chances of this desired event occurring and so you divide this over all possible outcomes which is 52 cards.</p>

                    <p><br />Venn diagrams are a useful visual element to understanding how outcomes can occur for multiple events. Venn diagrams would need at least 2 events, which can be labelled event A and event B.</p>
                    <img src="/static/maths/probability/image003.png" className={styles['equation']}></img>
                    
                    <p>The individual event probabilities can simply use the notation P(A) or P(B) if you just need the outcomes of one event.</p>
                    <p>Events can also be described as <strong>not</strong> happening which can be the same event but with an apostrophe representing this as the <strong>compliment </strong>e.g., P(A&rsquo;) would be the probability of A not happening.</p>
                    <p>To describe the middle part of the Venn diagram, which describes the outcomes as satisfying both events, is shown as P(A <span >&cap;</span> B). This is called the <strong>intersection</strong>.</p>
                    <p>To describe any of the outcomes satisfying either of the events in the diagram, it is shown with P(A <span >&cup;</span> B). This is called the <strong>union</strong>.</p>
                    
                    <h3>Example</h3>
                    <p>Using the below Venn diagram, find the following probabilities:</p>
                    <p>P(A), P(B) P(A&rsquo;), P(B&rsquo;), P(A <span >&cup;</span> B), P(A <span >&cap;</span> B), P(A &rsquo;<span >&cup;</span> B) P(A &rsquo;<span >&cup;</span> B&rsquo;)</p>
                    <img src="/static/maths/probability/image004.png" className={styles['equation']}></img>
                    
                    <p>Before calculating, we can first determine that the number of all possible outcomes is the total of all numbers which is equal to 50.</p>
                    <p>We can now calculate the above probabilities:</p>
                    <img src="/static/maths/probability/image005.png" className={styles['equation']}></img>

                    <p>The probability of one event is the inclusion of the values in the intersection and so that is why the above event is 33 and not 26.</p>
                    <img src="/static/maths/probability/image006.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image007.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image008.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image009.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image010.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image011.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image012.png" className={styles['equation']}></img>
                    
                    
                    <h2>Tree Diagrams</h2>
                    <img src="/static/maths/probability/image013.png" className={styles['equation']}></img>
                    
                    <p>Tree diagrams are good way to calculate probability of chained events. The branches represent possible outcomes and the end of the branches represents the events. You can find the probability of a series of outcomes by multiplying the branches going across.</p>
                    <p>The probability of the branches should add up to 1 in one set of branches.</p>
                    <h3>Example</h3>
                    
                    <p>If we flip a coin once we have a 0.5 chance of flipping heads or tails, if we flip it again, we will have the same possible outcomes but the probability of flipping the same face is halved. We can represent this in a probability tree:</p>
                    <img src="/static/maths/probability/image014.png" className={styles['equation']}></img>
                    
                    <p>The probability of flipping heads twice in a row is the branches multiplied together. So, in this case:</p>
                    <img src="/static/maths/probability/image015.png" className={styles['equation']}></img>

                    <p>Tree diagrams are useful to visualise the probability of events that happen consecutively.</p>
                    <h2>Conditional probability</h2>
                    <img src="/static/maths/probability/image016.png" className={styles['equation']}></img>

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

                    <img src="/static/maths/probability/image017.png" className={styles['equation']}></img>

                    

                   <p><strong>b)</strong> The second question relates to finding all possibilities of at least one of the chocolates are white. One option will have the probability that the first chocolate is white meaning the second chocolate probability is irrelevant.</p>
                        <p>The first chocolate being dark means we just need to multiply this probability P(D) by the probability the second is white P(DW) and then add this to the probability that the first is white.</p>
    

                    <img src="/static/maths/probability/image018.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image019.png" className={styles['equation']}></img>

                    <p>This can also be rewritten as the probability of not choosing P(DD):</p>
                    <img src="/static/maths/probability/image020.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image021.png" className={styles['equation']}></img>

                        <p><strong>c)</strong> This question can use the conditional probability formula as the question asks for a probability given that something has already happened</p>
                    <img src="/static/maths/probability/image022.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image023.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image024.png" className={styles['equation']}></img>
    
                    <p>In this case, the probability that the second chocolate is white given the first is dark is simply the probability of that branch itself.</p>
                    
                    <h2>Mutually exclusive events</h2>
                    <img src="/static/maths/probability/image025.png" className={styles['equation']}></img>

                    <p>Events that are mutually exclusive mean they cannot occur together and so have no intersection.</p>
                    <h3>Example</h3>
                    <p>The probability of rolling a 4 on a dice and rolling a 6 on a dice both have the same probability of 1/6. They have no intersection as rolling both events are impossible and so they are mutually exclusive.</p>
                    <h2>Independent events</h2>
                    <img src="/static/maths/probability/image026.png" className={styles['equation']}></img>

                    <p>Independent events are events that do not depend on one another to affect their probability.</p>
                    <p>Given that the conditional probability formula provides an equation which uses the intersection of the events, we can substitute the equation above and find a simpler equation for conditional probability of independent events:</p>
                    <img src="/static/maths/probability/image027.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image028.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image029.png" className={styles['equation']}></img>


                    <h3>Example</h3>
                    <p>The probability that I go to work tomorrow (A) is 98%. The probability that it rains tomorrow is 26%. These events can happen at the same time but they are not dependent on each other and so they are independent events.</p>
                    <p>You can calculate this using the conditional probability formula.</p>
                    <p>If:</p>
                    <img src="/static/maths/probability/image029.png" className={styles['equation']}></img>

                    <p>Then they are independent.</p>
                    <img src="/static/maths/probability/image030.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image031.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image032.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image033.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image034.png" className={styles['equation']}></img>

                    <p>As shown, these events are independent.</p>
                    
                    
                    
                    <h2>Discrete random variables</h2>
                    <img src="/static/maths/probability/image035.png" className={styles['equation']}></img>

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
                        <img src="/static/maths/probability/image036.png" className={styles['equation']}></img>

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
                            <img src="/static/maths/probability/image037.png" className={styles['equation']}></img>

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
                    <img src="/static/maths/probability/image035.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image038.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image039.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image040.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image041.png" className={styles['equation']}></img>

                    
                    <p>The probability of X = x can be equal to a function in itself where introduction of other variables, usually denoted k, can be used to formulate probability values based on the X value and the k value.</p>
                    <p>For example:</p>
                    <img src="/static/maths/probability/image042.png" className={styles['equation']}></img>

                    <p>This means that the value of the probability of X would be some unknown value k multiplied by each value: x. Generally, this unknown value is found via the same formula from earlier as all the probabilities must add up to one.</p>
                    <h3>Example</h3>
                    <p>Find the value of k and the probability of P(X &lt; 2) and P(2 &ge; 3) for the probability function of the discrete random variable X. Where x = 0, 1, 2, 3</p>
                    <img src="/static/maths/probability/image043.png" className={styles['equation']}></img>

                    <p>The value of k can be found using the same methods from the previous example, except this time a table is not given so it can be constructed to make the problem easier to understand:</p>
                    
                    
                    
                    <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody>
                        <tr>
                        <td width="200" valign="top">
                        <img src="/static/maths/probability/image036.png" className={styles['equation']}></img>
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
                            <img src="/static/maths/probability/image037.png" className={styles['equation']}></img>
                            </td>
                            <td width="200" valign="top">
                            <img src="/static/maths/probability/image044.png" className={styles['equation']}></img>
                            </td>
                            <td width="200" valign="top">
                            <img src="/static/maths/probability/image045.png" className={styles['equation']}></img>
                            </td>
                            <td width="200" valign="top">  
                            <img src="/static/maths/probability/image046.png" className={styles['equation']}></img>
                        </td>
                        <td width="200" valign="top">  
                        <img src="/static/maths/probability/image047.png" className={styles['equation']}></img>
                        </td>
                        </tr>

                    </tbody></table>
                    
                    <p>Using the sum formula, we can rearrange the values to solve for k:</p>
                    <img src="/static/maths/probability/image035.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image048.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image049.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image050.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image051.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image052.png" className={styles['equation']}></img>


                    <p>For the inequality probabilities, this is simply the probabilities summed together in that specified range. So for P(X &lt; 2):</p>
                    <img src="/static/maths/probability/image053.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image054.png" className={styles['equation']}></img>

                    <p>And for P(2 &ge; 3):</p>

                    <img src="/static/maths/probability/image055.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image056.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image057.png" className={styles['equation']}></img>

                    
                    <h2>Binomial distributions</h2>
                    <img src="/static/maths/probability/image058.png" className={styles['equation']}></img>

                    <p>The above equation represents the binomial distribution equation and can be used to work out probabilities that satisfy specific characteristics.</p>
                    <p>X is binomially distributed when there are two outcomes, such as success and failure, hence the binomial term. The probability for success has to be the same each trial and so probability involving no replacement would not work with this.</p>
                    <p>So, for the above equation:</p>
                    <p>n = number of trials</p>
                    <p>r = number of successes</p>
                    <p>p = probability of success</p>
                    <p>This can also be written as the following:</p>
                    <img src="/static/maths/probability/image059.png" className={styles['equation']}></img>

                    <p>With the same attributes applying.</p>
                    <p>The number of trials could technically be represented by probability trees however with large amounts of trials this would be hard to draw and so the above equations are easier to follow.</p>
                    <p>A large data set however would also take a long time to calculate and so most calculators have cumulative distribution functions (cdf) and probability distribution functions (pdf) built into with the same variable options in the equations above and will provide the same result. This is found within the menu section.</p>
                    <p>You can find probabilities for a range of values in the form of inequalities. For example P(X &lt; 7). This would mean all probabilities summed together for the successful outcomes within that range. A range of values would require using cumulative distribution function on the calculator. &nbsp;</p>
                    <h3>Example</h3>
                    <ol>
                        <li>The probability that a bus arrives at a particular stop on time is 0.65. The arrival time is independent each day. The bus comes to the same stop every day.
                            <ol type="a">
                                <li>Calculate the probability the bus arrives on time no more than 19 times in a 28-day period</li>
                                <li>Calculate the probability the bus arrives on time exactly half the days in a 14-day period.</li>
                            </ol>
                        </li>
                    </ol>
                    

                        <p><strong>a)</strong> This question provides the information that we have multiple events each with late or not late (success or failure) and each event is independent. So, this can use binomial distribution.</p>
                            
                        <p> Using this for the first part we can say that X is binomially distributed with the following parameters:</p>
                        <img src="/static/maths/probability/image060.png" className={styles['equation']}></img>

                    
                    
                    <p>The specific probability we need to find is no more than 10 days in a 28-day period:</p>
                    <img src="/static/maths/probability/image061.png" className={styles['equation']}></img>
                    
                    <p>This is equal to:</p>
                    <img src="/static/maths/probability/image062.png" className={styles['equation']}></img>
                    
                    <p>We can input this data into the cumulative distribution function (cdf) on a calculator but if this was written in formula form it would be the following:</p>
                    <img src="/static/maths/probability/image063.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image064.png" className={styles['equation']}></img>
                    
                    <p>As you can see doing all these calculations individually would get quite complex and time consuming which is why a calculator would be needed:</p>
    
                    <img src="/static/maths/probability/image065.png" className={styles['equation']}></img>

                    <p><strong>b)</strong> The second part of the question will have a different binomial distribution value as the days have changed from 28 to 14 but the method is the same:</p>
                    <img src="/static/maths/probability/image066.png" className={styles['equation']}></img>
                    
                    <p>The specific probability we need to find is exactly half the 14 days which is 7:</p>
                    <img src="/static/maths/probability/image067.png" className={styles['equation']}></img>
                    
                    <p>This can be calculated using the binomial probability distribution function (pdf) on a calculator or using the formula:</p>
                    
                    <img src="/static/maths/probability/image068.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image069.png" className={styles['equation']}></img>
                    
                    <h2>Normal distributions</h2>
                    <img src="/static/maths/probability/image070.png" className={styles['equation']}></img>

                    <p>Just like binomial distribution, normal distribution has its own notation to indicate that the random variable X is normally distributed with 2 values describing the data&rsquo;s variance and mean.</p>
                    <p>&mu; = Mean</p>
                    <p>&sigma;<sup>2</sup> = Variance</p>
                    <p>&sigma; = Standard deviation</p>
                    <p>Normal distribution is a distribution of probabilities in equal directions of the mean with the most probable outcomes at the mean. It is used to determine probabilities within a range of values.</p>
                    <P5NormalDistribution  {...{showControls: true, showFunction: true}}/>

                    <p>The normal distribution graph has horizontal asymptotes as it approaches zero but never touches it.</p>
                    <p>The total probability under the graph is equal to one.</p>
                    <p>The probability of a range of values is the area under the graph between two upper and lower bounds. Integration can be used to calculate this probability; however, the integral is non-elementary and incorporates the Gauss error function and so the best route of calculation is using a calculator instead.</p>
                    <p>The function of the graph, also known as the probability density function, is as follows:</p>
                    <img src="/static/maths/probability/image071.png" className={styles['equation']}></img>

                    <p>So, to work out the probability between two boundaries of the distribution graph you can integrate the above:</p>
                    <img src="/static/maths/probability/image072.png" className={styles['equation']}></img>

                    <p>Again, a calculator does this for you but this is what the specific integral would look like.</p>
                    <p>On a calculator, choosing the normal cumulative distribution function, enter the corresponding values for the mean, standard deviation and the X values.</p>
                    <p>The mean lies in the centre of the distribution graph. The standard deviation can help us find specific probability data.</p>
                    <ul>
                        <li>Within 1 standard deviation of the mean, the total probability area is &asymp; 68%.</li>
                        <li>Within 2 standard deviations of the mean, the total probability area is &asymp; 95%</li>
                        <li>Within 3 standard deviations of the mean, the total probability area is &asymp; 99.7%</li>
                    </ul>
                    <p>3 standard deviations generally includes all the data that is required to work with but you can go much further in standard deviations to get specific results.</p>
                    <h3>Example</h3>
                    <ol>
                        <li>The random variable X is normally distributed with a mean of 60 and a standard deviation of 10.
                            <ol type="a">
                                <li>Find P(X &lt; 50)</li>
                                <li>Find P(34 &lt; X &lt; 63)</li>
                            </ol>
                        </li>
                    </ol>
                    
                    
                        <p><strong>a)</strong> The question can be formatted into the normal distribution notation:</p>
                        <img src="/static/maths/probability/image073.png" className={styles['equation']}></img>
            
                    
                    <p>For the first part, X is less than 50, so entering these values into the normal cumulative distribution function with a lower bound of -99 (any lower bound large enough will suffice) we get the following result:</p>
                    
                    <img src="/static/maths/probability/image074.png" className={styles['equation']}></img>
                    
                   
                        <p><strong>b)</strong> Just like part a, we use the same calculations except we need to convert the probability into two parts:</p>
                        <img src="/static/maths/probability/image075.png" className={styles['equation']}></img>
                        <img src="/static/maths/probability/image076.png" className={styles['equation']}></img>
                        <img src="/static/maths/probability/image077.png" className={styles['equation']}></img>
                        <img src="/static/maths/probability/image078.png" className={styles['equation']}></img>
        

                    
                    <h3>Standard normal distribution</h3>
                    <p>The standard normal distribution can convert any normal distribution into a standard form where the mean is always 0 and the variance is 1 which means the standard deviation is also 1.</p>
                    <p>The standard normal distribution is represented by the value: Z</p>
                    <img src="/static/maths/probability/image079.png" className={styles['equation']}></img>

                    <p>To convert a normal distribution to a standard normal distribution:</p>
                    <img src="/static/maths/probability/image080.png" className={styles['equation']}></img>

                    <p>Using the Z value can be useful if a calculator only works with standard normal distributions.</p>
                    <p>The Z value is also useful to calculate the inverse of a normal distribution function if given an area and have to find the missing mean or standard deviation.</p>
                    <p>Because the standard normal distribution will always have a mean of 0 and a standard deviation of 1. It can be used to get the Z value and this can be substituted into the equation above to get any missing mean or standard deviation.</p>
                    <p>The inverse normal distribution function on a calculator can work out the value of a point on the graph given the area, the mean and standard deviation would 0 and 1 respectively as it will use the standard normal.</p>
                    <h3>Example</h3>
                    <ol>
                        <li>The random variable X follows is normally distributed with a standard deviation of 4.
                            <ol type="a">
                                <li>If P(X &lt; 13) = 0.9887, find the mean.<br /><br /></li>
                            </ol>
                        </li>
                    </ol>
                    
                        <p><strong>a)</strong> The mean is missing so we can first put the question into notation that is familiar</p>
                    
                        <img src="/static/maths/probability/image081.png" className={styles['equation']}></img>
                    
                    <p>We can work out the Z value using the calculator as we know the area under the graph by the given probability:</p>
                    <img src="/static/maths/probability/image082.png" className={styles['equation']}></img>

                    <p>As we now have the Z value, we can use the Z formula to find the mean for the specific probability distribution:</p>
                    
                    <img src="/static/maths/probability/image083.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image084.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image085.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image086.png" className={styles['equation']}></img>
                    
                    
                    
                    
                    <h3>Solving for both mean and variance using simultaneous equations</h3>
                    <p>Using similar methods above we can create two equations with two unknown variables being the mean and variance.</p>
                    <p>If we are given two probabilities for two different X values then we can create the simultaneous equations.<br /><br /></p>
                    <h3>Example</h3>
                    <ol>
                        <li>Given the random variable X is normally distributed.
                            <ol type="a">
                                <li>If P(X &lt; 18) = 0.2882 and P(X &gt; 0.1152) Find the standard deviation and mean for this distribution.</li>
                            </ol>
                        </li>
                    </ol>
                    
                    
                        <p><strong>a)</strong> We have two missing variables we need to find so we will need to use simultaneous equations. The first step is to find the inverse normal or the probabilities given to get a Z value for both:</p>
                        <img src="/static/maths/probability/image070.png" className={styles['equation']}></img>
                        <img src="/static/maths/probability/image087.png" className={styles['equation']}></img>
                    
                    <p>The second Z value can be calculated using the fact that 1 &ndash; 0.1152 is the same value, this is if the calculator only supports values less than a specific value.</p>

                    <img src="/static/maths/probability/image088.png" className={styles['equation']}></img>
                    <p>We now have what we need to formulate the simultaneous equation to solve for both variables:</p>
                    <img src="/static/maths/probability/imagem4.png" className={styles['equation']}></img>

                    <img src="/static/maths/probability/image089.png" className={styles['equation']}></img>

                    <p>Rearrange:</p>
                    
                    <img src="/static/maths/probability/image090.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image091.png" className={styles['equation']}></img>
                    
                    <p>First solve for sigma by subtracting both equations:</p>
                    <img src="/static/maths/probability/imagem1.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/imagem2.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image092.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image093.png" className={styles['equation']}></img>
                    
                    <p>Now we can solve for mu by substituting sigma into one of the equations:</p>
                    <img src="/static/maths/probability/imagem3.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image094.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image095.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image096.png" className={styles['equation']}></img>

                    
                    <h3>Normal approximations with Binomial distributions</h3>
                    <p>Binomial distributions that meet specific characteristics can be approximated using a normal distribution as well.</p>
                    <p>A binomial distribution does not have a mean and variance so to find this for a binomial distribution you can do the following:</p>
                    <img src="/static/maths/probability/image097.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image098.png" className={styles['equation']}></img>

                    <p>When representing binomial to normal we use Y:</p>
                    <img src="/static/maths/probability/image099.png" className={styles['equation']}></img>

                    <p>Binomial distributions converted to normal distributions only work well if the probability is close to 0.5 and there is a large number of trials.</p>
                    <p>It can also work if np and nq are more than 5.</p>
                    <p>Binomial distributions are discrete and normal distributions are continuous, as mentioned before P(X = n) will always equal zero in a normal distribution. A continuity correction is needed to allow direct probabilities to be calculated.</p>
                    <p>The discrete random variable X is corrected to be continuous over a 0.5 either side. E.g. P(X = 1) = P(0.5 &lt; X &lt; 1.5) Allowing for the probabilities to be calculated in normal distribution.</p>
                    
                    <h3>Example</h3>
                    
                    <ol>
                        <li>Given the random variable X is binomially distributed
                            <ol type="a">
                                <li>find P(X &gt; 105) using a normal approximation:</li>
                            </ol>
                        </li>
                    </ol>
                    <img src="/static/maths/probability/image100.png" className={styles['equation']}></img>
                    
                   
                        <p><strong>a)</strong> We can convert the binomial distribution to a normal distribution using the np and npq substitution for mean and variance:</p>
                        <img src="/static/maths/probability/image101.png" className={styles['equation']}></img>
                        <img src="/static/maths/probability/image102.png" className={styles['equation']}></img>
                    
                    <p>The probability given will need to use a continuity correction:</p>
                    <img src="/static/maths/probability/image103.png" className={styles['equation']}></img>

                    <p>We can convert to Z value and work out the normal distribution for this probability:</p>
                    <img src="/static/maths/probability/image104.png" className={styles['equation']}></img>

                    <p>We can now input this as the upper bound and -100 as the lower bound on the calculator, this will give probability less than that value so to find more than this value we can subtract from 1:</p>
                    <img src="/static/maths/probability/image105.png" className={styles['equation']}></img>
                    <img src="/static/maths/probability/image106.png" className={styles['equation']}></img>


                </div>


            </article>
        </>
    )
}

export default probability