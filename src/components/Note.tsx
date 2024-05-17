import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
const Note = () => {
  const note = useNote();
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
        <div className="flex my-auto gap-x-5">
          <Link to={`/${note.id}/edit`}>
            <button className="py-2 w-24 rounded-md text-white bg-blue-700 hover:bg-blue-800">
              Edit
            </button>
          </Link>
          <button className="py-2 w-24 text-red-600 rounded-md bg-red-100 border-red-600 border-[1px] hover:bg-red-300">
            Delete
          </button>
          <Link to={"/"}>
            <button className="py-2 w-24 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300">
              Back
            </button>
          </Link>
        </div>
      </div>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  );
};

export default Note;
