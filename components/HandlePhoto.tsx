import { useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import { Cross, Upload } from "lucide-react"; // optional icon
import { Button } from "./ui/button";

const HandlePhoto = () => {
  const [renderPhotos, setRenderPhotos] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const playlistId = useAppSelector((state) => state.current.currentPlaylist);
  const linkId = useAppSelector((state) => state.current.currentLink);
  const [currentPhotos, setCurrentPhotos] = useState([])

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl("");
    setError(null);
  };

  const handleUpload = async () => {
    if(!selectedFile){
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image',selectedFile);

    try {
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })

      if(!response.ok){
        alert("Something went wrong while uploading...")
        console.error("data.error while uploading file || Something went wrong");
      }

      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.error("Error in fetch in uploading")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[90vh] w-full flex flex-col border-2 border-gray-200 rounded-xl shadow-md bg-white overflow-hidden">
      {/* Fixed top section */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          📊 Handwritten Notes
        </h1>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex flex-col items-center justify-center gap-2">
          {selectedFile ? (
            <div className="flex">
              {selectedFile.name}
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-red-600 lucide lucide-x-icon lucide-x" onClick={() => setSelectedFile(null)}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> */}
              <Button
              onClick={() => setSelectedFile(null)}
              >x</Button>
            </div>
          ) : (
            <div>
              <Upload className="w-8 h-8 text-gray-500" />
              <p className="text-gray-700 text-sm mb-2">
                Upload photos of your handwritten notes
              </p>
            </div>
          )}
          <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm transition">
            Choose File
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          {selectedFile && <Button onClick={handleUpload}>Add</Button>}
          <button
            className="text-blue-500 underline text-xs mt-2"
            onClick={() => setRenderPhotos(!renderPhotos)}
          >
            {renderPhotos ? "Hide Uploaded Photos" : "Show Uploaded Photos"}
          </button>
        </div>
      </div>

      {/* Fixed bottom section */}
      {/* Scrollable content area */}
      {/* {renderPhotos && (
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
      )} */}
    </div>
  );
};

export default HandlePhoto;
