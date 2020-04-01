import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Content = styled.main`
  background: #ccc;
  width: 90%;
  display: grid;
  align-items: center;
`

export const Main: React.FC<{ searchPhrase: string }> = ({ searchPhrase }) => {
  return <Content>{searchPhrase}</Content>
}

const mapStateToProps = (state: any) => {
  const { searchPhrase } = state
  return { searchPhrase }
}

export default connect(mapStateToProps)(Main)
