import { Tag } from "../App";

type NoteCardProps = {
  title: string;
  tags: Tag[];
};

const NoteCard = ({ title, tags }: NoteCardProps) => {
  return (
    <div className="flex flex-col justify-center w-80 h-64 rounded-lg border-2 gap-y-2 hover:-translate-y-3 hover:duration-200 hover:shadow-lg">
      <h1 className="text-4xl mx-auto">{title}</h1>
      <div className="flex flex-wrap justify-center gap-x-2">
        {tags.map((e) => (
          <button
            key={e.id}
            className="rounded-md text-white font-semibold bg-blue-600 text-[16px] px-2 border-slate-400 border-2"
          >
            {e.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteCard;
