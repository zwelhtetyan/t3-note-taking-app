import { Topic } from "@prisma/client";
import React, { createContext, useContext, useReducer } from "react";
import { ChildrenProp } from "~/types";

interface CTXProps {
  state: Partial<Topic>;
  dispatch: React.Dispatch<TopicReducerAction>;
}

const initialTopicState = { id: "", title: "" };

const TopicContext = createContext<CTXProps>({
  state: initialTopicState,
  dispatch: () => {},
});

export const SET_TOPIC = "SET_TOPIC";

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
    <TopicContext.Provider value={{ state, dispatch }}>
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContextProvider;

export const useSelectedTopic = () => useContext(TopicContext);
