import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { basicSetup } from 'codemirror';
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeExecutionWorker  from '../../workers/codeExecution.worker'
import styles from '../../styles/CodeBlock.module.css';

const CodeEditor = forwardRef((props, ref) => {
  const { onCodeChange, preCode, hidePreview, initialView, hideOptions, executable } = props;
  const editorRef = useRef(null);
  const workerRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [output, setOutput] = useState([]);
  const [activeEditor, setActiveEditor] = useState("HTML");
  const [srcDoc, setSrcDoc] = useState("");
  const [code, setCode] = useState({
    HTML: preCode?.HTML || "",
    JS: preCode?.JS || "",
    CSS: preCode?.CSS || "",
  });


  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code);
    }
  }, [code, onCodeChange]);

  useEffect(() => {
    if (initialView !== "HTML" && initialView !== "JS" && initialView !== "CSS") {
      return;
    }
    setActiveEditor(initialView);
  }, [initialView]); 

  useEffect(() => {
    const delayCodeChange = setTimeout(() => {
      setSrcDoc(`<!DOCTYPE html>
        <html>
        <head>
          <style>${code.CSS}</style>
        </head>
        <body>
          ${code.HTML}
          <script>${code.JS}</script>
        </body>
        </html>`);
    }, 300);

    return () => clearTimeout(delayCodeChange);
  }, [code]);

  useEffect(() => {
    if (editor) {
      editor.destroy();
    }

    const language = activeEditor === "HTML" ? xml() : activeEditor === "JS" ? javascript() : css();
    const doc = code[activeEditor];

    const updateListener = EditorView.updateListener.of((v) => {
      setCode({
        ...code,
        [activeEditor]: v.state.doc.toString(),
      });
    });

    const startState = EditorState.create({
      doc: doc,
      extensions: [
        basicSetup,
        keymap.of([...defaultKeymap, indentWithTab]),
        oneDark,
        language,
        updateListener,
      ],
    });

    const newEditor = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    setEditor(newEditor);

    return () => {
      newEditor.destroy();
    };
  }, [activeEditor]);


  const executeCode = () => {
    return new Promise((resolve, reject) => {
      const codeToExecute = code.JS;
  
      if (workerRef.current) {
        workerRef.current.terminate(); // Terminate any existing worker before creating a new one
      }
  
      workerRef.current = new CodeExecutionWorker();
  
      workerRef.current.postMessage({ code: codeToExecute });
  
      workerRef.current.onmessage = (event) => {
        const executionResults = event.data;
  
        // Display results in the console log div
        const consoleLogDiv = document.querySelector(`.${styles["console-log"]}`);
        executionResults.forEach((msg) => {
          const formattedMessage = `<span style="color: lightblue;">&gt;&gt;</span> ${msg}`;
          consoleLogDiv.innerHTML += `<p>${formattedMessage}</p>`;
        });
        consoleLogDiv.scrollTop = consoleLogDiv.scrollHeight; // Scroll the log div to the bottom
  
        setOutput(executionResults);
        resolve(executionResults); // Resolve the promise with the worker's output
      };
  
      workerRef.current.onerror = (error) => {
        reject(`Error: ${error.message}`); // Reject the promise if there's an error
      };
    });
  };
  
  
  // Expose state to the parent component through ref
  useImperativeHandle(ref, () => ({
    getCode: () => code,
    getOutput: async () => {
      const output = await executeCode(); // Wait for the worker to finish executing the code
      return output;
    }
  }));

  return (
    <div className={styles["editor-container"]}>
      <div className={styles["editor-user-input"]}>
        <div className={styles["editor-selection-wrapper"]}>
          {!hideOptions && (
            <div>
              <button className={activeEditor === "HTML" ? styles["active-editor"] : ""} onClick={() => setActiveEditor("HTML")}>HTML</button>
              <button className={activeEditor === "CSS" ? styles["active-editor"] : ""} onClick={() => setActiveEditor("CSS")}>CSS</button>
              <button className={activeEditor === "JS" ? styles["active-editor"] : ""} onClick={() => setActiveEditor("JS")}>JS</button>
            </div>
          )}
          {executable && <button className={styles['run-btn']} onClick={executeCode}>Execute</button>}
        </div>
        <div className={styles["code-editor"]} ref={editorRef}></div>
        {executable && <div className={styles["console-log"]}><span style={{color: 'lightblue'}}>&gt;&gt;</span></div>}
      </div>
      {!hidePreview && (
        <div className={styles["code-preview-wrapper"]}>
          <iframe
            srcDoc={srcDoc}
            title="Preview"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      )}
    </div>
  );
});
CodeEditor.displayName = "CodeEditor";
export default CodeEditor;
