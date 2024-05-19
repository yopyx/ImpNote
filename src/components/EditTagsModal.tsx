import { Tag } from "../App";

type EditModalProps = {
  availableTags: Tag[];
  closeModal: () => void;
  onUpdateTag: (obj: TagsObj) => void;
  onDeleteTag: (tagId: string) => void;
};
export type TagsObj = {
  [id: string]: string;
};

const EditTagsModal = ({
  availableTags,
  closeModal,
  onUpdateTag,
  onDeleteTag,
}: EditModalProps) => {
  const updatedTags: TagsObj = {};
  return (
    <div className="-m-20 absolute flex justify-center bg-black bg-opacity-45 w-screen h-screen">
      <div className="flex flex-col w-[700px] p-10 h-max rounded-lg bg-gradient-to-r from-gray-200 to-violet-300 my-auto gap-y-4">
        <h1 className="text-2xl">-Editing Tags-</h1>
        <ul className="flex flex-col gap-y-4">
          {availableTags.map((t) => (
            <li
              key={t.id}
              className="flex font-semibold border-2 p-1 justify-between bg-violet-200 shadow-md"
            >
              <input
                type="text"
                defaultValue={t.label}
                className="outline-none bg-violet-200"
                onChange={(e) => (updatedTags[t.id] = e.target.value)}
                required
              />
              <button
                className="text-red-600 border-2 border-red-600 px-2 pb-1"
                onClick={() => onDeleteTag(t.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-x-4">
          <button
            type="submit"
            className="py-1 w-20 rounded-md text-white bg-blue-700 hover:bg-blue-800"
            onClick={() => {
              onUpdateTag(updatedTags);
              closeModal();
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="py-1 w-20 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTagsModal;
