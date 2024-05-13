import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewNote from "./components/NewNote";
import useLocalStorage from "./useLocalStorage";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>HomePage</h1>,
    children: [],
  },
  {
    path: "/new",
    element: <NewNote />,
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
function App() {
  const [notes, setNotes] = useLocalStorage<RawNoteData[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  return (
    <div className="m-20 text-xl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
