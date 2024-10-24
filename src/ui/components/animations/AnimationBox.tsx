import React from 'react'

import './AnimationBox.scss'

export type AnimationBoxProps = {
  children?: string | JSX.Element | JSX.Element[],
  duration?: number,
  delay?: number,
  effect?: 'normal' | 'up-down' | 'down-up'
}

export const AnimationBox: React.FC<AnimationBoxProps> = ({
  children, duration, delay, effect,
}) => {

  let classes = `text-animation-box`
  if (effect === 'up-down') {
    classes = classes + ' animation-up-down'
  }

  if (effect === 'down-up') {
    classes = classes + ' animation-down-up'
  }

  return (
    <div className="text-animation">
        <div className={classes} style={{
            animationDelay: `${delay ?? 0.5}s`,
            animationDuration: `${duration ?? 1}s`,
          }}>
          { children }
        </div>
    </div>
  )
}
