import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { connect } from 'react-redux'
import { fetchCategories, fetchNewReleases } from '../redux/actions'

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
const LogoWrapper = styled.div`
  display: flex;
  color: white;

  @media only screen and (max-width: 600px) {
    margin-top: 2px;
  }
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
`

const ListItem = styled.li`
  color: white;
  display: block;
  width: 100%;
  margin: 40px auto;

  @media only screen and (max-width: 600px) {
    margin: 30px auto;
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
      <LogoWrapper>
        <Logo src="lyre.svg" alt="" />
        <CompanyName>Stringify</CompanyName>
      </LogoWrapper>
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
      </List>
    </Container>
  )
}

export default connect(null, { fetchCategories, fetchNewReleases })(Sidebar)
