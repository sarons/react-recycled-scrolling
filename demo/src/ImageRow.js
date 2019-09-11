import React from 'react'

export default function ImageRow({ no, url, alt }) {
  return (
    <div className='ListItem'>
      Image number: {no} &emsp;
      <img src={url} alt={alt}/>
    </div>
  )
}