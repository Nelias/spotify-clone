import {
  Title,
  ItemsList,
  Item,
  ItemImage,
  ItemTextWrapper,
  ItemSubtitle,
} from './main'
import * as React from 'react'

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
  return (
    <>
      <Title>{title}</Title>
      <ItemsList>
        {data.albums
          ? data.albums.items.map((elem: TAlbumItem) => (
              <Item key={elem.id}>
                <ItemImage src={elem.images ? elem.images[1].url : ''} alt="" />
                <ItemTextWrapper>
                  {elem.name}
                  <ItemSubtitle>{elem.artists[0].name}</ItemSubtitle>
                </ItemTextWrapper>
              </Item>
            ))
          : null}
      </ItemsList>
    </>
  )
}
