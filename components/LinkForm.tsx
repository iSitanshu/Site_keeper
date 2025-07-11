import React, { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { changeLinkStatus, changeStatus } from '@/lib/features/status/statusSlice';

const LinkForm = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useAppDispatch();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      youtubeUrl,
      title,
      tags,
      notes,
    };

    console.log("Video submitted:", data);
    // submit via axios if needed

    dispatch(changeLinkStatus()); // close modal
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50  backdrop-filter backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-[400px] p-6"
      >
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-red-600 text-xl">📺</span> Add Video or Website   
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Add a video to your learning playlist with custom notes and tags.
        </p>

        <label className="block text-sm font-medium mb-1">URL</label>
        <input
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1">Custom Title *</label>
        <input
          type="text"
          placeholder="e.g., Kafka Producer Implementation"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1">Tags</label>
        <div className="flex items-center mb-2 gap-2">
          <input
            type="text"
            placeholder="Add a tag..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <label className="block text-sm font-medium mb-1">Initial Notes (Optional)</label>
        <textarea
          placeholder="What do you want to learn from this video?"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none mb-4"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
            onClick={() => dispatch(changeLinkStatus())}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            Add Video
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;
