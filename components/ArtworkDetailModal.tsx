import Image from "next/image";

export default function ArtworkDetailModal({ art, onClose }) {
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
          <p className="text-sm text-gray-500 mb-4">{art.date}</p>
          <p className="text-sm text-gray-600">{art.description}</p>
          <button className="text-md mt-4 text-white font-semibold bg-yellow-500 rounded py-2 hover:bg-yellow-600">
            + Add to exhibition
          </button>
        </div>
      </div>
    </div>
  );
}
