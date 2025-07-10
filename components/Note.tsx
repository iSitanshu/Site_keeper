import React from 'react'

interface PlaylistProps {
  userId: string;
}

const Note: React.FC<PlaylistProps> = ({ userId }) => {
  return (
    <div>Note {userId}</div>
  )
}

export default Note