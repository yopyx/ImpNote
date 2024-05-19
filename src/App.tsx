import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewNote from "./components/NewNote";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import NotesList from "./components/NotesList";
import NoteLayout from "./components/NoteLayout";
import Note from "./components/Note";
import EditNote from "./components/EditNote";
import { TagsObj } from "./components/EditTagsModal";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type Tag = {
  label: string;
  id: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagsIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [notesTags, setNotesTags] = useLocalStorage<Tag[]>("TAGS", []);
  const notesWithTags = useMemo(() => {
    // each note object is concatenated with tags which will contain labels updated
    return notes.map((n) => {
      return { ...n, tags: notesTags.filter((t) => n.tagsIds.includes(t.id)) };
    });
  }, [notes, notesTags]);

  const createNote = ({ tags, ...data }: NoteData) => {
    const tagsIds = tags.map((t) => t.id);
    setNotes((prevNotes) => [...prevNotes, { id: uuidv4(), ...data, tagsIds }]);
  };
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const tagsIds = tags.map((t) => t.id);
    setNotes((prevNotes) =>
      prevNotes.map((n) => {
        if (n.id === id) {
          return { ...n, ...data, tagsIds };
        } else {
          return n;
        }
      })
    );
  };
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  };
  const addNewTag = (tag: Tag) => {
    setNotesTags((prev) => [...prev, tag]);
  };
  const updateTag = (obj: TagsObj) => {
    setNotesTags((prev) =>
      prev.map((e) => (obj[e.id] ? { id: e.id, label: obj[e.id] } : e))
    );
  };
  const deleteTag = (tagId: string) => {
    setNotesTags((prev) => prev.filter((t) => t.id !== tagId));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <NotesList
          availableTags={notesTags}
          simplifiedNotes={notesWithTags.map((n) => {
            return { id: n.id, title: n.title, tags: n.tags };
          })}
          onUpdateTag={updateTag}
          onDeleteTag={deleteTag}
        />
      ),
      children: [],
    },
    {
      path: "/new",
      element: (
        <NewNote
          onSubmit={createNote}
          addTag={addNewTag}
          availableTags={notesTags}
        />
      ),
      children: [],
    },
    {
      path: "/:id",
      element: <NoteLayout notes={notesWithTags} />,
      errorElement: <h1>Error</h1>,
      children: [
        {
          index: true,
          element: <Note onDelete={deleteNote} />,
        },
        {
          path: "edit",
          element: (
            <EditNote
              onSubmit={updateNote}
              addTag={addNewTag}
              availableTags={notesTags}
            />
          ),
          children: [],
        },
      ],
    },
    {
      path: "*",
      element: <div>wrong page</div>,
      children: [],
    },
  ]);
  return (
    <div className="m-20 text-xl bg-gradient-to-r from-blue-100 to-blue-300">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
