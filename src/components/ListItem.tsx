import { Draggable, Droppable } from 'react-beautiful-dnd'
import { List } from '../states/useList'
import Card from './Card'
import CardInput from './molecules/CardInput'

const ListItem = ({ list, index }: { list: List, index: number }) => {

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
              <h5
                className="font-medium mb-3"
              >{list.title}</h5>
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