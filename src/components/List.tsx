import React from 'react'
import useList from '../states/useList'
import Card from './Card'
import CardInput from './molecules/CardInput'

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
              <div className="">
                <h5
                  className="font-medium mb-3"
                >{list.title}</h5>
              </div>
              {list.cards.map((card) => (
                <Card key={card.cardId} cardId={card.cardId} />
              ))}
              <CardInput
                listId={list.id} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List