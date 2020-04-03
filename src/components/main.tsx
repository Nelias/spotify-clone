import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { setCurrentTrackURL } from '../redux/actions'
import { useDispatch } from 'react-redux'

const Content = styled.main`
  background: #111;
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
`

const ArtistImage = styled(ItemImage)`
  border-radius: 100%;
`

const ItemsList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const Item = styled.li`
  background: #333;
  width: 150px;
  height: 180px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
`

const Track = styled(Item)`
  &:hover {
    cursor: pointer;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-top: 50px;
`

export const Main: React.FC<{
  searchResponseData: any
}> = ({ searchResponseData }) => {
  const dispatch = useDispatch()

  const shortenName = (name: string) => name

  return (
    <>
      <Content>
        {searchResponseData && (
          <>
            <Title>Artists</Title>
            <ItemsList>
              {searchResponseData.artists
                ? searchResponseData.artists.items.map((artist: any) => (
                    <Item key={artist.id}>
                      <ArtistImage src="https://c1.staticflickr.com/1/105/304194006_922af2210e_z.jpg?zz=1" />
                      {shortenName(artist.name)}
                    </Item>
                  ))
                : null}
            </ItemsList>

            <Title>Albums</Title>
            <ItemsList>
              {searchResponseData.albums
                ? searchResponseData.albums.items.map((elem: any) => (
                    <Item key={elem.id}>
                      <ItemImage
                        src={elem.images ? elem.images[1].url : ''}
                        alt=""
                      />
                      {shortenName(elem.name)}
                      <br />
                      <br />
                      {shortenName(elem.artists[0].name)}
                    </Item>
                  ))
                : null}
            </ItemsList>
            <Title>Tracks</Title>
            <ItemsList>
              {searchResponseData.tracks
                ? searchResponseData.tracks.items.map((elem: any) => (
                    <Track
                      key={elem.id}
                      onClick={() =>
                        dispatch(setCurrentTrackURL(elem.preview_url))
                      }
                    >
                      <ItemImage
                        src={
                          elem.images
                            ? elem.album.images[1].url
                            : !elem.preview_url
                            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/DoNotFeedTroll.svg/200px-DoNotFeedTroll.svg.png'
                            : 'https://cdn.pixabay.com/photo/2017/08/29/09/40/color-is-changable-in-ps-2692603_960_720.png'
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
        )}
      </Content>
    </>
  )
}

const mapStateToProps = (state: any) => {
  console.log(state)
  const { searchResponseData } = state.search
  console.log(searchResponseData)
  return { searchResponseData }
}

export default connect(mapStateToProps, { setCurrentTrackURL })(Main)
