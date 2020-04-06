import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { connect } from 'react-redux'
import { setSearchPhrase, fetchSearchData } from '../../redux/actions'
import { useHistory } from 'react-router-dom'

const Header = styled.header`
  width: 100%;
  display: block;
  position: fixed;
  top: 0;
  background-color: #111;
  z-index: 2;
  padding: 8px 0;

  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }
`

const Search = styled.input`
  width: 50%;
  min-width: 110px;
  max-width: 300px;
  padding: 8px 10px;
  border-radius: 40px;
  border: none;

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  font-weight: bold;
  color: lime;
  background: #000;
  padding: 6px 10px;
  border-radius: 40px;
  border: 2px solid #00ff80;
  margin-left: 10px;

  @media only screen and (max-width: 600px) {
    margin-right: 10px;
  }
`

export const TopBar: React.FC<{}> = () => {
  const [inputPhrase, setInputPhrase] = React.useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSearchInput = (phrase: string) => {
    setInputPhrase(phrase)
  }

  const handleKeyPress = (key: string) => {
    if (key === 'Enter') {
      dispatch(setSearchPhrase(inputPhrase))
      fetchSearchData(dispatch, inputPhrase)
      history.push('/')
    }
  }

  return (
    <Header>
      <Search
        placeholder="Search artists, albums or tracks"
        onChange={(e) => handleSearchInput(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e.key)}
        type="search"
        aria-label="Search through site content"
      />
      <Button
        onClick={() => {
          dispatch(setSearchPhrase(inputPhrase))
          fetchSearchData(dispatch, inputPhrase)
          history.push('/')
        }}
        type="button"
      >
        Search
      </Button>
    </Header>
  )
}

export default connect(null, { setSearchPhrase })(TopBar)
