import React from 'react'
import { PiPlay } from 'react-icons/pi'


import './ButtonPlay.scss'

type ButtonPlay = {
  style?: React.CSSProperties
}

const ButtonPlay: React.FC<ButtonPlay> = ({ style }) => {
  return (
    <button className="play-button" style={style}>
      <PiPlay />
      <div className="triangle"></div>
    </button>
  )
}

export default ButtonPlay
