import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useAppSelector } from "@/lib/hooks";

const EditNotesPhoto = () => {
  const [currNotes, setCurrNotes] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const playlistId = useAppSelector((state) => state.current.currentPlaylist);
  const linkId = useAppSelector((state) => state.current.currentLink);

  useEffect(() => {
    if (!playlistId || !linkId) return;

    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/dashboard/note?linkId=${linkId}`);
        const body = await response.json();
        if (body.notes.length !== 0) {
          setCurrNotes(body.notes[0].text);
        } else {
          setCurrNotes(""); // in case no notes exist
        }
      } catch (error) {
        console.error("Error fetching Notes:", error);
        alert("Failed to fetch Notes. Please try again.");
      }
    };

    fetchNotes();
  }, [linkId, playlistId]);

  const handleEdit = () => {
    setEditedNotes(currNotes);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedNotes("");
  };

  const saveNotes = async () => {
    try {
      const data = {
        linkId,
        text: editedNotes,
      };

      const res = await fetch("/api/dashboard/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const body = await res.json();
      if (!res.ok) {
        console.error("Error saving notes:", body.error || "Something went wrong");
        alert("Failed to save notes.");
      } else {
        setCurrNotes(body.notes.text);
        setIsEditing(false);
        setEditedNotes("");
      }
    } catch (error) {
      console.error("Error saving notes failed the fetch:", error);
      alert("Failed to save notes.");
    }
  };

  return (
    <div>
      <div className="bg-white border rounded-xl p-4 shadow-sm mt-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="notes" className="text-sm font-semibold">
            Learning Notes
          </label>
          {!isEditing && (
            <Button variant="outline" onClick={handleEdit}>
              ✏️ Edit Notes
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              id="notes"
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              placeholder="Write your general learning notes here..."
              className="w-full min-h-[120px] resize-y border-gray-300 rounded-md"
            />
            <div className="flex gap-2">
              <Button onClick={saveNotes}>💾 Save Notes</Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">{currNotes || "No notes added yet."}</p>
        )}
      </div>
    </div>
  );
};

export default EditNotesPhoto;
