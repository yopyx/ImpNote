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
      <h1 className="text-4xl font-semibold text-sky-500">New Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note.id, data)}
        addTag={addTag}
        availableTags={availableTags}
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
      />
    </div>
  );
};

export default EditNote;
