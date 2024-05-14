import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewNote from "./components/NewNote";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

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
    // setNotesTags((notesTags) => [
    //   ...notesTags.filter((t) => !tagsIds.includes(t.id)),
    //   ...tags,
    // ]);
  };
  const addNewTag = (tag: Tag) => {
    setNotesTags((prev) => [...prev, tag]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>HomePage</h1>,
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
      children: [
        {
          index: true,
          element: <h1>Current note</h1>,
        },
        {
          path: "edit",
          element: <h1>Edit the current note</h1>,
          children: [],
        },
      ],
    },
    {
      path: "*",
      element: <h1>HomePage</h1>,
      children: [],
    },
  ]);
  return (
    <div className="m-20 text-xl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
