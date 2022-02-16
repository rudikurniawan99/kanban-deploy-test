import React from 'react'
import { useDrop } from 'react-dnd'
import useList from '../states/useList'
import ListItem from './ListItem'

const List = () => {

  const { lists } = useList((state) => state)
  const [{ canDrop }, drop] = useDrop(({
    accept: 'List',
    drop: (item) => {
      console.log(item);
       
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div>
      <div className="mt-10 flex space-x-5">
        {lists.map((list) => (
          <div 
            className=""
            ref={drop}
            key={list.id}
          >
            <ListItem
              list={list} 
            />
            {
              canDrop && <p className="text-sm">You can drop it here</p>
            } 
          </div>
        ))}
      </div>
    </div>
  )
}

export default List