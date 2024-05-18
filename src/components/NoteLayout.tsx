import { Note } from "../App";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

type NoteLayoutProps = {
  notes: Note[];
};

const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((n) => n.id === id);
  if (!note) {
    navigate("/");
  }
  return <Outlet context={note} />;
};
//useNote function is used as a way to pass down the props of the Outlet component
export function useNote() {
  return useOutletContext<Note>();
}
export default NoteLayout;
