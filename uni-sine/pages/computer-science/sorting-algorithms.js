import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"

function SortingAlgorithms() {

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
        title="Sorting Algorithms"
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
          <h1>Sorting Algorithms</h1>
          <p>Sorting algorithms are a fundamental part of computer science and are essential for organizing and managing data efficiently. The choice of the appropriate sorting algorithm is crucial because it can significantly impact the performance of an application.</p>
          <p>Importance of Choosing the Correct Sorting Algorithm</p>
          <p>Selecting the correct sorting algorithm depends on various factors, such as:</p>
          <ol >
            <li>Size of the dataset: Some algorithms work well with small datasets, while others are more efficient with larger datasets.</li>
            <li>Data distribution: The distribution and initial order of the data can affect the performance of some sorting algorithms.</li>
            <li>Stability: Stable sorting algorithms maintain the relative order of equal elements, which can be crucial in specific applications.</li>
            <li>In-place sorting: In-place algorithms use a constant amount of extra memory during the sorting process, making them more memory-efficient.</li>
            <li>Adaptivity: Adaptive algorithms take advantage of existing order within the data to reduce the number of operations.</li>
          </ol>
          <h2>Standard Sorting Algorithm in Most Programming Languages</h2>
          <p>Many programming languages, such as Python, Java, and C++, use the Timsort algorithm as the default sorting algorithm. Timsort is a hybrid sorting algorithm derived from merge sort and insertion sort. It takes advantage of runs (already ordered subsequences) in the input data and is adaptive, stable, and performs well on real-world data.</p>
          <p>Sorting algorithm complexities can be expressed using Big O notation, which describes the upper bound of the algorithm's growth rate. The most common complexities are:</p>
          <ol start="1">
            <li>
              O(n^2): Quadratic complexity, typical for elementary sorting algorithms such as bubble sort, insertion sort, and selection sort. These algorithms perform well for small datasets but become inefficient as the dataset size increases.
            </li>
          </ol>
          <img alt='' src="/static/comp/sorting-algorithms/image001.png" className={styles['equation']}></img>
          <ol start="2">
            <li>
              O(n*log(n)): Log-linear complexity, typical for more advanced algorithms such as merge sort, quicksort, and heapsort. These algorithms are more efficient for larger datasets.
            </li>
          </ol>
          <img alt='' src="/static/comp/sorting-algorithms/image002.png" className={styles['equation']}></img>
          <ol start="3">
            <li>
              O(n): Linear complexity, found in linear-time sorting algorithms such as counting sort, radix sort, and bucket sort. These algorithms are efficient for specific types of data but are not suitable for all data types.
            </li>
          </ol>
          <img alt='' src="/static/comp/sorting-algorithms/image003.png" className={styles['equation']}></img>

          <h2>Fastest Type of Sorting Algorithm: Quicksort</h2>
          <p>Quicksort is a highly efficient and widely used sorting algorithm, which employs a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two groups: those less than or equal to the pivot and those greater than the pivot. The process is then recursively applied to the sub-arrays, eventually resulting in a sorted array.</p>
          <p>The average-case time complexity of quicksort is O(n*log(n)), where n is the number of elements in the array. The O-notation, also known as Big O notation, represents the upper bound of an algorithm's growth rate. It is used to describe the performance or complexity of an algorithm as a function of input size.</p>
          <p>To understand how the O(n*log(n)) complexity comes into play for quicksort, let's consider a specific example:</p>
          <p>Suppose we have an array of 8 elements: [5, 3, 9, 1, 6, 8, 2, 7]</p>
          <p>In each step, quicksort will partition the array around the pivot, and for simplicity, let's assume the pivot selection always results in a balanced partition (i.e., the pivot element is the median). After each partition, the array will be split into two halves, and quicksort will be applied recursively to both halves.</p>
          <p>Here's how the array will be partitioned in each step (with pivot elements in parentheses):</p>
          <ol >
            <li>[5, 3, (1), 6, 8, 2, 7, 9]</li>
            <li>[(1), 5, 3, 6, 8, 2, 7, 9] -&gt; [(1), 3, 5, (2), 7, 8, 6, 9]</li>
            <li>[(1), 3, 5, (2), 7, 8, 6, 9] -&gt; [(1), 3, (2), 5, 7, 8, (6), 9]</li>
            <li>[(1), 3, (2), 5, 7, 8, (6), 9] -&gt; [(1), (2), 3, 5, (6), 7, 8, 9]</li>
          </ol>
          <p>In this example, quicksort had to perform log2(8) = 3 levels of partitioning (with each level doubling the number of sub-arrays), and at each level, a total of n = 8 comparisons were made. Therefore, the total number of comparisons is:</p>
          <img alt='n*log(n) = 8*3 = 24' src="/static/comp/sorting-algorithms/image004.png" className={styles['equation']}></img>

          <p>To use the O(n*log(n)) equation for quicksort, you can simply plug in the number of elements in the array (n) and calculate the product of n and log2(n). Keep in mind that this represents the average-case complexity, and the actual number of comparisons may vary depending on the input data and pivot selection strategy.</p>
          <p>The lower the value of O(n*log(n)), the more efficient the algorithm. In the context of sorting algorithms, the Big-O notation represents the number of comparisons or operations performed in the worst-case scenario. The lower the number of comparisons, the faster the algorithm will perform, especially for larger datasets.</p>
          <p>Similarly, for other notations like O(n^2) and O(n), they represent the number of comparisons or operations made in the worst-case scenario. For example:</p>
          <ul >
            <li>O(n^2) implies that the number of comparisons grows quadratically with the input size. Algorithms with this complexity, such as Bubble Sort or Insertion Sort, tend to be less efficient for large datasets.</li>
            <li>O(n) implies that the number of comparisons grows linearly with the input size. Linear-time algorithms, such as Counting Sort (for specific cases) or Radix Sort, can be more efficient for certain types of data.</li>
          </ul>
          <p>Comparing different algorithms' complexities helps in understanding which one may perform better for a specific problem or dataset.</p>
          <h3>Example quicksort code in JavaScript:</h3>
          <CodeBlock
            language="javascript"
            code={`// QuickSort function, which takes an array and optional left and right indices.
function quickSort(arr, left = 0, right = arr.length - 1) {
  // Base case: If the left index is less than the right index, continue sorting.
  if (left < right) {
    // Call the partition function to find the pivot index.
    const pivotIndex = partition(arr, left, right);

    // Recursively sort the left partition (from left index to pivot index - 1).
    quickSort(arr, left, pivotIndex - 1);

    // Recursively sort the right partition (from pivot index + 1 to right index).
    quickSort(arr, pivotIndex + 1, right);
  }
  // Return the sorted array.
  return arr;
}

// Partition function, which takes an array and left and right indices.
function partition(arr, left, right) {
  // Choose the pivot element by taking the middle index of the partition.
  const pivot = arr[Math.floor((left + right) / 2)];

  // Initialize i to the left index and j to the right index.
  let i = left;
  let j = right;

  // While i is less than or equal to j, continue comparing elements.
  while (i <= j) {
    // Increment i until an element greater than or equal to the pivot is found.
    while (arr[i] < pivot) {
      i++;
    }
    // Decrement j until an element less than or equal to the pivot is found.
    while (arr[j] > pivot) {
      j--;
    }
    // If i is less than or equal to j, swap the elements at i and j, and then increment i and decrement j.
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  // Return the updated i index, which is the new pivot index.
  return i;
}

// Example usage:
const unsortedArray = [34, 7, 23, 32, 5, 62, 5332];
const sortedArray = quickSort(unsortedArray);
console.log(sortedArray); // Output: [ 5, 7, 23, 32, 34, 62, 5332 ]`}
          />

        </div>
      </article>
    </>
  );
}

export default SortingAlgorithms