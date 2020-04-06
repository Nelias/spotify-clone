import { Title } from './main'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

type TImage = {
  url: string
}

interface IUserItem {
  country: string
  display_name: string
  email: string

  followers: {
    total: number
  }
  href: string
  id: number
  images: TImage[]
}

interface IUser {
  users: {
    items: IUserItem[]
  }
}

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserProfile: React.FC<{ data: IUser }> = ({ data }) => {
  return (
    <CategoriesWrapper>
      <Title>User Profile</Title>
      <div>{JSON.stringify(data)}</div>
    </CategoriesWrapper>
  )
}

export default connect(null, {})(UserProfile)
