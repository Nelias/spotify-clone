import { Title, ItemsList, Item } from './main'
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
`

const PlaylistImage = styled.img`
  max-width: 400px;
  width: 100vw;
`

const PlaylistName = styled.span`
  display: block;
  font-size: 28px;
  line-height: 36px;
  color: #fff;
  text-transform: none;
  overflow-wrap: break-word;
`

const PlayListInfoBox = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`

const TrackList = styled.ol``
const TrackItem = styled.li`
  display: flex;
  justify-content: space-between;
  height: 65px;

  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.015em;
  color: #b3b3b3;
  text-transform: none;
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;
`

const TrackDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: inherit;
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

  return (
    <PlaylistWrapper>
      <PlayListInfoBox>
        <PlaylistImage src="" alt="" />
        <PlaylistName>{data.name}</PlaylistName>
      </PlayListInfoBox>

      <TrackList>
        {data.tracks.items.map((elem: any) => {
          console.log(elem)
          return (
            <TrackItem key={elem.id}>
              <TrackDescription>
                <TrackName>{elem.track.name}</TrackName>
                <TrackArtist>
                  {elem.track.artists.map((artist: any) => (
                    <span>{artist.name}</span>
                  ))}
                  <span aria-label="in album"> • </span>
                  {elem.track.album.name}
                </TrackArtist>
              </TrackDescription>

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
