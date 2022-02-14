import React, { useState } from 'react'
import useCard from '../../states/useCard'
import useList from '../../states/useList'

const CardInput = ({ listId } : { listId: string }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [cardInput, setCardInput] = useState('')

  const { createCard } = useCard((state) => state)
  const { addCardToList } = useList((state) => state)

  const cardButtonSubmitHandler = () => {
    if(!cardInput) {
      setIsOpen(false)
    }else{
      setIsOpen(false)
      const { id } = createCard(cardInput)
      addCardToList(listId, id)
      setCardInput('')
    }
  }

  return (
    <div className="mt-3">
      {isOpen ? (
        <div className="">
          <input 
            className="bg-gray-600 text-gray-200 px-2 py-2 w-full"
            type="text" placeholder="card title" 
            value={cardInput || ''}
            onChange={(e) => {
              setCardInput(e.target.value)
            }}
          />
          <button
            className="mt-2 bg-blue-500 text-white px-2 py-1" 
            onClick={cardButtonSubmitHandler}
          >Add</button>
        </div>
      ): (
        <button
          className="w-full text-left text-gray-400 hover:bg-gray-400 hover:text-gray-700 px-2 py-1" 
          onClick={() => {
            setIsOpen(true)
          }}
        >+ Add Card</button>
      )}
      
    </div>
  )
}

export default CardInput