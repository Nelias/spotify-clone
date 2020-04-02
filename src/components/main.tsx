import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Content = styled.main`
  background: #333;
  color: white;
  width: 90%;
  display: grid;
  align-items: center;
  margin-top: 50px;
  padding-bottom: 100px;
`

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`

const ItemsList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  align-items: left;
`

const Item = styled.li`
  background: #444;
  width: 150px;
  height: 150px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
`

const Title = styled.h2`
  font-size: 1.5rem;
`

export const Main: React.FC<{
  searchPhrase: string
  searchResponseData: any
}> = ({ searchPhrase, searchResponseData }) => {
  return (
    <>
      <Content>
        {searchResponseData && (
          <>
            <Title>Artists</Title>
            <ItemsList>
              {searchResponseData.artists
                ? searchResponseData.artists.items.map((artist: any) => (
                    <Item key={artist.name}>
                      <ItemImage src="https://c1.staticflickr.com/1/105/304194006_922af2210e_z.jpg?zz=1" />
                      {artist.name}
                    </Item>
                  ))
                : null}
            </ItemsList>

            <Title>Albums</Title>
            <ItemsList>
              {searchResponseData.albums
                ? searchResponseData.albums.items.map((elem: any) => (
                    <Item key={elem.name}>
                      <ItemImage
                        src={elem.images ? elem.images[1].url : ''}
                        alt=""
                      />
                      {elem.name}
                    </Item>
                  ))
                : null}
            </ItemsList>
            <Title>Tracks</Title>
            <ItemsList>
              {searchResponseData.tracks
                ? searchResponseData.tracks.items.map((elem: any) => (
                    <Item key={elem.name}>
                      <ItemImage
                        src={
                          elem.images
                            ? elem.images[1].url
                            : 'https://www.publicdomainpictures.net/pictures/260000/nahled/play-button-15282372642Gh.jpg'
                        }
                        alt=""
                      />
                      {elem.name}
                    </Item>
                  ))
                : null}
            </ItemsList>
          </>
        )}
      </Content>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const { searchPhrase, searchResponseData } = state
  return { searchPhrase, searchResponseData }
}

export default connect(mapStateToProps)(Main)
