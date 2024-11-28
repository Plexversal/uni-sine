import React, { useState } from "react";
import DynamicSyntaxHighlighter from "../page-construction/DynamicSyntaxHighlighter";
import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';
import copy from "copy-to-clipboard";
import styles from '../../styles/CodeBlock.module.css'
import { CgCopy } from 'react-icons/cg'
import { BsCheck2 } from 'react-icons/bs'
import { FaRegCopy, FaRegCheckSquare } from "react-icons/fa";
const CodeBlock = ({ code, language = "cpp", showCopy = true }) => {
  const [copyStatus, setCopyStatus] = useState(<FaRegCopy size={20} />);

  const handleCopyClick = () => {
    copy(code);
    setCopyStatus(<><FaRegCheckSquare color="#b2f7b6" size={20} /></>);
    setTimeout(() => setCopyStatus(<FaRegCopy size={20} />), 1500);
  };

  return (
    <div className={styles["code-block-container"]}>
      {showCopy && (
        <div className={styles["copy-btn"]} onClick={handleCopyClick}>
          {copyStatus}
        </div>
      )}
      <DynamicSyntaxHighlighter
        showLineNumbers={false}
        language={language}
        style={vs2015}
      >
        {code}
      </DynamicSyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;