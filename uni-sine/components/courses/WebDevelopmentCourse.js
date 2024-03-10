import { useEffect, useState, useCallback, useRef  } from "react";
import LoadingIcon from "../page-construction/LoadingIcon";
import styles from "../../styles/Courses.module.css";
import CodeBlock from '../page-construction/CodeBlock'
import { CgCopy } from 'react-icons/cg'
import {BsFillXCircleFill, BsFillCheckCircleFill} from 'react-icons/bs'
import CodeEditor from "../page-construction/CodeEditor";
import LevWorker from '../../workers/levenshtein.worker'
import PercentIcon from "../page-construction/PercentageIcon";
import QuestionElement from "./QuestionElement";
import { cleanCSS, cleanHTML, cleanJS } from "../../lib/cleanFunctions";
import * as dedent from 'dedent-js'
function WebDevCourse(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [levDist, setLevDist] = useState('')
  const [percentage, setPercentage] = useState(0)
  const [correctQuestions, setCorrectQuestions] = useState([])
  const [userCourseData, setUserCourseData] = useState([])
  const workerRef = useRef(null);
  const prevSectionRef = useRef(props.currentSection); 
  const [isDataReady, setIsDataReady] = useState(false);



  const codeSnippets = {
    s2: {
      code: dedent(`<h1>My HTML document</h1>
      <h2>Hello world.</h2>
      <p>This is my first HTML document</p>
      <a href="https://google.com">Check out this link to google</a>`),
      type: 'html'
    },
    s4: {
      code: dedent(`<head>
      <!-- Add meta tags -->
      <meta name="description" content="Web development made easy.">
      <meta name="keywords" content=" webdev, coding, html">
      <meta name="author" content="uni-sine">
    </head>
    <body>
      <!-- Add image tags -->
      <img src="/static/logo.png" width="50px" />
    </body>`),
    type: 'html'
    },
  s6: {
    code: dedent(`body {
      margin: 20px;
    }
    h1 {
      background: grey;
      color: blue;
    }
    p {
      font-size: 1.1em;
    }
    .grey-text {
      color: grey;
    }
    .underlined-text {
      text-decoration: underline;
    }`),
    type: 'css'
  },
  s8: {
    code: dedent(`.large-first-char::first-letter {
      font-size: 2em;
    }
    
    #uni-sine-link:hover {
      color: red;
    }
    
    p {
      color: orange;
    }
    `),
    type: 'css'
  },
  s10: {
    code: dedent(`document.getElementById('my-text').textContent = 'hello world'`),
    type: 'js'
  }
  }
  
  const [activeCodeSnippet, setActiveCodeSnippet] = useState('')

  let list = [
    "HTML",
    "HTML coding practice",
    "Further HTML",
    "Further HTML coding practice",
    "CSS",
    "CSS coding practice",
    "Further CSS",
    "Further CSS coding practice",
    "JavaScript",
    "JavaScript coding practice",
    "Advanced: website hosting",
    "Advanced: Databases",
    "Advanced: Web stacks",
    "Practice Questions",
    "Course review",
  ];

  const questions = [
    {
      question: "What is the best HTML element to use for creating link elements?",
      answersArray: [`<span />`, `<div />`, {correctAnswer: `<a />`}, `<p />`]
    },
    {
      question: "How are CSS Pseudo-classes denoted?",
      answersArray: [`--pseudo-class`, `_pseudo-class`, {correctAnswer: `::pseudo-class`}, `~~pseudo-class`]
    },
    {
      question: "What keyword in JS can be used to access the HTML of a page?",
      answersArray: [`body`, `console`, {correctAnswer: `document`}, `resolve`]
    }
  ];
  
  const [parentCode, setParentCode] = useState({
    HTML: "",
    JS: "",
    CSS: "",
  });

  const handleCodeChange = useCallback((newCode) => {
    setParentCode(newCode);
  }, []);


  function getCleanFunction(type) {
  switch(type) {
    case 'html':
      return cleanHTML;
    case 'css':
      return cleanCSS;
    case 'js':
      return cleanJS;
    default:
      return (str) => str;
  }
  }

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


  // save course data on page move
  useEffect(() => {
    let data;

    if(Object.keys(codeSnippets).includes(`s${prevSectionRef.current}`)) {

      data = {
        courseName: props.courseName, // string
        section: prevSectionRef.current, // number
        codeMatchPercent: {
          section: prevSectionRef.current,
          percent: percentage
        },
      }

    } else if(prevSectionRef.current == 14) {
      if(!isDataReady) return
      data = {
        courseName: props.courseName, // string
        section: prevSectionRef.current, // number
        questionsCompleted: correctQuestions
      }

    } else {

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
          setPercentage(0)
        setIsLoading(false)


      }
    }

    saveToUser()
    setIsDataReady(false); // Reset the flag
    prevSectionRef.current = props.currentSection;

  }, [props.currentSection, isDataReady])

  // set percentages
  useEffect(() => {

    // if existing worker is running, terminate it
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    
    if (!codeSnippets[`s${props.currentSection}`]) return;
  
    const snippet = codeSnippets[`s${props.currentSection}`];
    const cleanFunc = getCleanFunction(snippet.type);
  
    const parentCodeForType = parentCode[snippet.type.toUpperCase()];
    
    const cleanedString1 = cleanFunc(parentCodeForType);
    const cleanedString2 = cleanFunc(snippet.code);
  
    workerRef.current = new LevWorker(); // <-- Create new worker
    workerRef.current.postMessage({ string1: cleanedString1, string2: cleanedString2 });
  
    workerRef.current.onmessage = (event) => {
      const { levenshteinDistance } = event.data;
  
      setLevDist(levenshteinDistance);
      setPercentage(((1 - (levenshteinDistance / Math.max(parentCodeForType.length, snippet.code.length))) * 100).toFixed(0));
    };
    
    return () => {
      workerRef.current.terminate();
    };
  
  }, [parentCode, props.currentSection]);

  // get user course data
  useEffect(() => {
    if((props.currentSection !== 0 && props.currentSection !== 15)) return
    setIsLoading(true)
    const fetchData = async () => {
      try {
        let response = await fetch(`/api/db/getUserCourseStats?courseName=${encodeURIComponent(props.courseName)}`)
        if(response.status !== 200) {
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

  function checkSections (section) {
    if(!userCourseData || userCourseData.length <= 0) return section
    let completedSection = userCourseData.completedSections;
    const isDone = completedSection.some((e) => e === section);
    
    return isDone ? '\u2713' : section;
    
  }
  

  return (
    <>
      {props.currentSection == 0 ? (
        <div>
          <div>
            <h2>Introduction to Web Development</h2>
            <p>
              Web development is the practice of building and maintaining
              websites or web applications. It encompasses a wide range of
              tasks, from creating simple static web pages using HTML, CSS, and
              basic JavaScript, to developing complex, data-driven applications
              that run on multiple servers. The goal is to provide a seamless
              user experience that is both functional and aesthetically
              pleasing. Web development is divided into two main categories:
              front-end development, which deals with the visual aspects that
              the user interacts with, and back-end development, which focuses
              on server-side logic and databases.
            </p>
            <p>
              In today&apos;s fast-paced digital landscape, web development practices
              are constantly evolving. Modern practices emphasize mobile-first
              design, user-centric UI/UX, accessibility, and search engine
              optimization. Techniques like responsive design ensure that
              websites function well on a variety of devices, including
              smartphones and tablets. As web applications grow in complexity,
              frameworks and libraries like React, Angular, and Vue.js have
              become popular for front-end development, while back-end
              technologies like Node.js, Django, and Ruby on Rails offer robust
              solutions for server-side logic. Being proficient in these
              practices and technologies is essential for anyone aspiring to be
              a successful web developer.
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
            <h2>The Basics of HTML</h2>
            <p>
              HTML, or HyperText Markup Language, is the foundational building
              block of web development. It provides the structural framework for
              web pages by using various elements, commonly referred to as
              &quot;tags,&quot; to organize and format content. These tags define
              different types of content, such as paragraphs, headings, lists,
              images, and links. When you visit a website, your web browser
              interprets the HTML code to render the page&apos;s layout and content.
              HTML is not a programming language, but a markup language, as it
              doesn&apos;t contain logic or functions. It simply describes the
              structure of a web page.
            </p>

            <p>
              While HTML has evolved over the years, its core principles remain
              largely the same. A typical HTML document starts with a &quot;DOCTYPE&quot;
              declaration, followed by an opening <code>{"<html>"}</code> tag
              and closing <code>{"</html>"}</code> tag. Inside these, you&apos;ll
              find the <code>{"<head>"}</code> section, which can include
              metadata and links to external resources like CSS or JavaScript
              files, and the <code>{"<body>"}</code> section, where the main
              content of the page resides. To create a well-structured HTML
              page, it&apos;s important to use semantic elements like{" "}
              <code>{"<header>"}</code>, <code>{"<footer>"}</code>,{" "}
              <code>{"<article>"}</code>, and <code>{"<section>"}</code>, which
              not only make it easier for developers to understand the code but
              also enhance the page&apos;s accessibility and SEO performance.
            </p>
          </div>
          <div className={styles["media-content"]}>
            <h3>Example code</h3>
            <p>
              The code shows what a basic HTML document structure can look like.{" "}
              <i>
                You can copy, clicking: <CgCopy />, and save this in a notepad
                with the extension <strong>.html</strong> it will open in your
                browser!
              </i>
            </p>
            <CodeBlock
              language="html"
              code={dedent(`<!DOCTYPE html> <!--signifies the file type-->
              <html lang="en"> <!--html tag wraps around the content, specifying english language-->
              <head>
                <meta charset="UTF-8"> <!--A meta tag stating the character encoding-->
                <title>Document</title> <!--The title, this would show in things like the browser tab-->
              </head>

              <body> <!--The body where all page content will go, you can't put page content outside the body-->
                <header>
                  <h1>My first HTML Doc</h1> <!--A header tag, largest of the headers, will be the biggest text-->
                </header>

                <section>
                  <h2>Hello world</h2> <!--A header tag, second largest of the headers-->
                  <p>This is a test page</p> <!--Standard paragraph text-->
                </section>

                <footer>
                  <a href="https://www.tiktok.com/@unisinesocial">Check out tiktok</a> <!--'a' tag, A way to add clickable links.-->
                </footer>
              </body>
              </html>`)}
            />
          </div>
        </div>
      ) : props.currentSection == 2 ? (
        <div style={{ flexDirection: "column" }}>
          <div className={styles["text-content-opposite"]}>
            <div>
              <h2>HTML coding practice</h2>
              <p>
                Using the code editor, produce a replica of the document below,
                when all elements are included, this content will be marked as
                passed.
              </p>
              <p>
                Include all text and predict the elements used to create each
                element.
              </p>
              <p>
                <i>
                  Tip: You can use inspect element in the browsers dev tools to
                  help
                </i>
              </p>
            </div>
            <div className={styles["html-preview"]}>
              <iframe
                srcDoc={codeSnippets.s2.code}
                title="HTML preview"
                frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <CodeEditor onCodeChange={handleCodeChange} />
          </div>
          <PercentIcon {...{ percent: percentage, text: "Matched HTML" }} />
        </div>
      ) : props.currentSection == 3 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Further HTML</h2>
            <p>
              As you dive deeper into HTML, you&apos;ll encounter more advanced
              features that offer greater control over how your web page behaves
              and how it is interpreted by search engines and browsers. Meta
              tags, for instance, are placed within the <code>{"<head>"}</code>{" "}
              section of your HTML document and are not displayed on the actual
              web page. These tags provide metadata about your web page, such as
              its author, description, and keywords. For example, the{" "}
              <code>{`<meta name="description" content="Your description here">`}</code>{" "}
              tag is crucial for SEO, as search engines use this description
              when displaying your site in search results.
            </p>
            <p>
              Another advanced aspect of HTML is incorporating media, which can
              be done through local or external link references. When you
              reference media files like images, audio, or videos, you can
              either point to an external URL or source them from your local
              directory. For external linking, you might use an absolute URL in
              the src attribute of an HTML tag like <code>{`<img>`}</code> or{" "}
              <code>{`<audio>`}</code>. For example,{" "}
              <code>{`<img src="https://www.example.com/image.jpg">`}</code>{" "}
              will display an image from an external source. To use local files,
              you would specify a relative path in the src attribute, such as{" "}
              <code>{`<img src="images/my-image.jpg">`}</code>, assuming the
              image is in a folder named &quot;images&quot; within the same directory as
              your HTML file. Understanding the nuances of media sourcing can
              greatly enhance your web development projects, allowing you to
              create richer, more engaging user experiences.
            </p>
          </div>
          <div className={styles["media-content"]}>
            <h3>Example code</h3>
            <p>
              The code shows how to use meta tags and media in html.{" "}
              <i>
                You can copy, clicking: <CgCopy />, and save this in a notepad
                with the extension <strong>.html</strong> it will open in your
                browser!
              </i>
            </p>
            <CodeBlock
              language="html"
              code={dedent(`
              <html lang="en">
              <head>
                <!--Metadata will not be displayed on the page-->
                <meta charset="UTF-8">
                <meta name="description" content="HTML Guide">
                <meta name="keywords" content="HTML, WebDev">
                <meta name="author" content="Patrick">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">  
                <title>Document</title> 
              </head>
              <body>
                  <header>
                      <!--accessing local image-->
                      <img width="50px" src="/static/logo.png" />
                      <h1>Title</h1> 
                  </header>
                  <section>
                      <h2>Subtitle</h2> 
                      <p>Content</p>
                  </section>
                  <footer>
                      <a href="https://www.tiktok.com/@unisinesocial">Check out tiktok</a>
                  </footer>
              </body>
              </html>`)}
            />
          </div>
        </div>
      ) : props.currentSection == 4 ? (
        <div style={{ flexDirection: "column" }}>
          <div className={styles["text-content-opposite"]}>
            <div>
              <h2>Further HTML coding practice</h2>
              <p>
                Using the code editor, code the specific image and meta tag
                elements
              </p>
              <p>
                Include all text and predict the elements used to create each
                element. Elements must be in order presented in the list.
              </p>
            </div>
            <div className={styles["code-snippets"]}>
              <ol>
                <li>
                  Create a <code>description</code> meta tag with the
                  description: <code>Web development made easy.</code>
                </li>
                <li>
                  Create a <code>keyowrds</code> meta tag with the following
                  keywords: <code>webdev</code>, <code>coding</code> and{" "}
                  <code>html</code>
                </li>
                <li>
                  Create an <code>author</code> meta tag with the following
                  author: <code>uni-sine</code>
                </li>
                <li>
                  Create an image element using the local source:{" "}
                  <code>/static/logo.png</code> size <code>50px</code>
                </li>
              </ol>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <CodeEditor
              preCode={{
                HTML: dedent(`<head>
                <!-- Add meta tags -->

              </head>
              <body>
                <!-- Add image tags -->

              </body>`),
                JS: "",
                CSS: "",
              }}
              onCodeChange={handleCodeChange}
            />
          </div>
          <PercentIcon {...{ percent: percentage, text: "Matched HTML" }} />
        </div>
      ) : props.currentSection == 5 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Basics of CSS</h2>
            <p>CSS, short for Cascading Style Sheets, uses a specific syntax to apply styles to HTML elements on a webpage. A basic CSS rule consists of a selector and a declaration block. The selector targets an HTML element, and the declaration block contains one or more declarations that specify how the element should be styled. For instance, to set the text color of all paragraphs to blue, you would write <code>{`p { color: blue; }`}</code>. Here, <code>p</code> is the selector that targets all paragraph elements, and color: blue; is the declaration. The property is <code>{`color`}</code>, and its value is <code>{`blue`}</code>. This rule must be placed inside a <code>{`<style>`}</code> tag in the HTML document&apos;s <code>{`<head>`}</code> section, or in an external CSS file linked to the HTML file.</p>
            <p>A CSS file does not need any configuration to start with and you can start selecting elements straight away. The syntax is quite simple, all styles need to have the type of styling you want to edit followed by the value and then end with a semicolon. Built in elements can be selected using their standard attribute as mentioned above such as <code>div</code>, <code>body</code>, <code>p</code>, <code>li</code> etc. You can also select classnames and ID&apos;s. You may only want one paragraph or element type to be styled a specific way which is where classnames and ID&apos;s come in. A classname can be selected using dot notation, for example, <code>{`.my-class { color: “#fff”; }`}</code> and ID&apos;s use # notation, for example, <code>{`#my-element { color: “#fff”; }`}</code>. The reason you may use classes over ID&apos;s is that you can apply classnames to multiple elements but ID&apos;s can only be applied to one element.</p>
            <p>Understanding the CSS box model is crucial for effective web design. The box model describes how the layout of each HTML element is controlled by a box that includes the content, padding, border, and margin. For example, if you have a <code>{`div`}</code> element and you want to set its internal padding to 10 pixels and its border to a 2-pixel solid line, you would write: <code>{`div { padding: 10px; border: 2px solid; }`}</code>. The padding and border properties specify the space between the content and the border, and the border itself, respectively. Similarly, the <code>{`margin`}</code> property controls the space outside the border, separating it from other elements. For example, <code>{`div { margin: 20px; }`}</code> would set a 20-pixel margin around the <code>div</code>. Grasping these fundamental concepts will empower you to create complex layouts and visually engaging web designs.</p>
          </div>
          <div className={styles["media-content"]}>
            <h3>Example code</h3>
            <p>
              The code shows a basic CSS file for modifying standard HTML elements. Applying to any HTML document would apply the styles.
            </p>
            <CodeBlock
              language="css"
              code={dedent(`body {
                padding: 20px;
                margin: 10px 0;
              }
              p {
                color: #fff;
                font-size: 1.1em;
              }
              h1 {
                text-decoration: underline;
                color: grey;
              }
              .my-class {
                border: 1px solid black;
              }`)}
            />
            <h3>Box Model</h3>
            <img src="/static/courses/webdev/box_model.png" />
          </div>
        </div>
      ) : props.currentSection == 6 ? (
        <div style={{ flexDirection: "column" }}>
          <div className={styles["text-content-opposite"]}>
            <div>
              <h2>CSS coding practice</h2>
              <p>
                Using the code editor, attempt to style the existing html by selecting the <code>CSS</code> button and coding there, matching against the example.
              </p>
              <p>
                Take note of classnames and ID&apos;s and style appropriately. If you are uncertain of a specific value, use the browsers devtools and inspect the CSS.
              </p>
            </div>
            <div className={styles["html-preview"]}>
              <iframe
                srcDoc={`
                <head>
                  <style>
                    ${codeSnippets.s6.code}
                  </style>
                </head>
                <body>
                <h1>Title is blue</h1>
                <p>The document has 20 pixels in margin, all paragraphs are 1.1x bigger than normal!</p>
                <p class="grey-text">This paragraph is grey</p>
                <p class="underlined-text">This paragraph is underlined</p>
              </body>`}
                title="HTML preview"
                frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <CodeEditor
              preCode={{
                HTML: dedent(`
                <body>
                  <h1>Title is blue</h1>
                  <p>The document has 20 pixels in margin, all paragraphs are 1.1x bigger than normal!</p>
                  <p class="grey-text">This paragraph is grey</p>
                  <p class="underlined-text">This paragraph is underlined</p>
                </body>`),
                JS: "",
                CSS: "",
              }}
              onCodeChange={handleCodeChange}
            />
          </div>
          <PercentIcon {...{ percent: percentage, text: "Matched CSS" }} />
        </div>
      ) : props.currentSection == 7 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Further CSS</h2>
            <p>
            As you venture further into CSS, you&apos;ll discover more advanced features that provide enhanced control over your web designs. One such feature is pseudo-elements, which allow you to style specific parts of an HTML element. Using double colons <code>::</code>, you can target sub-elements like the first letter or first line of a text block. For example, to make the first letter of a paragraph larger and bold, you&apos;d use <code>{`p::first-letter { font-size: 2em; font-weight: bold; }`}</code>. These pseudo-elements open up many possibilities for intricate design details without altering the HTML structure.
            </p>
            <p>
            Another advanced aspect of CSS is the use of calculations within your styles. The <code>{`calc()`}</code> function lets you perform mathematical operations, combining multiple units together. This is particularly useful for responsive designs where you may want an element to be a specific percentage width, minus a fixed number of pixels for padding. For example, <code>{`width: calc(100% - 20px);`}</code> would set the width of an element to be 100% of its container&apos;s width, minus 20 pixels. Calculations provide greater flexibility and can solve complex layout issues that would be cumbersome to tackle otherwise.
            </p>
            <p>
            Finally, it&apos;s important to consider browser compatibility when working with advanced CSS features. Not all browsers interpret CSS in the same way, and some may not support certain properties or values. Tools like &quot;Can I use&quot; offer compatibility tables for CSS properties, and you can also use vendor prefixes like <code>-webkit-</code> or <code>-moz-</code> to ensure that your styles are interpreted correctly across different web browsers. For instance, to use a CSS property that is not yet standardized, you might write <code>{`-webkit-transform: rotate(30deg); transform: rotate(30deg);`}</code> to make sure it works in both WebKit-based browsers like Safari and Chrome, as well as in other browsers that follow the standard specification. Keeping an eye on compatibility helps ensure a consistent and accessible user experience.
            </p>
          </div>
          <div className={styles["media-content"]}>
          <h3>Example code</h3>
            <p>
              The code shows how to use meta tags and media in html.{" "}
              <i>
                You can copy, clicking: <CgCopy />, and save this in a notepad
                with the extension <strong>.html</strong> it will open in your
                browser!
              </i>
            </p>
          <CodeBlock
              language="css"
              code={dedent(`p:hover {
                background-color: yellow;
              }
              
              p::first-letter {
                font-size: 40px
              }
              
              body {
                margin: calc(2em - 10px);
              }
              
              button {
                appearance: none;
                -webkit-appearance: none;
              }`)}
            />
          </div>
        </div>
      ) : props.currentSection == 8 ? (
        <div style={{ flexDirection: "column" }}>
          <div className={styles["text-content-opposite"]}>
            <div>
              <h2>Further CSS coding practice</h2>
              <p>
                Using the code editor, attempt to style the existing html by selecting the <code>CSS</code> button and coding there, matching against the example.
              </p>
              <p>
                Take note of classnames and ID&apos;s and style appropriately. If you are uncertain of a specific value, use the browsers devtools and inspect the CSS.
              </p>
            </div>
            <div className={styles["html-preview"]}>
              <iframe
                srcDoc={`
                <head>
                  <style>
                    ${codeSnippets.s8.code}
                  </style>
                </head>
                <body>
                  <h1 class="large-first-char">First letter is 2x the original size</h1>
                  <a href="https://uni-sine.com" id="uni-sine-link">Uni-sine: hover me</a>
                  <p>Orange text!</p>
                  <p>Remember you can inspect all elements on this page using browser dev tools.</p>
                </body>`}
                title="HTML preview"
                frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <CodeEditor
              preCode={{
                HTML: dedent(`
                <body>
                  <h1 class="large-first-char">First letter is 2x the original size</h1>
                  <a href="https://uni-sine.com" id="uni-sine-link">Uni-sine: hover me</a>
                  <p>Orange text!</p>
                  <p>Remember you can inspect all elements on this page using browser dev tools.</p>
                </body>`),
                JS: "",
                CSS: "",
              }}
              onCodeChange={handleCodeChange}
            />
          </div>
          <PercentIcon {...{ percent: percentage, text: "Matched CSS" }} />
        </div>
      ) : props.currentSection == 9 ? (
        <div>

          <div className={styles["text-content"]}>
            <h2>Basics of JavaScript in Web Development</h2>
            <p>
            JavaScript is an essential language in the realm of web development, adding interactivity, complexity, and dynamic behavior to the static HTML and CSS-based web pages. Originally designed to run in the browser, JavaScript has now expanded its reach to server-side development, mobile apps, and more. In the context of web development, one of its most powerful features is the ability to manipulate the Document Object Model (DOM). The DOM represents the structure of an HTML document as a tree of nodes, and JavaScript can modify, add, or delete these nodes in real-time. For example, to change the text of a paragraph element with the ID &quot;myParagraph,&quot; you would write <code>{`document.getElementById("myParagraph").textContent = "New Text";`}</code>.
            </p>
            <p>
            Another major utility of JavaScript is the ability to conditionally display content based on user interaction or other factors. This dynamic behavior is crucial for creating interactive and responsive web applications. For instance, you can set up an event listener on a button that, when clicked, reveals a hidden section of the page. The code to accomplish this could look like the code in the example.
            </p>
            <CodeBlock

              language="javascript"
              code={dedent(`document.getElementById("myButton").addEventListener("click", function() {
                var x = document.getElementById("mySection");
                if (x.style.display === "none") {
                  x.style.display = "block";
                } else {
                  x.style.display = "none";
                }
              });`)}
            />
            <p>
            In this example, the <code>{`addEventListener`}</code> method listens for a click event on a button with the ID &quot;myButton.&quot; When the button is clicked, the code checks the display status of an element with the ID &quot;mySection&quot; and toggles its visibility. This ability to change content conditionally based on user interaction or other criteria is one of the key strengths of JavaScript, enabling richer and more engaging web experiences.
            </p>
          </div>
        </div>
      ) : props.currentSection == 10 ? (
        <div style={{ flexDirection: "column" }}>
          <div className={styles["text-content-opposite"]}>
            <div>
              <h2>JS Coding practice</h2>
              <p>
                Using the code editor, manipulate the DOM so that the paragraph text with ID <code>my-text</code> is changed to <code>{`hello world`}</code> using JavaScript by selecting the <code>JS</code> button.
              </p>
              <p>
                Hint: <i>The property to select text content on an element is <code>textContent</code></i>
              </p>
            </div>

          </div>
          <div style={{ width: "100%" }}>
            <CodeEditor
              preCode={{
                HTML: dedent(`
                <body>
                  <h1>JavaScript</h1>
                  <p id="my-text">Text to change</p>
                </body>`),
                JS: "",
                CSS: "",
              }}
              onCodeChange={handleCodeChange}
            />
          </div>
          <PercentIcon {...{ percent: percentage, text: "Matched JS" }} />
        </div>
      ) : props.currentSection == 11 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>
              Advanced: website hosting
            </h2>
            <p>
            Website hosting refers to the service that stores and serves your website&apos;s files to users over the Internet. In simpler terms, hosting makes your website accessible to the world. When someone types in your web address or clicks on a link that leads to your site, they are actually connecting to a server where your website is hosted. These servers are high-powered computers that store the various files and databases required for your website to function, including HTML, CSS, JavaScript files, images, and more. Without hosting, you can&apos;t have a live website.
            </p>
            <p>
            There are various types of hosting solutions, each offering different levels of control, performance, and scalability. Here are some of the most common ones:
            </p>
            <ul>
              <li>
              <strong>Shared Hosting:</strong> This is the most basic and cost-effective option, suitable for small websites or personal blogs. Multiple websites share the resources of a single server, making it less expensive but also less powerful.
              </li>
              <li>
              <strong>Virtual Private Server (VPS) Hosting:</strong> A step up from shared hosting, VPS provides a virtualized environment where you have more control over your server&apos;s configuration. This is often used for medium-sized businesses or websites that require more resources.
              </li>
              <li>
              <strong>Dedicated Hosting:</strong> This option gives you an entire server to yourself, providing maximum control and performance but at a higher cost. It&apos;s suitable for large businesses or high-traffic websites.
              </li>
              <li>
              <strong>Cloud Hosting:</strong> A more modern approach, cloud hosting offers high scalability by using multiple servers to balance the load and maximize uptime. It&apos;s suitable for websites with fluctuating traffic patterns.
              </li>
              <li>
              <strong>Managed WordPress Hosting:</strong> Specifically for WordPress sites, this hosting solution takes care of all the technical aspects, like security, speed, and updates, so you can focus solely on creating content.
              </li>
            </ul>
          </div>
          <div className={styles["media-content"]}></div>
        </div>
      ) : props.currentSection == 12 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>
          Advanced: Databases
            </h2>
            <p>
            In the context of web development, a database is a structured collection of data that can be easily accessed, managed, and updated. Databases serve as the backbone for storing and retrieving information for web applications, be it user profiles, product catalogs, or transaction history. They are essential for creating dynamic, data-driven websites and applications. Databases usually work in tandem with a server-side language like PHP, Python, or Node.js to interact with the front-end, which is what the end-users interact with. The server-side code queries the database and returns the required information, which is then rendered on the website through HTML and CSS.
            </p>
            <p>
            There are a variety of database solutions tailored for different needs, but SQL (Structured Query Language) databases like MySQL, PostgreSQL, and SQLite, and NoSQL databases like MongoDB are among the most common. SQL databases are known for their robustness and are generally used in applications that require complex queries and transactions. In contrast, NoSQL databases like MongoDB are more flexible and scalable, often used in real-time applications and big data solutions.
            </p>
            <p>
            Integrating a database into a website generally involves a few key steps. First, the database is set up on a server, either on the same server as the website or on a separate dedicated database server. The server-side code then connects to this database using connection strings or environment variables to ensure security. Once the connection is established, the server-side code can perform CRUD (Create, Read, Update, Delete) operations to interact with the database. For example, when a user submits a form on a website, a server-side script may be triggered that inserts the form data into a database table. Likewise, when a user logs in, another script might query the database to check for matching credentials. Understanding how to work with databases is crucial for any web developer aiming to build scalable and dynamic web applications.
            </p>
          </div>
          <div className={styles["media-content"]}></div>
        </div>
      ) : props.currentSection == 13 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Advanced: Web stacks</h2>
            <p>
            A web stack refers to the collection of technologies, software, and tools used together to build and run a web application. These can include programming languages, frameworks, libraries, server software, database management systems, and more. The term &quot;stack&quot; implies that these components are layered on top of each other, each serving a specific function in the web development process. For example, a common LAMP stack consists of Linux (operating system), Apache (web server), MySQL (database), and PHP (programming language). Each layer interacts with the ones above and below it to create a cohesive environment for web development.
            </p>
            <p>
            There are several well-known web stacks that are widely adopted in the industry. The aforementioned LAMP stack is traditional but still popular. The MEAN stack consists of MongoDB (database), Express.js (back-end framework), Angular.js (front-end framework), and Node.js (runtime environment). Another example is the MERN stack, which substitutes React.js for Angular.js. Newer stacks continue to emerge as technology evolves, like the Jamstack, which focuses on client-side rendering and API usage.
            </p>
            <p>
            So why do websites need so many integrated software solutions? The reason lies in the complexity and demands of modern web development. Each component of a stack serves a specialized purpose:
            </p>
            <ul>
              <li>
              <strong>Operating Systems and Servers:</strong> These create the environment to host your web application.
              </li>
              <li>
              <strong>Programming Languages and Frameworks:</strong> These provide the necessary tools to build the logic and structure of your website.
              </li>
              <li>
              <strong>Databases:</strong> These store your application&apos;s data for dynamic content delivery.
              </li>
              <li>
              <strong>Front-end Libraries:</strong> These aid in building the user interface and user experience.
              </li>
            </ul>
            <p>
            By integrating these specialized tools, developers can build applications that are more robust, scalable, secure, and feature-rich. Each layer can be optimized for its specific function, ensuring that the web application as a whole is more efficient and effective. Understanding your stack&apos;s components and how they interact is crucial for successful web development.
            </p>
          </div>
          <div className={styles["media-content"]}></div>
        </div>
      ) : props.currentSection == 14 ? (
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
          <div className={styles["media-content"]}></div>
        </div>
      ) : props.currentSection == 15 ? (
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
                        userCourseData && userCourseData.questionsCompleted?.length > 0 ? userCourseData.questionsCompleted.map((e, i) => (
                          <div  key={i}> 
                            {e.isCorrect ? <BsFillCheckCircleFill color="#50C878" size={'2em'} /> : <BsFillXCircleFill color="#FF5733" size={'2em'} />}
                          </div>  
                        )) : <div>Not completed</div>
                      }
                    </div>
                  </div>
                  <div>
                    <h3>Average coding completion score</h3>
                    <div className={styles['review-percent-container']}>
                      <PercentIcon {...{ percent: (userCourseData.codeMatchPercent.reduce((acc, obj) => acc + Number(obj.percent), 0) / userCourseData.codeMatchPercent.length) || 0, text: "Matched code" }} />
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

export default WebDevCourse;
