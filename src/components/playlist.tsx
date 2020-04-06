import * as React from 'react'
import { setCurrentTrackURL } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { TAlbumItem } from './albums'
import styled from 'styled-components'

interface PlaylistProps {
  data: TPlaylist
  type: 'album' | 'playlist'
}

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

  artists?: { name: string }[]
  album_type?: string
  release_date?: string
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

  @media only screen and (max-width: 600px) {
    width: 45vw;
  }
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

const ArtistNameSubtitle = styled.h3`
  margin-top: 5px;
  font-size: 13px;
  font-weight: normal;
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
  width: 50vw;

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
  width: 40px;
  height: auto;
  margin-right: 15px;
  filter: ${(props) => (props.isPlayable ? 'grayscale(100%)' : '')};
`

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Playlist: React.FC<PlaylistProps> = ({ data, type }) => {
  const dispatch = useDispatch()

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

  if (type === 'album') {
    console.log(data, 'ALBUM')

    return (
      <PlaylistWrapper>
        <PlayListInfoBox>
          <PlaylistImage src={data.images[0].url} alt="" />
          <PlaylistName>{data.name}</PlaylistName>
          <ArtistNameSubtitle>
            {data.artists &&
              data.artists.map((artist: any) => artist.name).join(' ')}
          </ArtistNameSubtitle>
          <span>
            {data.release_date && parseInt(data.release_date)}
            &nbsp; • &nbsp;
            {data.tracks.items.length}
            {data.tracks.items.length > 1 ? ' SONGS' : ' SONG'}
          </span>
        </PlayListInfoBox>

        <TrackList>
          {data.tracks.items.map((elem: any) => {
            return (
              <TrackItem
                key={elem.id}
                onClick={() => dispatch(setCurrentTrackURL(elem.preview_url))}
                isPlayable={!elem.preview_url}
              >
                <PlayerWrapper>
                  <PlayButton
                    isPlayable={!elem.preview_url}
                    src="/play-button.png"
                    alt=""
                  ></PlayButton>
                  <TrackDescription>
                    <TrackName>{elem.name}</TrackName>
                    <TrackArtist>
                      <span>
                        {shortenName(
                          elem.artists
                            .map((artist: any) => artist.name)
                            .join(' ')
                        )}
                      </span>
                    </TrackArtist>
                  </TrackDescription>
                </PlayerWrapper>

                <TrackTime>
                  {millisToMinutesAndSeconds(elem.duration_ms)}
                </TrackTime>
              </TrackItem>
            )
          })}
        </TrackList>
      </PlaylistWrapper>
    )
  }

  return (
    <PlaylistWrapper>
      <PlayListInfoBox>
        <PlaylistImage src={data.images[0].url} alt="" />
        <PlaylistName>{data.name}</PlaylistName>
        <p>{data.description}</p>
        <span>
          {data.tracks.items.length}
          {data.tracks.items.length > 1 ? ' SONGS' : ' SONG'}
        </span>
      </PlayListInfoBox>

      <TrackList>
        {data.tracks.items.map((elem: any) => {
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
