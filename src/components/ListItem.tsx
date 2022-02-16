import React from 'react'
import { List } from '../states/useList'
import Card from './Card'
import CardInput from './molecules/CardInput'

const ListItem = ({ list }: { list: List }) => {
  return (
    <div>
      <div className="w-64 p-3  rounded-sm text-gray-800 bg-gray-100">
        <div className="">
          <h5
            className="font-medium mb-3"
          >{list.title}</h5>
        </div>
        {list.cards.map((card) => (
          <Card 
            key={card.cardId}
            cardId={card.cardId} 
            listId={list.id}
          />
        ))}
        <CardInput
          listId={list.id} 
        />
      </div>
    </div>
  )
}

export default ListItem