import React, { useState } from "react";
import DynamicSyntaxHighlighter from "../page-construction/DynamicSyntaxHighlighter";
import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';
import copy from "copy-to-clipboard";
import styles from '../../styles/CodeBlock.module.css'
const CodeBlock = ({ code, language = "cpp" }) => {
  const [copyStatus, setCopyStatus] = useState("Copy");

  const handleCopyClick = () => {
    copy(code);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus("Copy"), 1500);
  };

  const codeBlockStyle = {
    backgroundColor: "#1e1e1e",
    paddingLeft: "1rem",
    borderRadius: "5px",
    position: "relative",
    fontSize: "1.1em"
  };

  const copyButtonStyle = {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    backgroundColor: "#333",
    color: "white",
    borderRadius: "3px",
    padding: "0.25rem 0.5rem",
    cursor: "pointer",
    fontSize: "0.9em"
  };

  return (
    <div style={codeBlockStyle}>
      <div style={copyButtonStyle} onClick={handleCopyClick}>
        {copyStatus}
      </div>
      <DynamicSyntaxHighlighter language={language} style={vs2015}>
        {code}
      </DynamicSyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;