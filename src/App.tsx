import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewNote from "./components/NewNote";
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
  return (
    <div className="m-20 text-xl">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
