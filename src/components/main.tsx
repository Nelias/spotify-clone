import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { setCurrentTrackURL } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import { Albums } from './albums'
import Categories from './categories'
import Playlists from './playlists'
import Playlist from './playlist'

type TError = {
  status: number
  message: string
}

interface MainProps {
  searchResponseData: TError | any
  isSearchLoading: boolean
  categories: TError | any
  areCategoriesLoading: boolean
  newReleases: TError | any
  areNewReleasesLoading: boolean
  currentCategoryPlaylists: TError | any
  currentPlaylist: TError | any
  isPlaylistLoading: boolean
}

const Content = styled.main`
  background: #111;
  color: white;
  width: 90%;
  display: grid;
  align-items: center;
  margin-top: 45px;
  padding-bottom: 100px;
`

export const ItemsList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const Item = styled.li`
  background: #333;
  width: 150px;
  height: 240px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
`

export const ItemImage = styled.img`
  width: 120px;
  height: 120px;
`

export const ArtistImage = styled(ItemImage)`
  border-radius: 100%;
`

export const TrackImage = styled.img`
  width: 50px;
  height: 50px;
`

interface TrackProps {
  isPlayable: boolean
}

const Track = styled(Item)<TrackProps>`
  &:hover {
    ${(props) =>
      props.isPlayable ? 'cursor: not-allowed;' : 'cursor: pointer;'}
  }
`

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-top: 50px;
`

export const Spinner = styled.img`
  margin: 0 auto;
  width: 130px;
`

export const shortenName = (name: string) => {
  const textLength: number = 13

  return name.length > textLength
    ? name.slice(0, textLength).concat('...')
    : name
}

export const Main: React.FC<MainProps> = ({
  searchResponseData,
  isSearchLoading,
  categories,
  areCategoriesLoading,
  newReleases,
  areNewReleasesLoading,
  currentCategoryPlaylists,
  currentPlaylist,
  isPlaylistLoading,
}) => {
  const dispatch = useDispatch()

  return (
    <Content>
      <Route exact path="/categories/:id/:playlist">
        {isPlaylistLoading && <Spinner src="spinner.svg" alt="spinner" />}
        {!isPlaylistLoading && currentPlaylist ? (
          currentPlaylist.status && currentPlaylist.status !== 200 ? (
            <div>
              <h2>Playlist Error {currentPlaylist.status}</h2>
              <p>{currentPlaylist.message}</p>
            </div>
          ) : (
            <Playlist data={currentPlaylist} />
          )
        ) : (
          <p>This path is not valid</p>
        )}
      </Route>
      <Route exact path="/categories/:id">
        {isPlaylistLoading && <Spinner src="spinner.svg" alt="spinner" />}
        {!isPlaylistLoading && currentCategoryPlaylists ? (
          currentCategoryPlaylists.status &&
          currentCategoryPlaylists.status !== 200 ? (
            <div>
              <h2>Playlist Error {currentCategoryPlaylists.status}</h2>
              <p>{currentCategoryPlaylists.message}</p>
            </div>
          ) : (
            <Playlists data={currentCategoryPlaylists} />
          )
        ) : (
          <p>This path is not valid</p>
        )}
      </Route>
      <Route exact path="/categories">
        {areCategoriesLoading && <Spinner src="spinner.svg" alt="spinner" />}
        {!areCategoriesLoading && categories ? (
          categories.status && categories.status !== 200 ? (
            <div>
              <h2>Categories Error {categories.status}</h2>
              <p>{categories.message}</p>
            </div>
          ) : (
            <Categories data={categories} />
          )
        ) : null}
      </Route>
      <Route exact path="/new-releases">
        {areNewReleasesLoading && isSearchLoading && (
          <Spinner src="spinner.svg" alt="spinner" />
        )}
        {!areNewReleasesLoading && newReleases ? (
          newReleases.status && newReleases.status !== 200 ? (
            <div>
              <h2>New Releases Error {newReleases.status}</h2>
              <p>{newReleases.message}</p>
            </div>
          ) : (
            <Albums data={newReleases} />
          )
        ) : null}
      </Route>
      <Route exact path="/">
        {isSearchLoading && <Spinner src="spinner.svg" alt="spinner" />}
        {!isSearchLoading && searchResponseData ? (
          searchResponseData.status && searchResponseData.status !== 200 ? (
            <div>
              <h2>Search Error {searchResponseData.status}</h2>
              <p>{searchResponseData.message}</p>
            </div>
          ) : (
            <>
              <Title>Artists</Title>
              <ItemsList>
                {searchResponseData.artists
                  ? searchResponseData.artists.items.map((artist: any) => (
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

              <Albums data={searchResponseData} />

              <Title>Tracks</Title>
              <ItemsList>
                {searchResponseData.tracks
                  ? searchResponseData.tracks.items.map((elem: any) => (
                      <Track
                        key={elem.id}
                        onClick={() =>
                          dispatch(setCurrentTrackURL(elem.preview_url))
                        }
                        isPlayable={!elem.preview_url}
                      >
                        <TrackImage
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
          )
        ) : null}
      </Route>
    </Content>
  )
}

const mapStateToProps = (state: any) => {
  console.log(state)
  const { searchResponseData, isSearchLoading } = state.search
  const {
    categories,
    areCategoriesLoading,
    newReleases,
    areNewReleasesLoading,
  } = state.sidebar
  const {
    currentCategoryPlaylists,
    currentPlaylist,
    isPlaylistLoading,
  } = state.player

  return {
    searchResponseData,
    isSearchLoading,
    categories,
    areCategoriesLoading,
    newReleases,
    areNewReleasesLoading,
    currentCategoryPlaylists,
    currentPlaylist,
    isPlaylistLoading,
  }
}

export default connect(mapStateToProps, { setCurrentTrackURL })(Main)
