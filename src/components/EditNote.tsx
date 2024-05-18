import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";
type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};
const EditNote = ({ onSubmit, addTag, availableTags }: EditNoteProps) => {
  const note = useNote();

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-4xl font-semibold">New Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        addTag={addTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default EditNote;
