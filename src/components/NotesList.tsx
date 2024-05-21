import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import SelectCreatable from "react-select/creatable";
import NoteCard from "./NoteCard";
import EditTagsModal, { TagsObj } from "./EditTagsModal";

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type NotesListProps = {
  availableTags: Tag[];
  simplifiedNotes: SimplifiedNote[];
  onUpdateTag: (obj: TagsObj) => void;
  onDeleteTag: (tagId: string) => void;
};

const NotesList = ({
  availableTags,
  simplifiedNotes,
  onUpdateTag,
  onDeleteTag,
}: NotesListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const handleModalClosing = () => setEditModalIsOpen(false);
  const filteredNotes = useMemo(() => {
    return simplifiedNotes.filter(
      (n) =>
        (title === "" || n.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((t) => n.tags.some((nt) => nt.id === t.id)))
    );
  }, [title, selectedTags, simplifiedNotes]);
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between">
        <h1 className="text-5xl font-semibold text-sky-500"> Notes.</h1>
        <div className="flex justify-end gap-x-8 md:gap-x-2">
          <Link to={"/new"}>
            <button
              type="button"
              className="py-2.5 px-4 md:p-2 rounded-md text-white bg-blue-700 hover:bg-blue-800"
            >
              Create
            </button>
          </Link>
          <button
            type="button"
            className="p-2 px-3 md:p-2 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300"
            onClick={() => setEditModalIsOpen(true)}
          >
            Edit tags
          </button>
        </div>
      </div>
      <div className="flex space-x-[5%]">
        <div className="flex-1 w-[50%] flex flex-col gap-y-4">
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
        <div className="flex-1 w-[50%] flex flex-col gap-y-4">
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
      <div className="flex flex-wrap ml-1 gap-6 xl:gap-3 lg:justify-center">
        {filteredNotes.map((e) => (
          <Link key={e.id} to={`/${e.id}`}>
            <NoteCard title={e.title} tags={e.tags} />
          </Link>
        ))}
      </div>
      {editModalIsOpen && (
        <EditTagsModal
          availableTags={availableTags}
          closeModal={handleModalClosing}
          onUpdateTag={onUpdateTag}
          onDeleteTag={onDeleteTag}
        />
      )}
    </div>
  );
};

export default NotesList;
