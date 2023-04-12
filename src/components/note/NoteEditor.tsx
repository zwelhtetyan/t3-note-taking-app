import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useRef, useState } from "react";
import MarkdownContent from "../MarkdownContent";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useSelectedTopic } from "~/context/TopicContext";
import { toast, Toaster } from "react-hot-toast";
import { Note } from "@prisma/client";
import { useRouter } from "next/router";

export interface NewNote {
  title: string;
  content: string;
  authorId: string;
  topicId: string;
}

interface NoteEditorProps {
  editMode?: boolean;
  noteToEdit?: Note;
}

const NoteEditor = ({ editMode, noteToEdit }: NoteEditorProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(noteToEdit ? noteToEdit.content : "");
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data: sessionData } = useSession();
  const { state: selectedTopic } = useSelectedTopic();
  const router = useRouter();

  const createNote = api.note.create.useMutation();
  const editNote = api.note.update.useMutation();

  const toggleShowPreview = () => setShowPreview((prev) => !prev);

  const handleSubmit = async () => {
    const newNote: NewNote = {
      title: titleRef.current?.value ?? "",
      content: content,
      topicId: selectedTopic.id ?? "",
      authorId: sessionData?.user.id!,
    };

    try {
      setSubmitting(true);

      editMode && noteToEdit
        ? await editNote.mutateAsync({
            noteId: noteToEdit.id,
            title: newNote.title,
            content,
          })
        : await createNote.mutateAsync({ ...newNote });

      editMode
        ? toast.success("note updated successfully")
        : toast.success("note created successfully");

      titleRef.current!.value = "";
      setShowPreview(false);
      setSubmitting(false);
      setContent("");
      editMode && router.back();
    } catch (err: any) {
      const errObj = err.data?.zodError?.fieldErrors;

      if (errObj?.topicId) toast.error(errObj.topicId[0]);
      else if (errObj?.title) toast.error(errObj.title[0]);
      else if (errObj?.content) toast.error(errObj.content[0]);
      else toast.error("Failed to post! Please try again later.");

      setSubmitting(false);
    }
  };

  return (
    <div className="col-span-2 p-4">
      <Toaster reverseOrder={true} />
      <div className="mb-2 flex items-center gap-4">
        <input
          ref={titleRef}
          type="text"
          defaultValue={noteToEdit?.title ?? ""}
          placeholder="Add Note Title"
          className="input-bordered input w-full max-w-full flex-1"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={toggleShowPreview}
            className="btn-secondary btn rounded capitalize"
          >
            Preview
          </button>
          <button
            disabled={submitting}
            onClick={handleSubmit}
            className="z btn-secondary btn rounded capitalize"
          >
            {submitting
              ? editMode
                ? "Updating"
                : "Creating"
              : editMode
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>

      {showPreview ? (
        <article className="prose w-full max-w-full border border-neutral-focus bg-base-300 p-4">
          <MarkdownContent content={content} />
        </article>
      ) : (
        <ReactCodeMirror
          value={content}
          onChange={setContent}
          placeholder="### write your content with markdown syntax"
          theme={vscodeDark}
          height="100%"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          className="h-[calc(100vh-154px)] w-full max-w-full"
        />
      )}
    </div>
  );
};

export default NoteEditor;

// test markdown content

/*
## Hi zwel!

![](data:image/jpeg;base64,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)

```jsx
const [state, setState] = useState(0);

function a () {
  console.log('hi')

  throw new Error('error lay pr shint')
}
```
*/
