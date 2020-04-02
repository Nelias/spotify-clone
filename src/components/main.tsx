import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Content = styled.main`
  background: #ccc;
  width: 90%;
  display: grid;
  align-items: center;
  margin-top: 50px;
`

const ArtistImage = styled.img`
  width: 100px;
  height: 100px;
`

const ItemsList = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`

export const Main: React.FC<{
  searchPhrase: string
  searchResponseData: any
}> = ({ searchPhrase, searchResponseData }) => {
  return (
    <Content>
      {searchPhrase}
      <ItemsList>
        {searchResponseData
          ? searchResponseData.artists.items.map((elem: any) => (
              <li key={elem.name}>
                <ArtistImage src={elem.images[0].url} alt="" />
                {elem.name}
              </li>
            ))
          : null}
      </ItemsList>
    </Content>
  )
}

const mapStateToProps = (state: any) => {
  const { searchPhrase, searchResponseData } = state
  return { searchPhrase, searchResponseData }
}

export default connect(mapStateToProps)(Main)
