import React, { useRef } from 'react'
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { List } from '../states/useList'
import Card from './Card'
import CardInput from './molecules/CardInput'

const ListItem = ({ list }: { list: List }) => {

  const reff = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop(({
    accept: 'List',
    drop: (item: { id: string }) => {
      console.log(item.id);
    }
  }))

  const [{ isDragging } ,drag] = useDrag(({
    type: 'List',
    item: {
      id: list.id
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    })
  }))

  drag(drop(reff))

  return (
    <div>
      <div 
        className={`w-64 p-3  rounded-sm text-gray-800 ${isDragging ? 'bg-gray-300': 'bg-gray-100'}`}
        ref={reff}
      >
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