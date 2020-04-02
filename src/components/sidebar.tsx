import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  width: 10%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-end;
  position: relative;
  left: 0;
  background-color: #111;
`

const List = styled.ul`
  width: 100%;
  margin-top: 100px;
`

const ListItem = styled.li`
  color: white;
  display: block;
  padding: 10px 0;
  width: 100%;
  margin: 0 auto;
`

export const Sidebar: React.FC<{}> = () => {
  return (
    <Container>
      <List>
        <ListItem>Categories</ListItem>
        <ListItem>New Releases</ListItem>
      </List>
    </Container>
  )
}
