import React from 'react'
import styled from 'styled-components'

const Player = styled.audio`
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: #111;
`

export const BottomBar: React.FC<{}> = () => {
  return (
    <Player controls>
      <source
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
        type="audio/mp3"
      />
    </Player>
  )
}
