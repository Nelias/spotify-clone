import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { connect } from 'react-redux'
import { setSearchPhrase, fetchSearchData } from '../redux/actions'

const Header = styled.header`
  width: 100%;
  display: block;
  position: fixed;
  top: 0;
  background-color: #222;
  z-index: 2;
  padding: 10px 0;
`

const Search = styled.input`
  width: 20%;
  padding: 10px;
  border-radius: 40px;
  border: none;
`

const Button = styled.button`
  font-weight: bold;
  color: lime;
  background: #000;
  padding: 8px;
  border-radius: 40px;
  border: 2px solid aquamarine;
  margin-left: 10px;
`

export const TopBar: React.FC<{}> = () => {
  const [inputPhrase, setInputPhrase] = React.useState('')
  const dispatch = useDispatch()

  const handleSearchInput = (phrase: string) => {
    setInputPhrase(phrase)
  }

  return (
    <Header>
      <Search
        placeholder="Search artists, albums or tracks"
        onChange={(e) => handleSearchInput(e.target.value)}
        type="search"
        aria-label="Search through site content"
      />
      <Button
        onClick={() => {
          dispatch(setSearchPhrase(inputPhrase))
          fetchSearchData(dispatch, inputPhrase)
        }}
      >
        Search
      </Button>
    </Header>
  )
}

export default connect(null, { setSearchPhrase })(TopBar)
