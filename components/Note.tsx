import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button";
import EditNotesPhoto from "./EditNotesPhoto";
import HandlePhoto from "./HandlePhoto";

const CurrentContent = () => {
  const currentPlaylist = useAppSelector((state) => state.current.currentPlaylist);
  const currentLinkId = useAppSelector((state) => state.current.currentLink);
  const [linkData, setLinkData] = useState<any | null>(null);

  useEffect(() => {
    if (!currentPlaylist || !currentLinkId) return setLinkData(null);

    const fetchCurrentLink = async () => {
      try {
        const res = await fetch(`/api/dashboard/link?playlistId=${currentPlaylist}`);
        const allLinks = await res.json();
        const matched = allLinks.find((link: any) => link.id === currentLinkId);
        setLinkData(matched || null);
      } catch (error) {
        console.error("Failed to load current link", error);
        setLinkData(null);
      }
    };

    fetchCurrentLink();
  }, [currentPlaylist, currentLinkId]);

  if (!linkData) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center text-center text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mb-3 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-6.518 3.763A1 1 0 017 14.118V9.882a1 1 0 011.234-.97l6.518 1.637a1 1 0 010 1.618z"
          />
        </svg>
        <h2 className="text-lg font-semibold">Select content to start learning</h2>
        <p className="text-sm text-gray-500">
          Choose a video or website from your playlist to view it with your notes
        </p>
      </div>
    );
  }

  const { customTitle, customDescription, createdAt, aiTags, genre, url, duration, originalTitle } = linkData;
  const videoId = url.includes("youtube.com") ? new URL(url).searchParams.get("v") : null;
  const readableDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="space-y-4">
      {/* Display YouTube video or website fallback */}
      {videoId ? (
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={customTitle}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="border rounded-xl bg-gray-50 py-10 flex flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3v2a1 1 0 001 1h2M7 7h10v10H7V7z" />
          </svg>
          <h2 className="text-gray-600 mb-2">Website Link</h2>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-md bg-white border text-sm font-semibold hover:bg-gray-100"
          >
            Visit Website
          </a>
        </div>
      )}

      {/* Content Details */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{customTitle}</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200"
          >
            {videoId ? "YouTube" : "Website"}
          </a>
        </div>

        {originalTitle && (
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Original:</span> {originalTitle}
          </p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            📚 <span>Tech Explained</span>
          </div>
          <div className="flex items-center gap-1">
            📅 <span>Added {readableDate}</span>
          </div>
          {duration && (
            <div className="flex items-center gap-1">
              ⏱️ <span>{duration}</span>
            </div>
          )}
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            {videoId ? "video" : "website"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {aiTags?.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {genre && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
              {genre}
            </span>
          )}
        </div>

        {customDescription && (
          <p className="text-sm text-gray-700 mt-3">{customDescription}</p>
        )}
      </div>
      <EditNotesPhoto />
      <HandlePhoto />
    </div>
  );
};

export default CurrentContent;
