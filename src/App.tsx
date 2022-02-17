import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import List from './components/List'
import ListInput from './components/molecules/ListInput'
import useList from './states/useList'

const App = () => {

  const { moveListPosition } = useList((state) => state)

  return (
    <div className="px-12 pt-10">
      <DragDropContext
        onDragEnd={({ source, destination }) => {
          if(destination?.index !== null ){
            moveListPosition(source.index, destination?.index as number)
          }
          console.log(source, destination);
          
        }} 
      > 
        <ListInput/>
        <List/>
      </DragDropContext>
    </div>
  )
}

export default App