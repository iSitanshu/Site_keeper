import { changeStatus } from '@/lib/features/status/statusSlice';
import { useAppDispatch } from '@/lib/hooks';
import axios from "axios";
import React, { useState } from 'react';

const colorThemes = [
  { name: 'Primary', color: 'bg-purple-600' },
  { name: 'Learning Blue', color: 'bg-blue-500' },
  { name: 'Success Green', color: 'bg-green-500' },
  { name: 'Warning Orange', color: 'bg-orange-400' },
  { name: 'YouTube Red', color: 'bg-red-600' },
  { name: 'Purple', color: 'bg-violet-400' },
];
const selectTags = [
  {name: 'Learning'},
  {name: 'Coding'},
  {name: 'Music'},
  {name: 'Creating'}
]

const PlaylistForm = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('Primary');
  const [tags, setTags] = useState('Learning')
  const dispatch = useAppDispatch();

  const handlePlaylistSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playlistName.trim() || !description) {
      alert("Fill the required info!");
      return;
    }

    try {
      const payload = {
        title: playlistName,
        description,
        themeColor: selectedColor,
        tags,
        
      };

      await axios.post('/api/playlist', payload); // replace with your actual backend route

      dispatch(changeStatus()); // closes the modal
      setPlaylistName('');
      setDescription('');
      setSelectedColor('Primary');
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert('Failed to create playlist. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
      <form
        onSubmit={handlePlaylistSubmission}
        className="bg-white rounded-xl shadow-lg w-[400px] p-6"
      >
        <h2 className="text-xl font-semibold mb-2">🎧 Create New Playlist</h2>
        <p className="text-sm text-gray-600 mb-4">
          Create a new learning playlist to organize your YouTube videos by topic.
        </p>

        <label className="block text-sm font-medium mb-1">Playlist Name *</label>
        <input
          type="text"
          placeholder="e.g., Apache Kafka, React Hooks, System Design"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          value={playlistName}
          required
          onChange={(e) => setPlaylistName(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          placeholder="Brief description of what you'll learn in this playlist..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4 resize-none"
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2">🎨 Color Theme</label>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              type="button"
              onClick={() => setSelectedColor(theme.name)}
              className={`rounded-lg p-2 text-white flex justify-center items-center ${
                selectedColor === theme.name ? 'ring-2 ring-purple-500' : 'border-transparent'
              } ${theme.color}`}
            >
              {theme.name}
            </button>
          ))}
        </div>

        <label>Select your TAGS🏆</label>
        <div className='grid grid-cols-3 gap-2 mb-6'>
          {selectTags.map((currtags) => (
            <button
            key={currtags.name}
            type='button'
            onClick={() => setTags(currtags.name)}
            className={`rounded-lg flex justify-center items-center ${
                tags === currtags.name ? 'ring-2 ring-purple-500' : 'border-transparent'
              } ${currtags.name}`}
            >
              {currtags.name}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
            onClick={() => dispatch(changeStatus())}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            Create Playlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaylistForm;
