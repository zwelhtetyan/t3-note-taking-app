import Link from "next/link";

const CreateFirstNote = () => (
  <div className="mt-60  flex flex-col items-center">
    <p className="mb-3">Create your first note!</p>
    <Link href="/new" className="btn-secondary btn rounded capitalize">
      Create Note
    </Link>
  </div>
);

const Notes = () => {
  return (
    <div className="col-span-2 p-4">
      {false ? <p>show all notes for selected topic</p> : <CreateFirstNote />}
    </div>
  );
};

export default Notes;
