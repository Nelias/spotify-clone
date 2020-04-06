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

interface IUser {
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
  border: 4px solid #555;

  @media only screen and (max-width: 600px) {
    width: 50vw;
  }
`

const UserText = styled.p`
  color: lime;
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
        <UserImage src={data.images[0].url} />
        <UserText>
          name:&nbsp; <UserData>{data.display_name}</UserData>
        </UserText>
        <UserText>
          e-mail:&nbsp; <UserData>{data.email}</UserData>
        </UserText>
        <UserText>
          country:
          <UserData>
            &nbsp; {flag(data.country)} &nbsp;
            {countries.getName(data.country, 'en')}
          </UserData>
        </UserText>
        <UserText>
          followers:&nbsp; <UserData>{data.followers.total}</UserData>
        </UserText>
      </UserInfo>
    </UserWrapper>
  )
}

export default connect(null, {})(UserProfile)
