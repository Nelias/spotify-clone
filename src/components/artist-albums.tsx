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
  items: TAlbumItem[]
}

export const ArtistAlbums: React.FC<{ data: IAlbum }> = ({ data }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Title>{data?.items[0].artists[0].name}</Title>
      <ItemsList>
        {data?.items.length > 0 ? (
          data.items.map((elem: TAlbumItem) => (
            <Link
              key={elem.id}
              to={`/album/${elem.id}`}
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
          <p>This artist doesn't have any albums!</p>
        )}
      </ItemsList>
    </>
  )
}

export default connect(null, { fetchPlaylist })(ArtistAlbums)
