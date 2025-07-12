import { useAppSelector } from '@/lib/hooks'
import React, { useState } from 'react'

const HandlePhoto = () => {
    const [renderPhotos, setRenderPhotos] = useState(false)
    const playlistId = useAppSelector((state) => state.current.currentPlaylist)
    const linkId = useAppSelector((state) => state.current.currentLink)

  return (
    <div border-2>
        <h1>📊Handwritten Notes</h1>
        <div className='border-dashed'>
            icon
            <p>Upload photos of your handwritten notes</p>
            choose file
        </div>
        {renderPhotos && 
        <div>
        </div>}
    </div>
  )
}

export default HandlePhoto