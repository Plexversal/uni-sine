import React, { useState, useEffect, memo } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import styles from "../../styles/Admin.module.css";
import LoadingIcon from "../page-construction/LoadingIcon";
import PreviewAiQuestions from "./PreviewAiQuestions";
import CodeBlock from "../page-construction/CodeBlock";
import { trigMedia, graphMedia, compMedia } from "../../lib/mediaCreationLogic";
function ManageAi({ user }) {
  const [aiResponse, setAiResponse] = useState(null);
  const [mediaQuestions, setMediaQuestions] = useState({
    easy: [],
    medium: [],
    hard: []
  })
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [rerenderKey, setRerenderKey] = useState("")

  const schema = {
    easy: [],
    medium: [],
    hard: []
  }

  if (!user) return <div>Unauthorized</div>;
  if (!user?.app_metadata?.is_admin) return <div>Unauthorized</div>;

  const handleAIRequest = async (topic) => {
    setIsLoading(true);
    setTopic(topic);
    try {
      const request = await fetch(`/api/db/getAiQuestions?topic=${topic}`);
      const result = await request.json();

      if (request.status === 200 && result) {
        // try parsing

        if (result.error) console.log(result.error);
        if (result.parsed) {
          setAiResponse(result.chat);
          setSuccess(true);
        } else {
          try {
            let parsedData = await JSON.parse(result.chat);
            setAiResponse(parsedData);

            setSuccess(true);
            return;
          } catch (error) {
            console.error(error);
            setAiResponse({
              errorMessage: error.message,
              chatFailed: result.chat,
              error: error,
            });
            return;
          }
        }
      } else {
        const errorMessage = result.message || request.statusText;
        setAiResponse(errorMessage);
        return console.error(`Error ${request.status}: ${errorMessage}`);
      }
    } catch (error) {
      setAiResponse("Network error occurred");
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDbProcessing = async () => {
    setIsLoading(true);

    if (!date) return alert("Select a date before processing");

    try {
      if(mediaQuestions.easy.length > 0) {
        console.log(true)
        let mergedContent = Object.assign({}, aiResponse)
        Object.keys(mergedContent).forEach(key => {
          mergedContent[key] = [...aiResponse[key], ...mediaQuestions[key]]
        })
        const response = await fetch(
          "/api/db/postQuestionData?fullData=true",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...mergedContent,
              date,
              topic,
            }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          alert("Question processed successfully!");
          setMediaQuestions({
            easy: [],
            medium: [],
            hard: []
          })
          setAiResponse(null)
        } else {
          alert(result.error.message || "An error occurred.");
        }
      } else {
        const response = await fetch(
          "/api/db/postQuestionData?fullData=true",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...aiResponse,
              date,
              topic,
            }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          alert("Question processed successfully!");
        } else {
          alert(result.error.message || "An error occurred.");
        }
      }
    

    } catch (error) {
      console.log(error)
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleParseErrors = () => {
    if (aiResponse.error instanceof SyntaxError) {
      const correctedJsonString = aiResponse.chatFailed.replace(/\\/g, "\\\\");
      console.log(correctedJsonString);
      // Try parsing again
      try {
        const parsedData = JSON.parse(correctedJsonString);
        setAiResponse(parsedData);

        setSuccess(true);
      } catch (secondError) {
        setAiResponse({
          errorMessage: secondError.message,
          chatFailed: aiResponse.chatFailed,
          error: secondError,
        });
        console.error(
          "Failed to parse JSON even after adding extra backslashes",
          secondError
        );
      }
    } else {
      console.error(
        "An error other than SyntaxError occurred, so cannot parse"
      );
    }
  };

  const generateMediaQuestions = () => {
    setRerenderKey(Math.random())
    setMediaQuestions(schema)

    if(topic == 'math') {
      let trigdata = trigMedia()
      let graphdata = graphMedia()
      setMediaQuestions(prevState => ({
        ...prevState, 
        easy: [...prevState.easy, trigdata], 
        medium: [...prevState.easy, graphdata.medium], 
        hard: [...prevState.hard, graphdata.hard]
      }))
    } else if(topic == 'comp') {
      setMediaQuestions(prevState => ({
        ...prevState, 
        easy: [...prevState.easy, compMedia().easy], 
        medium: [...prevState.easy, compMedia().medium]
      }))
    }


  };

  return (
    <div className={styles["manage-ai-container"]}>
      {isLoading ? (
        <div>
          <LoadingIcon />
          <p>Generating questions, do not refresh this page. This may take a while...</p>
        </div>
      ) : (
        <div className={styles["ai-response-container"]}>
          <ul>
            <li>
              <button onClick={(e) => handleAIRequest("math")}>
                Generate Math Daily AI
              </button>
            </li>
            <li>
            <button onClick={(e) => handleAIRequest("physics")}>
                Generate Physics Daily AI
              </button>
            </li>
            <li>
            <button onClick={(e) => handleAIRequest("comp")}>
                Generate Comp Daily AI
              </button>
            </li>
          </ul>
          <>
            {aiResponse !== null ? (
              <>
                {success ? (
                  <>
                    <div className={styles["ai-options-wrapper"]}>
                      <h3>Successful Response received and parsed</h3>
                      <label>
                        Publish Date:
                        <input
                          type="date"
                          name="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </label>
                      <button onClick={generateMediaQuestions}>Generate media</button>
                      <button onClick={handleDbProcessing}>
                        Publish questions
                      </button>
                    </div>
                    <PreviewAiQuestions key={rerenderKey} {...{ questions: aiResponse }} />
                    
                    {
                      mediaQuestions.easy.length > 0 && 
                      <>
                       <PreviewAiQuestions key={rerenderKey} {...{ questions: mediaQuestions }} />
                        <button onClick={generateMediaQuestions}>Regenerate</button>
                        <CodeBlock
                      code={JSON.stringify(mediaQuestions, null, 4)}
                      language="json"
                    />
                    </>

                    }
                    <div className={styles['code-block-wrapper']}>
                    <CodeBlock
                      code={JSON.stringify(aiResponse, null, 4)}
                      language="json"
                    />
                    </div>
                  </>
                ) : (
                  <>
                    <h3>Response failed</h3>
                    <div>
                      {aiResponse && aiResponse.chatFailed ? (
                        <div className={styles["ai-options-wrapper"]}>
                          <h4>Failed to parse but got data:</h4>
                          <pre>
                            Error:{" "}
                            {JSON.stringify(aiResponse?.errorMessage, null, 4)}
                          </pre>
                          <button onClick={handleParseErrors}>
                            Try force parsing?
                          </button>
                          <CodeBlock
                            code={JSON.stringify(aiResponse, null, 4)}
                            language="json"
                          />
                        </div>
                      ) : (
                        <CodeBlock
                          code={JSON.stringify(aiResponse, null, 4)}
                          language="json"
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default withPageAuthRequired(ManageAi);
