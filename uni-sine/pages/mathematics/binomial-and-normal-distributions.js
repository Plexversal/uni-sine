import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import P5NormalDistribution from "../../components/p5-interactions/P5NormalDistribution"

function Distributions() {

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
            <SecondaryBanner title='Binomial and Normal distributions' subheader={`${minsToRead()} · Updated 12/11/2022`} />
            <Path />

            <article itemScope itemType="http://schema.org/Article" id='article' className={styles['page-wrapper']}>
                <div className={styles['article-container']}>
                    <h2>Binomial distributions</h2>
                    <img alt=''src="/static/maths/probability/image058.png" className={styles['equation']}></img>

                    <p>The above equation represents the binomial distribution equation and can be used to work out probabilities that satisfy specific characteristics.</p>
                    <p>X is binomially distributed when there are two outcomes, such as success and failure, hence the binomial term. The probability for success has to be the same each trial and so probability involving no replacement would not work with this.</p>
                    <p>So, for the above equation:</p>
                    <p>n = number of trials</p>
                    <p>r = number of successes</p>
                    <p>p = probability of success</p>
                    <p>This can also be written as the following:</p>
                    <img alt=''src="/static/maths/probability/image059.png" className={styles['equation']}></img>

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
                        <img alt=''src="/static/maths/probability/image060.png" className={styles['equation']}></img>

                    
                    
                    <p>The specific probability we need to find is no more than 10 days in a 28-day period:</p>
                    <img alt=''src="/static/maths/probability/image061.png" className={styles['equation']}></img>
                    
                    <p>This is equal to:</p>
                    <img alt=''src="/static/maths/probability/image062.png" className={styles['equation']}></img>
                    
                    <p>We can input this data into the cumulative distribution function (cdf) on a calculator but if this was written in formula form it would be the following:</p>
                    <img alt=''src="/static/maths/probability/image063.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image064.png" className={styles['equation']}></img>
                    
                    <p>As you can see doing all these calculations individually would get quite complex and time consuming which is why a calculator would be needed:</p>
    
                    <img alt=''src="/static/maths/probability/image065.png" className={styles['equation']}></img>

                    <p><strong>b)</strong> The second part of the question will have a different binomial distribution value as the days have changed from 28 to 14 but the method is the same:</p>
                    <img alt=''src="/static/maths/probability/image066.png" className={styles['equation']}></img>
                    
                    <p>The specific probability we need to find is exactly half the 14 days which is 7:</p>
                    <img alt=''src="/static/maths/probability/image067.png" className={styles['equation']}></img>
                    
                    <p>This can be calculated using the binomial probability distribution function (pdf) on a calculator or using the formula:</p>
                    
                    <img alt=''src="/static/maths/probability/image068.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image069.png" className={styles['equation']}></img>
                    
                    <h2>Normal distributions</h2>
                    <img alt=''src="/static/maths/probability/image070.png" className={styles['equation']}></img>

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
                    <img alt=''src="/static/maths/probability/image071.png" className={styles['equation']}></img>

                    <p>So, to work out the probability between two boundaries of the distribution graph you can integrate the above:</p>
                    <img alt=''src="/static/maths/probability/image072.png" className={styles['equation']}></img>

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
                        <img alt=''src="/static/maths/probability/image073.png" className={styles['equation']}></img>
            
                    
                    <p>For the first part, X is less than 50, so entering these values into the normal cumulative distribution function with a lower bound of -99 (any lower bound large enough will suffice) we get the following result:</p>
                    
                    <img alt=''src="/static/maths/probability/image074.png" className={styles['equation']}></img>
                    
                   
                        <p><strong>b)</strong> Just like part a, we use the same calculations except we need to convert the probability into two parts:</p>
                        <img alt=''src="/static/maths/probability/image075.png" className={styles['equation']}></img>
                        <img alt=''src="/static/maths/probability/image076.png" className={styles['equation']}></img>
                        <img alt=''src="/static/maths/probability/image077.png" className={styles['equation']}></img>
                        <img alt=''src="/static/maths/probability/image078.png" className={styles['equation']}></img>
        

                    
                    <h3>Standard normal distribution</h3>
                    <p>The standard normal distribution can convert any normal distribution into a standard form where the mean is always 0 and the variance is 1 which means the standard deviation is also 1.</p>
                    <p>The standard normal distribution is represented by the value: Z</p>
                    <img alt=''src="/static/maths/probability/image079.png" className={styles['equation']}></img>

                    <p>To convert a normal distribution to a standard normal distribution:</p>
                    <img alt=''src="/static/maths/probability/image080.png" className={styles['equation']}></img>

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
                    
                        <img alt=''src="/static/maths/probability/image081.png" className={styles['equation']}></img>
                    
                    <p>We can work out the Z value using the calculator as we know the area under the graph by the given probability:</p>
                    <img alt=''src="/static/maths/probability/image082.png" className={styles['equation']}></img>

                    <p>As we now have the Z value, we can use the Z formula to find the mean for the specific probability distribution:</p>
                    
                    <img alt=''src="/static/maths/probability/image083.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image084.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image085.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image086.png" className={styles['equation']}></img>
                    
                    
                    
                    
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
                        <img alt=''src="/static/maths/probability/image070.png" className={styles['equation']}></img>
                        <img alt=''src="/static/maths/probability/image087.png" className={styles['equation']}></img>
                    
                    <p>The second Z value can be calculated using the fact that 1 &ndash; 0.1152 is the same value, this is if the calculator only supports values less than a specific value.</p>

                    <img alt=''src="/static/maths/probability/image088.png" className={styles['equation']}></img>
                    <p>We now have what we need to formulate the simultaneous equation to solve for both variables:</p>
                    <img alt=''src="/static/maths/probability/imagem4.png" className={styles['equation']}></img>

                    <img alt=''src="/static/maths/probability/image089.png" className={styles['equation']}></img>

                    <p>Rearrange:</p>
                    
                    <img alt=''src="/static/maths/probability/image090.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image091.png" className={styles['equation']}></img>
                    
                    <p>First solve for sigma by subtracting both equations:</p>
                    <img alt=''src="/static/maths/probability/imagem1.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/imagem2.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image092.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image093.png" className={styles['equation']}></img>
                    
                    <p>Now we can solve for mu by substituting sigma into one of the equations:</p>
                    <img alt=''src="/static/maths/probability/imagem3.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image094.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image095.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image096.png" className={styles['equation']}></img>

                    
                    <h3>Normal approximations with Binomial distributions</h3>
                    <p>Binomial distributions that meet specific characteristics can be approximated using a normal distribution as well.</p>
                    <p>A binomial distribution does not have a mean and variance so to find this for a binomial distribution you can do the following:</p>
                    <img alt=''src="/static/maths/probability/image097.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image098.png" className={styles['equation']}></img>

                    <p>When representing binomial to normal we use Y:</p>
                    <img alt=''src="/static/maths/probability/image099.png" className={styles['equation']}></img>

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
                    <img alt=''src="/static/maths/probability/image100.png" className={styles['equation']}></img>
                    
                   
                        <p><strong>a)</strong> We can convert the binomial distribution to a normal distribution using the np and npq substitution for mean and variance:</p>
                        <img alt=''src="/static/maths/probability/image101.png" className={styles['equation']}></img>
                        <img alt=''src="/static/maths/probability/image102.png" className={styles['equation']}></img>
                    
                    <p>The probability given will need to use a continuity correction:</p>
                    <img alt=''src="/static/maths/probability/image103.png" className={styles['equation']}></img>

                    <p>We can convert to Z value and work out the normal distribution for this probability:</p>
                    <img alt=''src="/static/maths/probability/image104.png" className={styles['equation']}></img>

                    <p>We can now input this as the upper bound and -100 as the lower bound on the calculator, this will give probability less than that value so to find more than this value we can subtract from 1:</p>
                    <img alt=''src="/static/maths/probability/image105.png" className={styles['equation']}></img>
                    <img alt=''src="/static/maths/probability/image106.png" className={styles['equation']}></img>


                </div>


            </article>
        </>
    )
}

export default Distributions