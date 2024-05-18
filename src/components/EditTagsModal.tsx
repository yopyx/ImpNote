import { Tag } from "../App";

type EditModalProps = {
  availableTags: Tag[];
};

const EditTagsModal = ({ availableTags }: EditModalProps) => {
  return (
    <div className="-m-20 absolute flex justify-center bg-black bg-opacity-45 w-screen h-screen">
      <div className="flex flex-col w-[700px] p-10 h-max rounded-lg bg-white my-auto gap-y-4">
        <h1 className="text-2xl">-Editing Tags-</h1>
        <ul className="flex flex-col gap-y-4">
          {availableTags.map((t) => (
            <li
              key={t.id}
              className="flex font-semibold border-2 p-1 justify-between"
            >
              <input
                type="text"
                defaultValue={t.label}
                className="outline-none"
              />
              <button className="text-red-600 border-2 border-red-600 px-2 pb-1">
                x
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-x-4">
          <button
            type="submit"
            className="py-1 w-20 rounded-md text-white bg-blue-700 hover:bg-blue-800"
          >
            Save
          </button>
          <button
            type="button"
            className="py-1 w-20 rounded-md bg-slate-200 border-stone-400 border-[1px] hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTagsModal;
