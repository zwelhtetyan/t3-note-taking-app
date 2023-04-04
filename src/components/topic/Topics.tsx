import { useSession } from "next-auth/react";
import { KeyboardEvent } from "react";
import { api } from "~/utils/api";
import Spinner from "../Spinner";
import Topic from "./Topic";

const Topics = () => {
  const { data: sessionData } = useSession();

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
    createTopic.mutate({ title: topicName });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      handleAddTopic(input.value); // wanna wait until it's done
      input.value = ""; // this should clear after mutation is complete
    }
  };

  return (
    <div className="col-span-1 p-4">
      <input
        type="text"
        placeholder="Add topic"
        className="input-bordered input w-full max-w-full"
        onKeyDown={handleKeyDown}
      />

      <ul className="mt-6 flex flex-wrap gap-2">
        {loadingTopics && <Spinner />}
        {allTopics?.map((topic) => (
          <Topic key={topic.id} name={topic.title} />
        ))}
        {/* <li className="btn-secondary btn rounded">Hello world</li> */}
      </ul>
    </div>
  );
};

export default Topics;
