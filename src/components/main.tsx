import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { Albums } from './albums/albums'
import Categories from './categories/categories'
import Playlists from './playlists/playlists'
import Playlist from './playlist/playlist'
import UserProfile from './user-profile/user-profile'
import SearchResult from './search-result/search-result'
import { DataError, ErrorWrapper } from './data-error/data-error'
import { ArtistAlbums } from './artist-albums/artist-albums'

type TError = {
  status: number
  message: string
}

type TrackProps = {
  isPlayable: boolean
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
  userProfile: TError | any
  isUserProfileLoading: boolean
  artistAlbums: TError | any
  areArtistAlbumsLoading: boolean
}

const itemContentWidth = '140px'

const Content = styled.main`
  background: #111;
  color: white;
  width: 90%;
  align-items: center;
  margin-top: 45px;
  padding-bottom: 100px;
  overflow: hidden;

  a {
    color: white;
    text-decoration: none;
  }
`

export const ItemsList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  margin-bottom: 100px;
`

export const Item = styled.li`
  background: #282828;
  width: 180px;
  height: 235px;
  margin: 10px;
  padding: 3px 0 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
`

export const ItemTextWrapper = styled.div`
  display: block;
  width: ${itemContentWidth};
  min-width: 0;
  padding: 0;
  text-align: left;

  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.24px;

  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
`

export const ItemSubtitle = styled.span`
  display: block;
  width: ${itemContentWidth};
  padding: 0;
  margin-top: 3px;

  font-size: 11px;
  line-height: 18px;
  color: #b3b3b3;
  text-transform: none;
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;
`

export const ItemImage = styled.img`
  width: ${itemContentWidth};
  height: ${itemContentWidth};
`

export const ArtistImage = styled(ItemImage)`
  border-radius: 100%;
`

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-top: 50px;
  margin-bottom: 30px;
`

export const Spinner = styled.img`
  margin: 0 auto;
  height: 82vh;

  width: 130px;
`

export const Track = styled(Item)<TrackProps>`
  height: 200px;
  padding: 3px 0 0 0;
  filter: ${(props) => (props.isPlayable ? 'grayscale(100%)' : '')};

  &:hover {
    ${(props) =>
      props.isPlayable ? 'cursor: not-allowed;' : 'cursor: pointer;'}
  }
`

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
  userProfile,
  isUserProfileLoading,
  artistAlbums,
  areArtistAlbumsLoading,
}) => {
  return (
    <Content>
      <Switch>
        <Route exact path="/categories/:id/:playlist">
          {isPlaylistLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!isPlaylistLoading && currentPlaylist && (
            <DataError data={currentPlaylist} title="Playlist">
              <Playlist type="playlist" />
            </DataError>
          )}
        </Route>
        <Route exact path="/categories/:id">
          {isPlaylistLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!isPlaylistLoading && currentCategoryPlaylists && (
            <DataError data={currentCategoryPlaylists} title="Playlist">
              <Playlists data={currentCategoryPlaylists} />
            </DataError>
          )}
        </Route>
        <Route exact path="/categories">
          {areCategoriesLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!areCategoriesLoading && categories && (
            <DataError data={categories} title="Categories">
              <Categories data={categories} />
            </DataError>
          )}
        </Route>
        <Route exact path="/new-releases">
          {areNewReleasesLoading && isSearchLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!areNewReleasesLoading && newReleases && (
            <DataError data={newReleases} title="New Releases">
              <Albums data={newReleases} title="New Releases" />
            </DataError>
          )}
        </Route>
        <Route exact path="/user-profile">
          {isUserProfileLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!isUserProfileLoading && userProfile && (
            <DataError data={userProfile} title="User Profile">
              <UserProfile />
            </DataError>
          )}
        </Route>
        <Route exact path="/album/:id">
          {isPlaylistLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!isPlaylistLoading && currentPlaylist && (
            <DataError data={currentPlaylist} title="Playlist">
              <Playlist type="album" />
            </DataError>
          )}
        </Route>
        artistAlbums
        <Route exact path="/artist/:id">
          {areArtistAlbumsLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!areArtistAlbumsLoading && artistAlbums && (
            <DataError data={artistAlbums} title="Search">
              <ArtistAlbums data={artistAlbums} />
            </DataError>
          )}
        </Route>
        <Route exact path="/search">
          {isSearchLoading && (
            <Spinner
              src={`${process.env.PUBLIC_URL}/spinner.svg`}
              alt="spinner"
            />
          )}

          {!isSearchLoading && searchResponseData && (
            <DataError data={searchResponseData} title="Search">
              <SearchResult data={searchResponseData} />
            </DataError>
          )}
        </Route>
        <Route exact path="/">
          <ErrorWrapper>
            <h2>Welcome to Stringify!</h2>
          </ErrorWrapper>
        </Route>
        <Route>
          <DataError
            data={{ status: 404, message: 'Content not found!' }}
            title=""
          >
            {null}
          </DataError>
        </Route>
      </Switch>
    </Content>
  )
}

const mapStateToProps = (state: any) => {
  const { searchResponseData, isSearchLoading } = state.search

  const {
    categories,
    areCategoriesLoading,
    newReleases,
    areNewReleasesLoading,
    userProfile,
    isUserProfileLoading,
  } = state.sidebar

  const {
    currentCategoryPlaylists,
    currentPlaylist,
    isPlaylistLoading,
    artistAlbums,
    areArtistAlbumsLoading,
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
    userProfile,
    isUserProfileLoading,
    artistAlbums,
    areArtistAlbumsLoading,
  }
}

export default connect(mapStateToProps, {})(Main)
