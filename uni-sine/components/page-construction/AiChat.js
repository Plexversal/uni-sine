import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Ai.module.css';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { useChat } from 'ai/react'
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsArrowDownSquareFill } from "react-icons/bs";
import ReactMarkdown from 'react-markdown';
import MathJaxContent from "../page-construction/MathJaxContent";

export default function AiChat(props) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatContainerRef = useRef(null); 
  const [selectedText, setSelectedText] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Check localStorage to decide whether to show the speech bubble
    const bubbleShown = localStorage.getItem('bubbleShown');
    if (!bubbleShown) {
      setShowBubble(true); // Show bubble if not shown before
    }

    
  }, []);

  const { input, handleInputChange, handleSubmit, isLoading, messages, setInput, append, setMessages, stop } = useChat({
    onResponse: (res) => {
      if (!res.ok) {
        res.json().then(errorData => {
          const errorMessage = errorData.message || "An error occurred";
          const updatedMessages = [...messages, { role: 'system', content: errorMessage }];
          setMessages(updatedMessages);
        });
      }
    }
  });

  

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('keyup', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('keyup', handleTextSelection);
    };
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (showBubble) {
      setShowBubble(false); // Hide bubble on click
      localStorage.setItem('bubbleShown', 'true'); // Mark as shown in localStorage
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString();
  
    if (text && isChatOpen) {
      const selectedNode = selection.anchorNode; // Get the node where the selection starts
      const ignoreElement = document.getElementById("ai-container");
  
      // Check if the selectedNode is a descendant of the ignoreElement
      if (ignoreElement && !ignoreElement.contains(selectedNode)) {
        setSelectedText(text);
      } else {
        // Optionally clear the selectedText or take no action if the selection is within the ignoreElement
        // setSelectedText('');
      }
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      customSubmitHandler(e);
    }
  };

  const customSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(''); 
    setSelectedText('');  
    let combinedMessageContent = input;
    if (selectedText) {
      combinedMessageContent += "\n\nUser provided additional context: " + selectedText;
    }
  
    try {
      await append({ role: 'user', content: combinedMessageContent });

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      {showBubble && (
        <div className={styles["speech-bubble"]}>
          <span>Ask AI</span>{" "}
          <BsArrowDownSquareFill color="#a843fc99" size={"20"} />
        </div>
      )}

      <button
        className={styles["ai-chat-icon"]}
        onClick={toggleChat}
        title="Ask AI"
      >
        <GiArtificialIntelligence size={"30px"} />
      </button>

      <div
      id='ai-container'
        className={`${styles["ai-chat-container"]} ${
          isChatOpen ? styles["ai-chat-container-active"] : ""
        }`}
        ref={chatContainerRef}
      >
                  <div className={styles["top-menu"]}>
            <h4>Ai Chat</h4>
            <button
              className={styles["clear-chat"]}
              onClick={() => setMessages([])}
            >
              Clear Chat
            </button>
          </div>
        <div className={styles["ai-response"]}>

          {messages.length <= 0 && (
            <span style={{ color: "grey" }}>
              <i>
                Tip: You can highlight text on the page to add additional
                context
              </i>
            </span>
          )}
          {messages.map((entry, index) => (
            <div key={index + entry.content.substring(0, 3)} className={`${entry.role === "assistant"
            ? styles["ai-chat"]
            : styles["user-chat"]} ${styles['response-wrapper']}`}>
              <div
                key={entry.id + index}
              >
                <ReactMarkdown>{entry.content}</ReactMarkdown>
              </div>
              <span>{
                entry.role === "assistant"
                ? `AI · ${ new Date(). toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : `You · ${ new Date(). toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                }</span>
            </div>
          ))}
        </div>
        <div className={styles["user-input"]}>
          {selectedText && ( 
            <div className={styles["highlight-context"]}>
              <button
                className={styles["close"]}
                onClick={() => setSelectedText("")}
              >
                X
              </button>
              <p className={styles['context-title']}>Highlighted context</p>

              <p>{selectedText}</p>
            </div>
          )}
          <form className={styles["ai-text"]} onSubmit={customSubmitHandler}>
            {" "}

            <div>
              <textarea
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={input}
                id="user-input"
                disabled={isLoading}
                placeholder="Ask AI for help."
                maxLength={3600}
              />
              <button type="submit" className={styles["ai-submit"]}>
                <FaArrowAltCircleUp size={"15px"} color="white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
