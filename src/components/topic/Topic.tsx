import { Dispatch, SetStateAction, useMemo } from "react";
import {
  SET_TOPIC,
  useSelectedTopic,
  useTopicDispatcher,
} from "~/context/TopicContext";

interface TopicProps {
  name: string;
  id: string;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

const Topic = ({ name, id, setShowDeleteModal }: TopicProps) => {
  const selectedTopic = useSelectedTopic();
  const topicDispatcher = useTopicDispatcher();

  const isActive = useMemo(() => id === selectedTopic.id, [selectedTopic.id]);

  const handleSelectTopic = () => {
    topicDispatcher &&
      topicDispatcher({ type: SET_TOPIC, payload: { id, title: name } });
  };

  const handleDoubleClick = () => {
    selectedTopic && setShowDeleteModal(true);
  };

  return (
    <li
      onClick={handleSelectTopic}
      onDoubleClick={handleDoubleClick}
      className={`btn-secondary btn rounded bg-base-200 ${
        isActive ? "bg-neutral-focus" : ""
      }`}
    >
      {name}
    </li>
  );
};

export default Topic;
