import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Ai.module.css';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { useChat } from 'ai/react'

export default function AiChat(props) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userChat, setUserChat] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const chatContainerRef = useRef(null); 
  const [selectedText, setSelectedText] = useState('');


  const { input, handleInputChange, handleSubmit, isLoading, messages, setInput, append, setMessages } = useChat({
    onResponse: (res) => {
      if (!res.ok) {
        // Handle error response
        res.json().then(errorData => {
          const errorMessage = errorData.message || "An error occurred";
          // Append the error message to the chat
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
  };

  const handleTextSelection = () => {
    const text = window.getSelection().toString();
    if (text && isChatOpen) {
      setSelectedText(text);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid newline in textarea
      customSubmitHandler(e);
    }
  };

  const customSubmitHandler = async (e) => {
    e.preventDefault();
    setInput('');  // Reset the input after successful submission
    setSelectedText('');  // Reset selected text after submission
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
      <button
        className={styles["ai-chat-icon"]}
        onClick={toggleChat}
        title="Ask AI"
      >
        <GiArtificialIntelligence size={"30px"} />
      </button>

      <div
        className={`${styles["ai-chat-container"]} ${
          isChatOpen ? styles["ai-chat-container-active"] : ""
        }`}
        ref={chatContainerRef}
      >
        <div className={styles["ai-response"]}>
          <div className={styles["top-menu"]}>
            <h4>Ai Chat</h4>
            <button onClick={() => setMessages([])}>Clear Chat</button>
          </div>
          {chatHistory.length <= 0 && 
          <span style={{color: 'grey'}}><i>Tip: You can highlight text on the page to add additional context</i></span>
        }
      {messages.map((entry, index) => (
        <div 
          className={entry.role === 'assistant' ? styles['ai-chat'] : styles['user-chat']} 
          key={entry.id + index}
          style={{ whiteSpace: 'pre-wrap' }} // CSS to preserve whitespace and line breaks
        >
          {entry.content}
        </div>
      ))}
        </div>
        <div className={styles["user-input"]}>
          {selectedText && (
            <div className={styles["highlight-context"]}>
              <button className={styles['close']} onClick={() => setSelectedText("")}>X</button>

              <p>{selectedText}</p>
            </div>
          )}
        <form onSubmit={customSubmitHandler}> {/* Just prevent default form submission */}
          <textarea
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={input}
            id="user-input"
            disabled={isLoading}
            placeholder="Ask AI for help."
            maxLength={3600}
          />
        <input type='submit' value="Submit"/>
            
        </form>
        </div>
      </div>
    </>
  );
}
