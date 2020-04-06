import {
  Title,
  ItemsList,
  Item,
  ItemImage,
  ItemTextWrapper,
  ItemSubtitle,
} from './main'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { fetchPlaylist } from '../redux/actions'
import { useDispatch, connect } from 'react-redux'

type TImage = {
  url: string
}

type TArtist = {
  name: string
}

export type TAlbumItem = {
  id: string
  images: TImage[]
  name: string
  artists: TArtist[]
  href: string
}

interface IAlbum {
  albums: {
    items: TAlbumItem[]
  }
}

export const Albums: React.FC<{ data: IAlbum; title: string }> = ({
  data,
  title,
}) => {
  const dispatch = useDispatch()

  return (
    <>
      <Title>{title}</Title>
      <ItemsList>
        {data.albums && data.albums.items.length > 1 ? (
          data.albums.items.map((elem: TAlbumItem) => (
            <Link
              key={elem.id}
              to={`/albums/${elem.id}`}
              onClick={() => {
                fetchPlaylist(dispatch, elem.href)
              }}
            >
              <Item>
                <ItemImage src={elem.images ? elem.images[1].url : ''} alt="" />
                <ItemTextWrapper>
                  {elem.name}
                  <ItemSubtitle>{elem.artists[0].name}</ItemSubtitle>
                </ItemTextWrapper>
              </Item>
            </Link>
          ))
        ) : (
          <p>There are no results for your query</p>
        )}
      </ItemsList>
    </>
  )
}

export default connect(null, { fetchPlaylist })(Albums)
