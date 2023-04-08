import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useState } from "react";
import {
  SET_TOPIC,
  useSelectedTopic,
  useTopicDispatcher,
} from "~/context/TopicContext";
import { api } from "~/utils/api";
import DeleteTopicModal from "../modal/DeleteTopicModal";
import Spinner from "../Spinner";

import Topic from "./Topic";

const Topics = () => {
  const { data: sessionData } = useSession();
  const selectedTopic = useSelectedTopic();
  const topicDispatcher = useTopicDispatcher();
  const { pathname } = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const utils = api.useContext();

  const isCreatePage = pathname === "/new";

  const { data: allTopics, isLoading: loadingTopics } =
    api.topic.getAll.useQuery(
      undefined, // not input
      { enabled: sessionData?.user !== undefined }
    );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      utils.topic.getAll.invalidate();
    },
  });

  const handleAddTopic = (topicName: string) => {
    return createTopic.mutate({ title: topicName });
    // you can use [mutateSync] instead of [mutate] to handle async operations
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;

      if (!input.value.trim()) return;

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
      {!isCreatePage && allTopics && allTopics?.length > 0 && (
        <>
          <h1 className="mb-1 text-xl font-bold">Topics</h1>
          <p className="mb-4 text-sm text-gray-400">
            Double click on topic you wanna delete.
          </p>
        </>
      )}

      {isCreatePage && (
        <input
          type="text"
          placeholder="Create topic"
          className="input-bordered input mb-6 w-full max-w-full"
          onKeyDown={handleKeyDown}
        />
      )}

      {loadingTopics && <Spinner />}

      {!loadingTopics && allTopics && allTopics.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {allTopics.map((topic) => (
            <Topic
              key={topic.id}
              name={topic.title}
              id={topic.id}
              setShowDeleteModal={setShowDeleteModal}
            />
          ))}
        </ul>
      )}

      {showDeleteModal && selectedTopic && (
        <DeleteTopicModal
          topicName={selectedTopic.title!}
          topicId={selectedTopic.id!}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
};

export default Topics;
