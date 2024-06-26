import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import { NoteData } from "../App";

type NoteProps = {
  onDelete: (id: string) => void;
  onCopy: (data: NoteData) => void;
};

const Note = ({ onDelete, onCopy }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-12">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl">{note.title}</h1>
          <div className="flex flex-wrap gap-x-2">
            {note.tags.map((e) => (
              <button
                key={e.id}
                className="rounded-md text-white font-semibold bg-blue-600 text-[16px] px-2 border-slate-400 border-2"
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex my-auto gap-x-5 md:gap-2 md:text-lg md:flex-col">
          <Link to={`/${note.id}/edit`}>
            <button className="py-2.5 px-4 md:p-1.5 md:px-5 rounded-md text-white bg-blue-700 hover:bg-blue-800">
              Edit
            </button>
          </Link>
          <button
            className="py-2.5 px-4 md:p-1.5 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300"
            onClick={() => {
              onCopy({
                title: note.title,
                markdown: note.markdown,
                tags: note.tags,
              });
              navigate("/");
            }}
          >
            Copy
          </button>
          <button
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
            className="py-2.5 px-4 md:p-1.5 text-red-600 rounded-md bg-red-100 border-red-600 border-[1px] hover:bg-red-300"
          >
            Delete
          </button>
          <Link to={"/"}>
            <button className="py-2.5 px-4 md:p-1.5 md:px-4 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300">
              Back
            </button>
          </Link>
        </div>
      </div>
      <ReactMarkdown className="p-2 rounded-lg border-2">
        {note.markdown}
      </ReactMarkdown>
    </div>
  );
};

export default Note;
