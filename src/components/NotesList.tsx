import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import SelectCreatable from "react-select/creatable";

type NotesListProps = {
  availableTags: Tag[];
};

const NotesList = ({ availableTags }: NotesListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold">Notes</h1>
        <div className="flex justify-end gap-x-8">
          <Link to={"/new"}>
            <button
              type="button"
              className="py-2 w-24 rounded-md text-white bg-blue-700 hover:bg-blue-800"
            >
              Create
            </button>
          </Link>
          <button
            type="button"
            className="py-2 w-24 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300"
          >
            Edit tags
          </button>
        </div>
      </div>
      <div className="flex gap-x-[15%]">
        <div className="flex-1 flex flex-col gap-y-4">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline p-1.5 rounded-sm outline-1 outline-gray-400"
          />
        </div>
        <div className="flex flex-1 flex-col gap-y-4">
          <label htmlFor="tags" className="font-semibold">
            Tags
          </label>
          <SelectCreatable
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
    </div>
  );
};

export default NotesList;
