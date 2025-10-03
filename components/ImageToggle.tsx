import { BsToggleOff, BsToggleOn } from "react-icons/bs";

export default function ImageToggle({
  showWithImagesOnly,
  setShowWithImagesOnly,
}: {
  showWithImagesOnly: boolean;
  setShowWithImagesOnly: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => setShowWithImagesOnly(!showWithImagesOnly)}
        className="flex items-center"
      >
        {showWithImagesOnly ? (
          <BsToggleOn className="text-yellow-500 text-3xl" />
        ) : (
          <BsToggleOff className="text-gray-400 text-3xl" />
        )}
      </button>
      <span>Results with images only</span>
    </div>
  );
}
