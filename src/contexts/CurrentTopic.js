import React, { createContext, useEffect, useState } from "react";
const TopicContext = createContext({});

const TopicProvider = (props) => { 
  const [currentTopic, setCurrent_topic] = useState();
  useEffect(() => {
    console.log("from topic context 1..", currentTopic);

    if (localStorage.getItem("currentTopic")) {
      setCurrent_topic(localStorage.getItem("currentTopic"));
      console.log("from topic context 2 .. ", currentTopic);
    } else {
      console.log("topic");
    }
  }, [currentTopic]);

  const TopicContextValue = {
    currentTopic,
  };

  return <TopicContext.Provider value={TopicContextValue} {...props} />;
};

const useTopic = () => React.useContext(TopicContext);
export { TopicProvider, useTopic };
