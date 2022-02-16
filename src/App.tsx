import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import List from './components/List'
import ListInput from './components/molecules/ListInput'

const App = () => {
  return (
    <div className="px-12 pt-10">
      <DndProvider backend={HTML5Backend}>
        <ListInput/>
        <List/>
      </DndProvider>
    </div>
  )
}

export default App