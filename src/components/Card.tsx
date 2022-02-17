import React, { useRef } from 'react'
import useCard from '../states/useCard'
import useList from '../states/useList'

const Card = ({ cardId, listId, index } : { cardId: string, listId: string, index: number }) => {

  const { findCardById, deleteCardById } = useCard((state) => state)
  const card = findCardById(cardId)
  const { removeCardFromList } = useList((state) => state)

  return (
    <div 
      className={` p-2 mb-2 flex justify-between bg-white`}
    >
      <p className="">{card.title}</p>
      <button
        className="w-5 text-red-600 hover:text-red-700" 
        onClick={() => {
          removeCardFromList(listId, cardId)
          deleteCardById(cardId)
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      </button>
    </div>
  )
}

export default Card