import React from 'react'
import { Sidebar, BottomBar } from './components/index'
import TopBar from './components/top-bar'
import Main from './components/main'

import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css'
import styled from 'styled-components'

const MainWrapper = styled.div`
  display: flex;
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
