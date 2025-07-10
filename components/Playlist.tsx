import React from 'react'

interface PlaylistProps {
  userId: string;
}

const Playlist: React.FC<PlaylistProps> = ({ userId }) => {
  return (
    <div>Playlist {userId}</div>
  )
}

export default Playlist