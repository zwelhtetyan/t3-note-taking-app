import Link from "next/link";
import { useSelectedTopic } from "~/context/TopicContext";
import { api } from "~/utils/api";
import Spinner from "../Spinner";
import NoteCard from "./NoteCard";

const CreateFirstNote = () => (
  <div className="mt-60  flex flex-col items-center">
    <p className="mb-3">Create your first note!</p>
    <Link href="/new" className="btn-secondary btn rounded capitalize">
      Create Note
    </Link>
  </div>
);

const Notes = () => {
  const selectedTopic = useSelectedTopic();

  const { data: notes, isLoading: loadingNotes } =
    api.note.getNotesByTopic.useQuery({ topicId: selectedTopic.id! });

  return (
    <div className="col-span-2 p-4">
      {loadingNotes && <Spinner />}

      {!loadingNotes && notes && notes.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              createdAt={note.createdAt}
              selectedTopicName={selectedTopic.title ?? ""}
            />
          ))}
        </div>
      )}

      {!loadingNotes && notes && notes.length === 0 && <CreateFirstNote />}
    </div>
  );
};

export default Notes;
