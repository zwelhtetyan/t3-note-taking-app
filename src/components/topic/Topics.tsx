import { useSession } from "next-auth/react";
import { KeyboardEvent, useEffect, useMemo } from "react";
import {
  SET_TOPIC,
  useSelectedTopic,
  useTopicDispatcher,
} from "~/context/TopicContext";
import { api } from "~/utils/api";
import Spinner from "../Spinner";
import Topic from "./Topic";

const Topics = () => {
  const { data: sessionData } = useSession();
  const selectedTopic = useSelectedTopic();
  const topicDispatcher = useTopicDispatcher();

  const {
    data: allTopics,
    isLoading: loadingTopics,
    refetch: refetchTopics,
  } = api.topic.getAll.useQuery(
    undefined, // not input
    { enabled: sessionData?.user !== undefined }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      refetchTopics();
    },
  });

  const handleAddTopic = (topicName: string) => {
    return createTopic.mutate({ title: topicName });
    // you can use [mutateSync] instead of [mutate] to handle async operations
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      handleAddTopic(input.value);
      input.value = "";
    }
  };

  useEffect(() => {
    if (!loadingTopics && allTopics?.length && !selectedTopic.id) {
      topicDispatcher &&
        topicDispatcher({ type: SET_TOPIC, payload: allTopics[0]! });
    }
  }, [allTopics, loadingTopics]); // initialize default selected topic

  return (
    <div className="col-span-1 border-r border-r-neutral-focus p-4">
      <input
        type="text"
        placeholder="Add topic"
        className="input-bordered input w-full max-w-full"
        onKeyDown={handleKeyDown}
      />

      <ul className="mt-6 flex flex-wrap gap-2">
        {loadingTopics ? (
          <Spinner />
        ) : allTopics && allTopics?.length > 0 ? (
          allTopics?.map((topic) => (
            <Topic key={topic.id} name={topic.title} id={topic.id} />
          ))
        ) : (
          <li>Create your first topic !</li>
        )}
      </ul>
    </div>
  );
};

export default Topics;
