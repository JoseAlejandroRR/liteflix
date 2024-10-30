import React from 'react'


import './ButtonPlay.scss'

type ButtonPlay = {
  size?: 'icon' | 'xl'
}

const ButtonPlay: React.FC<ButtonPlay> = ({ size }) => {
  return (
    <button aria-label="Play" className={`play-button ${size === 'xl' ? 'xl-btn' : ''}`} />
  )
}

export default ButtonPlay
