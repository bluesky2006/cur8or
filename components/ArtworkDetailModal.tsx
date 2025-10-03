import Image from "next/image";
import { useExhibition } from "../context/ExhibitionContext";

export default function ArtworkDetailModal({ art, onClose }) {
  const { exhibition, addToExhibition, removeFromExhibition } = useExhibition();

  const alreadyAdded = exhibition.some((a) => a.id === art.id);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-3xl w-full h-[80vh] overflow-hidden flex relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 py-2 px-3 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="w-1/2 relative bg-yellow-100">
          {art.imageUrl ? (
            <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-900 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="w-1/2 p-6 flex flex-col overflow-y-auto">
          <h3 className="text-xl font-semibold mb-2 leading-snug">{art.title}</h3>
          <p className="text-sm text-gray-700 mb-1">{art.artist}</p>
          <p className="text-sm text-gray-500 mb-4 pb-2 border-b border-gray-300">{art.date}</p>
          <div
            className="text-sm text-gray-600 [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: art.description }}
          />
          {alreadyAdded ? (
            <button
              onClick={() => removeFromExhibition(art.id)}
              className="mt-4 text-md font-semibold rounded py-2 bg-red-500 text-white hover:bg-red-600"
            >
              Remove from exhibition
            </button>
          ) : (
            <button
              onClick={() => addToExhibition(art)}
              className="mt-4 text-md font-semibold rounded py-2 bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Add to exhibition
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
