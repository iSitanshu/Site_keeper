import React from "react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeLinkStatus } from "@/lib/features/status/statusSlice";
import LinkForm from "./LinkForm";

const LinkComponent = () => {
  const linkStatus = useAppSelector((state) => state.status.linkStatus)
  const currentPlaylist = useAppSelector((state) => state.current.currentPlaylist)
  const dispatch = useAppDispatch()
  const renderLinkForm = () => {
    dispatch(changeLinkStatus());
  }
  return (
    <div>
      {linkStatus && <LinkForm />}
      <div className="p-4">
      <div className="relative w-2/3 gap-0.5 flex justify-between">
        <input
          type="text"
          className=" border border-gray-300 rounded-md p-2 pl-10"
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
        <Button
          onClick={() => {
            if (!currentPlaylist) {
              alert("Select any playlist to add link");
              return;
            }
            renderLinkForm();
          }}
          className="w-1/3 cursor-pointer"
          disabled={!currentPlaylist}
        >
          + Add Content
        </Button>
      </div>
      {/* Render all the Links  */}
      <div>
        
      </div>
    </div>
    </div>
  );
};

export default LinkComponent;
