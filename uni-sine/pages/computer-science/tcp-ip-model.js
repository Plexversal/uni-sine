import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"
import Account from "../../components/page-construction/AccountModal"
function DataTypes() {

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
                title="TCP/IP Model"
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
                    <h1>TCP/IP Model</h1>
                    <img alt='tcp/ip model vs osi model' src="/static/comp/tcp/tcpip.png" className={styles['equation']}></img>

                    <p>
                        The Transmission Control Protocol/Internet Protocol (TCP/IP) model is a set of communication protocols used in computer networks. It is the foundation of the modern Internet and provides a framework for how data should be transmitted, routed, and received across networks. The TCP/IP model consists of four layers, each responsible for specific functions in the networking process.
                    </p>
                    <h2>Layers of the TCP/IP Model</h2>
                    <p>
                        The TCP/IP model is organized into four layers, with each layer providing specific functionalities. These layers are:
                    </p>
                    <ol>
                        <li>Application Layer</li>
                        <li>Transport Layer</li>
                        <li>Internet Layer</li>
                        <li>Link Layer</li>
                    </ol>
                    <p>
                        <strong>Application Layer:</strong> The Application Layer is the topmost layer in the TCP/IP model, responsible for providing network services to end-user applications. It includes protocols such as HTTP, FTP, and SMTP that allow users to access web pages, transfer files, and send emails, respectively.
                    </p>
                    <p>
                        <strong>Transport Layer:</strong> The Transport Layer is responsible for providing end-to-end communication between devices, ensuring reliable and ordered delivery of data. The two main protocols in this layer are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP). TCP provides reliable, connection-oriented communication, while UDP offers connectionless, best-effort delivery.
                    </p>
                    <p>
                        <strong>Internet Layer:</strong> The Internet Layer is responsible for routing data packets across networks. The main protocol in this layer is the Internet Protocol (IP), which provides a logical addressing scheme and is responsible for routing data packets based on their destination IP addresses.
                    </p>
                    <p>
                        <strong>Link Layer:</strong> The Link Layer is responsible for providing physical connectivity and transferring data between network devices on the same local network. This layer includes protocols such as Ethernet, Wi-Fi, and PPP that define how data is formatted and transmitted over physical media.
                    </p>
                    {/* Add an image of the TCP/IP model here */}
                    <h2>Why We Need a Networking Model</h2>
                    <p>In the early days of computer networking, specifically during the 1960s and 1970s, companies created proprietary networks that were incompatible with each other. This made communication between devices from different manufacturers challenging. The development of standardized networking models, such as the TCP/IP model (developed in the 1970s) and the OSI model (developed in the late 1970s and early 1980s), helped establish a set of rules and protocols that enabled seamless communication between devices, regardless of the manufacturer.</p>
                    <p>The OSI (Open Systems Interconnection) model, on the other hand, is a seven-layer reference model developed by the International Organization for Standardization (ISO). Although the OSI model is not used as extensively in practice, it remains an important framework for understanding and teaching the various components of computer networking.</p>
                    <p>The choice of the TCP/IP model over the OSI model is mainly due to its simpler structure, practicality, and the fact that it was the first widely-adopted networking model. The TCP/IP model&apos;s development was closely tied to the early internet, and as the internet grew in popularity, the TCP/IP model became the standard for network communication.</p>
                    <p>You could consider adding an image that illustrates the layers of the TCP/IP model and the OSI model side-by-side to help readers understand the differences between the two models. This would also provide a visual representation of the structure of each model, making the concept easier to grasp.</p>
                    <p>Both models have contributed to the evolution of computer networking standards, allowing for efficient communication between devices today.</p>
                    <h2>How the TCP/IP Model Works</h2>
                    <p>
                        In the TCP/IP model, data is transmitted between devices using a process called encapsulation. Each layer in the model adds its specific header (and sometimes footer) to the data, which is then passed down to the next layer. This process continues until the data reaches the Link Layer, where it is transmitted across the physical medium.
                    </p>
                    <p>
                        At the receiving end, the data is passed through the layers in reverse order, with each layer removing its respective header (and footer) and processing the data. Finally, the Application Layer receives the data and passes it to the appropriate end-user application.
                    </p>
                    <p>
                        By separating network communication into distinct layers, the TCP/IP model provides modularity and flexibility, making it easier to design and implement network protocols and applications. Eachlayer can be developed independently and updated without impacting the other layers, as long as it maintains compatibility with the interfaces it provides and requires.
                    </p>
                    <h2>Benefits of the TCP/IP Model</h2>
                    <p>
                        The TCP/IP model has several advantages that have contributed to its widespread adoption and success. Some of the key benefits include:
                    </p>
                    <ol>
                        <li>
                            <strong>Interoperability:</strong> The TCP/IP model supports a wide range of hardware and software platforms, allowing devices from different vendors and running different operating systems to communicate seamlessly.
                        </li>
                        <li>
                            <strong>Scalability:</strong> The TCP/IP model is designed to handle networks of all sizes, from small home networks to large-scale global networks like the Internet.
                        </li>
                        <li>
                            <strong>Reliability:</strong> The TCP/IP model incorporates error detection, correction, and retransmission mechanisms to ensure reliable data delivery.
                        </li>
                        <li>
                            <strong>Modularity:</strong> The layered architecture of the TCP/IP model allows for the development and implementation of new protocols and applications without affecting existing infrastructure.
                        </li>
                    </ol>
                    <h2>Conclusion</h2>
                    <p>
                        The TCP/IP model is the foundation of modern computer networking, providing a modular framework for data transmission, routing, and reception. Its layered architecture enables flexibility, interoperability, and scalability, making it an ideal choice for networks of all sizes. Understanding the TCP/IP model and its various layers is essential for anyone working with or studying computer networks.
                    </p>
                </div>
            </article>
        </>
    );


}

export default DataTypes