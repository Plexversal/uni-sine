import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"
function RAM() {

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
                title="Random Access Memory"
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
                <h1>Random Access Memory (RAM)</h1>
                    <p>
                        Random Access Memory (RAM) is a critical component in modern computers, responsible for temporarily storing and managing data while the computer is running. This topic will explore how RAM physically stores data, how it interacts with the Central Processing Unit (CPU), and the role of the CPU cache in enhancing performance. We&apos;ll also cover relevant mathematical concepts and include binary examples within exam questions.
                    </p>
                    <h2>Physical Storage and Data Management in RAM</h2>
                    <p>
                        RAM is a form of volatile memory, meaning that it loses its stored data when power is removed. It stores data as binary values (0s and 1s) in memory cells, which are organized in a grid-like structure. Each cell consists of a capacitor and a transistor, with the capacitor holding an electrical charge to represent a binary value (charged for 1, uncharged for 0), and the transistor controlling access to the cell.
                    </p>

                    <p>
                        Data in RAM is organized into units called words, typically consisting of 32 or 64 bits. Each word has a unique memory address, allowing the CPU to access the data quickly and efficiently. The CPU uses a memory controller to read and write data to and from RAM, ensuring that the necessary data is available for processing.
                    </p>
                    <h2>RAM and CPU Interaction</h2>
                    <p>
                        When a computer is running, the CPU constantly fetches data from RAM, processes it, and writes the results back to RAM. This process is facilitated by the memory controller, which uses memory addresses to access specific words in RAM. The memory controller also manages the timing and synchronization of data transfers between the CPU and RAM.
                    </p>

                    <h2>CPU Cache</h2>
                    <p>
                        The CPU cache is a small, fast memory storage area located within the CPU that holds frequently accessed data to minimize the time required for the CPU to access RAM. The cache stores a copy of the most recently accessed data and anticipates which data the CPU will likely need next. This reduces the CPU&apos;s reliance on slower RAM and improves overall system performance.
                    </p>
                    <p>
                        CPU caches are typically organized into multiple levels (L1, L2, and L3), with each level having different sizes and speeds. The L1 cache is the smallest and fastest, while the L3 cache is the largest and slowest.
                    </p>

                    <h2>Math and Binary Examples</h2>
                    <p>
                        Computers use binary math to represent and manipulate data, including addressing memory in RAM. Memory addresses are typically represented as binary numbers, allowing efficient access and storage of data.
                    </p>

                    <p>
                        Understanding how RAM works and its relationship with the CPU is crucial for comprehending the overall functioning of modern computers. Grasping the concept of CPU cache and how binary math plays a role in memory addressing helps provide a more in-depth understanding of computer architecture.
                    </p>
                    <h2>DRAM and SRAM</h2>
                    <p>
                        There are two main types of RAM used in computers: Dynamic Random Access Memory (DRAM) and Static Random Access Memory (SRAM). Each type has its own characteristics and applications within a computer system.
                    </p>
                    <h3>Dynamic Random Access Memory (DRAM)</h3>
                    <p>
                        DRAM is the most common type of RAM used in computers for primary memory. It stores each bit of data in a separate capacitor within an integrated circuit. Due to the nature of capacitors, they slowly discharge over time, causing the stored data to fade. To prevent data loss, DRAM requires periodic refreshing of the stored data by reading and rewriting the data in each capacitor.
                    </p>
                    <h3>Static Random Access Memory (SRAM)</h3>
                    <p>
                        SRAM, on the other hand, uses flip-flops to store data bits. Unlike DRAM, SRAM does not require periodic refreshing, as flip-flops can hold their state as long as power is supplied. This makes SRAM faster and more reliable than DRAM. However, SRAM is also more expensive and consumes more power. Due to its performance advantages, SRAM is often used for CPU caches.
                    </p>
                    <h2>Addressing and Accessing RAM</h2>
                    <p>
                        Memory addressing is the process by which a computer accesses data stored in RAM. Each memory location in RAM has a unique address, which is represented as a binary number. When the CPU needs to access data in RAM, it sends the memory address to the RAM controller, which retrieves the data and sends it back to the CPU.
                    </p>
                    <CodeBlock
                    language="cpp"
                    code={`// Example: Accessing a memory location in a programming language (e.g., C)
int* memory_address = 0x12345678; // The memory address (in hexadecimal)
int data = *memory_address; // Accessing the data stored at that address`}/>

                    <h2>RAM and CPU Cache Interaction</h2>
                    <p>
                        As mentioned earlier, the CPU cache is a small, fast memory storage area that helps improve system performance by holding frequently accessed data. When the CPU needs to access data, it first checks the cache. If the data is not present in the cache (a cache miss), the CPU fetches the data from RAM and stores a copy in the cache for future use. If the data is present in the cache (a cache hit), the CPU can access it much more quickly than if it had to retrieve it from RAM.
                    </p>
                </div>
            </article>
        </>
    );


}

export default RAM