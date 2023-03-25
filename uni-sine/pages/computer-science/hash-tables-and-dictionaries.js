import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"

function HashTables() {

    let [dom, setDom] = useState([])


    useEffect(() => {
        var elems = document.body.getElementsByTagName("p");
        for (var i = 0; i < elems.length; i++) {
            setDom(a => [...a, elems[i].textContent])
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
                title="Hash tables and dictionaries"
                subheader={`${minsToRead()} · Updated 24/07/2022`}
            />
            <Path />
            <article
                itemScope
                itemType="http://schema.org/Article"
                id="article"
                className={styles["page-wrapper"]}
            >
                <div className={styles['article-container']}>

                    <h1>Hash Tables and Dictionaries</h1>
                    <p>Hash tables are a data structure that allows for fast insertion, deletion, and search operations in average-case constant time complexity, O(1). They achieve this efficiency by using a hash function to map keys to indices in an underlying array, called the hash table. The hash function generates an index based on the key, allowing for quick access to the associated value.</p>
                    <p>Dictionaries, also known as associative arrays, are a higher-level data structure that uses a key-value mapping to store and retrieve data. In many programming languages, dictionaries are implemented using hash tables, making them extremely efficient for various operations.</p>
                    <h2>Mathematical Aspects of Hash Tables</h2>
                    <p>The performance of a hash table depends on the efficiency of the hash function, which is responsible for distributing keys uniformly across the array indices. A good hash function minimizes collisions, where two keys are mapped to the same index.</p>
                    <p>To analyse the performance of a hash table, we consider the following factors:</p>
                    <ol>
                        <li>Load factor (&alpha;): This is the ratio of the number of items in the hash table (n) to the total size of the array (m). Mathematically, &alpha; = n/m.</li>
                        <li>Average-case complexity: The average-case complexity is the expected number of operations required for insertion, deletion, and search operations. It depends on the load factor and the quality of the hash function. Ideally, the average-case complexity is O(1).</li>
                    </ol>
                    <h2>Collision Resolution</h2>
                    <p>Collisions occur when two different keys are mapped to the same index. There are several methods to resolve collisions, including:</p>
                    <ol>
                        <li>Chaining: In this method, each index in the hash table stores a linked list of key-value pairs. When a collision occurs, the new key-value pair is added to the list.</li>
                        <li>Open addressing: This method uses a process called probing to find an alternative index for the colliding key. A common approach is linear probing, which searches for the next available index in a linear fashion.</li>
                    </ol>
                    <h2>Code Example: JavaScript Dictionary</h2>
                    <p>In JavaScript, dictionaries are implemented using the built-in <strong>Map</strong> object. Here&apos;s a simple example of using a JavaScript dictionary:</p>
                    <CodeBlock
                    language="cpp"
                    code={`// Create a new dictionary
const dictionary = new Map();

// Insert key-value pairs
dictionary.set('apple', 1);
dictionary.set('banana', 2);
dictionary.set('cherry', 3);

// Retrieve values by key
console.log(dictionary.get('apple')); // Output: 1

// Delete a key-value pair
dictionary.delete('banana');

// Check if a key exists in the dictionary
console.log(dictionary.has('cherry')); // Output: true

// Get the number of items in the dictionary
console.log(dictionary.size); // Output: 2`}/>
                    <p>This example demonstrates basic operations on a JavaScript dictionary, such as insertion, retrieval, deletion, checking for a key&apos;s existence, and finding the size of the dictionary. It is important to note that the underlying implementation of the <strong>Map</strong> object may vary between JavaScript engines, but most modern engines use a variant of hash tables for efficient performance.</p>
                    <h2>Custom Hash Table Implementation</h2>
                    <p>While JavaScript&apos;s built-in <strong>Map</strong> object provides a convenient and efficient way to work with dictionaries, it&quot;s also possible to create a custom hash table implementation to understand the underlying concepts better. Here&quot;s a simple example of a custom hash table in JavaScript:</p>
                    <CodeBlock
                    language="cpp"
                    code={`class HashTable {
constructor(size) {
    this.size = size;
    this.table = new Array(size);
    for (let i = 0; i < size; i++) {
    this.table[i] = new Map();
    }
}

// Simple hash function
hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i)) % this.size;
    }
    return hash;
}

// Insert key-value pair
set(key, value) {
    const index = this.hash(key);
    this.table[index].set(key, value);
}

// Retrieve value by key
get(key) {
    const index = this.hash(key);
    return this.table[index].get(key);
}

// Delete key-value pair
delete(key) {
    const index = this.hash(key);
    return this.table[index].delete(key);
}

// Check if key exists
has(key) {
    const index = this.hash(key);
    return this.table[index].has(key);
}
}

// Example usage of custom HashTable
const hashTable = new HashTable(10);
hashTable.set('apple', 1);
hashTable.set('banana', 2);
hashTable.set('cherry', 3);

console.log(hashTable.get('apple')); // Output: 1
hashTable.delete('banana');
console.log(hashTable.has('banana')); // Output: false`}/>
                    <p>This custom implementation uses a simple hash function and collision resolution through chaining. The <strong>HashTable</strong> class has methods for setting, getting, deleting, and checking the existence of keys. The underlying data structure is an array of <strong>Map</strong> objects to handle collisions efficiently.</p>
                    <p>Keep in mind that this example is a basic implementation and may not have the same performance and optimization as the built-in <strong>Map</strong> object. However, it serves as a good starting point for understanding how hash tables and dictionaries work in practice.</p>
                </div>
            </article>
        </>
    );
}

export default HashTables