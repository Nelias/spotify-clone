import * as React from 'react'
import { setCurrentTrackURL } from '../redux/actions'
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
        {data.artists && data.artists.items.length > 1 ? (
          data.artists.items.map((artist: any) => (
            <Item key={artist.id}>
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
          ))
        ) : (
          <p>There are no search results for your query!</p>
        )}
      </ItemsList>

      <Albums data={data} title="Albums" />

      <Title>Tracks</Title>
      <ItemsList>
        {data.tracks && data.tracks.items.length > 1 ? (
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

export default connect(null, { setCurrentTrackURL })(SearchResult)
