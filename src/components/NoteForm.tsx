import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidv4 } from "uuid";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NoteForm = ({ onSubmit, addTag, availableTags }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();
  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
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
          <ReactSelectCreatable
            //onCreateOption is called whenever a new tag (Not a duplicate one) is added and onChange will not be called in this case
            onCreateOption={(label) => {
              const newTag = { id: uuidv4(), label };
              setSelectedTags((t) => [...t, newTag]);
              addTag(newTag);
            }}
            //since the value of each tag is expected to be {label:...., value:....}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            // options attribute takes an array of all available options of tags to select from
            options={availableTags.map((t) => {
              return { label: t.label, value: t.id };
            })}
            onChange={(tags) =>
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              )
            }
            isMulti
          />
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
