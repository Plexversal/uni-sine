import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"
import Account from "../../components/page-construction/AccountModal"
function FunctionsScope() {

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
                title="Functions and scope"
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
                <h1>Functions and Scope</h1>
<img alt='call stack example' src="/static/comp/functions/callStack.png" className={styles['equation']}></img>

<p>
    Functions are fundamental building blocks in programming languages, allowing developers to write reusable and modular code. This article will discuss the concept of functions, their importance, and how they interact with scope in JavaScript. Additionally, we will explore execution stacks, queue stacks, and other related topics to help you better understand the inner workings of functions.
</p>
<h2>Functions in Programming Languages</h2>
<p>
    A function is a self-contained block of code designed to perform a specific task. Functions can be called multiple times with different inputs, making code more modular and easier to maintain. In JavaScript, functions can be defined using the `function` keyword, followed by the function name, a list of parameters within parentheses, and a set of curly braces containing the function body.
</p>

<CodeBlock
language="javascript"
code={`function exampleFunction(param1, param2) {
    // Function body
}
`} />
<p>
    Functions can also be defined using arrow functions, which have a shorter syntax and different scoping behavior for the `this` keyword.
</p>


<CodeBlock
language="javascript"
code={`const exampleFunction = (param1, param2) => {
    // Function body
};
`} />
<h2>Scope in Programming Languages</h2>
<p>
    Scope refers to the visibility and accessibility of variables within a program. In JavaScript, there are two types of scope: global scope and local scope. Variables declared outside of any function or block have a global scope and can be accessed from any part of the code. In contrast, variables declared within a function or block have a local scope and can only be accessed from within that function or block.
</p>
<CodeBlock
language="javascript"
code={`let globalVariable = "I'm global!";
function exampleFunction() {
    let localVariable = "I'm local!";
    console.log(globalVariable); // Accessible
    console.log(localVariable); // Accessible
}

console.log(globalVariable); // Accessible
console.log(localVariable); // Error: localVariable is not defined`}
/>

<h2>Execution Context and Call Stack</h2>

<p>
    When a JavaScript program runs, it creates an execution context that keeps track of the current state of the code, including variables, functions, and the call stack. The call stack is a data structure that stores information about the currently executing functions in a last-in, first-out (LIFO) order. Each time a function is called, a new stack frame is added to the call stack, containing information about the function&apos;s local variables, parameters, and return address. When a function finishes executing, its stack frame is removed from the call stack, and the program continues executing from the return address.
</p>

<h2>Event Loop and Queue Stack</h2>
<p>
    The event loop is a mechanism that processes queued tasks and events in JavaScript. It constantly checks if there are any tasks in the queue stack, which is a data structure that stores tasks in a first-in, first-out (FIFO) order. When a task is ready to be executed, the event loop removes it from the queue stack and adds it to the call stack. This process allows JavaScript to handle asynchronous tasks, such as setTimeout and promises, without blocking the main thread of execution.    
</p>
<CodeBlock
language="javascript"
code={`function firstFunction() {
    console.log("First function executed");
  }
  
  function secondFunction() {
    setTimeout(() => {
      console.log("Second function executed after a delay");
    }, 1000);
  }
  
  function thirdFunction() {
    console.log("Third function executed");
  }
  
  firstFunction();
  secondFunction();
  thirdFunction();`}
/>
<p>
    In the example above, the output will be:
</p>
<CodeBlock
language="javascript"
code={`> "First function executed"
> "Third function executed"
> "Second function executed after a delay"`}
/>
<p>
    The second function, which includes a setTimeout, does not block the execution of the third function. The event loop adds the setTimeout callback to the queue stack, and it is executed after the specified delay when the call stack is empty.
</p>
<h2>Example</h2>
<ol>
    <li>
        Consider the following JavaScript code:
        <div>
        <CodeBlock
language="javascript"
code={`let x = 10;
function outer() {
    let y = 20;

    function inner() {
      let z = 30;
      console.log(x, y, z);
    }

    inner();
  }

  outer();`}
/>
        </div>
    <ol type="a">
        <li>What will be printed to the console?</li>
        <li>Which variables are accessible from the inner function?</li>
        <li>Which variables are accessible from the outer function?</li>
    </ol>
</li>
</ol>
<h3>Solution</h3>
<p><strong>a)</strong> The console will print &apos;10 20 30&apos;.</p>
<p><strong>b)</strong> The inner function has access to variables x, y, and z due to its scope.</p>
<p><strong>c)</strong> The outer function has access to variables x and y.</p>
<h2>Function Parameters and Arguments</h2>
<p>
    Functions can accept input values called parameters, which are declared in the function definition. When a function is called, the values passed into it are called arguments. Arguments are matched to the corresponding parameters in the order they are defined.
</p>
<CodeBlock
language="javascript"
code={`function greet(name, greeting) {
    console.log(greeting + ", " + name + "!");
  }
  greet("John", "Hello"); // Output: "Hello, John!"`}
/>

<h2>Higher-Order Functions and Callbacks</h2>
<p>
    In JavaScript, functions are first-class objects, meaning they can be treated like any other object, such as strings or numbers. This allows for higher-order functions, which are functions that accept other functions as arguments or return them as output. Callback functions are functions passed as arguments to other functions and are often used in asynchronous operations or event handling.
</p>
<CodeBlock
language="javascript"
code={`function square(x) {
    return x * x;
  }
  function cube(x) {
  return x * x * x;
  }
  
  function calculate(operation, value) {
  return operation(value);
  }
  
  console.log(calculate(square, 5)); // Output: 25
  console.log(calculate(cube, 3)); // Output: 27"`}
/>
<h2>Recursion and the Base Case</h2>
<p>
    Recursion is a programming technique in which a function calls itself to solve a problem. A recursive function typically consists of a base case, which is a condition that ends the recursion, and a recursive case, which is the part of the function that calls itself with a modified argument. Recursive functions can be an elegant solution for certain problems, such as traversing tree-like data structures or solving mathematical problems like the Fibonacci sequence.
</p>
<CodeBlock
language="javascript"
code={`function factorial(n) {
    if (n === 0) {
      return 1; // Base case
    } else {
      return n * factorial(n - 1); // Recursive case
    }
  }
  console.log(factorial(5)); // Output: 120`}
/>

<h2>Conclusion</h2>
<p>
    Understanding functions and scope in programming languages is essential for writing clean, maintainable code. By learning about execution context, call stacks, and event loops, you can better comprehend the inner workings of functions and the JavaScript runtime. Mastering these concepts will help you become a more effective programmer and problem solver.
</p>
                </div>
            </article>
        </>
    );


}

export default FunctionsScope