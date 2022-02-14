import React from 'react'
import useList from '../states/useList'

const List = () => {

  const { lists } = useList((state) => state)

  return (
    <div>
      <div className="mt-10 flex space-x-5">
        {lists.map((list) => (
          <div 
            className=""
            key={list.id}
          >
            <div className="w-64 p-3 bg-gray-100 rounded-sm text-gray-800">
              <h5
                className="font-medium" 
              >{list.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List