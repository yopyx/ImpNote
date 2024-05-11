import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";

const NoteForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form className="flex flex-col gap-y-10" onSubmit={handleSubmission}>
      <div className="flex gap-x-20">
        <div className="flex-1 flex flex-col gap-y-4">
          <label htmlFor="title" className=" font-semibold">
            Title
          </label>
          <input
            type="text"
            ref={titleRef}
            className="outline p-1.5 rounded-sm outline-1 outline-gray-400"
            required
          />
        </div>
        <div className="flex flex-1 flex-col gap-y-4">
          <label htmlFor="tags" className="font-semibold">
            Tags
          </label>
          <ReactSelectCreatable isMulti />
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <label htmlFor="Body" className="font-semibold">
          Body
        </label>
        <textarea
          ref={markdownRef}
          className="outline p-1.5 rounded-sm outline-1 outline-gray-400"
          rows={15}
          required
        />
      </div>
      <div className="flex justify-end gap-x-8">
        <button
          type="submit"
          className="py-2 w-24 rounded-md text-white bg-blue-700 hover:bg-blue-800"
        >
          Save
        </button>
        <Link to={".."}>
          <button
            type="button"
            className="py-2 w-24 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
