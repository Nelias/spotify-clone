import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { connect } from 'react-redux'
import {
  fetchCategories,
  fetchNewReleases,
  fetchUserProfile,
} from '../../redux/actions'

const Container = styled.section`
  width: 10%;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  z-index: 4;
  font-size: 0.8vw;

  @media only screen and (max-width: 1024px) {
    width: 20%;
    font-size: 1.8vw;
  }

  @media only screen and (max-width: 600px) {
    width: 25%;
    font-size: 2.3vw;
  }
`

const ConatinerContent = styled.div`
  position: fixed;

  a {
    text-decoration: none;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  color: white;
  padding-top: 20px;
  justify-content: center;
`

const Logo = styled.img`
  width: 2vw;
  margin-right: 0.4vw;

  @media only screen and (max-width: 1024px) {
    width: 4vw;
    margin-right: 0.7vw;
  }
`

const List = styled.ul`
  padding: 0;
  width: 100%;
  margin-top: 30px;
`

const ListItem = styled.li`
  color: white;
  display: block;
  width: 100%;
  margin-bottom: 35px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 25px;
  }

  a {
    background: #222;
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    border-radius: 40px;

    @media only screen and (max-width: 1024px) {
      padding: 1vw 2vw;
    }

    @media only screen and (max-width: 600px) {
      font-size: 2.8vw;
      padding: 1.8vw 1.8vw;
    }
  }
`
const CompanyName = styled.h1``

export const Sidebar: React.FC<{}> = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <ConatinerContent>
        <Link to="/">
          <LogoWrapper>
            <Logo src="/lyre.svg" alt="" />
            <CompanyName>Stringify</CompanyName>
          </LogoWrapper>
        </Link>
        <List>
          <ListItem
            onClick={() => {
              fetchCategories(dispatch)
            }}
          >
            <Link to="/categories">Categories</Link>
          </ListItem>
          <ListItem
            onClick={() => {
              fetchNewReleases(dispatch)
            }}
          >
            <Link to="/new-releases">New Releases</Link>
          </ListItem>
          <ListItem
            onClick={() => {
              fetchUserProfile(dispatch)
            }}
          >
            <Link to="/user-profile">User Profile</Link>
          </ListItem>
        </List>
      </ConatinerContent>
    </Container>
  )
}

export default connect(null, {
  fetchCategories,
  fetchNewReleases,
  fetchUserProfile,
})(Sidebar)
