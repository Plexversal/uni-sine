import { useEffect, useState, useCallback, useRef  } from "react";
import LoadingIcon from "../page-construction/LoadingIcon";
import styles from "../../styles/Courses.module.css";
import {BsFillXCircleFill, BsFillCheckCircleFill} from 'react-icons/bs'
import PercentIcon from "../page-construction/PercentageIcon";
import QuestionElement from "./QuestionElement";
import MathJaxContent from '../page-construction/MathJaxContent'
export default function NuclearEnergyCourse (props) {
  const [isLoading, setIsLoading] = useState(false);
  const [userCourseData, setUserCourseData] = useState([])
  const [correctAnswerValue, setCorrectAnswerValue] = useState(null)
  const [selected, setSelected] = useState("");
  const [correctQuestions, setCorrectQuestions] = useState([])
  const [isDataReady, setIsDataReady] = useState(false);
  const prevSectionRef = useRef(props.currentSection); 

  const list = ['Basics of Networking Protocols', 'Further Networking Protocols', 'Ethernet Technologies', 'Ethernet Technologies Practice', 'IP Addressing and Subnetting', 'IP Addressing and Subnetting Practice', 'Network Devices', 'Network Devices Practice', 'Advanced: VLANs', 'Advanced: Network Security', 'Practice Questions', 'Course Review']

  const questions = [
    {
      question: "Which network protocol would be used for sending emails?",
      answersArray: [`HTTP`, `TCP/IP`, {correctAnswer: `SMTP`}, `DHCP`]
    },
    {
      question: "What is the standard connector type used in ethernet cables?",
      answersArray: [`HDMI`, `Fibre  Optic`, {correctAnswer: `RJ-45`}, `AUX`]
    },
    {
      question: "Which IP address format would be appropriate in a university setting with an extremely large, complex internal network?",
      answersArray: [<code key={'text'}>192.168.x.x</code>, <code key={'text'}>172.16.x.x</code>, {correctAnswer: <code key={'text'}>10.x.x.x</code>}, <code key={'text'}>255.255.x.x</code>]
    }
  ];

  const handleQuestionCallback = (childData) => {
    setCorrectQuestions(prevState => {
      const existingQuestionIndex = prevState.findIndex(
        item => item.question === childData.question
      );
  
      if (existingQuestionIndex > -1) {
        const updatedState = [...prevState];
        updatedState[existingQuestionIndex] = childData;
        return updatedState;
      }
  
      return [...prevState, childData];
    });
  

      setIsDataReady(true);
  
    };

    function checkSections (section) {
      if(!userCourseData || userCourseData.length <= 0) return section
      let completedSection = userCourseData.completedSections;
      const isDone = completedSection.some((e) => e === section);
      
      return isDone ? '\u2713' : section;
      
    }
    

    function setCorrectAnswer(e, answer) {
      let inputValue = e.target.value;
      
      if(typeof inputValue === 'string') {
        inputValue = inputValue.toLowerCase();
      }
      
      if(inputValue == (typeof answer === 'string' ? answer.toLowerCase() : answer)) {
        setCorrectAnswerValue(true);
      } else {
        setCorrectAnswerValue(false);
      }
    }
    



  const handleClick = (value, correct) => {
    if(selected) return
    if(correct) {
      setCorrectAnswerValue(true)
    } else {
      setCorrectAnswerValue(false)
    }
    setSelected(value);
  };

  useEffect(() => {

    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
    setCorrectAnswerValue(null)

    setSelected('')

  }, [props.currentSection]);

    // save course data on page move
    useEffect(() => {
      let data;
  
      if(prevSectionRef.current == list.length - 1) {
        if(!isDataReady) return
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
          questionsCompleted: correctQuestions
        }
  
      } 
      else if(correctAnswerValue !== null) {
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
          standardQuestions: [{section: prevSectionRef.current, isCorrect: correctAnswerValue}] // array
  
        }
      }
      else {
  
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
  
        }
      }
  
      async function saveToUser() {
        if(prevSectionRef.current == 0) return
        try {
          setIsLoading(true)
          const saveToUserResponse = await fetch(`/api/db/postUserCourseData`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseData: data,
            }),
          });
          if (saveToUserResponse.status === 200) {
            return true;
          } else {
            const errorData = await saveToUserResponse.json();
            const errorMessage = errorData.message || saveToUserResponse.statusText;
            return console.error(
              `Error saving to user ${saveToUserResponse.status}: ${errorMessage}`
            );
          }
        } catch (error) {
          console.error("Unexpected error:", error);
        } finally {
          setIsLoading(false)
  
  
        }
      }
  
      saveToUser()
      setIsDataReady(false); // Reset the flag
      prevSectionRef.current = props.currentSection;
  
    }, [props.currentSection, isDataReady])
  
  // get user course data
  useEffect(() => {
    console.log(props.currentSection)
    if((props.currentSection !== 0  && props.currentSection !== list.length)) return
    setIsLoading(true)
    const fetchData = async () => {
      try {
        let response = await fetch(`/api/db/getUserCourseStats?courseName=${encodeURIComponent(props.courseName)}`)
        if(response.status === 404) {
          return setUserCourseData(null)
        } else {
          let data = await response.json()
          setUserCourseData(data)
         
        }
      } catch (error) {
        setUserCourseData(null)
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.currentSection, isDataReady])

  return (
    <>
      {props.currentSection == 0 ? (
        <div>
          <div>
            <h2>Introduction to Local Networks</h2>
            <p>
            Local networking, the bedrock of daily communication and data exchange within a confined geographical area, is an intricate tapestry of devices, protocols, and connectivity methods woven together to form the backbone of modern computing. At its core, it involves a constellation of devices such as routers, switches, and access points, which facilitate the flow of data. By employing a variety of protocols like TCP/IP for communication, DHCP for dynamic IP address allocation, and VLANs for network segmentation, local networks create a structured and efficient system for data traffic management. These networks are typically characterized by high-speed connections and lower latency compared to wide area networks (WANs), making them ideal for organizational use where devices are in close proximity.
            </p>
            <p>
            The security and management of these local networks are paramount, guarding against a spectrum of cyber threats through measures such as firewalls, intrusion detection systems, and rigorous access controls. Local networking enables not just the sharing of resources like printers and servers within a physical location but also serves as the launchpad for connecting to the broader digital world through the internet. Whether it&apos;s a small home setup or a complex enterprise environment, local networks are tailored to meet diverse needs, balancing ease of access with security, and providing a personalized ecosystem for digital communication and collaboration.
            </p>
          </div>
          <div>
            <div className={styles["course-content"]}>
              <h2>Course content</h2>
              <p>
                <i>Click below to jump to a section</i>
              </p>
              {
                isLoading ? <LoadingIcon /> : <ol className={styles['course-item-list']} type="number">
                {list.map((l, i) => (
                  <li
                    onClick={() => props.setCurrentSection(i + 1)}
                    data-content={checkSections(i+1)}
                    data-done={checkSections(i+1) === '\u2713' ? 'true' : 'false'}
                    key={i}
                  >
                    {l}
                  </li>
                ))}
              </ol>
              }
            </div>
          </div>
        </div>
      ) : props.currentSection == 1 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Basics of network protocols</h2>
            <p>Networking protocols are established sets of rules that determine how data is transmitted and received across a network. These protocols enable different devices to communicate with each other effectively, regardless of their underlying infrastructure, design, or standards.</p>
            <p>Key Networking Protocols:</p>
            <ul>
              <li><strong>TCP/IP (Transmission Control Protocol/Internet Protocol):</strong> This is the foundational protocol suite of the Internet, outlining how data should be packetized, addressed, transmitted, routed, and received at the destination.</li>
              <li><strong>HTTP/HTTPS (Hypertext Transfer Protocol/Secure):</strong> These protocols are used for transmitting web pages on the Internet. HTTPS includes secure encryption for safety.</li>
              <li><strong>FTP (File Transfer Protocol):</strong> FTP is used for the transfer of files between a client and a server on a network.</li>
              <li><strong>SMTP (Simple Mail Transfer Protocol):</strong> SMTP is used for sending emails. It&apos;s often used alongside POP3 or IMAP protocols that retrieve messages.</li>
              <li><strong>DNS (Domain Name System):</strong> This protocol translates human-friendly domain names to IP addresses that computers use to identify each other on the network.</li>
              <li><strong>DHCP (Dynamic Host Configuration Protocol):</strong> DHCP automatically assigns IP addresses to devices on a network, ensuring each device has a unique address.</li>
            </ul>
            <p>Protocols operate at different layers of the network, from the physical hardware level to the application level where users interact with network services. For example, when you browse the web, your browser uses HTTP or HTTPS to request web pages from a server. In the background, TCP/IP takes care of transporting your requests and responses between your device and the server.</p>
            <p>When a protocol manages data on a network, it acts like a multilingual translator at a global conference. It ensures that every participant—regardless of their language (or in this case, their device&apos;s configuration)—can understand each other and communicate effectively. </p>

          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >

          </div>
        </div>
      ) : props.currentSection == 2 ? (
        <div>
            <div>
            <div className={styles["text-content"]}>
            <h2>Further Networking Protocols</h2>
            <p>Let&apos;s dive deeper into how a protocol like TCP/IP works at the data level by examining what happens when you send an email, for example.</p>
            <h3>Data Segmentation and Packetization:</h3>
            <ul>
              <li>Your email is composed of text, which at the most fundamental level, is encoded into binary data using a character encoding like ASCII or UTF-8.</li>
              <li>Let&apos;s say you write the letter &apos;A&apos; in an email. In ASCII, &apos;A&apos; is represented by the binary code <code>01000001</code>.</li>
              <li>TCP takes your message and splits it into segments small enough to manage efficiently across the network. Each segment is then encapsulated into a packet structure.</li>
            </ul>
            <h3>Packet Structure:</h3>
            <ul>
              <li>Each TCP packet includes a header and a data section. The header contains binary-encoded information such as the source and destination port numbers, sequence and acknowledgment numbers, and flags to manage the transmission process.</li>
              <li>The sequence numbers ensure that packets are reassembled in the correct order, and the acknowledgment numbers are used to confirm receipt of packets.</li>
            </ul>
            <h3>IP Addressing and Routing:</h3>
            <ul>
              <li>The TCP packet is then encapsulated within an IP packet, which includes its own header, notably with the source and destination IP addresses in binary form.</li>
              <li>Routers on the network read these addresses to determine where to forward the packet. They use routing tables and algorithms to decide the most efficient path the packet should take to reach its destination.</li>
            </ul>
            <h3>Binary Transmission:</h3>
            <ul>
              <li>
              The IP packet is transmitted as a stream of bits—just a series of 1s and 0s—over the network. If it’s a wired network, these could be electrical signals; if it’s wireless, they could be radio waves.
              </li>
              <li>For instance, part of your packet may look like this in binary: <code>11001000 10101000 00000001 00001010</code>, which could represent part of an IP address (200.168.1.10 in decimal).</li>
            </ul>
            <h3>Control Protocols:</h3>
            <ul>
              <li>Control protocols like ICMP (Internet Control Message Protocol) may also come into play, sending messages back to the source if there&apos;s an issue delivering the packet, using error messages that also consist of binary-encoded data.</li>
            </ul>
            <h3>At the Destination:</h3>
            <ul>
            <li>The receiving device uses the TCP protocol to interpret the binary sequence of the headers to reconstruct the original message from the packets.</li>
            <li>It then sends back binary-encoded acknowledgments as per the protocol to confirm successful receipt or to request the retransmission of any missing data.</li>
            </ul>
            <p>Throughout this process, various protocols at different layers interact seamlessly to ensure the binary data—the fundamental ones and zeros that represent all digital information—is accurately and reliably communicated from one device to another.</p>
          </div>
          
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >

          </div>
        </div>
      ) : props.currentSection == 3 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Ethernet Technologies</h2>
            <p>Ethernet is a family of networking technologies used for local area networks (LANs). It provides a simple interface and for networking devices to communicate with each other. Initially standardized by IEEE 802.3, Ethernet has evolved to include higher bandwidth, improved media access control methods, and different physical media.</p>
            <p>Types of Ethernet Technologies:</p>
            <ol>
              <li><strong>Standard Ethernet (IEEE 802.3):</strong> It began with speeds of 10 Mbps using coaxial cable and has progressed to modern gigabit Ethernet using twisted-pair cables.</li>
              <li><strong>Fast Ethernet (IEEE 802.3u):</strong> With a speed of 100 Mbps, Fast Ethernet improved upon standard Ethernet, primarily through the use of twisted-pair cabling and fiber optic cables.</li>

              <li><strong>Gigabit Ethernet (IEEE 802.3z/ab):</strong> Offering speeds of 1 Gbps, Gigabit Ethernet is widely used in both business and consumer markets. It can operate over twisted pair cables and fiber optics.</li>

              <li><strong>10-Gigabit Ethernet (IEEE 802.3ae):</strong> With 10 times the speed of Gigabit Ethernet, it is used in enterprise networks, data centers, and high-speed backbone networks.</li>

            </ol>
            <p>Ethernet Cables and Connectors:</p>
            <ul>
              <li><strong>Twisted Pair Cables (CAT5, CAT5e, CAT6, CAT6a):</strong> These are copper cables that have pairs of wires twisted together to reduce electromagnetic interference.</li>
              <li><strong>Fiber Optic Cables:</strong> These use light to transmit data and can cover long distances and high data rates with minimal signal loss.</li>
              <li><strong>RJ-45 Connectors:</strong> The standard connector used for connecting twisted pair cables to network cards, switches, and routers.</li>
            </ul>
            <p>Ethernet uses a method called Carrier Sense Multiple Access with Collision Detection (CSMA/CD) to manage data transmission over the network. Devices on an Ethernet network monitor the line for traffic and transmit when they detect that the line is clear. If two devices transmit at once, a collision occurs, and each device must wait a random amount of time before trying again.</p>
            <p>Modern Ethernet technologies include capabilities such as Power over Ethernet (PoE), which allows electrical power to be carried by the data cables rather than by power cords, streamlining the cabling process and reducing the number of required outlets. Ethernet is also continually evolving to support greater distances and faster speeds, such as 40-Gigabit and 100-Gigabit Ethernet for high-throughput applications.</p>
            <p>Ethernet remains the ubiquitous technology for LANs. It&apos;s flexible, reliable, and has been adapted for use in a wide range of networking environments. From home networks to extensive enterprise systems, Ethernet technologies provide the backbone for nearly all wired data communications.</p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >

          </div>
        </div>
      ) : props.currentSection == 4 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>
            Which element is used to create twisted pair ethernet cables?
            </p>
            <div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 1 ? styles.selected : ""
                }`}
                onClick={() => handleClick(1, false)}
              >
                Silicon
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 2 ? styles.selected : ""
                }`}
                onClick={() => handleClick(2, true)}
              >
                Copper
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 3 ? styles.selected : ""
                }`}
                onClick={() => handleClick(3, false)}
              >
                Gold
              </div>
            </div>
            {correctAnswerValue ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div>
        </div>
      ) : props.currentSection == 5 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>IP Addressing and Subnetting</h2>
            <p>In the realm of networking, IP addresses are akin to telephone numbers, providing a unique identifier for each device. This numerical label ensures data packets reach the correct destination on a network. The binary underpinnings of these addresses, composed of 32 bits for IPv4 and 128 bits for IPv6, are what allow devices to interpret and use these addresses for communication.</p>
            <p>Every IP address corresponds to a binary number. For instance, the IPv4 address 192.168.1.1 is actually <code>11000000.10101000.00000001.00000001</code> in binary. This binary sequence is crucial for the underlying digital communication between devices, as computers and network equipment process these ones and zeros to direct internet traffic.</p>
            <p>Subnetting divides a network into smaller networks, making data routing more efficient. It&apos;s like breaking down a city into neighborhoods to better manage mail delivery. This division is done using a subnet mask, which, in binary, separates the network address from the host addresses. Subnetting can thus conserve IP addresses and enhance network security and performance.</p>
            <p>Within local networks, IP addresses typically start with 192.168.x.x, but there are other ranges often used for larger networks:</p>
            <ul>
              <li><code>10.0.0.0 - 10.255.255.255:</code> This range is reserved for private networks, commonly used in enterprise environments due to the vast number of addresses it offers.</li>
              <li><code>172.16.0.0 - 172.31.255.255:</code> This block is also for private use, providing a moderate number of IP addresses, suitable for mid-sized companies.</li>
              <li><code>192.168.0.0 - 192.168.255.255:</code> Most small networks and home routers use this range, which is more than sufficient for small-scale applications.</li>
            </ul>
            <p>The types of IP used would generally relate to how big the network is:</p>
            <p><strong>10.x.x.x Addresses:</strong> A large university campus might use the 10.x.x.x address space due to the need for thousands of IP addresses for students, faculty, devices, and infrastructure.</p>
            <p><strong>172.x.x.x Addresses:</strong> A corporate network might choose the 172.16.x.x to 172.31.x.x range, balancing the need for more addresses than a typical home network but fewer than a massive university network.</p>
            <p><strong>192.168.x.x Addresses:</strong> Home networks typically use this range, as it provides ample addresses for a household&apos;s devices.</p>
          </div>
          <div>
          </div>
        </div>
      ) : props.currentSection == 6 ? (
        <div>
          <div>

            <h2>Practice</h2>
            <p>
            Which 3 digits would be a suitable IP address range for a home network?
            </p>

            <input
              onChange={(e) => setCorrectAnswer(e, 192)}
              placeholder="Type Answer"
              id="number-input"
              className={styles["answer-input"]}
              type="number"
              step={1}
            />
            {correctAnswerValue == true ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}

            </div>
        </div>
      ) : props.currentSection == 7 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Network Devices</h2>
            <p>Network devices are the essential components that facilitate the connection, communication, and interaction of multiple computing systems within a network. These devices, each with a specific role, work together to ensure data flows smoothly from one point to another.</p>
            <h3>Routers</h3>
            <p>Routers are like the post offices of the digital world; they direct data packets to their destination addresses. They connect multiple networks together, such as a local network to the internet. Routers use IP addresses to determine the best path for data to travel and can also enforce security policies.</p>
            <h3>Switches</h3>
            <p>Think of switches as the managers of a network, connecting various devices within a single LAN. Unlike routers, switches operate using MAC addresses to direct data precisely to the device within the local network. They improve network efficiency by sending data only to the intended recipient, rather than broadcasting to all devices.</p>
            <h3>Hubs</h3>
            <p>Hubs are the simpler, less selective cousins of switches. They broadcast incoming data to all ports, regardless of the destination, which can lead to inefficiencies and security concerns. Due to their unselective nature, hubs are now largely obsolete, replaced by the more intelligent switches.</p>
            <h3>Access Points</h3>
            <p>Access points expand a wired network by adding Wi-Fi capabilities. They allow wireless devices to connect to the network, facilitating mobility and the use of portable devices like smartphones and laptops.</p>
            <h3>Modems</h3>
            <p>Modems serve as the gateway to the internet. They modulate and demodulate signals for transmission over cable or telephone lines. Essentially, they translate the digital data from your network into a format suitable for the broader telecommunications infrastructure and vice versa.</p>
            <h3>Firewalls</h3>
            <p>Firewalls act as the network&apos;s security guards, monitoring incoming and outgoing traffic based on an organization&apos;s security policies. They block unauthorized access while allowing legitimate communication to pass.</p>
            <h3>Network Interface Cards (NICs)</h3>
            <p>NICs are the translators for your computer, converting digital data from the computer into electrical signals for the network, and they can be wired (Ethernet) or wireless (Wi-Fi).</p>
            <h3>Repeaters and Extenders</h3>
            <p>These devices help to extend the reach of a network by regenerating or repeating the signal over a longer distance to prevent data loss or degradation.</p>
            <h3>Bridges</h3>
            <p>Bridges connect two LANs that use the same protocol. They filter traffic, forwarding only necessary data between the two networks, and can reduce congestion by segmenting traffic.</p>
           </div>
        </div>
      ) : props.currentSection == 8 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>
            Which network device would be most suitable for managing communication between multiple devices on the network?
            </p>
            <div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 1 ? styles.selected : ""
                }`}
                onClick={() => handleClick(1, true)}
              >
                Switch
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 2 ? styles.selected : ""
                }`}
                onClick={() => handleClick(2, false)}
              >
                Router
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 3 ? styles.selected : ""
                }`}
                onClick={() => handleClick(3, false)}
              >
                Modem
              </div>
            </div>
            {correctAnswerValue ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div>
        </div>
      ) : props.currentSection == 9 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Advanced: VLANs (Virtual Local Area Networks)</h2>
            <p>VLANs are a network configuration strategy that creates smaller, separate networks within a larger network infrastructure without the need for additional physical routers or switches. They enable network administrators to partition a single physical network into multiple logical networks. So, devices on a VLAN behave as if they were on their own independent network, even if they share physical hardware with other VLANs.</p>
            <p>VLANs operate at the data link layer (Layer 2) of the OSI model. They use tagging mechanisms in Ethernet frames—802.1Q is the most common—to distinguish between different VLANs on the same network. When a frame is on the network, the VLAN tag indicates which VLAN the frame belongs to.</p>
            <p>Why Use VLANs?</p>
            <ol>
              <li><strong>Security:</strong> VLANs can separate sensitive data and systems. For example, a company might have a VLAN for its finance department, keeping financial transactions and records away from other parts of the network.</li>
              <li><strong>Segmentation:</strong> VLANs break down a large network into smaller, more manageable segments. This can reduce broadcast traffic and improve overall network performance.</li>
              <li><strong>Control:</strong> They provide better control over network resources and access. Network policies can be applied to each VLAN to manage who has access to what data.</li>
              <li><strong>Cost-Efficiency:</strong> VLANs can be created using software configuration rather than physical infrastructure, which reduces costs.</li>
            </ol>
            <p>VLANs are particularly useful in environments with diverse and dynamic requirements, including:</p>
            <ul>
              <li>Large office buildings where departments need to be networked separately.</li>
              <li>Campuses where different faculties or administrative areas require distinct network segments.</li>
              <li>Data centers where separation between customers, services, or applications is necessary.</li>
            </ul>
            <p>Typical VLAN Setup</p>
            <ul>
              <li><strong>Access Switches:</strong> These are connected to devices (like computers, printers, and servers) and are configured with VLAN settings. Each port on a switch can be assigned to a VLAN.</li>
              <li><strong>Trunk Links:</strong> These are network links used to carry multiple VLANs across network devices. They are essential for allowing VLANs to communicate between different switches or to a router.</li>
              <li><strong>Router or Layer 3 Switch:</strong> This is used to manage traffic between VLANs, often performing routing functions to allow VLANs to communicate outside their local network.</li>
              <li><strong>VLAN Management Software:</strong> It&apos;s used for configuring and managing VLAN settings across the network infrastructure.</li>
            </ul>
            <p>Example:</p>
            <p>A company&apos;s network might include a VLAN for the sales department, another for research and development, and a third for guest access to the internet. Each VLAN would have its own subnet and could be configured to prevent direct access from one to the other, enhancing security and traffic management. In this setup, a network administrator uses VLAN configuration tools to assign ports on the company&apos;s switches to the appropriate VLANs. The traffic from each VLAN is then tagged by the switch so that when it moves across the network, switches and routers can direct it appropriately based on its tag.</p>
          </div>
        </div>
      ): props.currentSection == 10 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Advanced: Network Security</h2>
            <p>Network security is the practice of protecting a computer network from intruders, whether targeted attackers or opportunistic malware. It involves a set of rules and configurations designed to protect the integrity, confidentiality, and accessibility of computer networks and data</p>
            <ul>
              <li><strong>Firewalls:</strong> Firewalls act as a barrier between your trusted internal network and untrusted outside networks. They use a set of defined rules to allow or block traffic into and out of the network.</li>
              <li><strong>Antivirus and Anti-Malware Software:</strong> This software is essential for protecting a network against malicious software. It scans for malware entry and regularly tracks files afterward to detect anomalies, remove malware, and fix damage.</li>
              <li><strong>Intrusion Prevention Systems (IPS):</strong> These systems monitor network and system traffic for malicious activity and block the threats identified.</li>
              <li><strong>Virtual Private Networks (VPNs):</strong> VPNs provide a secure connection between a device and the network over the internet, encrypting data as it travels back and forth.</li>
              <li><strong>Access Control:</strong> Ensuring only authorized users and devices can access the network is fundamental. This can involve user authentication, multi-factor authentication, and requiring strong, complex passwords.</li>
              <li><strong>Secure Wireless Access Points:</strong> Properly securing Wi-Fi networks prevents unauthorized access and protects the data being transmitted over these wireless networks.</li>
              <li><strong>Regular Software Updates:</strong> Keeping all software up to date, including operating systems and applications, with the latest security patches is critical to protecting against vulnerabilities.</li>
              <li><strong>Email Security:</strong> Tools that scan incoming emails for malicious attachments or links and filter out phishing attempts are crucial to prevent a range of email-based threats.</li>
            </ul>
            <p>Typical Network Attacks:</p>
            <ul>
              <li><strong>DDoS Attacks:</strong> Distributed Denial of Service (DDoS) attacks flood a network with traffic, making it unavailable to its intended users.</li>
              <li><strong>Man-in-the-Middle (MitM) Attacks:</strong> Attackers intercept and possibly alter the communication between two parties who believe they are directly communicating with each other.</li>
              <li><strong>Phishing Attacks:</strong> These involve tricking individuals into providing sensitive data, such as login credentials, by pretending to be a trustworthy entity in an electronic communication.</li>
              <li><strong>Ransomware:</strong> Malicious software that encrypts an organization&apos;s data and demands payment for the decryption key.</li>
              <li><strong>SQL Injection:</strong> An attacker inserts malicious SQL queries into inputs that are processed by an application&apos;s backend database.</li>
            </ul>
            <p>Network security is a broad and complex field, requiring careful planning, implementation, and continuous monitoring. It is a multi-layered approach where various defenses are stacked and coordinated to protect against a wide array of cyber threats.</p>
          </div>
        </div>
      ) : props.currentSection == 11 ? (
        <div>        
            <div className={styles["text-content"]}>
        <h2>Practice Questions</h2>
        <ol>
        {questions.map((q, index) => (
          <QuestionElement
            key={index}
            questionNumber={index}
            currentSection={props.currentSection}
            question={q.question}
            answersArray={q.answersArray}
            questionIndex={index}
            parentCallback={handleQuestionCallback}
          />
        ))}
        </ol>
      </div>
      </div>
      ) : props.currentSection == 12 ? (
        <div style={{display: 'block'}}>
        <div className={styles["text-content"]}>

          {
            isLoading ? <LoadingIcon /> : 
            <div className={styles['review-container']}>
              <div className={styles['review-text']}>
                <div>
                  <h3>Final Questions</h3>
                  <div className={styles['review-questions-completed']}>
                    {
                      userCourseData.questionsCompleted?.length > 0 ? userCourseData.questionsCompleted.map((e, i) => (
                        <div  key={i}> 
                          {e.isCorrect ? <BsFillCheckCircleFill color="#50C878" size={'2em'} /> : <BsFillXCircleFill color="#FF5733" size={'2em'} />}
                        </div>  
                      )) : <div>Not completed</div>
                    }
                    
                  </div>
                </div>
                <div>
                  <h3>Standard sections:</h3>
                  <div className={styles['review-standard-container']}>
                  {
                      userCourseData.standardQuestions?.length > 0 ? userCourseData.standardQuestions.sort((a, b) => a.section - b.section).map((e, i) => (
                        <div style={{margin:'0 10px'}} key={i}> 
                          <p>Section <strong>{e.section}</strong> </p>
                          <div>{e.isCorrect ? <BsFillCheckCircleFill color="#50C878" size={'2em'} /> : <BsFillXCircleFill color="#FF5733" size={'2em'} />}</div>
                        </div>  
                      )) : <div>Not completed</div>
                    }
                    
                  </div>
                </div>
              </div>
              <div>
                <ol className={styles['course-item-list']} type="number">
              {list.map((l, i) => (
                <li
                onClick={() => props.setCurrentSection(i + 1)}
                  data-content={checkSections(i+1)}
                  data-done={checkSections(i+1) === '\u2713' ? 'true' : 'false'}
                  key={i}
                >
                  {l}
                </li>
                
              ))}
              
            </ol>
              </div>
              
            </div>
          }
        </div>
      </div>
      ) : (
        <div>final</div>
      )}
    </>
  );

}