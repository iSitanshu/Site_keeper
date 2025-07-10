import React from 'react'

interface PlaylistProps {
  userId: string;
}

const LinkComponent: React.FC<PlaylistProps> = ({ userId }) => {
  return (
    <div>LinkComponent {userId}</div>
  )
}

export default LinkComponent