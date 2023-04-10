import Link from "next/link";
import { formatDate } from "~/utils/formatDate";

interface NoteCardPorps {
  id: string;
  title: string;
  createdAt: Date;
  topicName: string;
}

const NoteCard = ({ id, title, topicName, createdAt }: NoteCardPorps) => {
  return (
    <div className="flex h-[168px] flex-col rounded-md bg-neutral-focus p-3">
      <div className="flex-1">
        <p className="mb-2 text-sm text-gray-400">{formatDate(createdAt)}</p>
        <h1 className="line-clamp-2 text-lg">{title}</h1>
      </div>

      <div className="mt-3 flex w-full justify-end">
        <Link
          href={`/${topicName}/${id}`}
          className="btn-secondary btn flex rounded-md bg-base-200"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default NoteCard;
