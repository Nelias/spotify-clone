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
import { fetchCategoryPlaylists } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

type TImage = {
  url: string
}

type TCategoryItem = {
  id: string
  icons: TImage[]
  name: string
  href: string
}

interface ICategory {
  categories: {
    items: TCategoryItem[]
  }
}

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Categories: React.FC<{ data: ICategory }> = ({ data }) => {
  const dispatch = useDispatch()
  return (
    <CategoriesWrapper>
      <Title>Categories</Title>
      <ItemsList>
        {data.categories
          ? data.categories.items.map((elem: TCategoryItem) => (
              <Link
                key={elem.id}
                to={`/categories/${elem.id}`}
                onClick={() => {
                  fetchCategoryPlaylists(dispatch, elem.href, elem.name)
                }}
              >
                <Item>
                  <ItemImage src={elem.icons ? elem.icons[0].url : ''} alt="" />
                  <ItemTextWrapper>
                    {elem.name}
                    <ItemSubtitle>Category</ItemSubtitle>
                  </ItemTextWrapper>
                </Item>
              </Link>
            ))
          : null}
      </ItemsList>
    </CategoriesWrapper>
  )
}

export default connect(null, { fetchCategoryPlaylists })(Categories)
