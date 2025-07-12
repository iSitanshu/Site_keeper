import { useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import { Upload } from "lucide-react"; // optional icon

const HandlePhoto = () => {
  const [renderPhotos, setRenderPhotos] = useState(true);
  const playlistId = useAppSelector((state) => state.current.currentPlaylist);
  const linkId = useAppSelector((state) => state.current.currentLink);

  return (
    <div className="h-[90vh] w-full flex flex-col border-2 border-gray-200 rounded-xl shadow-md bg-white overflow-hidden">
      {/* Fixed top section */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          📊 Handwritten Notes
        </h1>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex flex-col items-center justify-center gap-2">
          <Upload className="w-8 h-8 text-gray-500" />
          <p className="text-gray-700 text-sm mb-2">
            Upload photos of your handwritten notes
          </p>
          <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm transition">
            Choose File
            <input type="file" hidden multiple />
          </label>
          <button
            className="text-blue-500 underline text-xs mt-2"
            onClick={() => setRenderPhotos(!renderPhotos)}
          >
            {renderPhotos ? "Hide Uploaded Photos" : "Show Uploaded Photos"}
          </button>
        </div>
      </div>

      {/* Scrollable content area */}
      {renderPhotos && (
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div
                key={i}
                className="bg-gray-100 p-3 rounded-md border border-gray-200 shadow-sm"
              >
                <div className="w-full h-32 bg-gray-300 rounded mb-2"></div>
                <p className="text-xs text-gray-500 text-center">
                  Note {i}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HandlePhoto;
