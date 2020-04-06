import { Title, ItemsList, Item, ItemImage, shortenName } from './main'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { fetchPlaylist } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { CategoriesWrapper } from './categories'

type TImage = {
  url: string
}

type TTrack = {
  href: string
  total: number
}

type TPlaylistItem = {
  id: string
  description: string
  images: TImage[]
  name: string
  href: string
  tracks: TTrack[]
}

interface IPlaylists {
  playlists: {
    items: TPlaylistItem[]
  }
}

export const Playlists: React.FC<{
  data: IPlaylists
  currentCategoryName: string
}> = ({ data, currentCategoryName }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  return (
    <CategoriesWrapper>
      <Title>{currentCategoryName}</Title>
      <ItemsList>
        {data.playlists
          ? data.playlists.items.map((elem: TPlaylistItem) => (
              <Link
                key={elem.id}
                to={`/categories${location.pathname.substr(
                  location.pathname.lastIndexOf('/')
                )}/${elem.id}`}
                onClick={() => {
                  fetchPlaylist(dispatch, elem.href)
                }}
              >
                <Item key={elem.id}>
                  <ItemImage
                    src={elem.images ? elem.images[0].url : ''}
                    alt=""
                  />

                  {shortenName(elem.name)}
                </Item>
              </Link>
            ))
          : null}
      </ItemsList>
    </CategoriesWrapper>
  )
}

const mapStateToProps = (state: any) => {
  const { currentCategoryName } = state.player
  return {
    currentCategoryName,
  }
}

export default connect(mapStateToProps, { fetchPlaylist })(Playlists)
