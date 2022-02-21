import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import useCard from '../states/useCard'
import useList, { List } from '../states/useList'
import Card from './Card'
import CardInput from './molecules/CardInput'

const ListItem = ({ list, index }: { list: List, index: number }) => {

  const [editListOpen, setEditListOpen] = useState<boolean>(false)
  const [editInputName, setEditInputName] = useState<string>(list.title)
  const { renameList, deleteList } = useList((state) => state)
  const { deleteCardById } = useCard((state) => state)

    return (
    <Draggable
      draggableId={list.id}
      index={index}
    >
      {(provided) => (

      <div 
        className={`w-64 p-3  rounded-sm text-gray-800 bg-gray-100`}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Droppable
          droppableId={list.id} 
          type="Card"
        >
          {(provided) => (
            <div 
              className="py-0.5"
              ref={provided.innerRef}   
              {...provided.droppableProps}
            >
              {editListOpen ? (
                <input
                  className="px-2 py-1"
                  type="text" 
                  value={editInputName} 
                  autoFocus={true}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                      if(editInputName !== list.title)
                      renameList(list.id, editInputName)
                      setEditListOpen(false)
                    }else if(e.key === 'Escape'){
                      setEditListOpen(false)
                    }
                  }}
                  onChange={(e) => {
                    setEditInputName(e.target.value) 
                  }}
                />

              ) : (
                <div className="flex justify-between items-center group mb-3"
                >
                  <div
                    className="w-full  hover:bg-gray-300"
                    title="edit title"
                    onClick={() => setEditListOpen(true)}
                  >
                    <h5
                      className="font-medium"
                    >{list.title}</h5>
                  </div>
                  <button className="text-red-500 hover:text-red-600"
                    title="delete list"
                    onClick={() => {
                      const cards = deleteList(list.id)
                      cards?.map((card) => {
                        deleteCardById(card.cardId)
                      })
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
              
              {list.cards.map((card, index) => (
                <Card 
                  key={card.cardId}
                  cardId={card.cardId} 
                  listId={list.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}

        

        </Droppable>
        <CardInput
          listId={list.id} 
        />
      </div>

      )}
    </Draggable>
  )
}

export default ListItem