import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};
const NewNote = ({ onSubmit, addTag, availableTags }: NewNoteProps) => {
  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-4xl font-semibold text-sky-500">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;
