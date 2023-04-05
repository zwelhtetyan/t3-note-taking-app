import ReactCodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
const Notes = () => {
  return (
    <div className="col-span-2 p-4">
      <input
        type="text"
        placeholder="Add Note Title"
        className="input-bordered input w-full max-w-full focus:outline-none"
      />

      <ReactCodeMirror
        value=""
        height="250px"
        theme={githubDark}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
      />
    </div>
  );
};

export default Notes;
