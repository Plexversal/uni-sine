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
                    <h1>Conditional and Logical Statements</h1>
                    <p>
                        Conditional and logical statements are fundamental building blocks of programming, allowing developers to control the flow of execution based on certain conditions. This topic will discuss different types of conditional and logical statements, with a focus on Python as the programming language. We will also provide a basic understanding of how these statements are evaluated at the binary level.
                    </p>
                    <h2>Conditional Statements</h2>
                    <p>
                        Conditional statements are used to make decisions in code based on whether a specific condition is met. The most common type of conditional statement is the &quot;if&quot; statement. In Python, the syntax for an &quot;if&quot; statement is as follows:
                    </p>
                    <CodeBlock
                        language="python"
                        code={`if condition: # Code to execute if the condition is True`} />

                    <p>
                        You can also use &quot;elif&quot; (short for &quot;else if&quot;) to test multiple conditions in a single &quot;if&quot; statement. Finally, you can use &quot;else&quot; to specify a block of code that will execute when none of the conditions are met.
                    </p>
                    <CodeBlock
                        language="python"
                        code={`if condition1: 
# Code to execute if condition1 is True 

elif condition2: 
# Code to execute if condition2 is True

else: 
# Code to execute if none of the conditions are True`} />

                    <h2>Logical Operators</h2>
                    <p>
                        Logical operators are used to combine multiple conditions or expressions. In Python, the most commonly used logical operators are &quot;and&quot;, &quot;or&quot;, and &quot;not&quot;.
                    </p>
                    <ul>
                        <li><strong>and:</strong> The &quot;and&quot; operator returns True if both expressions are True.</li>
                        <li><strong>or:</strong> The &quot;or&quot; operator returns True if at least one of the expressions is True.</li>
                        <li><strong>not:</strong> The &quot;not&quot; operator returns True if the expression is False, and False if the expression is True.</li>
                    </ul>
                    <CodeBlock
                        language="python"
                        code={`if condition1 and condition2:
# Code to execute if both conditions are True

if condition1 or condition2:
# Code to execute if at least one of the conditions is True

if not condition:
# Code to execute if the condition is False`} />
                    <h2>Python Example: Using Conditional Statements and Logical Operators</h2>
                    <p>
                        Here&quot;s an example of using conditional statements and logical operators in Python to determine if a number is within a specified range:
                    </p>
                    <CodeBlock
                        language="python"
                        code={`number = 42
lower_bound = 10
upper_bound = 50

if lower_bound <= number and number <= upper_bound:
print("The number is within the specified range.")
else:
print("The number is outside the specified range.")`} />
                    <p>In this example, the &quot;if&quot; statement checks if the value of the &quot;number&quot; variable is within the range specified by &quot;lower_bound&quot; and &quot;upper_bound&quot;. If both conditions are met (using the &quot;and&quot; operator), the program will print &quot;The number is within the specified range.&quot; Otherwise, it will print &quot;The number is outside the specified range.&quot;</p>
                    <h2>Loops and Conditional Statements</h2>
                    <p>
                        Loops are used to repeatedly execute a block of code while a certain condition is met. You can use conditional statements within loops to control the flow of execution based on specific conditions. In Python, there are two types of loops: &quot;for&quot; loops and &quot;while&quot; loops.
                    </p>
                    <h3>For Loop</h3>
                    <p>
                        A &quot;for&quot; loop is used to iterate over a sequence (such as a list, tuple, or string). Here&quot;s an example of using a &quot;for&quot; loop with a conditional statement to find even numbers in a list:
                    </p>
                    <CodeBlock
                        language="python"
                        code={`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
even_numbers = []

for number in numbers:
if number % 2 == 0:
even_numbers.append(number)

print("Even numbers in the list:", even_numbers)`} />

                    <p>
                        In this example, the &quot;for&quot; loop iterates through each item in the &quot;numbers&quot; list. The &quot;if&quot; statement checks if the current number is even (i.e., the remainder of the number divided by 2 is 0). If the condition is met, the number is appended to the &quot;even_numbers&quot; list.
                    </p>
                    <h3>While Loop</h3>
                    <p>
                        A &quot;while&quot; loop is used to repeatedly execute a block of code while a specified condition is True. Here&quot;s an example of using a &quot;while&quot; loop with a conditional statement to print the first ten even numbers:
                    </p>
                    <CodeBlock
                        language="python"
                        code={`even_numbers = []
current_number = 0

while len(even_numbers) < 10:
if current_number % 2 == 0:
even_numbers.append(current_number)
current_number += 1

print("First ten even numbers:", even_numbers)`} />

                    <p>
                        In this example, the &quot;while&quot; loop continues executing until the &quot;even_numbers&quot; list contains ten items. The &quot;if&quot; statement checks if the current number is even, and if so, it is appended to the &quot;even_numbers&quot; list. The &quot;current_number&quot; is incremented after each iteration.
                    </p>
                    <p>
                        Understanding conditional and logical statements is crucial for writing efficient and versatile code. By using these statements effectively, programmers can create complex algorithms and control the flow of execution in their programs.
                    </p>
                    <h2>Switch Statements and Ternary Operators</h2>
                    <p>
                        In addition to &quot;if&quot; statements, Python has other constructs that help developers manage complex conditional logic. Although Python does not have a native &quot;switch&quot; statement like some other programming languages, we can achieve similar functionality using dictionaries. Another useful construct for simple conditional expressions is the ternary operator.
                    </p>
                    <h3>Switch-Like Statement Using Dictionaries</h3>
                    <p>
                        A &quot;switch&quot; statement allows you to select a block of code to execute based on the value of a given variable. Since Python doesn&quot;t have a built-in &quot;switch&quot; statement, we can use dictionaries to achieve a similar effect. Here&quot;s an example that demonstrates this concept:
                    </p>
                    <CodeBlock
                        language="python"
                        code={`def case1():
return "This is case 1"

def case2():
return "This is case 2"

def case3():
return "This is case 3"

def default_case():
return "This is the default case"

switch_case = {
1: case1,
2: case2,
3: case3,
}

number = 2
result = switch_case.get(number, default_case)()
print(result)`} />

                    <p>
                        In this example, we define four functions (case1, case2, case3, and default_case) that return different strings. The &quot;switch_case&quot; dictionary maps integers to their corresponding functions. The &quot;get()&quot; method is used to call the appropriate function based on the value of the &quot;number&quot; variable, with the &quot;default_case&quot; function being called if the value is not found in the dictionary.
                    </p>
                    <h3>Ternary Operator</h3>
                    <p>
                        The ternary operator allows you to write short, simple conditional expressions in a single line of code. It is particularly useful when you need to assign a value to a variable based on a simple condition. Here&quot;s an example of using the ternary operator in Python:
                    </p>
                    <CodeBlock
                        language="python"
                        code={`number = 5 result = "even" if number % 2 == 0 else "odd" print("The number is", result)`} />

                    <p>
                        In this example, the ternary operator checks if the &quot;number&quot; variable is even (i.e., the remainder of the number divided by 2 is 0). If the condition is met, the &quot;result&quot; variable is assigned the value &quot;even&quot;; otherwise, it is assigned the value &quot;odd&quot;.
                    </p>
                    <p>
                        Conditional and logical statements are essential tools for controlling the flow of execution in a program. By understanding and using these constructs effectively, you can write more versatile and efficient code, allowing you to tackle a wide range of programming challenges.
                    </p>
                    <h2>Behind the Scenes: Binary Representation and Logical Operations</h2>
                    <p>
                        Computers internally represent data using binary numbers, which consist of only two digits: 0 and 1. To perform logical operations in programming languages, the computer converts the input values into binary representation and processes them using bitwise logical operators. Understanding how binary numbers and logical operations work can help you write more efficient and optimized code.
                    </p>
                    <p>Below represents 8 bits of data in binary and what each bit in 1 byte of data represents, for 0 it would all be 0:</p>
                    <table className="MsoTableGrid" border="1" cellSpacing="0" cellPadding="0"> 
                    <tbody><tr>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}>128</p>
                        </td>
                        <td width="200" valign="top">
                            <p className={styles["MsoNormal"]}>64</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>32</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>16</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>8</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>4</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>2</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>1</p>
                        </td>
                    </tr>
                        <tr >
                            <td width="200" valign="top" >
                                <p className={styles["MsoNormal"]} >1000 0000</p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >0100 0000</p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >0010 0000
                                </p>
                            </td>
                            <td width="200" valign="top">
                                <p className={styles["MsoNormal"]} >0001 0000
                                </p>
                            </td>
                            <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>0000 1000</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>0000 0100</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>0000 0010</p>
                        </td>
                        <td width="200" valign="top">  
                            <p className={styles["MsoNormal"]}>0000 0001</p>
                        </td>
                            
                        </tr>
                    </tbody></table>
                    <h3>Binary Representation</h3>
                    <p>
                        In binary representation, numbers are expressed as a sequence of 0s and 1s. Each digit in a binary number is called a bit. For example, the decimal number 5 can be represented in binary as 101, and the decimal number 9 can be represented as 1001. Logical operations, such as AND, OR, and NOT, can be performed on these binary representations.
                    </p>
                    <h3>Bitwise Logical Operations</h3>
                    <p>
                        Bitwise logical operations are performed on individual bits of binary numbers. Here&quot;s a brief overview of the most common bitwise operations:
                    </p>
                    <ul>
                        <li><strong>AND:</strong> Returns 1 if both bits are 1; otherwise, returns 0.</li>
                        <li><strong>OR:</strong> Returns 1 if at least one of the bits is 1; otherwise, returns 0.</li>
                        <li><strong>XOR:</strong> Returns 1 if the bits are different; otherwise, returns 0.</li>
                        <li><strong>NOT:</strong> Inverts the bits (i.e., changes 1 to 0 and 0 to 1).</li>
                    </ul>
                    <p>
                        Here&quot;s an example of a bitwise AND operation on two binary numbers:
                    </p>
                    <pre>
                        1010 (decimal 10)
                        & 0110 (decimal 6)
                        ------
                        0010 (decimal 2)
                    </pre>
                    <p>
                        In Python, you can perform bitwise operations using the following operators: &, |, ^, and ~ for AND, OR, XOR, and NOT, respectively. For example:
                    </p>
                    <CodeBlock
                        language="python"
                        code={`a = 10 # Binary: 1010
b = 6 # Binary: 0110

result_and = a & b # Binary: 0010 (decimal 2)
result_or = a | b # Binary: 1110 (decimal 14)
result_xor = a ^ b # Binary: 1100 (decimal 12)
result_not = ~a # Binary: 0101 (decimal -11, due to two's complement representation)

print("AND:", result_and)
print("OR:", result_or)
print("XOR:", result_xor)
print("NOT:", result_not)`} />

                    <p>
                        Understanding binary representation and bitwise operations can help you tackle problems that require low-level manipulation of data. Although this knowledge might not be required for everyday programming tasks, it can be instrumental in optimizing code, debugging complex issues, and solving domain-specific problems.
                    </p>
                </div>
            </article>
        </>
    );


}

export default FunctionsScope