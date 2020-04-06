import * as React from 'react'
import { setCurrentTrackURL } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { TAlbumItem } from './albums'
import styled from 'styled-components'

type TImage = {
  url: string
}

type TTrack = {
  album: TAlbumItem
  artists: { name: string }[]
  duration_ms: number
  href: string
  id: string
  name: string
  preview_url: string
  track: boolean
  track_number: number
}

type TTracks = {
  href: string
  total: number
  added_at: string
  track: TTrack[]
}

export type TPlaylist = {
  id: string
  name: string
  description: string
  images: TImage[]
  primary_color: string

  href: string
  tracks: { items: TTracks[] }
  followers: { href: string | null; total: number }
}

const PlaylistWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 40px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`

const PlaylistImage = styled.img`
  max-width: 300px;
  width: 20vw;
  margin-bottom: 15px;
`

const PlaylistName = styled.span`
  display: block;

  font-size: 28px;
  line-height: 36px;
  color: #fff;
  text-transform: none;
  overflow-wrap: break-word;
  font-weight: bold;
`

const PlayListInfoBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding-bottom: 30px;

  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.015em;
  color: #b3b3b3;
  text-transform: none;
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;
`

const TrackList = styled.ol`
  padding-left: 10px;
  @media only screen and (max-width: 600px) {
    align-self: baseline;
  }
`

const TrackItem = styled.li<{ isPlayable: boolean }>`
  display: flex;
  justify-content: space-between;
  height: 65px;

  white-space: nowrap;
  overflow: hidden;

  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.015em;
  color: #b3b3b3;
  text-transform: none;
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;

  &:hover {
    ${(props) =>
      props.isPlayable ? 'cursor: not-allowed;' : 'cursor: pointer;'}
  }
`

const TrackDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: inherit;

  @media only screen and (max-width: 600px) {
    width: 48vw;
    overflow: hidden;
  }
`

const TrackName = styled.div`
  display: flex;

  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.015em;
  color: #fff;
`

const TrackArtist = styled.div`
  display: flex;
  justify-content: left;
`

const TrackTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
`

const PlayButton = styled.img<{ isPlayable: boolean }>`
  width: 35px;
  height: auto;
  margin-right: 10px;
  filter: ${(props) => (props.isPlayable ? 'grayscale(100%)' : '')};
`

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Playlist: React.FC<{ data: TPlaylist }> = ({ data }) => {
  const dispatch = useDispatch()
  let location = useLocation()
  console.log(location.pathname, location)

  function millisToMinutesAndSeconds(millis: number) {
    var minutes: number = Math.floor(millis / 60000)
    var seconds: any = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  function shortenName(name: string) {
    const textLength: number = 60

    return name.length > textLength
      ? name.slice(0, textLength).concat('...')
      : name
  }

  return (
    <PlaylistWrapper>
      <PlayListInfoBox>
        <PlaylistImage src={data.images[0].url} alt="" />
        <PlaylistName>{data.name}</PlaylistName>
        <p>{data.description}</p>
        <span>{data.tracks.items.length} SONGS</span>
      </PlayListInfoBox>

      <TrackList>
        {data.tracks.items.map((elem: any) => {
          console.log(elem)
          return (
            <TrackItem
              key={elem.id}
              onClick={() =>
                dispatch(setCurrentTrackURL(elem.track.preview_url))
              }
              isPlayable={!elem.track.preview_url}
            >
              <PlayerWrapper>
                <PlayButton
                  isPlayable={!elem.track.preview_url}
                  src="/play-button.png"
                  alt=""
                ></PlayButton>
                <TrackDescription>
                  <TrackName>{elem.track.name}</TrackName>
                  <TrackArtist>
                    <span>
                      {shortenName(
                        elem.track.artists
                          .map((artist: any) => artist.name)
                          .concat(' • ', `${elem.track.album.name}`)
                          .join(' ')
                      )}
                    </span>
                  </TrackArtist>
                </TrackDescription>
              </PlayerWrapper>

              <TrackTime>
                {millisToMinutesAndSeconds(elem.track.duration_ms)}
              </TrackTime>
            </TrackItem>
          )
        })}
      </TrackList>
    </PlaylistWrapper>
  )
}

export default connect(null, { setCurrentTrackURL })(Playlist)
