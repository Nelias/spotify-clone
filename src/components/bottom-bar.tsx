import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const activePlayerButtonColor = '#00c90c'
const playerButtonsColor = '#f7f8fa'

const Player = styled(AudioPlayer)`
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 5;

  &.rhap_container {
    background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0 0 3px #403f3f;
    outline: none;

    * {
      outline: none;
    }
  }

  .rhap_main {
    flex-direction: row;
    padding: 0 24px;
  }

  .rhap_main-controls-button {
    color: ${playerButtonsColor};
  }

  [aria-label='Pause'] {
    color: ${activePlayerButtonColor};
  }

  .rhap_time {
    color: ${playerButtonsColor};
  }

  .rhap_progress-bar {
    background-color: ${playerButtonsColor};
  }

  .rhap_progress-filled {
    background-color: ${activePlayerButtonColor};
  }

  .rhap_progress-indicator {
    display: none;
  }

  .rhap_repeat-button {
    color: ${playerButtonsColor};
  }

  .rhap_volume-button {
    color: ${playerButtonsColor};
  }

  .rhap_volume-bar {
    background: ${playerButtonsColor};
  }

  .rhap_volume-indicator {
    background: ${activePlayerButtonColor};
    opacity: 1;
    border: 2px solid ${playerButtonsColor};
  }

  .rhap_button-clear:hover {
    opacity: 1;
  }

  .rhap_controls-section {
    margin-left: 32px;
    margin-top: 0;
  }

  @media only screen and (max-width: 1024px) {
    .rhap_controls-section {
      margin-left: -2px;
      margin-top: 0;
    }

    .rhap_main {
      flex-direction: column-reverse;
      padding: initial;
    }
  }
`

const BottomBar: React.FC<{ currentTrack: any }> = (currentTrack) => {
  return (
    <div>
      <Player
        src={`${currentTrack.currentTrack}`}
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
  return { currentTrack }
}

export default connect(mapStateToProps)(BottomBar)
