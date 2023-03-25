import Path from "../../components/page-construction/Path"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import styles from '../../styles/Page.module.css'
import React, { useEffect, useState } from "react"
import CodeBlock from "../../components/page-construction/CodeBlock"

function DataTypes() {

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
        title="Data Types"
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
          <h1>Data Types</h1>
          <p>Data types are an essential concept in computer science, as they define the kind of data that can be stored, processed, and manipulated within a programming language. Data types are classified into two main categories: primitive and non-primitive (also known as composite or complex) data types.</p>
          <h2>Primitive Data Types</h2>
          <p>Primitive data types are the fundamental building blocks of a programming language, providing the most basic types of data. They include:</p>
          <ol >
            <li>Integer (int): Represents whole numbers, both positive and negative. The size of an integer depends on the programming language and the platform it is running on.</li>
            <li>Float (float): Represents floating-point numbers, which are numbers with decimal points. They are used to store values that require a higher level of precision, such as measurements and currency.</li>
            <li>Double (double): Similar to the float data type, but with twice the precision, allowing for even more accurate decimal values.</li>
            <li>Character (char): Represents a single character, such as a letter, number, or symbol. Characters are typically stored using ASCII or Unicode encoding.</li>
            <li>Boolean (bool): Represents a true or false value, used for logical operations and decision-making within a program.</li>
          </ol>
          <p>[image: A table illustrating each primitive data type with examples]</p>
          <h2>Non-Primitive Data Types</h2>
          <p>Non-primitive data types are more complex, often built using combinations of primitive data types. They include:</p>
          <ol >
            <li>Arrays: An array is a collection of elements, all of the same data type, stored in a contiguous block of memory. Arrays are useful for storing and manipulating large amounts of data, such as lists and matrices.</li>
            <li>Strings: A string is a sequence of characters, often used to represent text. In most programming languages, strings are treated as an array of characters.</li>
            <li>Structures: A structure is a custom data type that allows the programmer to group related data together. Structures can contain elements of different data types and are commonly used to represent records or objects within a program.</li>
            <li>Classes and Objects: In object-oriented programming languages, such as Java and C++, classes are used to define the structure and behavior of objects. Objects are instances of classes and can contain both data (attributes) and functions (methods) that operate on that data.</li>
            <li>Pointers: A pointer is a special data type that holds the memory address of another value. Pointers are useful for managing memory, working with arrays, and implementing complex data structures such as linked lists and trees.</li>
            <li>Enumerations: An enumeration is a user-defined data type consisting of a set of named integer constants. Enumerations are useful for representing sets of related values, such as days of the week or directions.</li>
          </ol>
          <p>[image: A table illustrating each non-primitive data type with examples]</p>
          <h3>Example</h3>
          <p>Let&apos;s consider a simple example of using data types in a program. Suppose we are creating a program to store information about students, including their name, age, and grade point average (GPA).</p>
          <p>In a C++ program, we might define a structure to represent a student as follows:</p>
          <CodeBlock
            language="cpp"
            code={`struct Student {
    string name;
    int age;
    float GPA;
};`}
          />
          <p>Here, we are using a combination of primitive and non-primitive data types. The &apos;name&apos; attribute is a string, the &apos;age&apos; attribute is an integer, and the &apos;GPA&apos; attribute is a float.</p>
          <p>To create a new instance of a student and assign values to its attributes, we can write the following code:</p>
          <CodeBlock
            language="cpp"
            code={`Student student1;
student1.name = "John Doe";
student1.age = 18;
student1.GPA = 3.5;`}
          />
          <p>In this example, we have successfully used different data types to store information about a student in a structured and efficient manner.</p>
          <p>Understanding data types is crucial for writing efficient and effective programs. By choosing the correct data type for each piece of information, you can ensure that your program uses memory and processing power efficiently while also preventing errors and data loss.</p>
          <h2>Type Casting and Type Conversion</h2>
          <p>In programming, it is often necessary to convert a value from one data type to another. This process is called type casting or type conversion. There are two main types of type conversion: implicit and explicit.</p>
          <ol >
            <li>Implicit Type Conversion: Also known as "type promotion" or "type coercion," implicit type conversion occurs when the compiler automatically converts one data type to another without the programmer&apos;s intervention. This typically occurs when performing operations between different data types, such as adding an integer and a float.</li>
          </ol>
          <h3>Example:</h3>
          <CodeBlock
            language="cpp"
            code={`int num1 = 5;
float num2 = 3.2;

float result = num1 + num2; // num1 is implicitly converted to a float`}
          />
          <ol start={2}>
            <li>Explicit Type Conversion: Also known as "type casting" or "type demotion," explicit type conversion is when the programmer explicitly converts a value from one data type to another. This is typically done using a casting operator.</li>
          </ol>
          <h3>Example:</h3>
          <CodeBlock
            language="cpp"
            code={`float num1 = 5.7;
int num2 = 3;

int result = static_cast<int>(num1) + num2; // num1 is explicitly converted to an integer`}
          />
          <p>It&apos;s important to be cautious when performing type conversions, as they can lead to data loss or unexpected behaviour if not handled correctly. For example, converting a floating-point number to an integer will truncate the decimal portion of the value, potentially causing a loss of precision.</p>
          <h2>Choosing the Right Data Type</h2>
          <p>Selecting the appropriate data type for a given piece of information is an essential aspect of programming. When choosing a data type, consider the following factors:</p>
          <ul >
            <li>Size: Different data types have different sizes in memory. Ensure that the data type you choose can accommodate the range of values you expect to work with.</li>
            <li>Precision: Some data types, such as floating-point numbers, have varying levels of precision. Choose a data type that provides the necessary level of accuracy for your application.</li>
            <li>Performance: Some data types may be more computationally efficient than others. For example, using an integer instead of a float may lead to faster calculations in certain situations.</li>
            <li>Compatibility: Consider the compatibility of data types when working with different programming languages or systems. Some data types may not be supported across all platforms.</li>
          </ul>
          <p>In conclusion, understanding and using data types effectively is a critical skill for any programmer. By choosing the right data type for each piece of information and using type conversion appropriately, you can create efficient, accurate, and robust programs.</p>

        </div>
      </article>
    </>
  );
}

export default DataTypes