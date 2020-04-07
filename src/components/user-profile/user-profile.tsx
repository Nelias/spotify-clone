import { Title } from '../main'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
const flag = require('country-code-emoji')
const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

type TImage = {
  url: string
}

export interface IUser {
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

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const UserInfo = styled.div``

const UserImage = styled.img`
  width: 13vw;
  margin: 5px auto 20px auto;
  border-radius: 100%;
  border: 6px dotted green;

  @media only screen and (max-width: 600px) {
    width: 50vw;
  }
`

const UserText = styled.p`
  color: #aaa;
  font-weight: normal;
`

const UserData = styled.span`
  color: white;
  font-weight: bold;
`

export const UserProfile: React.FC<{ data: IUser }> = ({ data }) => {
  return (
    <UserWrapper>
      <Title>User Profile</Title>
      <UserInfo>
        <UserImage src={data?.images[0].url} />
        <UserText>
          Name:&nbsp; <UserData>{data?.display_name}</UserData>
        </UserText>
        <UserText>
          E-mail:&nbsp; <UserData>{data?.email}</UserData>
        </UserText>
        <UserText>
          Country:
          <UserData>
            &nbsp; {flag(data?.country || 'US')} &nbsp;
            {countries.getName(data?.country, 'en')}
          </UserData>
        </UserText>
        <UserText>
          Followers:&nbsp; <UserData>{data?.followers.total}</UserData>
        </UserText>
      </UserInfo>
    </UserWrapper>
  )
}

const mapStateToProps = (state: any) => {
  const { userProfile } = state.sidebar

  return {
    data: userProfile,
  }
}

export default connect(mapStateToProps, {})(UserProfile)
