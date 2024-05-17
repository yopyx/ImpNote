import { useParams } from "next/navigation";
import { Note } from "../App";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

type NoteLayoutProps = {
  notes: Note[];
};

const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);
  if (note === null) {
    <Navigate to={"/"} replace />;
  }
  return <Outlet context={note} />;
};
export function useNote() {
  return useOutletContext<Note>();
}
export default NoteLayout;
