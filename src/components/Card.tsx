import React from 'react'
import useCard from '../states/useCard'

const Card = ({ cardId } : { cardId: string }) => {

  const { findCardById } = useCard((state) => state)
  const card = findCardById(cardId)

  return (
    <div className="bg-white p-2 mb-2">
      <p className="">{card.title}</p>
    </div>
  )
}

export default Card