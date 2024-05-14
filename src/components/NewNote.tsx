import { NoteData } from "../App";
import NoteForm from "./NoteForm";
type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};
const NewNote = ({ onSubmit }: NewNoteProps) => {
  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-3xl font-semibold">Show New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewNote;
