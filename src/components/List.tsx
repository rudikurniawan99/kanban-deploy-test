import React from 'react'
import useList from '../states/useList'

const List = () => {

  const { lists } = useList((state) => state)

  return (
    <div>
      <div className="mt-10 flex space-x-5">
        {lists.map((list) => (
          <div 
            className="w-64"
            key={list.id}
          >
            {list.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default List