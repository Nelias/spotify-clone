import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Player = styled.audio`
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: #111;
`

const BottomBar: React.FC<{ currentTrack: any }> = (currentTrack) => {
  return (
    <div>
      <Player
        src={`${currentTrack.currentTrack}`}
        controls
        autoPlay={
          !(
            currentTrack.currentTrack ===
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
          )
        }
      />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  const { currentTrack } = state.player
  console.log(currentTrack)
  return { currentTrack }
}

export default connect(mapStateToProps)(BottomBar)
