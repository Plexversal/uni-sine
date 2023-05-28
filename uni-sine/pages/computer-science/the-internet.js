import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"
function Internet() {

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
                title="How the Internet Works"
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

                    <h1>How the Internet Works</h1>

                    <p>
                        The internet is a complex and vast network that connects devices across the globe, enabling communication, information sharing, and various online services. This topic explains how local networks connect to local Internet Service Provider (ISP) infrastructure, the role of underground fiber optic cabling, and how networks efficiently interpret requests and packets of data. We&apos;ll also provide some examples, exam questions, and solutions to help students better understand the concepts.
                    </p>
                    <h2>Local Networks and ISP Infrastructure</h2>
                    <img alt='local network example' src="/static/comp/internet/localnetwork.png" className={styles['equation']}></img>

                    <p>
                        Local networks, such as home or office networks, connect devices within a limited geographic area. These networks rely on networking devices like routers and switches to manage communication between connected devices. To access the broader internet, local networks connect to an ISP&apos;s infrastructure.
                    </p>
                    <p>
                        ISPs are responsible for providing internet access to their customers by connecting them to the global internet infrastructure. They operate large networks that interconnect with other ISPs and the internet backbone, which is a high-speed, long-distance network of data links that facilitate data transmission worldwide. ISPs use various technologies, such as DSL, cable, or fiber optic connections, to deliver internet access to their customers.
                    </p>
                    <h2>Underground Fiber Optic Cabling and the Internet Backbone</h2>
                    <p>
                        Fiber optic cables play a vital role in the internet&apos;s infrastructure, particularly in the internet backbone. These cables consist of thin strands of glass or plastic, called optical fibers, which transmit data as pulses of light. Fiber optic cables offer several advantages over traditional copper cables, including higher bandwidth, lower signal attenuation, and resistance to electromagnetic interference.
                    </p>
                    <h2>Data Transmission and Packet Switching</h2>
                    <p>
                        The internet relies on packet switching to transmit data between devices. Packet switching involves breaking data into small pieces, called packets, which are then transmitted independently across the network. Each packet contains information about its source, destination, and position in the original data stream, allowing the receiving device to reassemble the packets in the correct order.
                    </p>
                    <ul>
                        <li><strong>Step 1:</strong> Data is broken into packets</li>
                        <li><strong>Step 2:</strong> Packets are sent through a series of routers and switches</li>
                        <li><strong>Step 3:</strong> The receiving device reassembles the packets</li>
                    </ul>
                    <h2>Example Network Description</h2>
                    <p>
                        Let&apos;s take a look at a simple example of a local network connected to the internet through an ISP.
                    </p>
                    <ol>
                        <li>A home user wants to access a website on their computer.</li>
                        <li>The computer sends a request to the home router.</li>
                        <li>The router forwards the request to the ISP&apos;s infrastructure.</li>
                        <li>The ISP routes the request through its network and sends it to the internet backbone.</li>
                        <li>The request is transmitted across the internet backbone to the destination server.</li>
                        <li>The server sends the requested data (website) back through the same path.</li>
                        <li>The data is reassembled on the user&apos;s computer, and the website is displayed.</li>
                    </ol>
                    <h2>Question Example</h2>   
                        <ol>
                            <li>
                                Explain the process of packet switching and its role in data transmission over the internet.
                                <ol type="a">
                                    <li>What are the steps involved in packet switching?</li>
                                    <li>Why is packet switching preferred over circuit switching for internet communication?</li>
                                </ol>
                            </li>
                        </ol>
                    
                    <h3>Example Solution</h3>
                    <p>
                        <strong>a)</strong> The steps involved in packet switching are as follows:
                    </p>
                    <ol>
                        <li>Data is broken into small, independently transmitted packets.</li>
                        <li>Each packet contains information about its source, destination, and position in the original data stream.</li>
                        <li>Packets are sent through a series of routers and switches across the network.</li>
                        <li>The receiving device reassembles the packets in the correct order to reconstruct the original data.</li>
                    </ol>
                    <p>
                        <strong>b)</strong> Packet switching is preferred over circuit switching for internet communication for several reasons:
                    </p>
                    <ul>
                        <li><strong>Efficient resource utilization:</strong> In packet switching, multiple data streams can share the same network resources simultaneously, whereas circuit switching requires dedicated resources for each connection, even if they are not fully utilized.</li>
                        <li><strong>Scalability:</strong> Packet switching can easily adapt to changing network conditions and handle a large number of connections, making it suitable for the dynamic nature of the internet.</li>
                        <li><strong>Resilience:</strong> In packet switching, data can be transmitted through multiple paths, so if one path fails, the data can still reach its destination through alternative paths. This makes packet switching more resilient to network failures.</li>
                    </ul>

                </div>
            </article>
        </>
    );


}

export default Internet