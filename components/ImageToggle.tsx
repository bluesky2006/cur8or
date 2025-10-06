import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { ImageToggleProps } from "../types/artTypes";

export default function ImageToggle({
  showWithImagesOnly,
  setShowWithImagesOnly,
}: ImageToggleProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => setShowWithImagesOnly(!showWithImagesOnly)}
        className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 rounded"
        aria-pressed={showWithImagesOnly}
        aria-label={"Show results with images only"}
      >
        {showWithImagesOnly ? (
          <BsToggleOn className="text-yellow-500 text-3xl" aria-hidden="true" />
        ) : (
          <BsToggleOff className="text-gray-400 text-3xl" aria-hidden="true" />
        )}
      </button>

      <span id="image-toggle-label">Show results with images only</span>
    </div>
  );
}
