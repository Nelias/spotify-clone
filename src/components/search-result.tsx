import * as React from 'react'
import { setCurrentTrackURL } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { Albums } from './albums'
import styled from 'styled-components'
import { Title, ItemsList, Item, Track, ArtistImage, shortenName } from './main'

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
        {data.artists
          ? data.artists.items.map((artist: any) => (
              <Item key={artist.id}>
                <ArtistImage
                  src={
                    artist.images.length > 0
                      ? artist.images[0].url
                      : 'https://c1.staticflickr.com/1/105/304194006_922af2210e_z.jpg?zz=1'
                  }
                />

                {shortenName(artist.name)}
              </Item>
            ))
          : null}
      </ItemsList>

      <Albums data={data} title="Albums" />

      <Title>Tracks</Title>
      <ItemsList>
        {data.tracks
          ? data.tracks.items.map((elem: any) => (
              <Track
                key={elem.id}
                onClick={() => dispatch(setCurrentTrackURL(elem.preview_url))}
                isPlayable={!elem.preview_url}
              >
                <TrackImage
                  src={
                    elem.images
                      ? elem.album.images[1].url
                      : !elem.preview_url
                      ? '/broken.png'
                      : '/play-button.png'
                  }
                  alt={`play ${elem.name}`}
                />
                {shortenName(elem.name)}
                <br />
                <br />
                {shortenName(elem.artists[0].name)}
              </Track>
            ))
          : null}
      </ItemsList>
    </>
  )
}

export default connect(null, { setCurrentTrackURL })(SearchResult)
