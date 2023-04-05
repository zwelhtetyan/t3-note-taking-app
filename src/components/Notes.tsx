import ReactCodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Notes = () => {
  const [content, setContent] = useState("## Hello Zwel!");
  const [showPreview, setShowPreview] = useState(false);

  const toggleShowPreview = () => setShowPreview((prev) => !prev);

  return (
    <div className="col-span-2 p-4">
      <div className="mb-2 flex items-center gap-4">
        <input
          type="text"
          placeholder="Add Note Title"
          className="input-bordered input w-full max-w-full flex-1"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={toggleShowPreview}
            className="btn-secondary btn rounded"
          >
            Preview
          </button>
          <button className="btn-secondary btn rounded">Create</button>
        </div>
      </div>

      {showPreview ? (
        <div className="prose w-full max-w-full border border-neutral-focus bg-base-300 p-4">
          <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
        </div>
      ) : (
        <ReactCodeMirror
          value={content}
          onChange={setContent}
          height="250px"
          theme={githubDark}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          className="w-full max-w-full"
        />
      )}
    </div>
  );
};

export default Notes;
