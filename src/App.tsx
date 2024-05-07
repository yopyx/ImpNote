import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>HomePage</h1>,
    children: [],
  },
  {
    path: "/new",
    element: <h1>Create new note</h1>,
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
    element: <h1>HomePage**</h1>,
    children: [],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
