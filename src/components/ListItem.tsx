import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import useList, { List } from '../states/useList'
import Card from './Card'
import CardInput from './molecules/CardInput'

const ListItem = ({ list, index }: { list: List, index: number }) => {

  const [editListOpen, setEditListOpen] = useState<boolean>(false)
  const [editInputName, setEditInputName] = useState<string>(list.title)
  const { renameList } = useList((state) => state)

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
                <div className="flex justify-between items-center group hover:bg-gray-300 mb-3"
                  onClick={() => setEditListOpen(true)}
                >
                  <h5
                    className="font-medium"
                  >{list.title}</h5>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden group-hover:block" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
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