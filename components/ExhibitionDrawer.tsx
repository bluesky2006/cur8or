"use client";

import { useExhibition } from "../context/ExhibitionContext";
import { ExhibitionDrawerProps } from "../types/artTypes";
import Link from "next/link";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function ExhibitionDrawer({ show, onClose }: ExhibitionDrawerProps) {
  const { exhibition, removeFromExhibition, clearExhibition, setExhibition } = useExhibition();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setExhibition((prevItems) => {
      const oldIndex = prevItems.findIndex((i) => i.id === active.id);
      const newIndex = prevItems.findIndex((i) => i.id === over.id);
      return arrayMove(prevItems, oldIndex, newIndex);
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 ${
        show ? "bg-black/50" : "pointer-events-none bg-transparent"
      }`}
      onClick={onClose}
    >
      <div
        className={`
          relative w-120 max-w-full h-full bg-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${show ? "translate-x-0 shadow-lg" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h1>My Exhibition</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain">
          {exhibition.length === 0 ? (
            <p className="mt-2">No artworks added yet.</p>
          ) : (
            <>
              <p className="mt-2 mb-4">
                You currently have {exhibition.length}{" "}
                {exhibition.length === 1 ? "artwork" : "artworks"} in your exhibition.
              </p>

              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                  items={exhibition.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="space-y-4">
                    {exhibition.map((art) => (
                      <SortableItem
                        key={art.id}
                        art={art}
                        removeFromExhibition={removeFromExhibition}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </>
          )}
        </div>

        {exhibition.length > 0 && (
          <div className="flex-shrink-0 bg-white px-6 p-6 flex justify-between items-center gap-4">
            <button
              onClick={clearExhibition}
              className="flex-1 text-md rounded py-2 px-4 bg-red-500 text-white hover:bg-red-600 cursor-pointer text-center"
            >
              Remove all exhibits
            </button>

            <Link
              href="/my-exhibition"
              className="flex-1 text-md rounded py-2 px-4 bg-amber-500 text-white hover:bg-amber-600 text-center"
              onClick={onClose}
            >
              View your exhibition →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
