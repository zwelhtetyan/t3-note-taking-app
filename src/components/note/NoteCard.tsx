import { Note } from "@prisma/client";
import { formatDate } from "~/utils/formatDate";

const NoteCard = (props: Note) => {
  const { id, title, createdAt } = props;

  return (
    <div className="rounded-md bg-neutral-focus p-3">
      <p className="mb-2 text-sm text-gray-400">{formatDate(createdAt)}</p>
      <h1 className="line-clamp-3 text-lg">{title}</h1>
      <div className="mt-3 flex w-full justify-end">
        <button className="btn-secondary btn block rounded-md bg-base-200">
          Read more →
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
