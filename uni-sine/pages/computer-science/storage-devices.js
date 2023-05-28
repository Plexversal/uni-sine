import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"
function Storage() {

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
                title="Storage Devices"
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
                <h1>Storage Devices: HDD, SSD, and M.2</h1>
                    <p>
                        Storage devices are essential components of modern computer systems, responsible for storing and retrieving data. This article will explain the differences between Hard Disk Drives (HDDs), Solid State Drives (SSDs), and M.2 drives, along with their persistent storage capabilities, interactions with other hardware, and the evolution of storage technology.
                    </p>
                    <h2>Hard Disk Drives (HDDs)</h2>
                    <p>
                        HDDs are a type of magnetic storage device that uses rotating disks, called platters, coated with a magnetic material. Data is stored and accessed by changing the magnetic orientation of the material on the platters using a read/write head that hovers just above the surface of the platter.
                    </p>
                    <h3>Physics of HDDs: Magnetic Storage</h3>
                    <p>
                        Hard disk drives (HDDs) rely on principles of magnetism and mechanical movement to store and retrieve data. Let&apos;s explore the physics behind the functioning of an HDD in more detail.
                    </p>
                    <h3>Magnetic Storage</h3>
                    <p>
                        HDDs store data on magnetic disks, also known as platters, which are coated with a thin layer of magnetic material. The magnetic material consists of tiny magnetic domains, each having a magnetic orientation (north and south poles). These domains can be magnetized in either direction to represent binary data (0s and 1s). Data is stored by changing the magnetic orientation of these domains.
                    </p>
                    <h3>Read/Write Head and Actuator Arm</h3>
                    <p>
                        To read and write data, an HDD uses a read/write head, which is a tiny electromagnet mounted on an actuator arm. The read/write head hovers nanometers above the surface of the spinning platter. When writing data, the head generates a magnetic field that aligns the magnetic domains on the platter to represent the binary data. When reading data, the head detects the magnetic fields of the domains on the platter and converts them into electrical signals, which are then translated back into binary data.
                    </p>
                    <h3>Spindle Motor and Spinning Platters</h3>
                    <p>
                        The platters in an HDD are mounted on a central spindle and are spun at high speeds by a spindle motor. The spinning platters create an air cushion that keeps the read/write head floating above the surface, preventing physical contact. Common spinning speeds for HDDs range from 5,400 to 7,200 RPM (revolutions per minute) for consumer drives, and up to 10,000 or 15,000 RPM for high-performance enterprise drives. The spinning speed directly impacts the HDD&apos;s performance, as faster speeds allow for quicker access to data stored on the platters.
                    </p>
                    <h3>Data Organization and Access</h3>
                    <p>
                        Data on an HDD is organized in concentric circles, called tracks, which are further divided into sectors. Each sector typically stores a fixed amount of data, such as 512 bytes or 4,096 bytes. To access specific data, the actuator arm moves the read/write head to the correct track, and the spinning platter positions the desired sector under the head. The time it takes to position the head over the correct track is called seek time, and the time it takes to rotate the platter to the correct sector is called rotational latency. These mechanical movements contribute to the relatively slower performance of HDDs compared to solid-state drives (SSDs), which have no moving parts.
                    </p>
                    Understanding the physics behind HDDs, including magnetic storage principles, read/write head operation, spinning platters, and data organization, helps to appreciate the complexities of these mechanical storage devices and their limitations in comparison to more modern storage technologies like SSDs.
                    <h2>Solid State Drives (SSDs)</h2>
                    <p>
                        Solid-state drives (SSDs) are a type of storage device that uses NAND flash memory to store data, instead of the spinning magnetic platters found in hard disk drives (HDDs). The main difference in the underlying physics of SSDs and HDDs is that SSDs rely on electronic storage, while HDDs depend on magnetic storage. Let&apos;s dive deeper into the physics and workings of SSDs.
                    </p>
                    <h3>NAND Flash Memory</h3>
                    <p>
                        NAND flash memory is a type of non-volatile storage that retains data even when power is removed. It is composed of memory cells made from floating-gate transistors. Each memory cell can store one or more bits of data, depending on the type of NAND flash memory used (SLC, MLC, TLC, or QLC).
                    </p>
                    <p>
                        Floating-gate transistors have a unique structure, consisting of a control gate, a floating gate, and a substrate. The floating gate is electrically isolated and can store electrical charge, while the control gate and the substrate control the flow of current between the source and the drain. The presence or absence of charge in the floating gate represents binary data (0s and 1s).
                    </p>
                    <h3>Writing and Reading Data in SSDs</h3>
                    <p>
                        To write data to an SSD, an electrical charge is applied to the control gate of the target memory cell. This causes electrons to tunnel through the insulating oxide layer and become trapped in the floating gate. The level of charge stored in the floating gate determines the binary data stored in the cell. In SLC NAND, the cell stores one bit of data (either a 0 or a 1), while MLC, TLC, and QLC NAND store multiple bits per cell by using different charge levels to represent different combinations of 0s and 1s.
                    </p>
                    <p>
                        To read data from an SSD, a voltage is applied to the control gate, and the resulting current flow between the source and the drain is measured. The amount of current flow is influenced by the charge stored in the floating gate. By comparing the measured current to reference values, the stored data can be determined.
                    </p>
                    <h3>Wear and Endurance</h3>
                    <p>
                        The process of writing data to NAND flash memory cells causes wear due to the stress placed on the insulating oxide layer during electron tunneling. This wear can eventually cause the oxide layer to break down, leading to data corruption and cell failure. To manage wear and prolong the lifespan of an SSD, wear leveling algorithms are used to distribute writes evenly across the NAND flash memory.
                    </p>
                    <h3>Performance and Reliability</h3>
                    <p>
                        Unlike HDDs, SSDs have no moving parts, which results in several advantages, such as faster access times, lower power consumption, and increased durability. SSDs can access data almost instantly, as they do not rely on mechanical movements like seek time and rotational latency. Additionally, SSDs are less susceptible to physical shock and vibration, making them more reliable and suitable for portable devices.
                    </p>
                    <h2>M.2 Drives</h2>
                    <p>
                        M.2 is a form factor for storage devices that can be used with either SSDs or HDDs. M.2 drives are smaller and more compact than traditional drives, making them ideal for use in laptops, ultrabooks, and other devices with limited space. M.2 drives can use various interfaces, including SATA, PCIe, and NVMe, which offer different levels of performance.
                    </p>
                    <h2>Interactions with Other Hardware and Cables</h2>
                    <p>
                        Storage devices communicate with other hardware components, such as the motherboard and CPU, through various interfaces and cables. Common cables and interfaces for storage devices include:
                    </p>
                    <ul>
                        <li><strong>SATA:</strong> A widely used interface for HDDs and SSDs that offers moderate performance. SATA cables have a 7-pin connector for data and a 15-pin connector for power.</li>
                        <li><strong>PCIe:</strong> A high-performance interface used by M.2 drives and some SSDs. PCIe offers significantly faster data transfer rates compared to SATA.</li>
                        <li><strong>NVMe:</strong> A newer interface standard designed specifically for SSDs, which operates over PCIe and offers even better performance than traditional PCIe SSDs.</li>
                    </ul>
                    <h2>Overcoming Storage Size Limitations</h2>
                    <p>
                        Storage devices have evolved over time, allowing for larger storage capacities and better performance. Early HDDs were limited in capacity due to physical constraints, such as the size and number of platters. However, advancements in technology have led to higher-density magnetic materials and more efficient encoding methods, enabling larger storage capacities on smaller platters.</p>

                    <p>Similarly, SSDs have experienced significant improvements in storage capacity and performance. Advances in NAND flash memory technology, such as the transition from Single-Level Cell (SLC) to Multi-Level Cell (MLC) and Triple-Level Cell (TLC) NAND, have increased storage density and lowered production costs. Additionally, the development of NVMe as a storage protocol has allowed SSDs to take full advantage of the high-speed PCIe interface, further improving performance.</p>


                </div>
            </article>
        </>
    );


}

export default Storage