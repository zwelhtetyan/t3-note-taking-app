import { Dispatch, SetStateAction, useState } from "react";
import { SET_TOPIC, useSelectedTopic } from "~/context/TopicContext";
import { api } from "~/utils/api";

interface DeleteTopicModalProps {
  topicName: string;
  topicId: string;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

const DeleteTopicModal = ({
  topicName,
  topicId,
  setShowDeleteModal,
}: DeleteTopicModalProps) => {
  const { dispatch: topicDispatcher } = useSelectedTopic();
  const [deletingTopic, setDeletingTopic] = useState(false);
  const utils = api.useContext();

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      topicDispatcher &&
        topicDispatcher({ type: SET_TOPIC, payload: { id: "", title: "" } });

      utils.topic.getAll.invalidate();
    },
  });

  const closeModal = () => setShowDeleteModal(false);

  const handleDeleteTopic = async () => {
    try {
      setDeletingTopic(true);
      await deleteTopic.mutateAsync({ topicId });
    } catch (error) {
      console.log(error);
    }

    setDeletingTopic(false);
    closeModal();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">Delete topic</h3>
        <h2>
          Topic Name:{" "}
          <span className="font-bold capitalize italic">"{topicName}"</span>
        </h2>
        <p className="py-4">
          All related posts with that topic will also be deleted. Are you sure
          you want to delete this topic?
        </p>

        <div className="flex w-full justify-end space-x-2 ">
          <button
            onClick={closeModal}
            className="btn-secondary btn block rounded capitalize"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTopic}
            className="btn-error btn block rounded capitalize hover:bg-red-700"
          >
            {deletingTopic ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTopicModal;
