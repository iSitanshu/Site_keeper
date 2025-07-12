"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import PlaylistForm from "./PlaylistForm";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeStatus } from "@/lib/features/status/statusSlice";
import { changeCurrentPlaylist, changeCurrentLink, changeCurrentNote } from "@/lib/features/current/currentSlice"

interface User {
  id?: string;
}

interface PlaylistInformation {
  id?: string;
  title?: string;
  description?: string;
  tags?: string[];
  themeColor?: string;
}

const Playlist = () => {
  const [playlistData, setPlaylistData] = useState<PlaylistInformation[]>([]);
  const Playliststatus = useAppSelector((state) => state.status.currentState);
  const currPlaylist = useAppSelector((state) => state.current.currentPlaylist)
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: { user: { user: User[] } }) => state.user.user[0]
  );

  const renderNewPlaylistForm = () => {
    dispatch(changeStatus());
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/playlist?userId=${user.id}`
        );
        const playlists = await response.json();
        setPlaylistData(playlists);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };

    fetchPlaylist();
  }, [user?.id]);

  return (
      <div>
        {Playliststatus && <PlaylistForm />}
    <div className="p-4 mt-2 w-full max-w-md mx-auto border-2 h-[90vh] flex flex-col">

      {/* Input and Button */}
      <div className="flex flex-col gap-4 mb-6">
      {/* Search input with icon */}
      <div className="relative">
        <input
        type="text"
        className="w-full border border-gray-300 rounded-md p-3 pl-10"
        placeholder="Search playlists..."
        />
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
        />
        </svg>
      </div>

      {/* Button */}
      <Button onClick={renderNewPlaylistForm} className="w-full">
        + New Playlist
      </Button>
      </div>

      {/* Playlist Content */}
      <div className="flex-1 flex flex-col">
      {playlistData.length === 0 ? (
        <div className="w-full h-80 flex flex-col items-center justify-center border border-dashed border-purple-400 rounded-xl p-6 text-center text-purple-600 bg-purple-50">
        <p className="text-lg font-semibold">No Playlists Found</p>
        <p className="text-sm mt-2">Create a new playlist to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-full overflow-y-auto pr-2">
        {playlistData.map((data, idx) => {
          const dotColor =
          data.themeColor === "Purple"
            ? "bg-purple-600"
            : data.themeColor === "Learning Blue"
            ? "bg-blue-500"
            : data.themeColor === "Success Green"
            ? "bg-green-500"
            : data.themeColor === "Warning Orange"
            ? "bg-orange-500"
            : data.themeColor === "YouTube Red"
            ? "bg-red-500"
            : "bg-gray-500";

          return (
          <div
            key={data.id || idx}
            className={`relative cursor-pointer flex flex-col gap-2 rounded-xl shadow-sm p-4 border 
              ${
                currPlaylist === data.id
                  ? "border-purple-500 shadow-md"
                  : "border-gray-200"
              }
              `}
            onClick={() => dispatch(changeCurrentPlaylist(`${data.id}`))}
          >
            {/* Dot */}
            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${dotColor}`}></div>
            {/* Title */}
            <h2 className="text-lg font-semibold">{data.title}</h2>

            {/* Description */}
            <p className="text-sm text-gray-600">{data.description}</p>

            {/* Video count and tag */}
            <div className="flex justify-between items-center text-sm mt-2">
            <div className="flex items-center gap-1 text-gray-500">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
              >
              <path d="M10 15l5.19-3L10 9v6z" />
              <path
                fillRule="evenodd"
                d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 2v10h16V7H4z"
                clipRule="evenodd"
              />
              </svg>
              <span>{data.tags?.length || 0} videos</span>
            </div>
            <div className="bg-white border text-xs px-3 py-1 rounded-full text-gray-800 shadow-sm">
              Learning
            </div>
            </div>
          </div>
          );
        })}
        </div>
      )}
      </div>
    </div>
      </div>
  );
};

export default Playlist;
