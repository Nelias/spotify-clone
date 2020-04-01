import React from 'react'
import { TopBar, Sidebar, BottomBar, Main } from './components/index'
import './App.css'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Sidebar />
      <Main />
      <BottomBar />
    </div>
  )
}

export default App
