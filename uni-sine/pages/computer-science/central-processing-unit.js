import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"
import Account from "../../components/page-construction/AccountModal"
function CPU() {

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
        let time = Math.ceil((text.length / 25) / 60) + 3 // all paragraph characters with 25 char per second read time plus 1 for images
        return `${time} minute read`
    }
    return (
        <>
            <SecondaryBanner
                title="Central Processing Unit"
                subheader={`${minsToRead()} · Updated 24/07/2022`}
            />
            <Path />
            <article
                itemScope
                itemType="http://schema.org/Article"
                id="article"
                className={styles["page-wrapper"]}
            >
                <div className={styles["article-container"]}>
                    <h2>Logic Gates</h2>
                    <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody><tr>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}><strong>Name </strong></p>
                        </td>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}>NOT</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>AND</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>NAND</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>OR</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>NOR</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>XOR</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>XNOR</p>
                        </td>

                    </tr>
                    </tbody></table>
                    <p>
                        Logic gates are the basic building blocks of digital circuits, performing simple logical operations on binary inputs. CPUs contain millions or billions of logic gates that work together to process data and execute instructions. There are several types of logic gates, including AND, OR, NOT, NAND, NOR, XOR, and XNOR gates. Each type of gate has a unique output based on its input values.
                    </p>

                    <h3>Examples of Logic Gate Operations</h3>
                    <p>
                        Here are a few examples of basic logic gate operations:
                    </p>
                    <ul>
                        <li><strong>AND Gate:</strong> Output is 1 only if both inputs are 1. (1 AND 1 = 1, 1 AND 0 = 0, 0 AND 1 = 0, 0 AND 0 = 0)</li>
                        <li><strong>OR Gate:</strong> Output is 1 if at least one of the inputs is 1. (1 OR 1 = 1, 1 OR 0 = 1, 0 OR 1 = 1, 0 OR 0 = 0)</li>
                        <li><strong>NOT Gate:</strong> Output is the inverse of the input. (NOT 1 = 0, NOT 0 = 1)</li>
                        <li><strong>XOR Gate:</strong> Output is 1 if the inputs are different. (1 XOR 1 = 0, 1 XOR 0 = 1, 0 XOR 1 = 1, 0 XOR 0 = 0)</li>
                    </ul>
                    <h2>Binary Math and Arithmetic Operations</h2>
                    <p>
                        Binary math is a system of arithmetic that uses base 2, in contrast to the decimal system, which uses base 10. In binary, there are only two digits: 0 and 1. These digits, called bits, are the fundamental units of information in computers. Binary math is essential for computer operations, as it represents the underlying logic used by digital circuits and processors. This section will cover binary number representation, basic binary arithmetic operations, and how computers utilize binary math.
                    </p>
                    <h3>Binary Number Representation</h3>
                    <p>
                        In binary, numbers are represented as a sequence of bits, with each position having a place value equal to a power of 2. For example, the binary number 1101 can be converted to decimal by calculating the sum of the place values with a 1 in the corresponding position.
                    </p>
                    <img alt='' src="/static/comp/CPU/Image001.png" className={styles['equation']}></img>
                    <img alt='' src="/static/comp/CPU/Image002.png" className={styles['equation']}></img>


                    <h3>Basic Binary Arithmetic Operations</h3>
                    <p>
                        Binary arithmetic operations, such as addition, subtraction, multiplication, and division, follow similar rules to those in the decimal system but are performed using binary digits.
                    </p>
                    <h4>Binary Addition</h4>
                    <p>
                        Binary addition works by adding corresponding bits in each position and carrying any overflow to the next position.
                    </p>
                    <img alt='' src="/static/comp/CPU/Image003.png" className={styles['equation']}></img>

                    <img alt='' src="/static/comp/CPU/Image004.png" className={styles['equation']}></img>

                    <h4>Binary Subtraction</h4>
                    <p>
                        Binary subtraction involves borrowing from the next position if the minuend is smaller than the subtrahend.
                    </p>
                    <img alt='' src="/static/comp/CPU/Image005.png" className={styles['equation']}></img>
                    <img alt='' src="/static/comp/CPU/Image006.png" className={styles['equation']}></img>

                    <h4>Binary Multiplication</h4>
                    <p>
                        Binary multiplication is performed by multiplying each bit in the multiplicand by the multiplier and summing the shifted partial products.
                    </p>
                    <img alt='' src="/static/comp/CPU/Image007.png" className={styles['equation']}></img>
                    <img alt='' src="/static/comp/CPU/Image008.png" className={styles['equation']}></img>
                    <h3>Binary Math in Computers</h3>
                    <p>
                        Computers use binary math to perform arithmetic and logical operations on data. The Central Processing Unit (CPU) contains an Arithmetic Logic Unit (ALU) responsible for executing these operations. Binary math is used in various aspects of computer operation, including:
                    </p>
                    <ul>
                        <li><strong>Representing data:</strong> All data and instructions are stored and processed as binary numbers in a computer.</li>
                        <li><strong>Addressing memory:</strong> Memory locations are identified using binary addresses, enablingefficient access and manipulation of data.</li>
                        <li><strong>Performing arithmetic and logical operations:</strong> ALUs in CPUs execute binary arithmetic and logical operations, such as addition, subtraction, multiplication, division, and comparisons, using binary numbers.</li>
                        <li><strong>Managing input/output (I/O):</strong> Communication between the computer and external devices, such as keyboards, mice, and displays, relies on binary data transmission.</li>

                    </ul>
                    <p>
                        Binary math is essential for computer operation, as it provides a simple and efficient way to represent and manipulate data using digital circuits. By utilizing the binary system, computers can perform complex tasks quickly and accurately, making them indispensable tools in modern life.
                    </p>
                    <h2>Examples</h2>
                    <p>
                        Here are some example exam questions related to binary math and its applications in computers:
                    </p>
                    <ol>
                        <li>
                            <strong>Question:</strong> Convert the binary number 101101<sub>2</sub> to its decimal equivalent:
                            <p>
                            <strong>Answer:</strong>

                            </p>
                            <img alt='' src="/static/comp/CPU/Image009.png" className={styles['equation']}></img>
                            <br></br>
                            <img alt='' src="/static/comp/CPU/Image010.png" className={styles['equation']}></img>

                        </li>
                        <li>
                            <strong>Question:</strong> Perform binary addition on the numbers 11010<sub>2</sub> and 10101<sub>2</sub>.
                            <p>
                            <strong>Answer:</strong>
                            </p>
                            <img alt='' src="/static/comp/CPU/Image011.png" className={styles['equation']}></img>

                        </li>

                    </ol>



                    <h2>Instruction Execution and Pipelining</h2>
                    <p>
                        CPUs execute instructions by fetching them from memory, decoding the instruction to determine the operation and operands, performing the operation, and storing the result. Modern CPUs use a technique called pipelining to increase their performance by executing multiple instructions simultaneously at different stages of the process.
                    </p>
                    <p>
                        In a pipelined CPU, the instruction execution process is divided into several stages, with each stage performed by a separate pipeline stage. The stages typically include instruction fetch (IF), instruction decode (ID), execute (EX), memory access (MEM), and writeback (WB). Once a stage completes its task, it passes the instruction to the next stage and immediately starts working on the next instruction. This parallelism allows the CPU to execute multiple instructions simultaneously and increase its throughput.

                    </p>
                    <h2>Cache Memory and Performance Optimization</h2>
                    <p>
                        CPUs use cache memory to store frequently accessed data and instructions, reducing the latency associated with fetching information from main memory (RAM). Cache memory is smaller but faster than main memory, and it is organized into a hierarchy of levels (L1, L2, L3) that differ in size and speed. The closer the cache level is to the CPU, the faster and smaller it is.
                    </p>
                    <p>
                        Cache memory relies on techniques such as spatial and temporal locality to predict which data and instructions the CPU is likely to access in the near future. It uses replacement policies (e.g., Least Recently Used, LRU) to decide which data to evict from the cache when it becomes full.
                    </p>

                </div>
            </article>
        </>
    );


}

export default CPU