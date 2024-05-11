import NoteForm from "./NoteForm";

const NewNote = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-3xl font-semibold">Show New Note</h1>
      <NoteForm />
    </div>
  );
};

export default NewNote;
