import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"
import Account from "../../components/page-construction/AccountModal"
function TlsEncryption() {

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
                title="TLS/SSL Encryption"
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

                    <h2>Overview of TLS/SSL Encryption</h2>
                    <p>
                        Transport Layer Security (TLS) and its predecessor, Secure Sockets Layer (SSL), are cryptographic protocols designed to provide secure communication over a computer network. They are widely used to secure web traffic, email, and other sensitive data transfers.
                    </p>
                    <p>
                        TLS/SSL encryption relies on a combination of symmetric and asymmetric cryptography to provide secure communication between two parties. The process involves the following steps:
                    </p>
                    <ol>
                        <li>Asymmetric key exchange to establish a shared secret key</li>
                        <li>Encryption and decryption of data using the shared secret key (symmetric encryption)</li>
                        <li>Message authentication to ensure data integrity</li>
                    </ol>
                    <p>
                        The asymmetric key exchange is performed using public key cryptography, where each party has a pair of public and private keys. The public key is shared openly, while the private key remains secret. The key exchange process allows the two parties to derive a shared secret key securely, which is then used for symmetric encryption.
                    </p>
                    <h2>Mathematical Foundations of TLS/SSL Encryption</h2>
                    <p>
                        We will now delve into the mathematical concepts behind the encryption process, focusing on the key exchange and the symmetric encryption algorithms.
                    </p>
                    <h3>Asymmetric Key Exchange: Diffie-Hellman</h3>
                    <p>
                        The Diffie-Hellman (DH) key exchange isa widely used method for securely exchanging cryptographic keys over a public channel. It enables two parties to each generate a public-private key pair and derive a shared secret key without ever transmitting the secret key itself. The DH key exchange relies on the mathematical properties of modular exponentiation.

                        Here&apos;s an overview of the DH key exchange process:</p>
                    <ol>
                        <li>Both parties agree on two large prime numbers, <em>p</em> and <em>g</em>, which are publicly shared.</li>
                        <li>Each party generates a private key, <em>a</em> and <em>b</em>, which are large random numbers kept secret.</li>
                        <li>Each party computes their respective public keys: <em>A = g<sup>a</sup> mod p</em> and <em>B = g<sup>b</sup> mod p</em>. These public keys are then exchanged.</li>
                        <li>Both parties compute the shared secret key: <em>s = B<sup>a</sup> mod p</em> and <em>s = A<sup>b</sup> mod p</em>. Due to the properties of modular exponentiation, both calculations result in the same shared secret key, <em>s</em>.</li>
                    </ol>
                    <p>
                        The security of the DH key exchange relies on the difficulty of solving the Discrete Logarithm Problem (DLP). Given the public keys <em>A</em> and <em>B</em>, it is computationally infeasible to determine the private keys <em>a</em> and <em>b</em> without solving the DLP, which is considered a hard mathematical problem.
                        An enhanced version of the DH key exchange, called Elliptic Curve Diffie-Hellman (ECDH), uses elliptic curve cryptography (ECC) to perform the key exchange. ECDH provides the same level of security as the traditional DH key exchange but with shorter key lengths, making it more efficient and faster.
                    </p>
                    <h3>Symmetric Encryption: Advanced Encryption Standard (AES)</h3>
                    <p>
                        Once the shared secret key is established, it is used for symmetric encryption to encrypt and decrypt data transmitted between the two parties. One of the most widely used symmetric encryption algorithms is the Advanced Encryption Standard (AES). AES is a block cipher that operates on fixed-size blocks of data (128 bits) and supports key sizes of 128, 192, or 256 bits.
                    </p>
                    <p>
                        AES encryption consists of several rounds of substitution, permutation, and mixing operations, which provide strong security against various cryptographic attacks. The number of rounds depends on the key size: 10 rounds for a 128-bit key, 12 rounds for a 192-bit key, and 14 rounds for a 256-bit key.
                    </p>
                    <h2>Ensuring Secure Communication</h2>
                    <p>
                        The combination of asymmetric key exchange and symmetric encryption ensures that communication between the two parties remains secure. The asymmetric key exchange (DH or ECDH) allows the parties to establish a shared secret key securely. This key is then used with a symmetric encryption algorithm (such as AES) to encrypt and decrypt the data transmitted between them.
                    </p>
                    <p>
                        In addition to encryption, TLS/SSL also provides message authentication using cryptographic hash functions and digital signatures. This ensures the integrity of the
                        data and verifies the identity of the communicating parties, preventing unauthorized access or tampering.</p>
                    <h2>Evolution of Encryption and the Role of Mathematics</h2>
                    <p>
                        Encryption methods have evolved significantly over time, driven by the need for stronger security in the face of increasingly sophisticated attacks and advances in computing power. Early encryption methods, such as the Caesar cipher and the Enigma machine, relied on simple substitution and permutation operations, which are now easily broken with modern computing resources.
                    </p>
                    <p>
                        Modern encryption algorithms, such as RSA, AES, and ECC, are built on advanced mathematical concepts and are designed to withstand attacks even with vast computational resources. The security of these algorithms is based on the difficulty of solving certain mathematical problems, such as factoring large prime numbers (RSA) or the Discrete Logarithm Problem (DH and ECDH).
                    </p>
                    <p>
                        As computers become more powerful, new encryption methods and techniques are developed to maintain security. For instance, the rise of quantum computing has led to the development of post-quantum cryptography, which aims to protect data against potential quantum computing attacks.
                    </p>
                    <h2>Reliance on Math and Time for Security</h2>
                    <p>
                        The security of modern encryption methods relies on the combination of complex mathematical problems and the time required to solve them. Given current computing power, it is considered infeasible to break strong encryption algorithms within a reasonable timeframe. However, as computing capabilities advance, encryption algorithms must be updated to maintain their security.
                    </p>
                    <p>
                        The continuous development of encryption methods and techniques ensures that data remains secure as technology evolves, protecting sensitive information and enabling secure communication in a rapidly changing digital landscape.</p>
                    <h2>Conclusion</h2>
                    <p>
                        TLS/SSL encryption models play a crucial role in securing communication over computer networks. By leveraging a combination of asymmetric key exchange and symmetric encryption, TLS/SSL ensures that data is transmitted securely and remains confidential between communicating parties. The mathematical foundations of these encryption models, such as the Diffie-Hellman key exchange and the Advanced Encryption Standard, provide robust security based on the difficulty of solving specific mathematical problems.
                    </p>
                    <p>
                        Encryption methods have evolved over time to keep up with advances in computing power and the emergence of new threats. The development of post-quantum cryptography highlights the ongoing need for stronger encryption algorithms to maintain security in the face of new technological challenges. By relying on the intricacies of mathematical problems and the time required to solve them, modern encryption methods continue to provide a strong foundation for secure communication in an ever-changing digital world.
                    </p>
                </div>
            </article>
        </>
    );


}

export default TlsEncryption