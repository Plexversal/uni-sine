import React, { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab  } from "@codemirror/commands";
import { basicSetup } from 'codemirror'
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import styles from '../../styles/CodeBlock.module.css'
export default function CodeEditor({ onCodeChange, preCode }) {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
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

    const language =
      activeEditor === "HTML"
        ? xml()
        : activeEditor === "JS"
        ? javascript()
        : css();
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

  return (
    <div className={styles["editor-container"]}>
      <div className={styles["editor-user-input"]}>
        <div className={styles["editor-selection-wrapper"]}>
          <button
            className={activeEditor === "HTML" ? styles["active-editor"] : ""}
            onClick={() => setActiveEditor("HTML")}
          >
            HTML
          </button>

          <button
            className={activeEditor === "CSS" ? styles["active-editor"] : ""}
            onClick={() => setActiveEditor("CSS")}
          >
            CSS
          </button>
          <button
            className={activeEditor === "JS" ? styles["active-editor"] : ""}
            onClick={() => setActiveEditor("JS")}
          >
            JS
          </button>
        </div>

        <div className={styles["code-editor"]} ref={editorRef}></div>
      </div>
      <div className={styles['code-preview-wrapper']}>
      <iframe
        srcDoc={srcDoc}
        title="Preview"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
      </div>
    </div>
  );
}
