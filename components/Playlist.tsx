"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';
import PlaylistForm from './PlaylistForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeStatus } from '@/lib/features/status/statusSlice';

interface PlaylistProps {
  userId: string;
}

const Playlist: React.FC<PlaylistProps> = ({ userId }) => {
  const [all_playlist, setAll_playlist] = useState([])
  const status = useAppSelector((state) => state.status.currentState)
  const dispatch = useAppDispatch()
  const renderNewPlaylistForm = () => {
    dispatch(changeStatus())
  }
  return (
    <div>
      {status && <PlaylistForm />}
      <div className='flex'>
      <input 
      type="text" 
      className='border-2 p-2 w-2/3'
      placeholder='Search playlists...'
      />
      <Button
      onClick={() => renderNewPlaylistForm()}
      >+ New Playlist</Button>
      {all_playlist.length === 0
      ?<div>
        No Playlist available
        <span>Create a playlist</span>
      </div>
      :(<div>Bad</div>)}
    </div>
    </div>
  )
}

export default Playlist