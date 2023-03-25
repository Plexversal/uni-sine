// DynamicSyntaxHighlighter.js
import React from "react";
import dynamic from "next/dynamic";

const DynamicSyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Light),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

export default DynamicSyntaxHighlighter;