import React from 'react'
import Sidebar from './components/sidebar/sidebar'
import TopBar from './components/top-bar/top-bar'
import Main from './components/main'
import BottomBar from './components/bottom-bar/bottom-bar'

import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css'
import styled from 'styled-components'

const MainWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TopBar />
        <MainWrapper>
          <Sidebar />
          <Main />
        </MainWrapper>
        <BottomBar />
      </div>
    </Provider>
  )
}

export default App
