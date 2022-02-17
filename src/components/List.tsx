import React from 'react'
import useList from '../states/useList'
import ListItem from './ListItem'

const List = () => {

  const { lists } = useList((state) => state)

  return (
    <div>
      <div className="mt-10 flex space-x-5">
        {lists.map((list, index) => (
          <div 
            className=""
            key={list.id}
          >
            <ListItem
              list={list} 
              index={index}
            />
             
          </div>
        ))}
      </div>
    </div>
  )
}

export default List