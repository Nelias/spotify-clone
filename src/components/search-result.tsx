import * as React from 'react'
import { setCurrentTrackURL, fetchArtistAlbums } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { Albums } from './albums'
import styled from 'styled-components'
import {
  Title,
  ItemsList,
  Item,
  Track,
  ArtistImage,
  ItemSubtitle,
  ItemTextWrapper,
} from './main'
import { Link } from 'react-router-dom'

export const TrackImage = styled.img`
  width: 50px;
  height: 50px;
`

export const SearchResult: React.FC<{ data: any }> = ({ data }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Title>Artists</Title>
      <ItemsList>
        {data?.artists?.items.length > 0 ? (
          data.artists.items.map((artist: any) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              onClick={() => fetchArtistAlbums(dispatch, artist.id)}
            >
              <Item>
                <ArtistImage
                  src={
                    artist.images.length > 0
                      ? artist.images[0].url
                      : 'https://c1.staticflickr.com/1/105/304194006_922af2210e_z.jpg?zz=1'
                  }
                />
                <ItemTextWrapper>
                  {artist.name}
                  <ItemSubtitle>Artist</ItemSubtitle>
                </ItemTextWrapper>
              </Item>
            </Link>
          ))
        ) : (
          <p>There are no search results for your query!</p>
        )}
      </ItemsList>

      <Albums data={data} title="Albums" />

      <Title>Tracks</Title>
      <ItemsList>
        {data.tracks && data.tracks.items.length > 0 ? (
          data.tracks.items.map((elem: any) => (
            <Track
              key={elem.id}
              onClick={() => dispatch(setCurrentTrackURL(elem.preview_url))}
              isPlayable={!elem.preview_url}
            >
              <TrackImage src="/play-button.png" alt={`play ${elem.name}`} />
              <ItemTextWrapper>
                {elem.name}
                <ItemSubtitle>{elem.artists[0].name}</ItemSubtitle>
              </ItemTextWrapper>
            </Track>
          ))
        ) : (
          <p>There are no search results for your query!</p>
        )}
      </ItemsList>
    </>
  )
}

export default connect(null, { setCurrentTrackURL, fetchArtistAlbums })(
  SearchResult
)
