import React from 'react'
import List from './components/List'
import ListInput from './components/molecules/ListInput'

const App = () => {
  return (
    <div className="px-12 pt-10">
        <ListInput/>
        <List/>
    </div>
  )
}

export default App