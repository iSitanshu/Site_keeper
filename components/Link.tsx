import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeLinkStatus } from "@/lib/features/status/statusSlice";
import LinkForm from "./LinkForm";
import { changeCurrentLink } from "@/lib/features/current/currentSlice";
import Image from "next/image";

interface Link {
  id: string;
  url: string;
  customTitle: string;
  createdAt: string;
  aiTags?: string[];
  genre?: string;
  customDescription?: string;
}


const LinkComponent = () => {
  const linkStatus = useAppSelector((state) => state.status.linkStatus);
  const currentPlaylist = useAppSelector(
    (state) => state.current.currentPlaylist
  );
  const dispatch = useAppDispatch();
  const [linkData, setLinkData] = useState<Link[]>([]);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentPlaylist) return;

    const fetchLink = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/link?playlistId=${currentPlaylist}`
        );
        const links = await response.json();
        setLinkData(links);
      } catch (error) {
        console.log("Failed to fetch links", error);
      }
    };

    fetchLink();
  }, [currentPlaylist]);

  const renderLinkForm = () => {
    dispatch(changeLinkStatus());
  };

  const filteredLinks = linkData.filter((link) =>
    link.customTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString();
  };

  return (
    <div>
      {linkStatus && <LinkForm />}

      <div className="p-4 mt-2 w-full max-w-md mx-auto border-2 h-[90vh] flex flex-col">
        {/* Search and Button Container */}
        <div className="border-2 border-gray-200 rounded-lg p-3 mb-6 w-full ">
          <div className="flex gap-3 items-center">
            {/* Search Input with Icon */}
            <div className="relative flex-1 w-3/4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Search Videos..."
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

            {/* Add Button */}
            <div className="w-1/4 min-w-[120px]">
              <Button
                onClick={() => {
                  if (!currentPlaylist) {
                    alert("Select any playlist to add link");
                    return;
                  }
                  renderLinkForm();
                }}
                className="w-full"
                disabled={!currentPlaylist}
              >
                + Add Content
              </Button>
            </div>
          </div>
        </div>

        {/* Links List */}
        <div className="flex flex-col gap-3">
          {filteredLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => {
                setSelectedLinkId(link.id);
                dispatch(changeCurrentLink(link.id));
              }}
              className={`p-4 border rounded-lg cursor-pointer transition-all 
                ${
                  selectedLinkId === link.id
                    ? "border-purple-500 shadow-md"
                    : "border-gray-200"
                }`}
            >
              <div className="flex gap-4">
                {/* Thumbnail or icon */}
                <div className="w-24 h-16 bg-gray-200 flex items-center justify-center text-gray-600 font-bold rounded-md overflow-hidden">
                  {link.url.includes("youtube.com") ? (
                    // <img
                    //   src=
                    //   alt="video"
                    //   className="w-full h-full object-cover"
                    // />
                    <Image src={`https://img.youtube.com/vi/${new URL(
                        link.url
                      ).searchParams.get("v")}/0.jpg`} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 005.657-5.657l-1.414-1.414a4 4 0 00-5.657 5.657z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.172 10.172a4 4 0 01-5.657 5.657L3.1 14.415a4 4 0 015.657-5.657z"
                      />
                    </svg>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-md font-semibold">
                      {link.customTitle}
                    </h3>
                    <span className="text-gray-500 text-sm">
                      {formatDate(link.createdAt)}
                    </span>
                    {link.url.includes("youtube.com") ? (
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-700">
                        video
                      </span>
                    ) : (
                      <span className="text-xs bg-blue-100 px-2 py-0.5 rounded-full text-blue-700">
                        website
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-1">
                    {link.aiTags?.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {link.genre && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        {link.genre}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {link.customDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filteredLinks.length === 0 && (
            <div className="w-full h-80 flex flex-col items-center justify-center border border-dashed border-purple-400 rounded-xl p-6 text-center text-purple-600 bg-purple-50">
              <p className="text-lg font-semibold">
                No content found for the selected playlist.
              </p>
              <p className="text-sm mt-2">Add New Links to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkComponent;
