import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Ai.module.css';
import { GiArtificialIntelligence } from 'react-icons/gi';

export default function AiChat(props) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userChat, setUserChat] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const chatContainerRef = useRef(null); 
  const [selectedText, setSelectedText] = useState('');



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


  const processUserInput = async () => {
    if (!userChat.trim()) {
        console.log("User chat is empty");
        return;
    }

    setIsRequesting(true);
    setChatHistory(chatHistory => [...chatHistory, { type: 'user', text: userChat }]);


    const openAiChatHistory = [
      { role: "system", content: "You are a chat assistant helping users with math and science questions. Users can provide you with additional context to explain by highlighting content on the page, so if you think context is missing feel free to remind them of this." },
      ...chatHistory.map(entry => ({
          role: entry.type === 'user' ? 'user' : 'assistant',
          content: entry.text
      }))
  ];
    try {
      const response = await fetch('/api/ai/getAiChatResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            chat: userChat,
            history: openAiChatHistory,
            context: selectedText
        })
    });
        const reader = response.body.getReader();
        let isStreaming = true;

        while (isStreaming) {
            const { done, value } = await reader.read();
            if (done) {
                isStreaming = false;
            } else {
                const textChunk = new TextDecoder("utf-8").decode(value);
                const dataChunks = textChunk.split('\n');
                
                for (const dataChunk of dataChunks) {

                  if (response.status === 401) {
                    const premiumMessage = "You need premium to use this feature. Click Account on the sidebar to subscribe.";
                    setChatHistory(chatHistory => [...chatHistory, { type: 'ai', text: premiumMessage }]);
                } else if(response.status === 413) {
                  const premiumMessage = "Your message and context exceed what can be processed, try a summarising your question or select a smaller context.";
                  setChatHistory(chatHistory => [...chatHistory, { type: 'ai', text: premiumMessage }]);
                } 
                else {
                      const trimmedChunk = dataChunk.startsWith('data: ') ? dataChunk.substring(6).trim() : dataChunk.trim();
                      if(trimmedChunk == '[DONE]') return
                        if (trimmedChunk) { 
                            try {
                                const jsonChunk = JSON.parse(trimmedChunk);
                                const content = jsonChunk.choices ? jsonChunk.choices[0]?.delta?.content : null;
                                if (content) {
                                    updateChatHistoryWithChunk(content);
                                }

                                if (jsonChunk.endOfChat) {
                                    setChatHistory(chatHistory => [...chatHistory, { type: 'ai', text: jsonChunk.message }]);
                                    return; 
                                }
                            } catch (error) {
                                console.error('Error parsing JSON chunk:', error);
                            }
                        }
                      }
                }
            }
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
    } finally {
        setIsRequesting(false);
        setUserChat('');
    }
};

const updateChatHistoryWithChunk = (newChunk) => {
  setChatHistory(prevChatHistory => {
      const lastEntry = prevChatHistory[prevChatHistory.length - 1];

      if (lastEntry && lastEntry.type === 'ai') {
          return prevChatHistory.slice(0, -1).concat({
              ...lastEntry,
              text: lastEntry.text + newChunk
          });
      } else {
          return prevChatHistory.concat({ type: 'ai', text: newChunk });
      }
  });
};



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isRequesting) {
      e.preventDefault();
      processUserInput();
      setUserChat('');
      setSelectedText('')
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
            <button onClick={() => setChatHistory([])}>Clear Chat</button>
          </div>
          {chatHistory.length <= 0 && 
          <span style={{color: 'grey'}}><i>Tip: You can highlight text on the page to add additional context</i></span>
        }
          {chatHistory.map((entry, index) => (
            <p
              key={index}
              className={
                entry.type === "user" ? styles["user-chat"] : styles["ai-chat"]
              }
            >
              {entry.text}
            </p>
          ))}
        </div>
        <div className={styles["user-input"]}>
          {selectedText && (
            <div className={styles["highlight-context"]}>
              <button className={styles['close']} onClick={() => setSelectedText("")}>X</button>

              <p>{selectedText}</p>
            </div>
          )}
          <textarea
            onChange={(e) => setUserChat(e.target.value)}
            value={userChat}
            onKeyPress={handleKeyPress}
            id="user-input"
            disabled={isRequesting}
            placeholder="Ask AI for help."
            maxLength={3600}
          />
        </div>
      </div>
    </>
  );
}
