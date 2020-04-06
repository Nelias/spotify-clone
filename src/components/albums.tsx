import { Title, ItemsList, Item, ItemImage, shortenName } from './main'
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

export const Albums: React.FC<{ data: IAlbum }> = ({ data }) => {
  return (
    <>
      <Title>Albums</Title>
      <ItemsList>
        {data.albums
          ? data.albums.items.map((elem: TAlbumItem) => (
              <Item key={elem.id}>
                <ItemImage src={elem.images ? elem.images[1].url : ''} alt="" />

                {shortenName(elem.name)}
                <br />
                <br />
                {shortenName(elem.artists[0].name)}
              </Item>
            ))
          : null}
      </ItemsList>
    </>
  )
}
