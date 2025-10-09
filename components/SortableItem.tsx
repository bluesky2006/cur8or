import Image from "next/image";
import { TrashIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableItemProps } from "../types/artTypes";

export default function SortableItem({ art, removeFromExhibition }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: art.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="relative flex items-center border-b border-gray-300 pb-6 gap-3 pt-2 pr-12 bg-white rounded"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        title="Drag to reorder"
      >
        <Bars3Icon className="h-5 w-5" />
      </div>

      <div className="flex gap-3 flex-1">
        {art.imageUrl ? (
          <div className="relative w-24 aspect-square flex-shrink-0 rounded overflow-hidden bg-gray-100">
            <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="relative w-24 aspect-square flex-shrink-0 flex items-center justify-center bg-gray-200 text-xs text-gray-500 rounded">
            No Image
          </div>
        )}

        <div className="flex flex-col justify-between">
          <h3>{art.title}</h3>
          <h4>by {art.artist}</h4>
        </div>
      </div>

      <button
        onClick={() => removeFromExhibition(art.id)}
        className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
        aria-label={`Remove ${art.title}`}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </li>
  );
}
