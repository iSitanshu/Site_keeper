import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const HandlePhoto = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [expandedNote, setExpandedNote] = useState<{
    image: string;
    index: number;
  } | null>(null);

  const linkId = useAppSelector((state) => state.current.currentLink);

  useEffect(() => {
    if (!linkId) return;

    const fetchPhotos = async () => {
      try {
        const response = await fetch(`/api/dashboard/note?linkId=${linkId}`);
        const body = await response.json();
        if (body.notes.length !== 0 && body.notes[0].imageUrl?.length > 0) {
          setCurrentPhotos(body.notes[0].imageUrl);
        }
      } catch (error) {
        console.error("Error fetching Notes:", error);
      }
    };

    fetchPhotos();
  }, [linkId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !linkId) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("linkId", linkId);

    try {
      const response = await fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.notes?.imageUrl) {
        setCurrentPhotos(data.notes.imageUrl);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  const openNoteDetail = (image: string, index: number) => {
    setExpandedNote({ image, index });
  };

  const closeNoteDetail = () => {
    setExpandedNote(null);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-semibold mb-6">Handwritten Notes</h1>

      {/* Upload Section */}
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Upload className="w-8 h-8 text-gray-500" />
          <p className="text-gray-600 text-sm">
            Upload photos of your handwritten notes
          </p>
          
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition">
              Choose File
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {selectedFile && (
          <div className="mt-4 flex items-center gap-4">
            <p className="text-sm text-gray-700">{selectedFile.name}</p>
            <Button
              onClick={handleUpload}
              disabled={loading}
              size="sm"
              className="ml-auto"
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        )}
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {currentPhotos.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {currentPhotos.map((photo, idx) => (
                <div 
                  key={idx} 
                  className="border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => openNoteDetail(photo, idx)}
                >
                  <Image src={photo} alt={`Note ${idx + 1}`}
                    className="w-full h-auto object-contain mb-2"/>
                  <p className="text-sm font-medium">Study Notes - Page {idx + 1}</p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Expanded Note Modal */}
      {expandedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg relative max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  Learning Summary
                </h2>
                <p className="text-sm text-gray-500">
                  Uploaded on {new Date().toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={closeNoteDetail}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <Image
                src={expandedNote.image}
                alt="Expanded note"
                className="w-full h-auto object-contain rounded-lg mb-6"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandlePhoto;