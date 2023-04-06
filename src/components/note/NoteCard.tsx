import Link from "next/link";
import { formatDate } from "~/utils/formatDate";

interface NoteCardPorps {
  id: string;
  title: string;
  createdAt: Date;
  selectedTopicName: string;
}

const NoteCard = ({
  id,
  title,
  selectedTopicName,
  createdAt,
}: NoteCardPorps) => {
  return (
    <div className="rounded-md bg-neutral-focus p-3">
      <p className="mb-2 text-sm text-gray-400">{formatDate(createdAt)}</p>
      <h1 className="line-clamp-3 text-lg">{title}</h1>
      <div className="mt-3 flex w-full justify-end">
        <Link
          href={`/${selectedTopicName}/${id}`}
          className="btn-secondary btn flex rounded-md bg-base-200"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default NoteCard;
