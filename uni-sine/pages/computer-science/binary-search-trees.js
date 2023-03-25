import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"

function BST() {

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
                title="Binary Search Trees"
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
                    <h1>Binary Search Trees</h1>
                    <p>A binary search tree (BST) is a data structure that stores elements in a hierarchical manner. Each node in the tree has at most two children, a left child and a right child. BSTs have the following properties:</p>
                    <ol>
                        <li>The value of the left child is less than the value of its parent.</li>
                        <li>The value of the right child is greater than or equal to the value of its parent.</li>
                        <li>Both the left and right subtrees must also be binary search trees.</li>
                    </ol>
                    <p>These properties ensure that BSTs have an ordered structure, which allows for efficient searching, insertion, and deletion operations.</p>
                    <h2>Searching in a Binary Search Tree</h2>
                    <p>To search for an element in a BST, start at the root node and follow the tree structure based on the element&apos;s value:</p>
                    <ol>
                        <li>If the element is equal to the value of the current node, the search is successful.</li>
                        <li>If the element is less than the value of the current node, move to the left child.</li>
                        <li>If the element is greater than the value of the current node, move to the right child.</li>
                        <li>Repeat steps 1-3 until the element is found or there are no more nodes to traverse.</li>
                    </ol>
                    <p>The time complexity of searching in a BST is O(h), where h is the height of the tree. In the best case, the tree is balanced, and the height is O(log n), where n is the number of nodes. In the worst case, the tree is completely unbalanced, and the height is O(n).</p>
                    <h2>Insertion in a Binary Search Tree</h2>
                    <p>To insert a new element into a BST, follow these steps:</p>
                    <ol>
                        <li>Start at the root node.</li>
                        <li>If the new element is less than the value of the current node, move to the left child. If the left child is null, insert the new element as the left child.</li>
                        <li>If the new element is greater than or equal to the value of the current node, move to the right child. If the right child is null, insert the new element as the right child.</li>
                        <li>Repeat steps 2-3 until the new element is inserted.</li>
                    </ol>
                    <p>The time complexity of insertion in a BST is also O(h), with best and worst cases similar to searching.</p>
                    <h2>Deletion in a Binary Search Tree</h2>
                    <p>To delete an element from a BST, follow these steps:</p>
                    <ol>
                        <li>Search for the element in the BST.</li>
                        <li>If the element is found, determine which of the following cases applies:</li>
                    </ol>

                        <p>a) The node has no children: Simply remove the node. b) The node has one child: Replace the node with its child. c) The node has two children: Find the in-order predecessor (the maximum value in the left subtree) or the in-order successor (the minimum value in the right subtree), replace the node with the predecessor or successor, and delete the predecessor or successor.</p>

                    <p>The time complexity of deletion in a BST is O(h), with best and worst cases similar to searching and insertion.</p>
                    <h2>Balancing a Binary Search Tree</h2>
                    <p>To ensure that a BST maintains its efficiency, it is essential to keep the tree balanced. There are several techniques for balancing BSTs, including the following:</p>
                    <ol>
                        <li>AVL Trees: AVL trees are a type of self-balancing binary search tree that maintains a balance factor for each node, ensuring that the height difference between the left and right subtrees is at most 1.</li>
                        <li>Red-Black Trees: Red-black trees are another type of self-balancing binary search tree that uses a colour property for each node to ensure that the tree remains approximately balanced.</li>
                    </ol>
                    <p>Both AVL trees and red-black trees guarantee that the height of the tree is O(log n), ensuring optimal performance for searching, insertion, and deletion operations.</p>
                    <p>In conclusion, binary search trees are a versatile and efficient data</p>
                    <p>structure for storing and managing ordered data. They provide efficient searching, insertion, and deletion operations, especially when balanced. However, it is essential to maintain the balance of the tree to ensure optimal performance.</p>
                    <h2>Traversal of a Binary Search Tree</h2>
                    <p>Traversing a BST involves visiting each node in a specific order. There are three common types of tree traversal:</p>
                    <ol>
                        <li>In-order traversal: Visit the left subtree, the current node, and then the right subtree. This traversal method results in the elements being visited in ascending order.</li>
                        <li>Pre-order traversal: Visit the current node, the left subtree, and then the right subtree. This traversal method is useful for creating a copy of the tree or for serialization.</li>
                        <li>Post-order traversal: Visit the left subtree, the right subtree, and then the current node. This traversal method is useful for deleting nodes or evaluating expressions in a tree structure.</li>
                    </ol>
                    <h3>Example</h3>
                    <p>Consider the following binary search tree:</p>
                    <p>[Insert an image of a BST with the following elements: 50, 30, 70, 20, 40, 60, 80]</p>
                    <ol>
                        <li>In-order traversal: 20, 30, 40, 50, 60, 70, 80</li>
                        <li>Pre-order traversal: 50, 30, 20, 40, 70, 60, 80</li>
                        <li>Post-order traversal: 20, 40, 30, 60, 80, 70, 50</li>
                    </ol>
                    <p>Applications of Binary Search Trees</p>
                    <p>Binary search trees have various applications in computer science, including:</p>
                    <ol>
                        <li>Symbol tables: BSTs can be used to implement symbol tables in compilers and interpreters for programming languages.</li>
                        <li>Databases: Database management systems use tree-based data structures like B-trees, which are generalizations of binary search trees, for efficient storage and retrieval of data.</li>
                        <li>Game AI: BSTs can be used to model game states and search for optimal moves in game artificial intelligence.</li>
                    </ol>
                    <h2>Exmaple BST in JS</h2>
                    <CodeBlock language="javascript" code={`// TreeNode class representing each node in the BST
class TreeNode {
  constructor(value) {
    this.value = value; // Node's value
    this.left = null;   // Left child reference
    this.right = null;  // Right child reference
  }
}

// BinarySearchTree class representing the BST
class BinarySearchTree {
  constructor() {
    this.root = null; // Root node of the BST
  }

  // Method to insert a value into the BST
  insert(value) {
    const newNode = new TreeNode(value); // Create a new TreeNode with the given value

    // If the BST is empty, set the root to the new node and return the BST
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;
    while (true) {
      // If the value is less than the current node's value, move to the left child
      if (value < currentNode.value) {
        // If the left child doesn't exist, insert the new node here and return the BST
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        // Update the current node to the left child
        currentNode = currentNode.left;
      } else { // If the value is greater or equal, move to the right child
        // If the right child doesn't exist, insert the new node here and return the BST
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        // Update the current node to the right child
        currentNode = currentNode.right;
      }
    }
  }

  // Method to search for a value in the BST
  search(value) {
    let currentNode = this.root; // Start at the root

    // Continue searching while there are nodes to visit
    while (currentNode) {
      // If the value is equal to the current node's value, return the node
      if (value === currentNode.value) {
        return currentNode;
      }
      // If the value is less than the current node's value, move to the left child
      else if (value < currentNode.value) {
        currentNode = currentNode.left;
      }
      // If the value is greater, move to the right child
      else {
        currentNode = currentNode.right;
      }
    }

    // Return null if the value is not found
    return null;
  }
}

// Example usage:
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(17);

console.log(bst.search(15)); // Output: TreeNode { value: 15, left: TreeNode { value: 13, left: null, right: null }, right: TreeNode { value: 17, left: null, right: null } }
console.log(bst.search(8));  // Output: null
`}
                    
                    />
                </div>
            </article>
        </>
    );
}

export default BST