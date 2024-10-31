import React from 'react'


import './ButtonPlay.scss'

type ButtonPlay = {
  size?: 'icon' | 'xl'
}

const ButtonPlay: React.FC<ButtonPlay> = ({ size }) => {
  return (
    <button className={`play-button ${size === 'xl' ? 'xl-btn' : ''}`} aria-label="Play" />
  )
}

export default ButtonPlay
