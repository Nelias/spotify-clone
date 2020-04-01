import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  width: 100%;
  display: block;
  position: fixed;
  top: 0;
  background-color: #222;
  z-index: 2;
`

const Search = styled.input`
  width: 20%;
  padding: 10px;
`

export const TopBar: React.FC<{}> = () => {
  return (
    <Header>
      <Search placeholder="Search artists, albums or tracks" />
    </Header>
  )
}
