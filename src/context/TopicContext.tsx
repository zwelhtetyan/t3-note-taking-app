import { Topic } from "@prisma/client";
import React, { createContext, useContext, useReducer } from "react";
import { ChildrenProp } from "~/types";

type TopicDispatcherType = React.Dispatch<TopicReducerAction>;

const initialTopicState = { id: "", title: "" };

const TopicContext = createContext<Partial<Topic>>(initialTopicState);
const TopicDispatcher = createContext<TopicDispatcherType | null>(null);
export const SET_TOPIC = "SET_TOPIC";

// try using useReducer
// delete props drilling

interface TopicReducerAction {
  type: string;
  payload: Partial<Topic>;
}

const topicReducer = (state: Partial<Topic>, action: TopicReducerAction) => {
  switch (action.type) {
    case SET_TOPIC:
      return action.payload;
    default:
      return state;
  }
};

const TopicContextProvider = ({ children }: ChildrenProp) => {
  const [state, dispatch] = useReducer(topicReducer, initialTopicState);

  return (
    <TopicContext.Provider value={state}>
      <TopicDispatcher.Provider value={dispatch}>
        {children}
      </TopicDispatcher.Provider>
    </TopicContext.Provider>
  );
};

export default TopicContextProvider;

export const useSelectedTopic = () => useContext(TopicContext);
export const useTopicDispatcher = () => useContext(TopicDispatcher);
